import { BlockId, HintTier } from '../types/game';

export const WINNING_RECIPE: BlockId[] = [
  'gold_block',     'gold_block',      'gold_block',
  'gold_block',     'diamond',         'gold_block',
  'obsidian',       'redstone_block',  'obsidian',
];

export const HINT_TIERS: HintTier[] = [
  {
    id: 'base',
    title: 'Base Riddle',
    unlockMinutes: 0,
    text: 'To forge the crown of the ultimate gamer, a sparkling blue Diamond must rest at the very center of your creation. Surround its sides with walls of solid Gold, but secure the bottom corners with blocks of dark Obsidian.',
  },
  {
    id: 'hint1',
    title: 'Hint 1 (10 Min)',
    unlockMinutes: 10,
    text: 'The top row is completely empty of danger—it is lined entirely with precious Gold blocks!',
  },
  {
    id: 'hint2',
    title: 'Hint 2 (20 Min)',
    unlockMinutes: 20,
    text: 'To power the crown, a bright red block of Redstone must sit directly below the Diamond, at the bottom-middle of the grid.',
  },
  {
    id: 'solution',
    title: 'Final Solution (30 Min+)',
    unlockMinutes: 30,
    text: 'Here is the exact blueprint:\n• Top Row: Gold, Gold, Gold\n• Middle Row: Gold, Diamond, Gold\n• Bottom Row: Obsidian, Redstone, Obsidian',
  },
];

export const MOCK_QUOTES: string[] = [
  "A zombie has better crafting skills than this!",
  "Are you sure you didn't mean to craft a block of dirt?",
  "Oof! Even a baby sheep could craft better than that.",
  "Did a Creeper blow up your brain? Try again!",
  "My grandmother crafts diamond swords faster than this!",
];
