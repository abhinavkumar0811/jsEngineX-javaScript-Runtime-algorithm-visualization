import express from 'express';
import { getAllPresets, getPresetById } from '../controllers/presetController.js';

const router = express.Router();

// GET /api/v1/presets - Get algorithm presets list
router.get('/', getAllPresets);

// GET /api/v1/presets/:id - Get specific preset by ID
router.get('/:id', getPresetById);

export default router;
