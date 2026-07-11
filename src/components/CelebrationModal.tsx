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

        {/* Phantom-Slayer Snooze Button Alarm Clock Icon */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 flex items-center justify-center animate-bounce">
          <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-2xl">
            {/* Wooden & Gold Outer Frame */}
            <rect x="4" y="8" width="24" height="20" rx="3" fill="#6D4C41" stroke="#3E2723" strokeWidth="2" />
            <rect x="6" y="10" width="20" height="16" rx="2" fill="#FDD835" />
            {/* Ticking Clock Face */}
            <circle cx="16" cy="18" r="6" fill="#181E24" stroke="#00E5FF" strokeWidth="1.5" />
            <line x1="16" y1="18" x2="16" y2="14" stroke="#FF1744" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="18" x2="19" y2="18" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            {/* Emerald Snooze Button on Top */}
            <polygon points="12,4 20,4 22,8 10,8" fill="#00E676" stroke="#1B5E20" strokeWidth="1.2" />
            {/* Obsidian Volcanic Feet */}
            <rect x="6" y="28" width="5" height="3" fill="#1B1229" />
            <rect x="21" y="28" width="5" height="3" fill="#1B1229" />
          </svg>
        </div>

        {/* Flashing Massive Achievement Banner */}
        <div className="bg-mc-dark border-4 border-mc-gold px-4 py-3 sm:py-4 rounded-lg mb-6 shadow-lg">
          <p className="text-mc-gold text-[10px] sm:text-xs tracking-widest uppercase mb-1">
            ★ ★ ACHIEVEMENT UNLOCKED ★ ★
          </p>
          <h1 className="text-base sm:text-xl md:text-2xl font-minecraft text-white leading-tight animate-pulse">
            PHANTOM-SLAYER SNOOZE BUTTON!
          </h1>
        </div>

        {/* Celebration Text */}
        <p className="text-xs sm:text-sm text-mc-panel leading-relaxed mb-8 font-minecraft">
          Happy Birthday! Steve slams the Emerald snooze button! The screeching 6:00 AM Phantoms vanish
          instantly from the sky, and Steve can finally get his beauty sleep!
          Piggy Barnaby oinks in triumph!
        </p>

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
