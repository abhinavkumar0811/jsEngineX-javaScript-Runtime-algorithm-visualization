# ⚡ JSEngineX — JavaScript Runtime & Algorithm Visualization Platform

<p align="center">
  <img src="frontend/public/favicon.svg" alt="JSEngineX Logo" width="120" />
</p>

<p align="center">
  <b>An interactive, non-blocking AST execution tracing engine, JS memory visualizer, and DSA complexity platform built for modern developers.</b>
</p>

<p align="center">
  <a href="#-key-features"><img src="https://img.shields.io/badge/React-18.3-61dafb?logo=react" alt="React 18" /></a>
  <a href="#-key-features"><img src="https://img.shields.io/badge/Vite-6.1-646cff?logo=vite" alt="Vite 6" /></a>
  <a href="#-key-features"><img src="https://img.shields.io/badge/Monaco_Editor-0.47-007acc?logo=visualstudiocode" alt="Monaco Editor" /></a>
  <a href="#-key-features"><img src="https://img.shields.io/badge/React_Flow-12.4-ff007a" alt="React Flow" /></a>
  <a href="#-key-features"><img src="https://img.shields.io/badge/Concurrency-Web_Workers-ff69b4" alt="Web Workers" /></a>
  <a href="#-key-features"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License MIT" /></a>
</p>

---

## 📌 Overview

**JSEngineX** is an industry-grade web application designed to demystify JavaScript runtime mechanics, memory management, and algorithmic execution steps. 

Unlike traditional static debuggers or blocking execution tools, **JSEngineX** uses an **Off-Main-Thread AST Execution Engine** running in dedicated Web Worker threads. It evaluates raw JavaScript code into granular, immutable **Execution Step Frames**, streaming them in real-time to interactive visualizers without freezing the UI.

---

## 🔥 Key Features

### 1. ⚡ Off-Main-Thread AST Trace Engine (`workers/`)
* **AST Parsing & Visitor Traversal**: Powered by `@babel/parser` and `acorn`, generating line-by-line syntax tree mappings.
* **Non-Blocking Worker Execution**: Traces evaluate inside Web Workers (`traceWorker.js`) off the main thread, keeping 60 FPS UI rendering smooth.
* **Granular Step Snapshots**: Captures line locations, call stack depth, scope variable bindings, heap objects, operation metrics, and standard console output.

### 2. 🔬 JavaScript Runtime Internals Visualizer
* **Call Stack (LIFO)**: Animated function frame push/pop cards with spring-physics powered by `framer-motion`.
* **Scope Chain Inspector**: Real-time scope tree displaying global variables, local function scopes, and closure bindings with type badges.
* **Heap Object Memory Graph**: Interactive node-link object graph powered by `@xyflow/react` showing object properties and pointer references (`stroke: #06b6d4`).
* **Event Loop Wheel**: SVG animated rotator displaying Call Stack, Microtask Queue (Promises), and Task Queue (`setTimeout`).
* **Error Lifecycle Unwinder**: Stack unwinding lifecycle diagram for uncaught exceptions and `throw` statements.

### 3. 📊 Data Structures & Algorithms (DSA) Visualizer
* **Array & Linear Swaps (`ArrayViz.jsx`)**: Framer Motion animated bar height swaps with live state highlights (`Comparing`, `Swapping`, `Active`) and pointer badges (`i`, `j`, `low`, `high`, `mid`).
* **Tree & Graph Traversals (`GraphViz.jsx`)**: Dynamic Binary Search Tree (BST) and Graph search target visualizer (`@xyflow/react`).
* **Recursion Stack Tree (`RecursionTree.jsx`)**: Call tree mapping function invocation depth, stack parameters, and returned values.

### 4. 💻 IDE Shell & Step Playback Scrubber
* **Monaco Code Editor**: Full VS Code editor engine (`@monaco-editor/react`) featuring syntax highlighting and glowing active execution line markers (`deltaDecorations`).
* **Interactive Scrubber Bar**: Play, Pause, Step Prev/Next, Reset, Timeline Scrubber slider, speed selection ($0.25\times$ to $5\times$), and operation counter badge.
* **Virtual Output Terminal**: Displays `console.log` stdout strings and runtime error stack traces.

