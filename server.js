import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '8080', 10);
const HOST = '0.0.0.0';

const distPath = path.join(__dirname, 'dist');

// Verify dist directory exists on startup
if (!fs.existsSync(distPath)) {
  console.warn(`[WARNING] Static directory not found at: ${distPath}. Did Stage 1 build properly?`);
} else {
  console.log(`[INFO] Static frontend directory confirmed at: ${distPath}`);
}

// Serve static frontend assets from built dist directory
app.use(express.static(distPath, {
  maxAge: '1d',
  etag: true
}));

// Healthcheck endpoint for Google Cloud Run container readiness checks
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'minecraft-crafting-puzzle',
    port: PORT,
    timestamp: new Date().toISOString(),
  });
});

// Single Page Application (SPA) fallback routing
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Frontend bundle (dist/index.html) not found. Ensure `npm run build` ran successfully.');
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`[Minecraft Puzzle Server] Successfully listening on http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('[SIGTERM] Shutting down gracefully for Cloud Run container lifecycle...');
  server.close(() => {
    console.log('[SIGTERM] Server closed.');
    process.exit(0);
  });
});
