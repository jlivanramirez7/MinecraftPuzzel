import React from 'react';
import { BLOCKS } from '../data/blocks';
import { BlockId } from '../types/game';
import { BlockIcon } from './BlockIcon';

interface InventoryHotbarProps {
  selectedBlockId: BlockId | null;
  onSelectBlock: (blockId: BlockId) => void;
}

export const InventoryHotbar: React.FC<InventoryHotbarProps> = ({
  selectedBlockId,
  onSelectBlock,
}) => {
  return (
    <div className="bg-mc-stoneDark border-4 border-mc-stone p-3 rounded-lg shadow-mc-inset w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-xs md:text-sm uppercase tracking-wider text-mc-gold drop-shadow">
          Block Inventory (Hotbar)
        </h3>
        <span className="text-[10px] md:text-xs text-mc-panel font-mono">
          Tap block to select • Tap grid to place
        </span>
      </div>

      {/* 9 Blocks Grid: 3 columns on small screens, 9 columns on tablet/desktop */}
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
        {BLOCKS.map((block) => {
          const isSelected = selectedBlockId === block.id;

          return (
            <div
              key={block.id}
              onClick={() => onSelectBlock(block.id)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', block.id);
                onSelectBlock(block.id);
              }}
              className={`
                relative group flex flex-col items-center justify-center p-2 rounded cursor-pointer transition-all duration-150 no-select
                ${
                  isSelected
                    ? 'bg-mc-stoneLight border-4 border-mc-gold selected-slot-glow scale-105 z-10'
                    : 'bg-mc-stone border-4 border-mc-stoneDark hover:border-mc-panel active:scale-95 shadow-mc-slot'
                }
              `}
              title={`${block.name}: ${block.description}`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center mb-1">
                <BlockIcon id={block.id} size="100%" />
              </div>
              <span className="text-[9px] md:text-[10px] text-center font-minecraft leading-tight truncate w-full px-0.5 text-white drop-shadow">
                {block.name.replace(' Block', '')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
