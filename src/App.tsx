import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { CraftingGrid } from './components/CraftingGrid';
import { InventoryHotbar } from './components/InventoryHotbar';
import { AudioRiddleBar } from './components/AudioRiddleBar';
import { InstructionsModal } from './components/InstructionsModal';
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
  LAST_LISTEN: 'last_riddle_listen_time',
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

const getInitialLastListen = (): number => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_LISTEN);
    if (saved) {
      const num = Number(saved);
      if (!isNaN(num)) return num;
    }
  } catch {
    // ignore
  }
  return 0;
};

export const App: React.FC = () => {
  // Core Persistent State
  const [craftingGrid, setCraftingGrid] = useState<GridState>(getInitialGridState);
  const [puzzleStartTime, setPuzzleStartTime] = useState<number>(getInitialStartTime);
  const [unlockedHints, setUnlockedHints] = useState<HintTierId[]>(getInitialHints);
  const [puzzleIsSolved, setPuzzleIsSolved] = useState<boolean>(getInitialSolvedState);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(getInitialMutedState);
  const [lastRiddleListenTime, setLastRiddleListenTime] = useState<number>(getInitialLastListen);

  // Transient UI State
  const [selectedBlockId, setSelectedBlockId] = useState<BlockId | null>(null);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(() =>
    Math.floor((Date.now() - getInitialStartTime()) / 1000)
  );
  const [cooldownRemainingSeconds, setCooldownRemainingSeconds] = useState<number>(0);
  const [currentMockQuote, setCurrentMockQuote] = useState<string | null>(null);

  // Sync state changes to localStorage
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAST_LISTEN, lastRiddleListenTime.toString());
  }, [lastRiddleListenTime]);

  const speakTextAloud = useCallback(
    (text: string) => {
      soundEngine.speakText(text, isAudioMuted);
    },
    [isAudioMuted]
  );

  // 5-Minute Cooldown logic (300 seconds) for Listening to the Riddle
  const RIDDLE_COOLDOWN_SECONDS = 300;

  const handleListenToRiddle = useCallback(() => {
    const now = Date.now();
    const elapsedSinceListen = Math.floor((now - lastRiddleListenTime) / 1000);

    if (elapsedSinceListen < RIDDLE_COOLDOWN_SECONDS) {
      const remaining = RIDDLE_COOLDOWN_SECONDS - elapsedSinceListen;
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      soundEngine.speakText(
        `The riddle is recharging! Please wait ${mins} minutes and ${secs} seconds before listening again.`,
        isAudioMuted
      );
      return;
    }

    setLastRiddleListenTime(now);

    const baseRiddle = HINT_TIERS[0].text;
    const unlockedHintTexts = HINT_TIERS.filter(
      (tier) => tier.id !== 'base' && unlockedHints.includes(tier.id)
    ).map((t) => `${t.title}: ${t.text}`);

    const fullAudioText =
      unlockedHintTexts.length > 0
        ? `${baseRiddle} ... Unlocked Hints: ${unlockedHintTexts.join(' ... ')}`
        : baseRiddle;

    soundEngine.speakText(fullAudioText, isAudioMuted);
  }, [lastRiddleListenTime, unlockedHints, isAudioMuted]);

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
            speakTextAloud(`${tier.title} unlocked! ${tier.text}`);
          }
        }
        return next;
      });
    },
    [isAudioMuted, speakTextAloud]
  );

  // 1-second Interval: Update elapsed puzzle time & check 5-min Riddle recharge countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsedSecs = Math.floor((now - puzzleStartTime) / 1000);
      setElapsedSeconds(elapsedSecs);

      const elapsedSinceListen = Math.floor((now - lastRiddleListenTime) / 1000);
      const rechargeRemaining = Math.max(0, RIDDLE_COOLDOWN_SECONDS - elapsedSinceListen);
      setCooldownRemainingSeconds(rechargeRemaining);

      if (elapsedSecs >= 10 * 60 && !unlockedHints.includes('hint1')) {
        unlockHintTier('hint1');
      }
      if (elapsedSecs >= 20 * 60 && !unlockedHints.includes('hint2')) {
        unlockHintTier('hint2');
      }
      if (elapsedSecs >= 60 * 60 && !unlockedHints.includes('solution')) {
        unlockHintTier('solution');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [puzzleStartTime, unlockedHints, unlockHintTier, lastRiddleListenTime]);

  const handleUnlockNextHint = () => {
    const nextLocked = HINT_TIERS.find((t) => !unlockedHints.includes(t.id));
    if (nextLocked) {
      const targetSecs = nextLocked.unlockMinutes * 60;
      setPuzzleStartTime(Date.now() - targetSecs * 1000);
      unlockHintTier(nextLocked.id, true);
    }
  };

  const formatRechargeCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSlotClick = (index: number) => {
    setCraftingGrid((prev) => {
      const next = [...prev];
      if (selectedBlockId) {
        next[index] = selectedBlockId;
      } else {
        next[index] = null;
      }
      return next;
    });
  };

  const handleSlotDrop = (index: number, blockId: BlockId) => {
    setCraftingGrid((prev) => {
      const next = [...prev];
      next[index] = blockId;
      return next;
    });
  };

  const handleClearTable = () => {
    setCraftingGrid(Array(9).fill(null));
  };

  const handleResetPuzzle = () => {
    setCraftingGrid(Array(9).fill(null));
    const now = Date.now();
    setPuzzleStartTime(now);
    setUnlockedHints(['base']);
    setPuzzleIsSolved(false);
    setSelectedBlockId(null);
    setCurrentMockQuote(null);
    setElapsedSeconds(0);
    setLastRiddleListenTime(0);
    soundEngine.cancelSpeech();
  };

  const handleSubmitRecipe = () => {
    const isCorrect = WINNING_RECIPE.every(
      (expectedBlock, idx) => craftingGrid[idx] === expectedBlock
    );

    if (isCorrect) {
      setPuzzleIsSolved(true);
      soundEngine.playLevelUpFanfare(isAudioMuted);
      soundEngine.speakText(
        'Achievement Unlocked! You crafted the Phantom-Slayer Snooze Button! Inside the alarm clock, you discover your secret birthday clue: the letter Q! Write down the letter Q on your clue sheet!',
        isAudioMuted,
        1.05,
        0.95
      );
      try {
        confetti({
          particleCount: 180,
          spread: 130,
          origin: { y: 0.55 },
          colors: ['#FFD700', '#00E5FF', '#FF1744', '#00E676', '#FFFFFF'],
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }
    } else {
      soundEngine.playOofBuzzer(isAudioMuted);
      const randomMock = MOCK_QUOTES[Math.floor(Math.random() * MOCK_QUOTES.length)];
      setCurrentMockQuote(randomMock);
      soundEngine.speakVillagerMock(randomMock, isAudioMuted);
    }
  };

  const isOnCooldown = cooldownRemainingSeconds > 0;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-mc-dark p-3 sm:p-6 pb-12">
      {/* Celebration Overlay Modal (Secret Letter Q Reveal) */}
      <CelebrationModal
        isOpen={puzzleIsSolved}
        onReset={handleResetPuzzle}
      />

      {/* Instructions Popup Modal */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />

      {/* Villager Chat Mock Bubble */}
      <VillagerChatBubble
        mockQuote={currentMockQuote}
        onDismiss={() => setCurrentMockQuote(null)}
      />

      <div className="max-w-6xl mx-auto w-full space-y-5">
        {/* Top Header & Main Audio/Help Controls */}
        <header className="bg-mc-stoneDark border-4 border-mc-stone p-4 sm:p-5 rounded-lg shadow-mc-inset flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-mc-dirtDark border-2 border-mc-gold rounded flex items-center justify-center text-2xl sm:text-3xl shadow">
              ⏰
            </div>
            <div>
              <h1 className="text-sm sm:text-base md:text-lg text-mc-gold font-minecraft tracking-tight font-bold">
                THE PHANTOM-SLAYER SNOOZE BUTTON
              </h1>
              <p className="text-[10px] sm:text-xs text-mc-panel mt-1 font-minecraft">
                Help Steve &amp; Barnaby craft the ultimate 6:00 AM Phantom alarm clock!
              </p>
            </div>
          </div>

          {/* Primary Top Action Bar: HOW TO PLAY & LISTEN TO RIDDLE (5-Min Cooldown) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsInstructionsOpen(true)}
              className="bg-mc-stone border-2 border-mc-panel hover:border-mc-gold hover:bg-mc-panelDark text-white px-4 py-2.5 rounded text-xs font-minecraft transition-all font-bold flex items-center gap-2 shadow"
              title="How to Play Instructions"
            >
              <span>📖</span>
              <span>INSTRUCTIONS</span>
            </button>

            <button
              onClick={handleListenToRiddle}
              className={`border-2 px-4 py-2.5 rounded text-xs font-minecraft transition-all font-bold flex items-center gap-2 shadow-mc-button ${
                isOnCooldown
                  ? 'bg-mc-stoneDark border-mc-panel text-white/70 hover:border-mc-redstone'
                  : 'bg-mc-gold hover:bg-white text-black border-mc-stoneDark hover:scale-105 active:scale-95'
              }`}
              title={
                isOnCooldown
                  ? `Riddle recharging! Ready in ${formatRechargeCountdown(cooldownRemainingSeconds)}`
                  : 'Speak Riddle & Unlocked Hints Aloud (5-Minute Recharging Cooldown)'
              }
            >
              <span>{isOnCooldown ? '⏳' : '🔊'}</span>
              <span>
                {isOnCooldown
                  ? `RECHARGING (${formatRechargeCountdown(cooldownRemainingSeconds)})`
                  : 'LISTEN TO RIDDLE'}
              </span>
            </button>

            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className={`px-3 py-2.5 rounded text-xs border-2 flex items-center gap-1.5 font-minecraft transition-all font-bold ${
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
              className="bg-mc-stone border-2 border-mc-panel hover:border-mc-redstone hover:bg-mc-redstone/20 text-white px-3 py-2.5 rounded text-xs font-minecraft transition-all font-bold"
              title="Reset Puzzle Progress & Cooldowns"
            >
              🔄 Reset
            </button>
          </div>
        </header>

        {/* Audio Riddle & Countdown Status Bar */}
        <AudioRiddleBar
          unlockedHints={unlockedHints}
          elapsedSeconds={elapsedSeconds}
          onPlayAudio={(text) => speakTextAloud(text)}
          onUnlockNextHint={handleUnlockNextHint}
        />

        {/* --- FRONT AND CENTER SIDE-BY-SIDE LAYOUT (LEFT: 9 BLOCKS, RIGHT: 3x3 TABLE) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT SIDE: 9 Possible Blocks Inventory Panel (col-span-5) */}
          <div className="lg:col-span-5 w-full flex flex-col">
            <InventoryHotbar
              selectedBlockId={selectedBlockId}
              onSelectBlock={(blockId) =>
                setSelectedBlockId((prev) => (prev === blockId ? null : blockId))
              }
            />
          </div>

          {/* RIGHT SIDE: 3x3 Crafting Table Centerpiece (col-span-7) */}
          <div className="lg:col-span-7 w-full flex flex-col justify-between space-y-4">
            <CraftingGrid
              gridState={craftingGrid}
              selectedBlockId={selectedBlockId}
              onSlotClick={handleSlotClick}
              onSlotDrop={handleSlotDrop}
            />

            {/* Core Action Buttons Directly Below Crafting Table */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-mc-stoneDark p-4 rounded-lg border-4 border-mc-stone">
              <button
                onClick={handleClearTable}
                className="w-full sm:w-auto bg-mc-stone hover:bg-mc-panelDark text-white border-2 border-mc-panel px-6 py-4 rounded text-xs font-minecraft transition-all font-bold"
              >
                🧹 CLEAR TABLE
              </button>

              <button
                onClick={handleSubmitRecipe}
                className="w-full sm:w-auto bg-mc-gold hover:bg-white text-black font-bold border-4 border-mc-stoneDark px-10 py-4 rounded text-sm font-minecraft shadow-mc-button hover:scale-105 active:scale-95 transition-all"
              >
                ⚡ CRAFT RECIPE!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto w-full mt-8 text-center text-[10px] text-mc-panel/60 font-mono">
        The Phantom-Slayer Snooze Button • Birthday Treasure Puzzle 1 of 4 (Letter Q) • Containerized for Google Cloud Run
      </footer>
    </div>
  );
};
