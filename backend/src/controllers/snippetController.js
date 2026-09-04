import Snippet from '../models/Snippet.js';
import crypto from 'crypto';

// In-memory fallback cache when DB is disconnected
const inMemorySnippets = new Map();

// Helper: Generate unique 8-character hash share token
const generateShareId = () => {
  return crypto.randomBytes(4).toString('hex');
};

// @desc    Create a shareable code snippet
// @route   POST /api/v1/snippets
export const createSnippet = async (req, res, next) => {
  try {
    const { code, title = 'Untitled JS Snippet', category = 'General', tags = [] } = req.body;

    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Valid JavaScript code string is required.'
      });
    }

    const shareId = generateShareId();
    const snippetData = {
      shareId,
      title: title.slice(0, 100),
      code,
      category,
      tags,
      views: 0,
      createdAt: new Date().toISOString()
    };

    // Store in-memory fallback cache
    inMemorySnippets.set(shareId, snippetData);

    // Try storing in MongoDB if connected
    try {
      const dbSnippet = await Snippet.create(snippetData);
      return res.status(201).json({
        success: true,
        message: 'Snippet saved successfully.',
        data: dbSnippet
      });
    } catch (dbErr) {
      // Return in-memory fallback response
      return res.status(201).json({
        success: true,
        message: 'Snippet saved to local memory store.',
        data: snippetData
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get code snippet by shareId
// @route   GET /api/v1/snippets/:shareId
export const getSnippetByShareId = async (req, res, next) => {
  try {
    const { shareId } = req.params;

    // Check MongoDB first
    try {
      const snippet = await Snippet.findOneAndUpdate(
        { shareId },
        { $inc: { views: 1 } },
        { new: true }
      );
      if (snippet) {
        return res.status(200).json({
          success: true,
          data: snippet
        });
      }
    } catch (dbErr) {
      // Fallback to in-memory store
    }

    // Check in-memory store
    if (inMemorySnippets.has(shareId)) {
      const snippet = inMemorySnippets.get(shareId);
      snippet.views += 1;
      return res.status(200).json({
        success: true,
        data: snippet
      });
    }

    return res.status(404).json({
      success: false,
      error: `Snippet with share ID '${shareId}' was not found.`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent public snippets
// @route   GET /api/v1/snippets/recent
export const getRecentSnippets = async (req, res, next) => {
  try {
    try {
      const dbSnippets = await Snippet.find({ isPublic: true }).sort({ createdAt: -1 }).limit(10);
      if (dbSnippets && dbSnippets.length > 0) {
        return res.status(200).json({
          success: true,
          count: dbSnippets.length,
          data: dbSnippets
        });
      }
    } catch (dbErr) {
      // Fallback
    }

    const memoryList = Array.from(inMemorySnippets.values()).slice(-10).reverse();
    return res.status(200).json({
      success: true,
      count: memoryList.length,
      data: memoryList
    });
  } catch (error) {
    next(error);
  }
};