### 5. 🎨 6 Coder Favorite IDE Themes
Seamlessly switch between 6 world-famous developer dark/light color palettes:
* 🌌 **Tokyo Night** *(Default — Modern Japanese Cyberpunk)*
* 🧛 **Dracula** *(High-Contrast Gothic Dark)*
* ⚛️ **One Dark Pro** *(Atom / VS Code Favorite)*
* 🐙 **GitHub Dark** *(Official GitHub Dark Interface)*
* 🌅 **SynthWave '84** *(Retro 80s Cyber Glow)*
* ☀️ **GitHub Light** *(Clean High-Contrast White Mode)*

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                   USER CODE                                      │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                      AST PARSER & TRACE GENERATION WORKER                        │
│                     (Babel Parser / Acorn + JS Evaluator)                        │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                          UNIFIED STEP TRACE ENGINE                               │
│        [{ step: 1, line: 5, stack: [...], scope: {...}, opCount: 14, ... }]     │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
               ┌─────────────────────────┼─────────────────────────┐
               ▼                         ▼                         ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│   JS INTERNALS ENGINE   │ │     DSA VISUALIZER      │ │   COMPLEXITY ANALYZER   │
│ ├── Call Stack          │ │ ├── Array Bar Swaps     │ │ ├── Operation Tracker   │
│ ├── Exec Context & Scope│ │ ├── Linked List         │ │ ├── Big-O Proof Engine  │
│ ├── Heap Object Graph   │ │ ├── Trees & Graphs      │ │ ├── Growth Curve Chart  │
│ └── Event Loop Queues   │ │ └── Recursion Tree      │ │ └── Micro-benchmarks    │
└──────────────┬──────────┘ └────────────┬────────────┘ └────────────┬────────────┘
               │                         │                           │
               └─────────────────────────┼───────────────────────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   INTERACTIVE IDE & STEP PLAYBACK SCRUBBER UI                    │
│             (Monaco Editor + Framer Motion + React Flow + Recharts)              │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack Table

| Layer | Technology | Role & Responsibility |
| :--- | :--- | :--- |
| **Frontend UI** | React 18 + Vite 6 | Fast modular UI rendering & component architecture |
| **Code Editor** | `@monaco-editor/react` | Full IDE editor with line execution highlights |
| **AST Parser** | `@babel/parser` + `acorn` | AST parsing & step-by-step trace generation |
| **Worker Threads** | Web Workers API | Background execution off the main UI thread |
| **Memory Graph** | `@xyflow/react` (React Flow) | Heap memory object graph & tree visualizers |
| **Animations** | `framer-motion` | Spring-physics stack pushes/pops & array swaps |
| **IDE Layout** | `react-resizable-panels` | Draggable resizable multi-column panes |
| **Backend API** | Node.js + Express | Preset trace JSON caching & snippet storage API |
| **Database** | MongoDB / Mongoose | Saved code snippets & preset algorithms DB |

---

## 📁 Repository Directory Setup

```text
JSEngineX/
├── documentation/                    # Architectural specs, API docs, requirements
│   ├── project technology requirement.md
│   └── System_architectutre.md
│
├── frontend/                         # React 18 + Vite Frontend Application
│   ├── public/                       # Favicon SVG logo, public algorithm presets
│   ├── src/
│   │   ├── workers/                  # ⚡ Off-Main-Thread Execution Engine (Babel / Evaluator)
│   │   ├── engine/                   # 🧠 Trace Data Engine & State Diffing
│   │   ├── components/               # 🎨 Visual UI Components (ide, js-internals, dsa, complexity)
│   │   ├── context/                  # 🌐 Global State (TraceContext, 6 Themes, Playback scrubber)
│   │   ├── hooks/                    # Custom React Hooks
│   │   ├── constants/                # Code Presets & Big-O Definitions
│   │   └── styles/                   # 💎 Design System & 6 Coder Theme CSS Tokens
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                          # Node.js + Express API Server
│   ├── src/
│   │   ├── config/                   # DB Connection
│   │   ├── controllers/              # Request Controllers
│   │   ├── models/                   # Mongoose Schemas (Preset, Snippet)
│   │   ├── routes/                   # REST Routes (/api/v1/presets, /api/v1/snippets)
│   │   ├── middlewares/              # Express Middlewares (Rate Limiter, CORS, Error Handler)
│   │   └── services/                 # Business Logic & Trace Pre-computation
│   ├── index.js
│   └── package.json
│
├── PROJECT_EXECUTION_TRACKER.md      # 🎯 Centralized Step-by-Step Execution Log (STEP-00 to STEP-09)
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### 1. Clone & Install Frontend
```bash
git clone https://github.com/user/JSEngineX.git
cd JSEngineX/frontend

# Install dependencies
npm install

# Start Vite Development Server
npm run dev
```
Navigate to `http://localhost:3000` in your browser.

### 2. Start Backend API Server (Optional)
```bash
cd ../backend

# Install backend dependencies
npm install

# Start Express Server
npm start
```
Express API server will run on `http://localhost:5000`.

---

## 🎯 Implementation Log & Tracker

For complete step-by-step implementation logs, timestamps, techniques used, and git commit hashes for every milestone (STEP-00 through STEP-09), refer to the **[PROJECT_EXECUTION_TRACKER.md](PROJECT_EXECUTION_TRACKER.md)** document.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
