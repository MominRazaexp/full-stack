import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { initDB } from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Initialize database
await initDB();

// API routes
app.use('/api/todos', todoRoutes);
app.use('/api/analytics', analyticsRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});