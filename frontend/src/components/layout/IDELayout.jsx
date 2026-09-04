import React, { useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Header from './Header.jsx';
import StepControls from './StepControls.jsx';
import MonacoEditorWrapper from '../ide/MonacoEditor.jsx';
import ConsolePanel from '../ide/ConsolePanel.jsx';
import JSInternalsTab from '../js-internals/JSInternalsTab.jsx';
import DSAVisualizerTab from '../dsa/DSAVisualizerTab.jsx';
import ComplexityTab from '../complexity/ComplexityTab.jsx';
import ASTTab from '../ast/ASTTab.jsx';
import { Layers, Activity, GitBranch, Code2 } from 'lucide-react';

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

                <button
                  className={`tab-btn ${activeMainTab === 'ast' ? 'active' : ''}`}
                  onClick={() => setActiveMainTab('ast')}
                >
                  <Code2 size={14} /> AST Tree
                </button>
              </div>

              {/* Main Tab Stage */}
              <div className="visualizer-stage-wrapper">
                {activeMainTab === 'js-internals' && <JSInternalsTab />}
                {activeMainTab === 'dsa' && <DSAVisualizerTab />}
                {activeMainTab === 'complexity' && <ComplexityTab />}
                {activeMainTab === 'ast' && <ASTTab />}
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
