import React from 'react';
import { BLOCK_MAP } from '../data/blocks';
import { BlockId, GridState } from '../types/game';
import { BlockIcon } from './BlockIcon';

interface CraftingGridProps {
  gridState: GridState;
  selectedBlockId: BlockId | null;
  onSlotClick: (index: number) => void;
  onSlotDrop: (index: number, blockId: BlockId) => void;
}

export const CraftingGrid: React.FC<CraftingGridProps> = ({
  gridState,
  selectedBlockId,
  onSlotClick,
  onSlotDrop,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData('text/plain') as BlockId;
    if (blockId && BLOCK_MAP[blockId]) {
      onSlotDrop(index, blockId);
    }
  };

  return (
    <div className="bg-mc-panel border-4 border-mc-panelDark p-4 sm:p-6 rounded-lg shadow-mc-panel flex flex-col md:flex-row items-center justify-center gap-6 no-select">
      {/* 3x3 Crafting Grid */}
      <div className="flex flex-col items-center">
        <div className="text-xs sm:text-sm text-mc-stoneDark mb-2 font-minecraft tracking-wider font-bold">
          CRAFTING TABLE (3x3)
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-mc-stoneDark p-3 sm:p-4 rounded border-4 border-mc-stone shadow-mc-slot">
          {gridState.map((blockId, index) => {
            const block = blockId ? BLOCK_MAP[blockId] : null;

            return (
              <div
                key={index}
                onClick={() => onSlotClick(index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded flex flex-col items-center justify-center cursor-pointer transition-all duration-100 relative
                  ${
                    block
                      ? 'bg-mc-stoneLight border-4 border-mc-stoneDark hover:border-mc-gold active:scale-95'
                      : 'bg-mc-stone border-4 border-mc-stoneDark hover:bg-mc-stoneLight/30 active:bg-mc-stoneLight/50 shadow-mc-slot'
                  }
                `}
                title={
                  block
                    ? `${block.name} (Tap to ${selectedBlockId ? 'replace' : 'remove'})`
                    : 'Empty Slot (Tap to place selected block)'
                }
              >
                {/* Slot index helper */}
                <span className="absolute top-1 left-1.5 text-[9px] sm:text-[10px] text-white/50 font-mono font-bold">
                  {index + 1}
                </span>

                {block ? (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <BlockIcon id={block.id} size="100%" />
                  </div>
                ) : selectedBlockId ? (
                  <div className="w-10 h-10 opacity-20 flex items-center justify-center">
                    <BlockIcon id={selectedBlockId} size="100%" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Crafting Arrow */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-14 h-10 sm:w-16 sm:h-12 flex items-center justify-center bg-mc-stoneDark border-2 border-mc-stone rounded shadow-mc-slot">
          <svg viewBox="0 0 24 16" className="w-10 h-8 text-mc-gold fill-current">
            <path d="M0 6h16V2l8 6-8 6v-4H0z" />
          </svg>
        </div>
      </div>

      {/* Output / Alarm Clock Preview Slot */}
      <div className="flex flex-col items-center">
        <div className="text-xs sm:text-sm text-mc-stoneDark mb-2 font-minecraft tracking-wider font-bold">
          RESULT
        </div>
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-mc-stoneDark p-3 rounded border-4 border-mc-stone shadow-mc-slot flex flex-col items-center justify-center relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center animate-pulse">
            {/* Phantom-Slayer Snooze Button Alarm Clock Icon */}
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md">
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
          <span className="text-[9px] sm:text-[10px] text-mc-gold font-minecraft mt-1 text-center font-bold">
            SNOOZE ALARM
          </span>
        </div>
      </div>
    </div>
  );
};
