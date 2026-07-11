import React, { useState } from 'react';
import { HINT_TIERS } from '../data/riddle';
import { HintTierId } from '../types/game';

interface RiddleConsoleProps {
  unlockedHints: HintTierId[];
  elapsedSeconds: number;
  onUnlockNextHint: () => void;
  onSpeakRiddle: (text: string) => void;
}

export const RiddleConsole: React.FC<RiddleConsoleProps> = ({
  unlockedHints,
  elapsedSeconds,
  onUnlockNextHint,
  onSpeakRiddle,
}) => {
  const [selectedHintId, setSelectedHintId] = useState<HintTierId>(
    unlockedHints[unlockedHints.length - 1] || 'base'
  );

  // Calculate next locked hint tier and remaining countdown
  const nextLockedTier = HINT_TIERS.find((tier) => !unlockedHints.includes(tier.id));
  const nextUnlockSeconds = nextLockedTier ? nextLockedTier.unlockMinutes * 60 : null;
  const remainingSeconds =
    nextUnlockSeconds !== null ? Math.max(0, nextUnlockSeconds - elapsedSeconds) : 0;

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Ensure active tab defaults to latest unlocked if selected is locked
  const activeTier =
    HINT_TIERS.find((t) => t.id === selectedHintId && unlockedHints.includes(t.id)) ||
    HINT_TIERS.find((t) => t.id === unlockedHints[unlockedHints.length - 1]) ||
    HINT_TIERS[0];

  return (
    <div className="bg-mc-stone border-4 border-mc-stoneDark p-4 rounded-lg shadow-mc-inset text-white w-full">
      {/* Header & Countdown Timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b-2 border-mc-stoneDark">
        <div className="flex items-center gap-2">
          {/* Ancient Scroll / Riddle Icon */}
          <span className="text-xl">📜</span>
          <h2 className="text-xs sm:text-sm text-mc-gold uppercase tracking-wider">
            ANCIENT CRAFTING RIDDLE
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {nextLockedTier ? (
            <div className="bg-mc-dark px-3 py-1 rounded border-2 border-mc-stoneDark flex items-center gap-2">
              <span className="text-[10px] text-mc-panel">NEXT HINT IN:</span>
              <span className="text-xs sm:text-sm font-mono text-mc-diamond font-bold">
                {formatCountdown(remainingSeconds)}
              </span>
            </div>
          ) : (
            <div className="bg-mc-dark px-3 py-1 rounded border-2 border-mc-emerald text-mc-emerald text-xs">
              ALL HINTS UNLOCKED
            </div>
          )}

          {/* Dev/Kid Helper Button to instantly unlock next hint tier */}
          {nextLockedTier && (
            <button
              onClick={onUnlockNextHint}
              className="bg-mc-stoneDark hover:bg-mc-gold hover:text-black border-2 border-mc-panel text-white text-[10px] px-2 py-1 rounded transition-colors"
              title="Unlock Next Hint Instantly"
            >
              + Unlock Hint
            </button>
          )}
        </div>
      </div>

      {/* Tabs for Unlocked Hints */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {HINT_TIERS.map((tier) => {
          const isUnlocked = unlockedHints.includes(tier.id);
          const isSelected = activeTier.id === tier.id;

          return (
            <button
              key={tier.id}
              onClick={() => isUnlocked && setSelectedHintId(tier.id)}
              disabled={!isUnlocked}
              className={`
                px-2.5 py-1.5 rounded text-[10px] sm:text-xs font-minecraft border-2 transition-all duration-150
                ${
                  !isUnlocked
                    ? 'bg-mc-stoneDark/50 border-mc-stoneDark text-white/30 cursor-not-allowed'
                    : isSelected
                    ? 'bg-mc-gold border-white text-black shadow-md font-bold'
                    : 'bg-mc-stoneDark border-mc-panel text-white hover:bg-mc-panelDark'
                }
              `}
            >
              {isUnlocked ? '🔓 ' : '🔒 '}
              {tier.title}
            </button>
          );
        })}
      </div>

      {/* Riddle Display Box */}
      <div className="bg-mc-dark/90 border-4 border-mc-stoneDark p-4 rounded min-h-[96px] flex flex-col justify-between">
        <div className="text-xs sm:text-sm text-mc-panel leading-relaxed font-minecraft whitespace-pre-line">
          {activeTier.text}
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={() => onSpeakRiddle(activeTier.text)}
            className="bg-mc-stoneDark hover:bg-mc-panelDark border-2 border-mc-panel px-3 py-1.5 rounded text-[10px] sm:text-xs text-mc-gold flex items-center gap-1.5 transition-colors"
          >
            <span>🔊</span> Speak Aloud
          </button>
        </div>
      </div>
    </div>
  );
};
