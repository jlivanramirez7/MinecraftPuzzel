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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-mc-stoneDark border-8 border-mc-gold rounded-xl p-6 md:p-10 max-w-2xl w-full text-center shadow-2xl relative overflow-hidden">
        {/* Glowing Background Ray effect */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-mc-gold/10 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy / Golden Gamer Crown Icon */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 flex items-center justify-center animate-bounce">
          <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-2xl">
            {/* Crown silhouette */}
            <polygon
              points="3,25 29,25 27,9 20,18 16,7 12,18 5,9"
              fill="#FFD700"
              stroke="#F57F17"
              strokeWidth="2"
            />
            {/* Center Diamond Gem */}
            <polygon points="16,16 19,19 16,22 13,19" fill="#00E5FF" />
            {/* Side Redstone Gems */}
            <rect x="7" y="19" width="3" height="3" fill="#FF1744" />
            <rect x="22" y="19" width="3" height="3" fill="#FF1744" />
            {/* Top Stars */}
            <rect x="15" y="3" width="2" height="2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Flashing Massive Achievement Banner */}
        <div className="bg-mc-dark border-4 border-mc-gold px-4 py-3 sm:py-4 rounded-lg mb-6 shadow-lg">
          <p className="text-mc-gold text-[10px] sm:text-xs tracking-widest uppercase mb-1">
            ★ ★ ACHIEVEMENT UNLOCKED ★ ★
          </p>
          <h1 className="text-base sm:text-xl md:text-2xl font-minecraft text-white leading-tight animate-pulse">
            BIRTHDAY MASTER CRAFTER!
          </h1>
        </div>

        {/* Celebration Text */}
        <p className="text-xs sm:text-sm text-mc-panel leading-relaxed mb-8 font-minecraft">
          Happy Birthday! You have successfully crafted the Legendary Crown of the Ultimate Gamer!
          The Diamond centerpiece shines bright above Gold walls and an Obsidian-Redstone foundation!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onReset}
            className="bg-mc-gold hover:bg-white text-black font-minecraft text-xs sm:text-sm px-6 py-3.5 rounded border-4 border-mc-stoneDark shadow-mc-button hover:scale-105 active:scale-95 transition-all"
          >
            🕹️ CRAFT AGAIN (RESET)
          </button>
        </div>
      </div>
    </div>
  );
};
