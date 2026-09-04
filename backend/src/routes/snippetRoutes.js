import express from 'express';
import { createSnippet, getSnippetByShareId, getRecentSnippets } from '../controllers/snippetController.js';
import { snippetPostLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// GET /api/v1/snippets/recent - Get latest public code snippets
router.get('/recent', getRecentSnippets);

// POST /api/v1/snippets - Save & share new code snippet
router.post('/', snippetPostLimiter, createSnippet);

// GET /api/v1/snippets/:shareId - Get snippet by share token
router.get('/:shareId', getSnippetByShareId);

export default router;
