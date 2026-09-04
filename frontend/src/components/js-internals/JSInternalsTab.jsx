import React, { useState } from 'react';
import CallStack from './CallStack.jsx';
import ScopeChain from './ScopeChain.jsx';
import HeapGraph from './HeapGraph.jsx';
import EventLoop from './EventLoop.jsx';
import ErrorUnwinder from './ErrorUnwinder.jsx';
import { Layers, Network, Database, RefreshCw, AlertOctagon } from 'lucide-react';

export default function JSInternalsTab() {
  const [activeSubTab, setActiveSubTab] = useState('callstack');

  return (
    <div className="js-internals-tab-container">
      {/* Sub-navigation Tabs */}
      <div className="internals-subtabs glass-panel">
        <button
          className={`subtab-btn ${activeSubTab === 'callstack' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('callstack')}
        >
          <Layers size={14} /> Call Stack
        </button>

        <button
          className={`subtab-btn ${activeSubTab === 'scope' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('scope')}
        >
          <Network size={14} /> Scope Chain
        </button>

        <button
          className={`subtab-btn ${activeSubTab === 'heap' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('heap')}
        >
          <Database size={14} /> Memory Heap Graph
        </button>

        <button
          className={`subtab-btn ${activeSubTab === 'eventloop' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('eventloop')}
        >
          <RefreshCw size={14} /> Event Loop
        </button>

        <button
          className={`subtab-btn ${activeSubTab === 'error' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('error')}
        >
          <AlertOctagon size={14} /> Error Unwinder
        </button>
      </div>

      {/* Sub-tab Content Stage */}
      <div className="internals-content-stage">
        {activeSubTab === 'callstack' && <CallStack />}
        {activeSubTab === 'scope' && <ScopeChain />}
        {activeSubTab === 'heap' && <HeapGraph />}
        {activeSubTab === 'eventloop' && <EventLoop />}
        {activeSubTab === 'error' && <ErrorUnwinder />}
      </div>
    </div>
  );
}
