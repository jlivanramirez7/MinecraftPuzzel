import { BlockId, HintTier } from '../types/game';

// The Phantom-Slayer Snooze Button Blueprint (5 unique block types!)
export const WINNING_RECIPE: BlockId[] = [
  'oak_log',        'gold_block',      'oak_log',
  'redstone_block', 'diamond',         'redstone_block',
  'obsidian',       'emerald',         'obsidian',
];

export const HINT_TIERS: HintTier[] = [
  {
    id: 'base',
    title: '📜 Base Riddle (Poem)',
    unlockMinutes: 0,
    text: `💤 STEVE'S ALARM CLOCK EMERGENCY!
Steve is tired. Extremely tired. A flock of screeching Phantoms has been dive-bombing his roof every morning at 6:00 AM. In a fit of sleep-deprived madness, Steve decided to craft 'The Phantom-Slayer Snooze Button'—an alarm clock so powerful it mutes the entire sky.

Unfortunately, Steve drank a weird potion and forgot the recipe. The only clue left is this poem scribbled by his pet pig, Barnaby, who stepped in some ink:

📜 THE RIDDLE OF THE SCREECHING SKIES:
"To stand against the morning screeches, the clock needs heavy feet.
Two blocks of fiery volcanic glass anchor the bottom edges neat.
Right between those heavy feet, a shiny green gem must rest—
The ultimate snooze button to put the snoring sky to test!

The heart of the clock must tick-tock with a miner’s ultimate prize,
Flanked on its left and right by red, buzzing energy that flies.

To frame the roof against the rain, use wood from the forest trees
In the high corners, smelling fresh of the morning breeze.
But in the top-center sits a solid block of gold—
Because Steve wants to look incredibly rich, or so I have been told!"`,
  },
  {
    id: 'hint1',
    title: '🐷 Piggy Hint (10 Min)',
    unlockMinutes: 10,
    text: `Oink! Barnaby the pig leaves a muddy hoofprint on the blueprint:

"The corners of this machine are symmetrical! The top-left and top-right are chopped wood (Oak Logs), but the bottom-left and bottom-right are fiery black glass (Obsidian)!"`,
  },
  {
    id: 'hint2',
    title: '🧑‍🌾 Villager Gossip (20 Min)',
    unlockMinutes: 20,
    text: `Hrrrrmmm. A local librarian villager wanders by:

"That middle row is a Redstone sandwich! Two glowing red slices of Redstone bread on the sides, and a sparkling blue Diamond filling in the dead center! For 64 emeralds I'll tell you the rest... no? Hrmm."`,
  },
  {
    id: 'solution',
    title: '💀 Snooze Alarm (30 Min+)',
    unlockMinutes: 30,
    text: `Okay, the Phantoms are literally breaking through the windows. Here is the exact cheat-code blueprint to save Steve's ears:

• Top Row: Oak Log, Gold Block, Oak Log
• Middle Row: Redstone, Diamond, Redstone
• Bottom Row: Obsidian, Emerald, Obsidian`,
  },
];

export const MOCK_QUOTES: string[] = [
  "Oof! A blind Creeper could craft better than that!",
  "Did a zombie eat your brain for breakfast? Try again!",
  "Are you trying to mute the Phantoms or are you trying to craft a giant potato?",
  "My pet pig Barnaby literally has better hand-eye coordination than this.",
  "Steve just got pecked by a Phantom because of that recipe. Nice going!",
];
