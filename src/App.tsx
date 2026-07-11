import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { CraftingGrid } from './components/CraftingGrid';
import { InventoryHotbar } from './components/InventoryHotbar';
import { RiddleConsole } from './components/RiddleConsole';
import { VillagerChatBubble } from './components/VillagerChatBubble';
import { CelebrationModal } from './components/CelebrationModal';
import { WINNING_RECIPE, HINT_TIERS, MOCK_QUOTES } from './data/riddle';
import { BlockId, GridState, HintTierId } from './types/game';
import { soundEngine } from './utils/sound';

const STORAGE_KEYS = {
  GRID_STATE: 'crafting_grid_state',
  START_TIME: 'puzzle_start_time',
  HINTS_LIST: 'unlocked_hints_list',
  IS_SOLVED: 'puzzle_is_solved',
  IS_MUTED: 'is_audio_muted',
};

const getInitialGridState = (): GridState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GRID_STATE);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 9) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read saved grid state', e);
  }
  return Array(9).fill(null);
};

const getInitialStartTime = (): number => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.START_TIME);
    if (saved) {
      const num = Number(saved);
      if (!isNaN(num) && num > 0) return num;
    }
  } catch (e) {
    console.warn('Could not read start time', e);
  }
  const now = Date.now();
  localStorage.setItem(STORAGE_KEYS.START_TIME, now.toString());
  return now;
};

const getInitialHints = (): HintTierId[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.HINTS_LIST);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read hints list', e);
  }
  return ['base'];
};

const getInitialSolvedState = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEYS.IS_SOLVED) === 'true';
  } catch {
    return false;
  }
};

const getInitialMutedState = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEYS.IS_MUTED) === 'true';
  } catch {
    return false;
  }
};

