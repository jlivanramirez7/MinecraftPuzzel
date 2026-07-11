import React from 'react';
import { BlockId } from '../types/game';

interface BlockIconProps {
  id: BlockId;
  size?: number | string;
  className?: string;
}

export const BlockIcon: React.FC<BlockIconProps> = ({ id, size = '100%', className = '' }) => {
  const renderSVG = () => {
    switch (id) {
      case 'gold_block':
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            {/* Base */}
            <rect x="0" y="0" width="16" height="16" fill="#FBC02D" />
            {/* Top highlight */}
            <rect x="0" y="0" width="16" height="2" fill="#FFF59D" />
            <rect x="0" y="0" width="2" height="16" fill="#FFF59D" />
            {/* Bottom shadow */}
            <rect x="0" y="14" width="16" height="2" fill="#F57F17" />
            <rect x="14" y="0" width="2" height="16" fill="#F57F17" />
            {/* Metallic Grid Pattern */}
            <rect x="3" y="3" width="4" height="4" fill="#FDD835" />
            <rect x="9" y="3" width="4" height="4" fill="#FFF59D" />
            <rect x="3" y="9" width="4" height="4" fill="#F57F17" />
            <rect x="9" y="9" width="4" height="4" fill="#FDD835" />
            <rect x="7" y="7" width="2" height="2" fill="#FFF9C4" />
          </svg>
        );

      case 'iron_block':
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            <rect x="0" y="0" width="16" height="16" fill="#CFD8DC" />
            {/* Edge highlights & shadows */}
            <rect x="0" y="0" width="16" height="2" fill="#FFFFFF" />
            <rect x="0" y="0" width="2" height="16" fill="#FFFFFF" />
            <rect x="0" y="14" width="16" height="2" fill="#90A4AE" />
            <rect x="14" y="0" width="2" height="16" fill="#90A4AE" />
            {/* Distinct corner rivets */}
            <rect x="2" y="2" width="3" height="3" fill="#90A4AE" />
            <rect x="3" y="3" width="1" height="1" fill="#455A64" />
            <rect x="11" y="2" width="3" height="3" fill="#90A4AE" />
            <rect x="12" y="3" width="1" height="1" fill="#455A64" />
            <rect x="2" y="11" width="3" height="3" fill="#90A4AE" />
            <rect x="3" y="12" width="1" height="1" fill="#455A64" />
            <rect x="11" y="11" width="3" height="3" fill="#90A4AE" />
            <rect x="12" y="12" width="1" height="1" fill="#455A64" />
            {/* Center sheen */}
            <rect x="6" y="6" width="4" height="4" fill="#ECEFF1" />
          </svg>
        );

      case 'oak_log':
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            {/* Dark bark border */}
            <rect x="0" y="0" width="16" height="16" fill="#3E2723" />
            {/* Wood grain inner face */}
            <rect x="2" y="2" width="12" height="12" fill="#8D6E63" />
            {/* Concentric rings */}
            <rect x="3" y="3" width="10" height="10" fill="#6D4C41" />
            <rect x="5" y="5" width="6" height="6" fill="#A1887F" />
            <rect x="6" y="6" width="4" height="4" fill="#5D4037" />
            <rect x="7" y="7" width="2" height="2" fill="#D7CCC8" />
          </svg>
        );

      case 'diamond':
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            <rect x="0" y="0" width="16" height="16" fill="#181e24" />
            {/* Glowing cyan crystal shape */}
            <path d="M8 2 L13 7 L8 14 L3 7 Z" fill="#00B8D4" />
            <path d="M8 2 L11 6 L8 12 L5 6 Z" fill="#00E5FF" />
            <path d="M8 2 L9 5 L8 10 L6 5 Z" fill="#84FFFF" />
            {/* Specular sparkle */}
            <rect x="7" y="5" width="2" height="2" fill="#FFFFFF" />
            <rect x="5" y="6" width="1" height="1" fill="#FFFFFF" />
          </svg>
        );

      case 'emerald':
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            <rect x="0" y="0" width="16" height="16" fill="#142217" />
            {/* Sharp gleaming emerald gemstone */}
            <polygon points="5,2 11,2 14,6 12,14 4,14 2,6" fill="#00C853" />
            <polygon points="6,3 10,3 12,6 10,12 6,12 4,6" fill="#00E676" />
            <polygon points="7,4 9,4 10,6 8,10 6,6" fill="#69F0AE" />
            {/* Gleam */}
            <rect x="5" y="5" width="2" height="2" fill="#FFFFFF" />
          </svg>
        );

      case 'redstone_block':
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            <rect x="0" y="0" width="16" height="16" fill="#8E0000" />
            <rect x="1" y="1" width="14" height="14" fill="#B71C1C" />
            <rect x="2" y="2" width="12" height="12" fill="#D50000" />
            {/* Glowing Red Dust Speckles */}
            <rect x="3" y="3" width="2" height="2" fill="#FF8A80" />
            <rect x="11" y="3" width="2" height="2" fill="#FF1744" />
            <rect x="6" y="7" width="4" height="3" fill="#FF8A80" />
            <rect x="3" y="11" width="3" height="2" fill="#FF1744" />
            <rect x="10" y="10" width="3" height="3" fill="#FF5252" />
            <rect x="7" y="8" width="2" height="1" fill="#FFFFFF" />
          </svg>
        );

      case 'obsidian':
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            {/* Deep purple & jet black volcanic texture */}
            <rect x="0" y="0" width="16" height="16" fill="#0D0814" />
            <rect x="1" y="1" width="14" height="14" fill="#1B1229" />
            {/* Volcanic stone blocks */}
            <rect x="2" y="2" width="5" height="5" fill="#241835" />
            <rect x="8" y="2" width="6" height="4" fill="#1B1229" />
            <rect x="2" y="8" width="6" height="6" fill="#1A1128" />
            <rect x="9" y="7" width="5" height="7" fill="#2D1E43" />
            {/* Glowing purple cracks */}
            <rect x="7" y="2" width="1" height="6" fill="#7E57C2" />
            <rect x="2" y="7" width="7" height="1" fill="#B388FF" />
            <rect x="8" y="6" width="6" height="1" fill="#673AB7" />
            <rect x="8" y="7" width="1" height="7" fill="#9575CD" />
          </svg>
        );

      case 'cobblestone':
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            <rect x="0" y="0" width="16" height="16" fill="#424242" />
            {/* Cobbled rock texture */}
            <rect x="1" y="1" width="6" height="5" fill="#757575" />
            <rect x="8" y="1" width="7" height="6" fill="#9E9E9E" />
            <rect x="1" y="7" width="8" height="8" fill="#616161" />
            <rect x="10" y="8" width="5" height="7" fill="#757575" />
            {/* Mortar shadows */}
            <rect x="7" y="1" width="1" height="6" fill="#212121" />
            <rect x="1" y="6" width="7" height="1" fill="#212121" />
            <rect x="9" y="7" width="6" height="1" fill="#212121" />
            <rect x="9" y="8" width="1" height="7" fill="#212121" />
          </svg>
        );

      case 'coal_block':
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            {/* Rough textured dull black block */}
            <rect x="0" y="0" width="16" height="16" fill="#11171A" />
            <rect x="1" y="1" width="14" height="14" fill="#263238" />
            {/* Coal chunks */}
            <rect x="2" y="2" width="5" height="6" fill="#37474F" />
            <rect x="8" y="2" width="6" height="5" fill="#1C262B" />
            <rect x="2" y="9" width="7" height="5" fill="#1E282D" />
            <rect x="10" y="8" width="4" height="6" fill="#37474F" />
            {/* Subtle dull highlights */}
            <rect x="3" y="3" width="2" height="2" fill="#455A64" />
            <rect x="11" y="9" width="2" height="2" fill="#546E7A" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-block select-none pointer-events-none drop-shadow-md ${className}`}
    >
      {renderSVG()}
    </div>
  );
};
