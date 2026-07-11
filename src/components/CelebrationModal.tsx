import React from 'react';

interface CelebrationModalProps {
  isOpen: boolean;
  onReset: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-4 animate-fade-in overflow-y-auto">
      <div className="bg-mc-stoneDark border-8 border-mc-gold rounded-xl p-5 sm:p-8 md:p-10 max-w-3xl w-full text-center shadow-2xl relative overflow-hidden my-auto">
        {/* Glowing Background Ray effect */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-mc-gold/20 rounded-full blur-3xl pointer-events-none" />

        {/* Flashing Massive Achievement Header */}
        <div className="bg-mc-dark border-4 border-mc-gold px-4 py-3 sm:py-4 rounded-lg mb-5 shadow-lg">
          <p className="text-mc-gold text-[10px] sm:text-xs tracking-widest uppercase mb-1 font-minecraft">
            ★ ★ BIRTHDAY PUZZLE 1 OF 4 SOLVED ★ ★
          </p>
          <h1 className="text-sm sm:text-lg md:text-2xl font-minecraft text-white leading-tight">
            LEGENDARY BIRTHDAY CROWN CRAFTED!
          </h1>
        </div>

        {/* Story Resolution Text */}
        <p className="text-xs sm:text-sm text-mc-panel leading-relaxed mb-6 font-minecraft">
          Happy Birthday! You have successfully forged the Legendary Gamer Crown! Inside the royal crown chest,
          you discover a glowing ancient cipher shard...
        </p>

        {/* --- SECRET LORE REVEAL: LETTER Q --- */}
        <div className="bg-[#1a1126] border-4 border-mc-diamond rounded-xl p-4 sm:p-6 mb-6 shadow-2xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mc-diamond text-black font-minecraft text-[10px] sm:text-xs px-3 py-1 rounded font-bold uppercase tracking-wider shadow">
            SECRET CIPHER REVEALED
          </div>

          <p className="text-xs sm:text-sm text-mc-gold font-minecraft mt-2 mb-3">
            Your Secret Birthday Letter Clue:
          </p>

          {/* Glowing Mystery Letter Emblem [ Q ] */}
          <div className="bg-mc-dark border-4 border-mc-gold rounded-lg w-28 h-28 sm:w-36 sm:h-36 mx-auto flex flex-col items-center justify-center shadow-2xl relative group animate-pulse">
            <span className="text-5xl sm:text-7xl font-minecraft text-mc-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.95)]">
              Q
            </span>
            <span className="text-[9px] sm:text-[10px] text-mc-diamond font-mono mt-1 uppercase tracking-widest font-bold">
              LETTER 1 OF 4
            </span>
          </div>

          {/* Treasure Hunt Clue Instruction */}
          <div className="mt-4 bg-mc-dark/80 border-2 border-mc-gold/60 p-3 rounded text-left sm:text-center">
            <p className="text-xs sm:text-sm text-white font-minecraft leading-relaxed">
              📝 <span className="text-mc-gold font-bold">TREASURE HUNT INSTRUCTION:</span><br />
              Write down the letter <span className="text-mc-gold underline font-bold">Q</span> on your Secret Clue Sheet!
              Collect all 4 puzzle letters to reveal your final Birthday Treasure!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onReset}
            className="bg-mc-gold hover:bg-white text-black font-minecraft text-xs sm:text-sm px-6 py-3.5 rounded border-4 border-mc-stoneDark shadow-mc-button hover:scale-105 active:scale-95 transition-all font-bold"
          >
            🕹️ CRAFT AGAIN (RESET)
          </button>
        </div>
      </div>
    </div>
  );
};
