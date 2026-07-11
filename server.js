import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// Serve static frontend assets from built dist directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Healthcheck endpoint for Google Cloud Run
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'minecraft-crafting-puzzle',
    timestamp: new Date().toISOString(),
  });
});

// Single Page Application (SPA) fallback routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`[Minecraft Puzzle Server] Running on http://${HOST}:${PORT}`);
  console.log(`[Minecraft Puzzle Server] Serving frontend from: ${distPath}`);
});
