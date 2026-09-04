import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import snippetRoutes from './src/routes/snippetRoutes.js';
import presetRoutes from './src/routes/presetRoutes.js';
import { apiLimiter } from './src/middlewares/rateLimiter.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

dotenv.config();

// Connect MongoDB Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Core Security & Middleware Setup
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use('/api/', apiLimiter);

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    service: 'JSEngineX Backend API',
    message: 'Backend service is running cleanly.',
    timestamp: new Date().toISOString()
  });
});

// API v1 Routes
app.use('/api/v1/snippets', snippetRoutes);
app.use('/api/v1/presets', presetRoutes);

// Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚡ JSEngineX Express Backend Server running on http://localhost:${PORT}`);
});
