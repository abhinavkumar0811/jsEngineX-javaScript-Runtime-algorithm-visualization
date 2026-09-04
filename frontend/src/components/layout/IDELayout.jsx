import React from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Header from './Header.jsx';
import StepControls from './StepControls.jsx';
import MonacoEditorWrapper from '../ide/MonacoEditor.jsx';
import ConsolePanel from '../ide/ConsolePanel.jsx';
import { useTrace } from '../../context/TraceContext.jsx';
import { Layers, Activity, Database, GitBranch } from 'lucide-react';

export default function IDELayout() {
  const { activeStep } = useTrace();

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

          {/* Right Column: Visualization & Engine Panel */}
          <Panel defaultSize={55} minSize={35}>
            <div className="visualizer-workspace glass-panel">
              <div className="workspace-tabs-header">
                <button className="tab-btn active">
                  <Layers size={14} /> JS Internals
                </button>
                <button className="tab-btn">
                  <GitBranch size={14} /> DSA Visualizer
                </button>
                <button className="tab-btn">
                  <Activity size={14} /> Big-O Complexity
                </button>
              </div>

              {/* Visualization Placeholder Preview */}
              <div className="visualizer-stage">
                <div className="stage-card">
                  <h4><Database size={16} /> Active Execution Frame</h4>
                  {activeStep ? (
                    <div className="frame-details-grid">
                      <div className="detail-item">
                        <span className="label">Step Number:</span>
                        <span className="value">#{activeStep.step}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Line Execution:</span>
                        <span className="value highlight">Line {activeStep.line} (Col {activeStep.column})</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Action Type:</span>
                        <span className="value">{activeStep.action}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Operations Count:</span>
                        <span className="value">{activeStep.opCount} ops</span>
                      </div>

                      <div className="detail-section">
                        <span className="label">Scope Variables Snapshot:</span>
                        <pre className="json-block">{JSON.stringify(activeStep.scope, null, 2)}</pre>
                      </div>

                      <div className="detail-section">
                        <span className="label">Call Stack Frame Depth:</span>
                        <pre className="json-block">{JSON.stringify(activeStep.stack, null, 2)}</pre>
                      </div>
                    </div>
                  ) : (
                    <div className="stage-empty">No active trace step selected.</div>
                  )}
                </div>
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
