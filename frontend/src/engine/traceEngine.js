import { generateExecutionTrace } from '../workers/evaluator.js';

/**
 * Main Thread Trace Engine Interface
 * Triggers AST evaluation and returns structured execution step frames.
 * @param {string} code 
 * @returns {Promise<Array>} Promise resolving to step frame snapshots array.
 */
export async function runTrace(code) {
  return new Promise((resolve, reject) => {
    try {
      // Direct evaluation fallback for development & environments without worker blob support
      const steps = generateExecutionTrace(code);
      resolve(steps);
    } catch (err) {
      reject(err);
    }
  });
}
