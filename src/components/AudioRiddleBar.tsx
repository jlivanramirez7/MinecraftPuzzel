import React from 'react';
import { HINT_TIERS } from '../data/riddle';
import { HintTierId } from '../types/game';

interface AudioRiddleBarProps {
  unlockedHints: HintTierId[];
  elapsedSeconds: number;
  onPlayAudio: (text: string, title: string) => void;
  onUnlockNextHint: () => void;
}

export const AudioRiddleBar: React.FC<AudioRiddleBarProps> = ({
  unlockedHints,
  elapsedSeconds,
  onPlayAudio,
  onUnlockNextHint,
}) => {
  const nextLockedTier = HINT_TIERS.find((tier) => !unlockedHints.includes(tier.id));
  const nextUnlockSeconds = nextLockedTier ? nextLockedTier.unlockMinutes * 60 : null;
  const remainingSeconds =
    nextUnlockSeconds !== null ? Math.max(0, nextUnlockSeconds - elapsedSeconds) : 0;

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-mc-stone border-4 border-mc-stoneDark p-3 sm:p-4 rounded-lg shadow-mc-inset text-white w-full">
      {/* Audio Clues Title & Timer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b-2 border-mc-stoneDark">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🎧</span>
          <div>
            <h3 className="text-xs sm:text-sm text-mc-gold uppercase tracking-wider font-minecraft font-bold">
              AUDIO CRAFTING CLUES
            </h3>
            <p className="text-[10px] text-mc-panel font-minecraft">
              Listen to Barnaby&apos;s clues to place your blocks!
            </p>
          </div>
        </div>

        {/* Live Countdown to Next Hint */}
        <div className="flex items-center gap-2">
          {nextLockedTier ? (
            <div className="bg-mc-dark px-3 py-1.5 rounded border-2 border-mc-stoneDark flex items-center gap-2">
              <span className="text-[10px] text-mc-panel font-minecraft">MORE HINTS IN:</span>
              <span className="text-xs sm:text-sm font-mono text-mc-diamond font-bold">
                {formatCountdown(remainingSeconds)}
              </span>
            </div>
          ) : (
            <div className="bg-mc-dark px-3 py-1.5 rounded border-2 border-mc-emerald text-mc-emerald text-[10px] sm:text-xs font-minecraft font-bold">
              ALL AUDIO HINTS UNLOCKED
            </div>
          )}

          {nextLockedTier && (
            <button
              onClick={onUnlockNextHint}
              className="bg-mc-stoneDark hover:bg-mc-gold hover:text-black border-2 border-mc-panel text-white text-[10px] px-2 py-1 rounded transition-colors font-bold font-minecraft"
              title="Unlock Next Audio Hint Instantly (For Party Organizers & Testers)"
            >
              + Unlock Hint
            </button>
          )}
        </div>
      </div>

      {/* Audio Play Buttons for Unlocked Clues */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {HINT_TIERS.map((tier) => {
          const isUnlocked = unlockedHints.includes(tier.id);

          return (
            <button
              key={tier.id}
              onClick={() => isUnlocked && onPlayAudio(tier.text, tier.title)}
              disabled={!isUnlocked}
              className={`
                flex items-center gap-2 px-3.5 py-2 rounded text-xs sm:text-sm font-minecraft border-2 transition-all duration-150
                ${
                  !isUnlocked
                    ? 'bg-mc-stoneDark/40 border-mc-stoneDark text-white/30 cursor-not-allowed'
                    : 'bg-mc-stoneDark border-mc-gold text-mc-gold hover:bg-mc-gold hover:text-black shadow font-bold hover:scale-105 active:scale-95'
                }
              `}
            >
              <span>{isUnlocked ? '🔊' : '🔒'}</span>
              <span>{tier.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
