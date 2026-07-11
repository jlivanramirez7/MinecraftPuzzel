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
    title: '📜 The Riddle',
    unlockMinutes: 0,
    text: `Where morning screeches fill the sky, a timbered canopy holds high,
With gleaming yellow wealth crowned proud between the branches dry.

Below that roof, the ticking core burns with a frost-blue crystal spark,
Guarded on either side by crimson dust that hums across the dark.

To anchor down this sky-ward clock against the Phantom storm,
Twin dark volcanic pillars keep the bottom edges uniform.
And rested 'twixt those midnight stones, the emerald snooze awaits—
Strike down upon the forest gem to seal the screeches' fates!`,
  },
  {
    id: 'hint1',
    title: '🐷 Piggy Hint (10 Min)',
    unlockMinutes: 10,
    text: `Barnaby the pig leaves a muddy hoofprint on the blueprint: The corners of this machine are symmetrical! The top-left and top-right are chopped wood (Oak Logs), but the bottom-left and bottom-right are fiery black glass (Obsidian)!`,
  },
  {
    id: 'hint2',
    title: '🧑‍🌾 Villager Gossip (20 Min)',
    unlockMinutes: 20,
    text: `A local librarian villager wanders by: That middle row is a Redstone sandwich! Two glowing red slices of Redstone on the sides, and a sparkling blue Diamond filling in the dead center!`,
  },
  {
    id: 'solution',
    title: '💀 Snooze Alarm (60 Min+)',
    unlockMinutes: 60,
    text: `Okay, the Phantoms have been screeching for a full hour! Here is the exact cheat-code blueprint to save Steve's ears:
• Top Row: Oak Log, Gold Block, Oak Log
• Middle Row: Redstone, Diamond, Redstone
• Bottom Row: Obsidian, Emerald, Obsidian`,
  },
];