export const App: React.FC = () => {
  // Core Persistent State
  const [craftingGrid, setCraftingGrid] = useState<GridState>(getInitialGridState);
  const [puzzleStartTime, setPuzzleStartTime] = useState<number>(getInitialStartTime);
  const [unlockedHints, setUnlockedHints] = useState<HintTierId[]>(getInitialHints);
  const [puzzleIsSolved, setPuzzleIsSolved] = useState<boolean>(getInitialSolvedState);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(getInitialMutedState);

  // Transient State
  const [selectedBlockId, setSelectedBlockId] = useState<BlockId | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(() =>
    Math.floor((Date.now() - getInitialStartTime()) / 1000)
  );
  const [currentMockQuote, setCurrentMockQuote] = useState<string | null>(null);

  // Sync state changes to localStorage (Section 6)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GRID_STATE, JSON.stringify(craftingGrid));
  }, [craftingGrid]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.START_TIME, puzzleStartTime.toString());
  }, [puzzleStartTime]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HINTS_LIST, JSON.stringify(unlockedHints));
  }, [unlockedHints]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_SOLVED, String(puzzleIsSolved));
  }, [puzzleIsSolved]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_MUTED, String(isAudioMuted));
    if (isAudioMuted) {
      soundEngine.cancelSpeech();
    }
  }, [isAudioMuted]);

  // Read a hint or text aloud
  const readRiddleAloud = useCallback(
    (text: string) => {
      soundEngine.speakText(text, isAudioMuted);
    },
    [isAudioMuted]
  );

  // Helper to unlock a specific hint tier
  const unlockHintTier = useCallback(
    (tierId: HintTierId, announce: boolean = true) => {
      setUnlockedHints((prev) => {
        if (prev.includes(tierId)) return prev;
        const next = [...prev, tierId];
        if (announce) {
          soundEngine.playChime(isAudioMuted);
          const tier = HINT_TIERS.find((t) => t.id === tierId);
          if (tier) {
            readRiddleAloud(`${tier.title} unlocked: ${tier.text}`);
          }
        }
        return next;
      });
    },
    [isAudioMuted, readRiddleAloud]
  );

  // Riddle Loop & Timer Monitor (Every 1 second update elapsed time & auto-unlock hints)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsedSecs = Math.floor((now - puzzleStartTime) / 1000);
      setElapsedSeconds(elapsedSecs);

      // Hint schedule check (Section 3)
      if (elapsedSecs >= 10 * 60 && !unlockedHints.includes('hint1')) {
        unlockHintTier('hint1');
      }
      if (elapsedSecs >= 20 * 60 && !unlockedHints.includes('hint2')) {
        unlockHintTier('hint2');
      }
      if (elapsedSecs >= 30 * 60 && !unlockedHints.includes('solution')) {
        unlockHintTier('solution');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [puzzleStartTime, unlockedHints, unlockHintTier]);

  // Manual Dev / Kid "Unlock Next Hint Now" Helper
  const handleUnlockNextHint = () => {
    const nextLocked = HINT_TIERS.find((t) => !unlockedHints.includes(t.id));
    if (nextLocked) {
      // Advance puzzle start time back so that remaining countdown naturally reflects the jump
      const targetSecs = nextLocked.unlockMinutes * 60;
      setPuzzleStartTime(Date.now() - targetSecs * 1000);
      unlockHintTier(nextLocked.id, true);
    }
  };

  // Tablet Core Tap-to-Place / Remove logic (Section 4)
  const handleSlotClick = (index: number) => {
    setCraftingGrid((prev) => {
      const next = [...prev];
      if (selectedBlockId) {
        // Place or replace selected item in slot
        next[index] = selectedBlockId;
      } else {
        // Tapping without a selected item removes block from slot
        next[index] = null;
      }
      return next;
    });
  };

  // Drag and drop onto grid slot
  const handleSlotDrop = (index: number, blockId: BlockId) => {
    setCraftingGrid((prev) => {
      const next = [...prev];
      next[index] = blockId;
      return next;
    });
  };

  // Clear entire crafting table
  const handleClearTable = () => {
    setCraftingGrid(Array(9).fill(null));
  };

  // Reset entire puzzle state
  const handleResetPuzzle = () => {
    setCraftingGrid(Array(9).fill(null));
    const now = Date.now();
    setPuzzleStartTime(now);
    setUnlockedHints(['base']);
    setPuzzleIsSolved(false);
    setSelectedBlockId(null);
    setCurrentMockQuote(null);
    setElapsedSeconds(0);
    soundEngine.cancelSpeech();
  };

  // Submit Recipe Evaluation (Section 5)
  const handleSubmitRecipe = () => {
    // Check if every slot matches WINNING_RECIPE exactly
    const isCorrect = WINNING_RECIPE.every(
      (expectedBlock, idx) => craftingGrid[idx] === expectedBlock
    );

    if (isCorrect) {
      // SUCCESS!
      setPuzzleIsSolved(true);
      soundEngine.playLevelUpFanfare(isAudioMuted);
      // Trigger canvas-confetti fireworks
      try {
        confetti({
          particleCount: 160,
          spread: 120,
          origin: { y: 0.55 },
          colors: ['#FFD700', '#00E5FF', '#FF1744', '#00E676', '#FFFFFF'],
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }
    } else {
      // FAIL (MOCKING ENGINE)
      soundEngine.playOofBuzzer(isAudioMuted);
      const randomMock = MOCK_QUOTES[Math.floor(Math.random() * MOCK_QUOTES.length)];
      setCurrentMockQuote(randomMock);
      soundEngine.speakVillagerMock(randomMock, isAudioMuted);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-mc-dark p-3 sm:p-6 pb-12">
      {/* Celebration Overlay Modal */}
      <CelebrationModal
        isOpen={puzzleIsSolved}
        onReset={handleResetPuzzle}
      />

      {/* Villager Chat Mock Bubble */}
      <VillagerChatBubble
        mockQuote={currentMockQuote}
        onDismiss={() => setCurrentMockQuote(null)}
      />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto w-full space-y-5">
        {/* Header Bar */}
        <header className="bg-mc-stoneDark border-4 border-mc-stone p-4 rounded-lg shadow-mc-inset flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Minecraft Chest Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mc-dirtDark border-2 border-mc-gold rounded flex items-center justify-center text-xl sm:text-2xl shadow">
              🎂
            </div>
            <div>
              <h1 className="text-sm sm:text-base md:text-lg text-mc-gold font-minecraft tracking-tight">
                BIRTHDAY MASTER CRAFTER
              </h1>
              <p className="text-[10px] sm:text-xs text-mc-panel mt-0.5 font-minecraft">
                Craft the Legendary Gamer Crown to Unlock Your Gift!
              </p>
            </div>
          </div>

          {/* Top Right Action Buttons (Tablet Accessible) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className={`px-3 py-2 rounded text-xs border-2 flex items-center gap-1.5 font-minecraft transition-all ${
                isAudioMuted
                  ? 'bg-mc-redstone border-white text-white'
                  : 'bg-mc-stone border-mc-panel hover:border-mc-gold text-white'
              }`}
              title={isAudioMuted ? 'Unmute Sound & Speech' : 'Mute Sound & Speech'}
            >
              <span>{isAudioMuted ? '🔇' : '🔊'}</span>
              <span className="hidden sm:inline">
                {isAudioMuted ? 'Muted' : 'Sound ON'}
              </span>
            </button>

            <button
              onClick={handleResetPuzzle}
              className="bg-mc-stone border-2 border-mc-panel hover:border-mc-redstone hover:bg-mc-redstone/20 text-white px-3 py-2 rounded text-xs font-minecraft transition-all"
              title="Reset Puzzle Progress"
            >
              🔄 Reset
            </button>
          </div>
        </header>

        {/* Section 3: Riddle & Hint Progression Engine */}
        <RiddleConsole
          unlockedHints={unlockedHints}
          elapsedSeconds={elapsedSeconds}
          onUnlockNextHint={handleUnlockNextHint}
          onSpeakRiddle={readRiddleAloud}
        />

        {/* Main Crafting Workspace Grid + Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Crafting Grid Area (Left / Center on tablet) */}
          <div className="lg:col-span-7 w-full">
            <CraftingGrid
              gridState={craftingGrid}
              selectedBlockId={selectedBlockId}
              onSlotClick={handleSlotClick}
              onSlotDrop={handleSlotDrop}
            />

            {/* Core Action Control Bar (Clear & Submit) */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-mc-stoneDark p-3 rounded border-4 border-mc-stone">
              <button
                onClick={handleClearTable}
                className="w-full sm:w-auto bg-mc-stone hover:bg-mc-panelDark text-white border-2 border-mc-panel px-4 py-3 rounded text-xs font-minecraft transition-all"
              >
                🧹 CLEAR TABLE
              </button>

              <button
                onClick={handleSubmitRecipe}
                className="w-full sm:w-auto bg-mc-gold hover:bg-white text-black font-bold border-4 border-mc-stoneDark px-8 py-3.5 rounded text-sm font-minecraft shadow-mc-button hover:scale-105 active:scale-95 transition-all"
              >
                ⚡ CRAFT RECIPE!
              </button>
            </div>
          </div>

          {/* Section 2: Crafting Block Inventory (Right on desktop, Below on tablet portrait) */}
          <div className="lg:col-span-5 w-full">
            <InventoryHotbar
              selectedBlockId={selectedBlockId}
              onSelectBlock={(blockId) =>
                setSelectedBlockId((prev) => (prev === blockId ? null : blockId))
              }
            />

            {/* Quick Tablet Interaction Guide */}
            <div className="mt-3 bg-mc-stone/60 border-2 border-mc-stoneDark p-3 rounded text-[11px] text-mc-panel space-y-1.5">
              <div className="text-mc-gold uppercase font-bold text-xs">
                💡 Tablet Control Tips:
              </div>
              <div>• Tap an inventory item below to select it (yellow highlight).</div>
              <div>• Tap any grid slot on the Crafting Table to place it.</div>
              <div>• Tap a slot without a selected item to remove that block.</div>
              <div>• Press &apos;Craft Recipe!&apos; when your 3x3 layout matches the riddle!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="max-w-5xl mx-auto w-full mt-6 text-center text-[10px] text-mc-panel/60 font-mono">
        Happy Birthday! Containerized & Ready for Google Cloud Run • Built with React 18, TypeScript, & Tailwind CSS
      </footer>
    </div>
  );
};
