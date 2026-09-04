import React from 'react';
import { useTrace } from '../../context/TraceContext.jsx';
import { RefreshCw, Clock, Zap, CheckCircle2 } from 'lucide-react';

export default function EventLoop() {
  const { activeStep, isPlaying } = useTrace();

  const isAsyncStep = activeStep?.action?.includes('ASYNC') || activeStep?.details?.logs?.length > 0;

  return (
    <div className="visualizer-card glass-panel">
      <div className="card-header">
        <div className="card-title">
          <RefreshCw size={16} color="var(--accent-primary)" />
          <span>JS Event Loop & Queue Phases</span>
        </div>
        <span className={`status-badge ${isAsyncStep ? 'status-playing' : 'status-ready'}`}>
          {isAsyncStep ? 'Processing Callback' : 'Event Loop Active'}
        </span>
      </div>

      <div className="event-loop-stage">
        {/* Animated Rotator Wheel */}
        <div className="wheel-container">
          <div className={`rotator-ring ${isPlaying ? 'spin-ring' : ''}`}>
            <div className="phase-dot dot-stack">Call Stack</div>
            <div className="phase-dot dot-micro">Microtasks</div>
            <div className="phase-dot dot-task">Task Queue</div>
            <div className="phase-dot dot-idle">Render / Idle</div>
          </div>
          <div className="wheel-center">
            <RefreshCw size={24} className={isPlaying ? 'animate-spin' : ''} color="var(--accent-primary)" />
            <span>Event Loop</span>
          </div>
        </div>

        {/* Queues Status Panel */}
        <div className="queues-panel">
          <div className="queue-card queue-stack">
            <div className="queue-title">
              <Zap size={14} color="var(--accent-cyan)" />
              <span>Call Stack Frame</span>
            </div>
            <div className="queue-badge">
              {activeStep?.stack?.length || 1} Active
            </div>
          </div>

          <div className="queue-card queue-micro">
            <div className="queue-title">
              <CheckCircle2 size={14} color="var(--accent-emerald)" />
              <span>Microtask Queue (Promises)</span>
            </div>
            <div className="queue-badge">
              {activeStep?.details?.microtasks || 0} Pending
            </div>
          </div>

          <div className="queue-card queue-task">
            <div className="queue-title">
              <Clock size={14} color="var(--accent-amber)" />
              <span>Task Queue (setTimeout / I/O)</span>
            </div>
            <div className="queue-badge">
              {activeStep?.details?.tasks || 0} Pending
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
