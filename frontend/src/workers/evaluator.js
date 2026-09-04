import { STEP_ACTIONS } from '../engine/types.js';

/**
 * Step Evaluator & Trace Snapshot Builder
 * Executes user JavaScript code synchronously step-by-step and records step snapshots.
 */
export function generateExecutionTrace(code) {
  const steps = [];
  let opCount = 0;
  let stdoutLogs = [];

  // Create a clean sandbox environment to capture console output and evaluate code
  const sandboxConsole = {
    log: (...args) => {
      const outputStr = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
      stdoutLogs.push(outputStr);
    }
  };

  // We split statements or line blocks to evaluate and record snapshots
  const lines = code.split('\n');
  
  // Custom scope & stack instrumentation context
  const scopeState = {};
  const callStack = [{ name: '<global>', line: 1 }];
  const heapGraph = {};

  let currentStepNum = 1;

  // Safe evaluation context runner
  try {
    const wrappedFunc = new Function('console', 'steps', 'scopeState', 'callStack', 'heapGraph', `
      let opCount = 0;
      function recordStep(line, col, action, details = {}) {
        opCount++;
        steps.push({
          step: steps.length + 1,
          line: line,
          column: col,
          action: action,
          opCount: opCount,
          stack: JSON.parse(JSON.stringify(callStack)),
          scope: JSON.parse(JSON.stringify(scopeState)),
          heap: JSON.parse(JSON.stringify(heapGraph)),
          details: details,
          stdout: [...details.logs || []]
        });
      }

      // Execute code instrumentation
      ${instrumentCode(lines)}
    `);

    wrappedFunc(sandboxConsole, steps, scopeState, callStack, heapGraph);
  } catch (err) {
    steps.push({
      step: steps.length + 1,
      line: err.line || 1,
      column: err.column || 0,
      action: 'ERROR',
      error: err.message,
      opCount: opCount,
      stack: callStack,
      scope: scopeState,
      heap: heapGraph,
      stdout: stdoutLogs
    });
  }

  // Fallback if no steps generated (e.g. empty or simple code)
  if (steps.length === 0) {
    steps.push({
      step: 1,
      line: 1,
      column: 1,
      action: STEP_ACTIONS.VAR_DECLARATION,
      opCount: 1,
      stack: callStack,
      scope: {},
      heap: {},
      stdout: stdoutLogs
    });
  }

  return steps;
}

/**
 * Basic code instrumentation transformer adding step triggers per line
 */
function instrumentCode(lines) {
  return lines.map((lineStr, idx) => {
    const lineNum = idx + 1;
    const trimmed = lineStr.trim();
    if (!trimmed || trimmed.startsWith('//')) return lineStr;

    // Inject variable scope capture and step recording
    if (trimmed.startsWith('let ') || trimmed.startsWith('var ') || trimmed.startsWith('const ')) {
      const varName = trimmed.split(' ')[1]?.split('=')[0]?.trim();
      return `${lineStr}; if (typeof ${varName} !== 'undefined') { scopeState['${varName}'] = ${varName}; } recordStep(${lineNum}, 1, '${STEP_ACTIONS.VAR_DECLARATION}', { varName: '${varName}' });`;
    }

    if (trimmed.includes('console.log')) {
      return `${lineStr}; recordStep(${lineNum}, 1, '${STEP_ACTIONS.CONSOLE_LOG}', { logs: [...stdoutLogs] });`;
    }

    return `${lineStr}; recordStep(${lineNum}, 1, '${STEP_ACTIONS.ASSIGNMENT}');`;
  }).join('\n');
}
