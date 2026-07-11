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
    <div className="bg-mc-panel border-4 border-mc-panelDark p-4 md:p-6 rounded-lg shadow-mc-panel flex flex-col md:flex-row items-center justify-center gap-6 no-select">
      {/* 3x3 Crafting Grid */}
      <div className="flex flex-col items-center">
        <div className="text-xs md:text-sm text-mc-stoneDark mb-2 font-minecraft tracking-wider">
          CRAFTING TABLE (3x3)
        </div>
        <div className="grid grid-cols-3 gap-2 bg-mc-stoneDark p-3 rounded border-4 border-mc-stone shadow-mc-slot">
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
                {/* Slot index overlay for accessibility/kids */}
                <span className="absolute top-1 left-1.5 text-[9px] text-white/40 font-mono">
                  {index + 1}
                </span>

                {block ? (
                  <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <BlockIcon id={block.id} size="100%" />
                  </div>
                ) : selectedBlockId ? (
                  <div className="w-8 h-8 opacity-20 flex items-center justify-center">
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
        <div className="w-12 h-8 md:w-16 md:h-10 flex items-center justify-center bg-mc-stoneDark border-2 border-mc-stone rounded shadow-mc-slot">
          <svg viewBox="0 0 24 16" className="w-8 h-6 text-mc-gold fill-current">
            <path d="M0 6h16V2l8 6-8 6v-4H0z" />
          </svg>
        </div>
      </div>

      {/* Output / Crown Target Slot */}
      <div className="flex flex-col items-center">
        <div className="text-xs md:text-sm text-mc-stoneDark mb-2 font-minecraft tracking-wider">
          RESULT
        </div>
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-mc-stoneDark p-2 rounded border-4 border-mc-stone shadow-mc-slot flex flex-col items-center justify-center relative">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center animate-pulse">
            {/* Mystery Crown Silhouette / Golden Gamer Crown Icon */}
            <svg viewBox="0 0 32 32" className="w-full h-full">
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
            </svg>
          </div>
          <span className="text-[9px] sm:text-[10px] text-mc-gold font-minecraft mt-1 text-center">
            GAMER CROWN
          </span>
        </div>
      </div>
    </div>
  );
};
