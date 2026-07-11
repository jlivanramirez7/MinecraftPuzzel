import { BlockId, BlockItem } from '../types/game';

export const BLOCKS: BlockItem[] = [
  {
    id: 'gold_block',
    name: 'Gold Block',
    theme: 'Radiant Golden Yellow',
    description: 'Pixelated metallic gold grid texture',
    color: '#FDD835',
    borderColor: '#F57F17',
  },
  {
    id: 'iron_block',
    name: 'Iron Block',
    theme: 'White & Light Steel Gray',
    description: 'Light gray block with distinct iron corner rivets',
    color: '#ECEFF1',
    borderColor: '#90A4AE',
  },
  {
    id: 'oak_log',
    name: 'Oak Log',
    theme: 'Brown & concentric rings',
    description: 'Wood grain ring texture with dark bark borders',
    color: '#795548',
    borderColor: '#3E2723',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    theme: 'Bright Aqua Cyan',
    description: 'A glowing cyan crystal shape',
    color: '#00E5FF',
    borderColor: '#00838F',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    theme: 'Vivid Forest Green',
    description: 'A sharp, gleaming green gemstone shape',
    color: '#00E676',
    borderColor: '#1B5E20',
  },
  {
    id: 'redstone_block',
    name: 'Redstone Block',
    theme: 'Glowing Ruby Red',
    description: 'A dark red block with glowing red dust speckles',
    color: '#FF1744',
    borderColor: '#B71C1C',
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    theme: 'Deep Purple & Jet Black',
    description: 'A cracked dark purple and black volcanic stone texture',
    color: '#311B4B',
    borderColor: '#0D0814',
  },
  {
    id: 'cobblestone',
    name: 'Cobblestone',
    theme: 'Medium Stone Gray',
    description: 'A classic cobbled-rock textured square',
    color: '#757575',
    borderColor: '#424242',
  },
  {
    id: 'coal_block',
    name: 'Coal Block',
    theme: 'Dark Charcoal Gray',
    description: 'A rough-textured, dull black block',
    color: '#263238',
    borderColor: '#11171A',
  },
];

export const BLOCK_MAP: Record<BlockId, BlockItem> = BLOCKS.reduce((acc, block) => {
  acc[block.id] = block;
  return acc;
}, {} as Record<BlockId, BlockItem>);
