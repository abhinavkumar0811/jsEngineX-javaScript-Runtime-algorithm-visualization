import React, { useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Header from './Header.jsx';
import StepControls from './StepControls.jsx';
import MonacoEditorWrapper from '../ide/MonacoEditor.jsx';
import ConsolePanel from '../ide/ConsolePanel.jsx';
import JSInternalsTab from '../js-internals/JSInternalsTab.jsx';
import { Layers, Activity, GitBranch } from 'lucide-react';

export default function IDELayout() {
  const [activeMainTab, setActiveMainTab] = useState('js-internals');

  return (
    <div className="ide-shell-container">
      {/* Header Bar */}
      <Header />

      {/* Main Resizable Workspace */}
      <div className="workspace-container">
        <PanelGroup direction="horizontal">
          {/* Left Column: Code Editor & Terminal */}
          <Panel defaultSize={45} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={40}>
                <MonacoEditorWrapper />
              </Panel>
              <PanelResizeHandle className="resize-handle-vertical" />
              <Panel defaultSize={30} minSize={20}>
                <ConsolePanel />
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="resize-handle-horizontal" />

          {/* Right Column: Visualization Workspace */}
          <Panel defaultSize={55} minSize={35}>
            <div className="visualizer-workspace glass-panel">
              <div className="workspace-tabs-header">
                <button
                  className={`tab-btn ${activeMainTab === 'js-internals' ? 'active' : ''}`}
                  onClick={() => setActiveMainTab('js-internals')}
                >
                  <Layers size={14} /> JS Internals
                </button>
                <button
                  className={`tab-btn ${activeMainTab === 'dsa' ? 'active' : ''}`}
                  onClick={() => setActiveMainTab('dsa')}
                >
                  <GitBranch size={14} /> DSA Visualizer
                </button>
                <button
                  className={`tab-btn ${activeMainTab === 'complexity' ? 'active' : ''}`}
                  onClick={() => setActiveMainTab('complexity')}
                >
                  <Activity size={14} /> Big-O Complexity
                </button>
              </div>

              {/* Main Tab Stage */}
              <div className="visualizer-stage-wrapper">
                {activeMainTab === 'js-internals' && <JSInternalsTab />}
                {activeMainTab === 'dsa' && (
                  <div className="stage-placeholder">
                    <h4><GitBranch size={18} /> DSA Visualizer Workspace</h4>
                    <p>Phase 4 Data Structures & Algorithms visualizers will render here.</p>
                  </div>
                )}
                {activeMainTab === 'complexity' && (
                  <div className="stage-placeholder">
                    <h4><Activity size={18} /> Time & Space Complexity Engine</h4>
                    <p>Phase 5 Recharts Big-O growth curves and KaTeX mathematical proofs will render here.</p>
                  </div>
                )}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* Bottom Step Controls Scrubber Bar */}
      <StepControls />
    </div>
  );
}
