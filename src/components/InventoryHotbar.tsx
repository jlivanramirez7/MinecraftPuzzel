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
    <div className="bg-mc-stoneDark border-4 border-mc-stone p-4 rounded-lg shadow-mc-inset w-full h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col mb-3 pb-2 border-b-2 border-mc-stone">
          <h3 className="text-xs sm:text-sm uppercase tracking-wider text-mc-gold drop-shadow font-minecraft font-bold">
            🧱 BLOCK INVENTORY
          </h3>
          <span className="text-[10px] sm:text-xs text-mc-panel font-minecraft mt-1">
            Tap any block to select it (yellow outline)
          </span>
        </div>

        {/* 9 Blocks in a crisp 3x3 Grid on the Left */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
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
                  relative group flex flex-col items-center justify-center p-2.5 sm:p-3 rounded cursor-pointer transition-all duration-150 no-select
                  ${
                    isSelected
                      ? 'bg-mc-stoneLight border-4 border-mc-gold selected-slot-glow scale-105 z-10'
                      : 'bg-mc-stone border-4 border-mc-stoneDark hover:border-mc-panel active:scale-95 shadow-mc-slot'
                  }
                `}
                title={`${block.name}: ${block.description}`}
              >
                <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 flex items-center justify-center mb-1.5">
                  <BlockIcon id={block.id} size="100%" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-center font-minecraft leading-tight truncate w-full px-0.5 text-white drop-shadow font-bold">
                  {block.name.replace(' Block', '')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected block indicator info */}
      <div className="mt-4 pt-2.5 border-t-2 border-mc-stone text-[10px] sm:text-xs font-minecraft">
        {selectedBlockId ? (
          <div className="flex items-center justify-between text-mc-gold">
            <span>SELECTED:</span>
            <span className="font-bold uppercase">
              {BLOCKS.find((b) => b.id === selectedBlockId)?.name}
            </span>
          </div>
        ) : (
          <div className="text-mc-panel/70 text-center">
            No block selected (Tapping grid clears slot)
          </div>
        )}
      </div>
    </div>
  );
};
