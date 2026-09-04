import React from 'react';
import { useTrace } from '../../context/TraceContext.jsx';
import { Terminal, AlertCircle } from 'lucide-react';

export default function ConsolePanel() {
  const { activeStep, traceError } = useTrace();

  const logs = activeStep?.stdout || [];

  return (
    <div className="console-panel-container">
      <div className="panel-header">
        <div className="panel-title">
          <Terminal size={16} color="var(--accent-emerald)" />
          <span>Output Terminal / Console</span>
        </div>
        <span className="console-count">{logs.length} Lines</span>
      </div>

      <div className="console-content">
        {traceError && (
          <div className="console-line error-line">
            <AlertCircle size={14} />
            <span>[Runtime Error]: {traceError}</span>
          </div>
        )}

        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="console-line">
              <span className="console-prompt">&gt;</span>
              <span className="console-text">{log}</span>
            </div>
          ))
        ) : (
          !traceError && (
            <div className="console-empty">
              <span>No stdout logs for this step.</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
