import React from 'react';
import { useTrace } from '../../context/TraceContext.jsx';
import { AlertOctagon, CornerDownLeft, ShieldCheck } from 'lucide-react';

export default function ErrorUnwinder() {
  const { activeStep, traceError } = useTrace();

  const isErrorStep = activeStep?.action === 'ERROR' || Boolean(traceError);
  const errorMessage = traceError || activeStep?.error || 'No active exception.';

  return (
    <div className="visualizer-card glass-panel">
      <div className="card-header">
        <div className="card-title">
          <AlertOctagon size={16} color={isErrorStep ? 'var(--accent-rose)' : 'var(--accent-emerald)'} />
          <span>Error Lifecycle & Stack Unwinder</span>
        </div>
        <span className={`status-badge ${isErrorStep ? 'status-error' : 'status-ready'}`}>
          {isErrorStep ? 'Exception Raised' : 'Normal Execution'}
        </span>
      </div>

      <div className="unwinder-stage">
        {isErrorStep ? (
          <div className="error-unwind-details">
            <div className="error-banner">
              <AlertOctagon size={20} color="var(--accent-rose)" />
              <div>
                <strong>Uncaught Exception:</strong>
                <p>{errorMessage}</p>
              </div>
            </div>

            <div className="unwind-path">
              <h5>Stack Unwinding Sequence:</h5>
              <div className="unwind-step">
                <CornerDownLeft size={14} color="var(--accent-rose)" />
                <span>Throw Statement executed at Line L{activeStep?.line || 1}</span>
              </div>
              <div className="unwind-step">
                <CornerDownLeft size={14} color="var(--accent-amber)" />
                <span>Unwinding active stack frames to find nearest try/catch block...</span>
              </div>
              <div className="unwind-step">
                <CornerDownLeft size={14} color="var(--accent-rose)" />
                <span>No try/catch handler found. Terminating context & triggering console error.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="normal-execution-box">
            <ShieldCheck size={28} color="var(--accent-emerald)" />
            <span>Execution proceeding without errors. Try/Catch safety handlers monitoring.</span>
          </div>
        )}
      </div>
    </div>
  );
}
