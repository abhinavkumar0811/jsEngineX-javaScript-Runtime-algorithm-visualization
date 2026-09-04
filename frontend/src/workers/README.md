# ⚡ AST Parsing & Execution Web Workers

## Responsibility
Manages background Web Worker threads for non-blocking JavaScript code execution, AST parsing (`@babel/parser` / `acorn`), and step-by-step execution trace frame generation off the main UI thread.

## Key Files & Modules
- `traceWorker.js`: Main Web Worker entry point receiving raw user code and outputting serialized step frame arrays.
- `astParser.js`: Parses JS source code into an Abstract Syntax Tree (AST).
- `evaluator.js`: Synchronous step evaluator capturing stack frames, scope variables, heap object snapshots, and operation counts.