// 105 Kid-Friendly, Hilarious Minecraft Mocking Voice Quotes (All "Hrmm" / "Hrrrrmmm" noises stripped for crisp TTS!)
export const MOCK_QUOTES: string[] = [
  // --- Emerald Trade & Village Roasts ---
  "I wouldn't trade a single dirt block for whatever you just crafted!",
  "Are you trying to craft an alarm clock or a suspicious stew?",
  "Even a Wandering Trader wouldn't sell a blueprint that bad!",
  "My librarian friend looked at your recipe and immediately lost his job!",
  "For 64 emeralds I'll pretend I didn't see you craft that!",
  "Did you learn crafting from a Nitwit Villager?",
  "If you submit that recipe again, the Iron Golem is going to give you a stern look!",
  "That crafting layout makes less sense than a villager sleeping in a boat!",
  "I rate that recipe zero out of ten emeralds!",
  "That alarm clock looks like it would tick backwards!",
  "A baby villager with a wooden pickaxe could forge a better alarm clock!",
  "Did you put a pumpkin on your head while placing those blocks?",
  "That recipe is so confusing even the enchantment table can't read it!",
  "You just invented the world's first square wheel!",
  "I think you accidentally crafted a compass that points to the nearest mud puddle!",
  "That recipe looks like a discounted trade at the village market!",
  "Even a blacksmith villager would melt that down immediately!",
  "My nose is tingling from how wrong that crafting layout is!",
  "You just crafted an alarm clock that rings at two in the morning!",
  "That blueprint wouldn't even open a wooden door!",

  // --- Barnaby the Pig & Farm Animal Shenanigans ---
  "My pet pig Barnaby literally has better hand-eye coordination than this!",
  "Barnaby looked at your grid and snorted in disappointment!",
  "Did a sheep chew on your recipe card? Try again!",
  "Even a pink sheep would blush at that crafting layout!",
  "A chicken could walk across your keyboard and craft a better clock!",
  "Are you trying to mute the Phantoms or are you trying to craft a giant potato?",
  "Barnaby just hid under the bed because that alarm clock looks so wonky!",
  "Holy macaroni! A cow just mooed in confusion looking at that table!",
  "You just crafted something less useful than a poisonous potato!",
  "Even a llama would refuse to carry that alarm clock!",
  "Did you ask an axolotl for crafting advice? Because that was fishy!",
  "Barnaby just offered to take over the mouse for you!",
  "That recipe has more holes than a piece of Swiss cheese in a creeper explosion!",
  "A parrot sitting on your shoulder just squawked: Wrong blocks! Wrong blocks!",
  "Barnaby says: check the riddle again before Steve falls asleep on his keyboard!",
  "Did you accidentally follow a recipe for baked beans?",
  "Even a baby turtle crawls faster than your brain processed that hint!",
  "That alarm clock wouldn't wake up a sleeping bear, let alone scare a Phantom!",
  "Barnaby just stepped in more ink to underline the hint for you!",
  "You just crafted a giant block of pig chow by mistake!",

  // --- Creeper, Phantom & Monster Disasters ---
  "A blind Creeper could craft better than that!",
  "That recipe is about to blow up in your face! Try again!",
  "Steve just got pecked by a Phantom because of that recipe! Nice going!",
  "Did a Creeper blow up your brain? Check the riddle again!",
  "That alarm clock sounds like a skeleton playing the xylophone!",
  "A slime just bounced across your crafting grid and did a better job!",
  "Even a zombie would look at that recipe and walk the other way!",
  "The Phantoms are laughing so hard at your recipe they forgot to dive-bomb!",
  "Did a spider spin a web over your eyes? Look at those blocks again!",
  "That recipe is scarier than hearing an Enderman teleport behind you!",
  "A cave spider could stitch together a better alarm clock!",
  "Did you get hypnotized by a Guardian? Re-read the clues!",
  "That alarm clock looks like a Creeper wearing a tuxedo—totally out of place!",
  "Even a silverfish wouldn't hide inside whatever block you just made!",
  "The Phantoms just gave that recipe one out of five stars!",
  "I smell smoke! Oh wait, that's just your brain trying to solve the puzzle!",
  "Did a witch throw a Slowness Splash Potion on your crafting skills?",
  "That layout would confuse even the Ender Dragon!",
  "You just crafted a beacon that attracts more Phantoms! Quick, fix it!",
  "Even a skeleton archer wouldn't miss the target by that much!",

  // --- Steve's Sleepy Mistakes & Silly Crafting ---
  "Steve just yawned so loud the windows shook! Hurry up and fix the recipe!",
  "Did you craft that with your eyes closed while sleepwalking?",
  "Are you sure you didn't mean to craft a block of dirt?",
  "Steve just put on his iron boots backwards after seeing that grid!",
  "That recipe is so clunky it won't even fit in a double chest!",
  "Did you accidentally use Steve's pancake recipe instead of the blueprint?",
  "Steve just bumped his head on a low ceiling looking at that recipe!",
  "You just crafted a left-handed screwdriver! Try the blocks from the riddle!",
  "Did someone swap your Diamond for a blue snowball?",
  "Steve is so sleepy he thought that recipe was a pillow!",
  "That crafting table is groaning under the weight of those random blocks!",
  "Did you assemble that upside down or inside out?",
  "Steve just checked his watch and it said: Try again later!",
  "That alarm clock looks like it was assembled in the dark!",
  "You just made a block so weird it doesn't even have a shadow!",
  "Steve just tried to eat that recipe thinking it was a pumpkin pie!",
  "Did you drop your pickaxe on the grid? Because that layout is messy!",
  "That recipe wouldn't even pass a beginner crafting exam in survival mode!",
  "Steve just sighed louder than a Nether portal!",
  "You missed the winning blueprint by a country mile!",

  // --- Nether, End, Redstone & Ultimate Roasts ---
  "Did a Ghast sneeze on your blueprint? Try again!",
  "That Redstone circuit has more dead ends than a woodland mansion!",
  "Even a Piglin would refuse gold if it was arranged like that!",
  "You just crafted an alarm clock that plays elevator music!",
  "Did an Enderman steal the correct blocks while you weren't looking?",
  "That recipe makes as much sense as pouring water in the Nether!",
  "A Warden could hear how wrong that crafting layout is from ten chunks away!",
  "Did you run out of Redstone and substitute it with ketchup?",
  "That blueprint looks like it survived a TNT cannon test!",
  "Even an Allay wouldn't pick up that recipe off the ground!",
  "You just crafted the world's heaviest paperweight!",
  "Did you accidentally craft a jukebox that only plays static?",
  "That layout is shakier than a gravel bridge over lava!",
  "My grandmother crafts diamond swords faster and better than this!",
  "Did a Magma Cube sit on your crafting table?",
  "That alarm clock would snooze itself forever!",
  "Even a Strider in a lava pool walks straighter than your block placement!",
  "Did you use a wooden hoe to design that recipe?",
  "That grid looks like a dispenser loaded with confetti and cobwebs!",
  "Even Herobrine would double-check the instructions after seeing that!",
  "Did you mix up Obsidian with a burnt piece of toast?",
  "That alarm clock has zero gears and one hundred percent confusion!",
  "You just crafted a door that opens into a solid stone wall!",
  "Re-read Barnaby's riddle before the Phantoms take over the village!",
  "Take a deep breath, listen to the riddle, and let's craft a real winner!"
];
