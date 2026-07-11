# 🎂 Minecraft Birthday Master Crafter Puzzle

A tablet-friendly, highly interactive single-page web application featuring a classic Minecraft-themed crafting puzzle game built with **React 18 + TypeScript + Vite + Tailwind CSS** and served via an **Express.js** backend containerized for **Google Cloud Run**.

---

## 📋 Features & Architecture

### 🧱 1. Authentic Retro Minecraft GUI & Assets
- **Retro Typography**: Uses `'Press Start 2P'` Google Font with crisp fallback to monospace.
- **Classic Minecraft Palette**: Dark stone grays (`#373737`), deep obsidian purples (`#1B1229`), dirt-brown borders (`#52361b`), and light-gray inset panels (`#C6C6C6`).
- **Custom Pixel-Art Vector Graphics**: All 9 blocks feature highly distinct, SVG-generated pixel art icons:
  - **Gold Block** (`gold_block`): Radiant Golden Yellow metallic grid texture.
  - **Iron Block** (`iron_block`): White & Light Steel Gray with iron corner rivets.
  - **Oak Log** (`oak_log`): Wood grain ring texture with dark bark borders.
  - **Diamond** (`diamond`): Glowing aqua-cyan crystal shape.
  - **Emerald** (`emerald`): Sharp, gleaming green gemstone shape.
  - **Redstone Block** (`redstone_block`): Dark red block with glowing red dust speckles.
  - **Obsidian** (`obsidian`): Deep purple and jet-black volcanic stone texture.
  - **Cobblestone** (`cobblestone`): Classic cobbled-rock textured square.
  - **Coal Block** (`coal_block`): Rough-textured, dull black block.

---

### 🧩 2. Riddle & Hint Progression Engine
The puzzle features a progressive ancient riddle with an interactive countdown timer:
- **0 Minutes (Base Riddle)**:
  > *"To forge the crown of the ultimate gamer, a sparkling blue Diamond must rest at the very center of your creation. Surround its sides with walls of solid Gold, but secure the bottom corners with blocks of dark Obsidian."*
- **10 Minutes (Hint 1)**:
  > *"The top row is completely empty of danger—it is lined entirely with precious Gold blocks!"*
- **20 Minutes (Hint 2)**:
  > *"To power the crown, a bright red block of Redstone must sit directly below the Diamond, at the bottom-middle of the grid."*
- **30 Minutes+ (Final Solution Blueprint)**:
  > • **Top Row**: Gold, Gold, Gold  
  > • **Middle Row**: Gold, Diamond, Gold  
  > • **Bottom Row**: Obsidian, Redstone, Obsidian

*Includes an instant **"+ Unlock Hint"** helper button for testing and birthday kids who want instant clues!*

---

### 🕹️ 3. Tablet-Optimized Hybrid Control System
Designed specifically to eliminate mobile browser drag-and-drop issues on iPads and Android tablets:
1. **Tap-to-Place (Tablet Core)**:
   - Tap any item in the **Block Inventory (Hotbar)** to select it (highlighted with a glowing thick yellow border `#FFD700`).
   - Tap any empty slot in the **3x3 Crafting Table** to place the selected item.
   - Tap an occupied slot to replace the block.
   - Tap a slot on the grid *without* a selected item to remove the block.
2. **Standard Drag-and-Drop**: Desktop players can also drag and drop items straight from inventory into any grid slot.
3. **Action Controls**: Clearly styled retro buttons for **Clear Table**, **Craft Recipe!**, **Mute/Unmute Audio**, and **Reset Puzzle**.

---

### 🔊 4. Audio & Mocking Engine (Offline Web Audio + TTS)
- **Riddle Loop**: Every 10 minutes (and when unlocked), plays a soft mechanical chime and uses `window.speechSynthesis` (TTS) to read aloud the riddle and unlocked hints.
- **Fail Feedback (Mocking)**:
  - Plays a classic game-over "Oof" / buzzer synth sound using Web Audio API.
  - Randomly selects one of 5 kid-friendly mocks read aloud with a slightly pitched-down, villager-like delivery (`pitch: 0.7, rate: 0.9`):
    1. *"A zombie has better crafting skills than this!"*
    2. *"Are you sure you didn't mean to craft a block of dirt?"*
    3. *"Oof! Even a baby sheep could craft better than that."*
    4. *"Did a Creeper blow up your brain? Try again!"*
    5. *"My grandmother crafts diamond swords faster than this!"*
- **Success Feedback**:
  - Plays a celebratory Minecraft **"Level Up" Fanfare** using Web Audio API.
  - Launches full-screen **Canvas Confetti** fireworks.
  - Displays the celebratory modal: **"ACHIEVEMENT UNLOCKED: BIRTHDAY MASTER CRAFTER!"**

---

### 💾 5. Browser Session Persistence (`localStorage`)
All game states persist automatically across page refreshes or tablet lock events:
| Storage Key | Data Type | Purpose |
| :--- | :--- | :--- |
| `crafting_grid_state` | JSON Array (Length 9) | Stores the block ID placed in each of the 9 grid slots (`null` for empty) |
| `puzzle_start_time` | Timestamp (Unix ms) | Absolute start timestamp preventing timer resets on refresh |
| `unlocked_hints_list` | JSON Array of Strings | Tracks unlocked hint tiers (`'base'`, `'hint1'`, `'hint2'`, `'solution'`) |
| `puzzle_is_solved` | Boolean | True if the puzzle has been successfully solved |
| `is_audio_muted` | Boolean | Tracks user mute preference |

---

## 🚀 Local Development & Build

### Prerequisites
- Node.js 20+
- npm 10+

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Build Production Static SPA & Test Express Server
```bash
npm run build
npm start
```
Server runs on `http://localhost:8080` (or `process.env.PORT`).

---

## 🐳 Docker & Google Cloud Run Deployment

### Build Multi-Stage Docker Image
```bash
docker build -t minecraft-crafting-puzzle .
```

### Run Docker Container Locally
```bash
docker run -p 8080:8080 minecraft-crafting-puzzle
```

### Deploy to Google Cloud Run
```bash
gcloud run deploy minecraft-crafting-puzzle \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```
