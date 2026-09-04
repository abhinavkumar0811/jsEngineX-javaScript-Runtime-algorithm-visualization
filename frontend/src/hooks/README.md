# 🎣 Custom React Hooks

## Responsibility
Houses reusable custom hooks abstracting complex stateful logic, worker communication, and timer-driven animation scrubbing.

## Key Hooks
- `useTraceRunner.js`: Triggers Web Worker execution parsing and receives trace step arrays.
- `usePlayback.js`: Handles `requestAnimationFrame` interval stepping (play, pause, scrub).
- `useMonaco.js`: Manages Monaco Editor instances, decorations, and breakpoint state.
