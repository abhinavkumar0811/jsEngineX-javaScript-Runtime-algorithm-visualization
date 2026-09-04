# 🔬 JavaScript Internals & Runtime Visualizers

## Responsibility
Renders the low-level JavaScript execution mechanics and memory state in real-time synchronized with the execution scrubber.

## Visualizer Sub-Components
- `CallStack.jsx`: Animated call stack push/pop visualization (Framer Motion).
- `ScopeChain.jsx`: Execution context and local/closure scope variables inspection.
- `HeapGraph.jsx`: Interactive memory graph showing objects, primitives, and reference pointers (`React Flow` / `D3.js`).
- `EventLoop.jsx`: Animated Event Loop wheel with Call Stack, Task Queue, Microtask Queue, and `process.nextTick` queues.
- `ErrorUnwinder.jsx`: Visual unwinding lifecycle during `throw` -> `try/catch` execution.
