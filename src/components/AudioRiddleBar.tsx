import React from 'react';
import { HINT_TIERS } from '../data/riddle';
import { HintTierId } from '../types/game';

interface AudioRiddleBarProps {
  unlockedHints: HintTierId[];
  elapsedSeconds: number;
  onPlayAudio: (text: string, title: string) => void;
  onListenToRiddle: () => void;
  isOnCooldown: boolean;
  cooldownRemainingSeconds: number;
}

export const AudioRiddleBar: React.FC<AudioRiddleBarProps> = ({
  unlockedHints,
  elapsedSeconds,
  onPlayAudio,
  onListenToRiddle,
  isOnCooldown,
  cooldownRemainingSeconds,
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
    <div className="bg-mc-stone border-4 border-mc-stoneDark p-3 sm:p-4 rounded-lg shadow-mc-inset text-white w-full font-minecraft">
      {/* Audio Clues Title & Timer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b-2 border-mc-stoneDark">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🎧</span>
          <div>
            <h3 className="text-xs sm:text-sm text-mc-gold uppercase tracking-wider font-bold">
              AUDIO CRAFTING CLUES
            </h3>
            <p className="text-[10px] text-mc-panel">
              Listen to Barnaby&apos;s clues to place your blocks!
            </p>
          </div>
        </div>

        {/* Live Countdown to Next Hint (No manual unlock button) */}
        <div className="flex items-center gap-2">
          {nextLockedTier ? (
            <div className="bg-mc-dark px-3 py-1.5 rounded border-2 border-mc-stoneDark flex items-center gap-2">
              <span className="text-[10px] text-mc-panel">MORE HINTS IN:</span>
              <span className="text-xs sm:text-sm font-mono text-mc-diamond font-bold">
                {formatCountdown(remainingSeconds)}
              </span>
            </div>
          ) : (
            <div className="bg-mc-dark px-3 py-1.5 rounded border-2 border-mc-emerald text-mc-emerald text-[10px] sm:text-xs font-bold">
              ALL AUDIO HINTS UNLOCKED
            </div>
          )}
        </div>
      </div>

      {/* Audio Play Buttons for Unlocked Clues */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {HINT_TIERS.map((tier) => {
          const isUnlocked = unlockedHints.includes(tier.id);
          const isBaseRiddle = tier.id === 'base';

          if (isBaseRiddle) {
            // The Base Riddle button in the clues bar shares the exact 5-min cooldown with the top button
            return (
              <button
                key={tier.id}
                onClick={onListenToRiddle}
                className={`
                  flex items-center gap-2 px-3.5 py-2 rounded text-xs sm:text-sm border-2 transition-all duration-150 font-bold shadow
                  ${
                    isOnCooldown
                      ? 'bg-mc-stoneDark/70 border-mc-panel text-white/60 hover:border-mc-redstone'
                      : 'bg-mc-gold text-black border-mc-stoneDark hover:bg-white hover:scale-105 active:scale-95'
                  }
                `}
                title={
                  isOnCooldown
                    ? `Riddle recharging! Ready in ${formatCountdown(cooldownRemainingSeconds)}`
                    : 'Speak The Riddle Aloud (5-Minute Recharging Cooldown)'
                }
              >
                <span>{isOnCooldown ? '⏳' : '🔊'}</span>
                <span>
                  {isOnCooldown
                    ? `THE RIDDLE (RECHARGING ${formatCountdown(cooldownRemainingSeconds)})`
                    : tier.title}
                </span>
              </button>
            );
          }

          // Unlocked hints (hint1, hint2, solution) can be listened to over and over again with no cooldown!
          return (
            <button
              key={tier.id}
              onClick={() => isUnlocked && onPlayAudio(tier.text, tier.title)}
              disabled={!isUnlocked}
              className={`
                flex items-center gap-2 px-3.5 py-2 rounded text-xs sm:text-sm border-2 transition-all duration-150 font-bold
                ${
                  !isUnlocked
                    ? 'bg-mc-stoneDark/40 border-mc-stoneDark text-white/30 cursor-not-allowed'
                    : 'bg-mc-stoneDark border-mc-gold text-mc-gold hover:bg-mc-gold hover:text-black shadow hover:scale-105 active:scale-95'
                }
              `}
              title={
                isUnlocked
                  ? `Click to listen to ${tier.title} as many times as you want!`
                  : `Locked until ${tier.unlockMinutes} minutes of gameplay`
              }
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
