import React from 'react';

interface VillagerChatBubbleProps {
  mockQuote: string | null;
  onDismiss: () => void;
}

export const VillagerChatBubble: React.FC<VillagerChatBubbleProps> = ({
  mockQuote,
  onDismiss,
}) => {
  if (!mockQuote) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm sm:max-w-md animate-bounce-once">
      <div className="bg-mc-stoneDark border-4 border-mc-gold rounded-lg p-4 shadow-2xl flex items-start gap-3 text-white">
        {/* Minecraft Villager Head Pixel Art */}
        <div className="w-12 h-12 flex-shrink-0 bg-mc-dirtDark border-2 border-mc-dirt rounded flex items-center justify-center relative">
          <svg viewBox="0 0 16 16" className="w-10 h-10">
            {/* Head base */}
            <rect x="2" y="1" width="12" height="12" fill="#BCAAA4" />
            {/* Brow */}
            <rect x="2" y="4" width="12" height="2" fill="#4E342E" />
            {/* Eyes */}
            <rect x="4" y="6" width="2" height="2" fill="#FFFFFF" />
            <rect x="5" y="6" width="1" height="2" fill="#2E7D32" />
            <rect x="10" y="6" width="2" height="2" fill="#FFFFFF" />
            <rect x="10" y="6" width="1" height="2" fill="#2E7D32" />
            {/* Nose */}
            <rect x="7" y="7" width="2" height="4" fill="#8D6E63" />
            {/* Mouth */}
            <rect x="6" y="11" width="4" height="1" fill="#4E342E" />
          </svg>
        </div>

        {/* Speech Text */}
        <div className="flex-1">
          <div className="text-[10px] text-mc-gold uppercase tracking-wider mb-1 font-minecraft">
            Master Crafter Villager says:
          </div>
          <div className="text-xs sm:text-sm font-minecraft text-white leading-relaxed">
            "{mockQuote}"
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="text-mc-panel hover:text-white text-base leading-none p-1"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
