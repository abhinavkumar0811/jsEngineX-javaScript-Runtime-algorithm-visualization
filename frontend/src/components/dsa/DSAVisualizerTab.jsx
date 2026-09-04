import React, { useState } from 'react';
import ArrayViz from './ArrayViz.jsx';
import GraphViz from './GraphViz.jsx';
import RecursionTree from './RecursionTree.jsx';
import { BarChart3, GitBranch, GitCommit } from 'lucide-react';

export default function DSAVisualizerTab() {
  const [activeSubTab, setActiveSubTab] = useState('array');

  return (
    <div className="dsa-tab-container">
      {/* Sub-navigation Tabs */}
      <div className="internals-subtabs glass-panel">
        <button
          className={`subtab-btn ${activeSubTab === 'array' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('array')}
        >
          <BarChart3 size={14} /> Arrays & Linear Swaps
        </button>

        <button
          className={`subtab-btn ${activeSubTab === 'graph' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('graph')}
        >
          <GitBranch size={14} /> Trees & Graph Traversal
        </button>

        <button
          className={`subtab-btn ${activeSubTab === 'recursion' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('recursion')}
        >
          <GitCommit size={14} /> Recursion Call Tree
        </button>
      </div>

      {/* Sub-tab Content Stage */}
      <div className="internals-content-stage">
        {activeSubTab === 'array' && <ArrayViz />}
        {activeSubTab === 'graph' && <GraphViz />}
        {activeSubTab === 'recursion' && <RecursionTree />}
      </div>
    </div>
  );
}
