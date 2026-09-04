# 🧠 Trace Data Engine & State Diffing

## Responsibility
Houses the main thread trace orchestrator, state delta calculator (`Immer` / JSON-Patch diff engine), and core TypeScript interfaces for execution frames.

## Key Responsibilities
- Interacting with `workers/traceWorker.js` via postMessage.
- Computing incremental state diffs between execution steps to optimize memory usage.
- Exposing clean data structures (`StepFrame`, `HeapNode`, `ScopeState`) to UI visualizers.
