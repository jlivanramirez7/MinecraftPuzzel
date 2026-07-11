/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        minecraft: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        mc: {
          dark: '#1e1e1e',
          stone: '#373737',
          stoneLight: '#8F8F8F',
          stoneDark: '#262626',
          panel: '#C6C6C6',
          panelDark: '#595959',
          panelLight: '#FFFFFF',
          dirt: '#52361b',
          dirtDark: '#281c0e',
          obsidian: '#1a1126',
          gold: '#FFD700',
          redstone: '#FF1744',
          diamond: '#00E5FF',
          emerald: '#00E676',
        }
      },
      boxShadow: {
        'mc-inset': 'inset 3px 3px 0px #373737, inset -3px -3px 0px #ffffff',
        'mc-slot': 'inset 3px 3px 0px #262626, inset -3px -3px 0px #8F8F8F',
        'mc-panel': 'inset 4px 4px 0px #FFFFFF, inset -4px -4px 0px #595959',
        'mc-button': 'inset 3px 3px 0px #FFFFFF, inset -3px -3px 0px #595959',
        'mc-button-active': 'inset 3px 3px 0px #595959, inset -3px -3px 0px #FFFFFF',
      }
    },
  },
  plugins: [],
}
