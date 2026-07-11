export type BlockId =
  | 'gold_block'
  | 'iron_block'
  | 'oak_log'
  | 'diamond'
  | 'emerald'
  | 'redstone_block'
  | 'obsidian'
  | 'cobblestone'
  | 'coal_block';

export interface BlockItem {
  id: BlockId;
  name: string;
  theme: string;
  description: string;
  color: string;
  borderColor: string;
}

export type GridState = (BlockId | null)[];

export type HintTierId = 'base' | 'hint1' | 'hint2' | 'solution';

export interface HintTier {
  id: HintTierId;
  title: string;
  unlockMinutes: number;
  text: string;
}

export interface GameState {
  craftingGrid: GridState;
  puzzleStartTime: number;
  unlockedHints: HintTierId[];
  puzzleIsSolved: boolean;
  isAudioMuted: boolean;
  selectedBlockId: BlockId | null;
}
