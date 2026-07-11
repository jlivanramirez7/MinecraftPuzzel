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

  const nextLockedTier = HINT_TIERS.find((tier) => !unlockedHints.includes(tier.id));
  const nextUnlockSeconds = nextLockedTier ? nextLockedTier.unlockMinutes * 60 : null;
  const remainingSeconds =
    nextUnlockSeconds !== null ? Math.max(0, nextUnlockSeconds - elapsedSeconds) : 0;

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeTier =
    HINT_TIERS.find((t) => t.id === selectedHintId && unlockedHints.includes(t.id)) ||
    HINT_TIERS.find((t) => t.id === unlockedHints[unlockedHints.length - 1]) ||
    HINT_TIERS[0];

  return (
    <div className="bg-mc-stone border-4 border-mc-stoneDark p-4 md:p-5 rounded-lg shadow-mc-inset text-white w-full">
      {/* Top Banner & Countdown Console */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-4 border-mc-stoneDark">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl sm:text-3xl">💤</span>
          <div>
            <h2 className="text-xs sm:text-sm md:text-base text-mc-gold uppercase tracking-wider font-minecraft">
              STEVE&apos;S ALARM CLOCK EMERGENCY!
            </h2>
            <p className="text-[10px] sm:text-xs text-mc-panel mt-0.5 font-minecraft">
              Snooze the screeching 6:00 AM Phantoms!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {nextLockedTier ? (
            <div className="bg-mc-dark px-3 py-1.5 rounded border-2 border-mc-stoneDark flex items-center gap-2">
              <span className="text-[10px] sm:text-xs text-mc-panel">NEXT HINT IN:</span>
              <span className="text-xs sm:text-sm font-mono text-mc-diamond font-bold">
                {formatCountdown(remainingSeconds)}
              </span>
            </div>
          ) : (
            <div className="bg-mc-dark px-3 py-1.5 rounded border-2 border-mc-emerald text-mc-emerald text-xs font-bold">
              ALL HINTS UNLOCKED
            </div>
          )}

          {nextLockedTier && (
            <button
              onClick={onUnlockNextHint}
              className="bg-mc-stoneDark hover:bg-mc-gold hover:text-black border-2 border-mc-panel text-white text-[10px] sm:text-xs px-2.5 py-1.5 rounded transition-colors font-bold"
              title="Unlock Next Hint Instantly"
            >
              + Unlock Hint
            </button>
          )}
        </div>
      </div>

      {/* Interactive Tabs for Unlocked Story & Hints */}
      <div className="flex flex-wrap gap-2 mb-4">
        {HINT_TIERS.map((tier) => {
          const isUnlocked = unlockedHints.includes(tier.id);
          const isSelected = activeTier.id === tier.id;

          return (
            <button
              key={tier.id}
              onClick={() => isUnlocked && setSelectedHintId(tier.id)}
              disabled={!isUnlocked}
              className={`
                px-3 py-2 rounded text-xs sm:text-sm font-minecraft border-2 transition-all duration-150
                ${
                  !isUnlocked
                    ? 'bg-mc-stoneDark/60 border-mc-stoneDark text-white/30 cursor-not-allowed'
                    : isSelected
                    ? 'bg-mc-gold border-white text-black shadow-lg font-bold scale-105'
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

      {/* Parchment-Style Story Scroll Box */}
      <div className="bg-[#1f1610] border-4 border-[#52361b] p-4 sm:p-5 rounded-lg shadow-inner flex flex-col justify-between">
        <div className="text-xs sm:text-sm md:text-base text-[#f5e6ca] leading-relaxed font-minecraft whitespace-pre-line border-l-4 border-mc-gold pl-3 sm:pl-4 my-1">
          {activeTier.text}
        </div>

        <div className="mt-4 pt-3 border-t-2 border-[#52361b] flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] sm:text-xs text-[#a88a64] font-minecraft">
            🐷 Piggy Barnaby says: &quot;Listen closely to every line!&quot;
          </span>

          <button
            onClick={() => onSpeakRiddle(activeTier.text)}
            className="bg-[#3e2716] hover:bg-mc-gold hover:text-black border-2 border-[#a88a64] px-4 py-2 rounded text-xs sm:text-sm text-mc-gold flex items-center gap-2 transition-all font-bold"
          >
            <span>🔊</span> Speak Story &amp; Riddle Aloud
          </button>
        </div>
      </div>
    </div>
  );
};
