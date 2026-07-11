import React from 'react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-mc-stoneDark border-8 border-mc-gold rounded-xl p-6 md:p-8 max-w-lg w-full text-left shadow-2xl relative text-white font-minecraft">
        {/* Title Bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-4 border-mc-stone">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <h2 className="text-sm sm:text-base text-mc-gold uppercase tracking-wider font-bold">
              HOW TO PLAY (INSTRUCTIONS)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-mc-panel hover:text-white text-lg p-1 font-bold"
            title="Close Instructions"
          >
            ✕
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-mc-panel">
          <div className="bg-mc-dark p-3 rounded border-2 border-mc-stone">
            <span className="text-mc-gold font-bold">1. 🔊 LISTEN TO THE RIDDLE</span>
            <p className="mt-1 text-[11px] sm:text-xs">
              Press the <span className="text-white font-bold">LISTEN TO RIDDLE</span> button at the top!
              The audio riddle tells you which 5 Minecraft blocks forge the Legendary Birthday Crown.
            </p>
          </div>

          <div className="bg-mc-dark p-3 rounded border-2 border-mc-stone">
            <span className="text-mc-gold font-bold">2. 🕹️ TAP TO PLACE BLOCKS</span>
            <p className="mt-1 text-[11px] sm:text-xs">
              • <span className="text-white font-bold">SELECT</span>: Tap any block in your left Block Inventory (highlights yellow).<br />
              • <span className="text-white font-bold">PLACE</span>: Tap any empty slot on the 3x3 Crafting Table to place it.<br />
              • <span className="text-white font-bold">REMOVE</span>: Tap a slot on the table without selecting an item to clear it.
            </p>
          </div>

          <div className="bg-mc-dark p-3 rounded border-2 border-mc-stone">
            <span className="text-mc-gold font-bold">3. ⏱️ MORE HINTS AS TIME PASSES</span>
            <p className="mt-1 text-[11px] sm:text-xs">
              If you get stuck, don&apos;t worry! New audio hints automatically unlock over time to make the recipe clearer!
            </p>
          </div>

          <div className="bg-mc-dark p-3 rounded border-2 border-mc-stone">
            <span className="text-mc-gold font-bold">4. ⚡ CRAFT &amp; REVEAL YOUR CLUE</span>
            <p className="mt-1 text-[11px] sm:text-xs">
              When your 3x3 table looks right, tap <span className="text-mc-gold font-bold">CRAFT RECIPE!</span> to forge the crown and reveal your secret birthday letter!
            </p>
          </div>
        </div>

        {/* Got It Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-mc-gold hover:bg-white text-black font-bold px-8 py-3 rounded border-4 border-mc-stoneDark shadow-mc-button hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm"
          >
            👍 GOT IT, LET&apos;S CRAFT!
          </button>
        </div>
      </div>
    </div>
  );
};
