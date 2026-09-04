import { generateExecutionTrace } from './evaluator.js';
import { parseCodeToAST } from './astParser.js';

/**
 * Web Worker Message Listener
 * Listens for raw user JS code, parses AST, runs evaluator, and returns step trace array.
 */
self.onmessage = function (e) {
  const { type, code } = e.data;

  if (type === 'GENERATE_TRACE') {
    try {
      // 1. AST Validation
      const astResult = parseCodeToAST(code);
      if (!astResult.success) {
        self.postMessage({
          type: 'TRACE_ERROR',
          error: astResult.error
        });
        return;
      }

      // 2. Generate Trace Steps
      const steps = generateExecutionTrace(code);

      // 3. Post Back Step Array
      self.postMessage({
        type: 'TRACE_COMPLETE',
        steps: steps,
        ast: astResult.ast
      });
    } catch (err) {
      self.postMessage({
        type: 'TRACE_ERROR',
        error: { message: err.message }
      });
    }
  }
};
