import React from 'react';
import { useTrace } from '../../context/TraceContext.jsx';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Zap, Gauge } from 'lucide-react';

export default function StepControls() {
  const {
    traceSteps,
    currentStepIdx,
    activeStep,
    isPlaying,
    togglePlay,
    nextStep,
    prevStep,
    seekStep,
    resetTrace,
    playbackSpeed,
    setPlaybackSpeed,
    runCodeTrace,
    code,
    isEvaluating
  } = useTrace();

  const totalSteps = traceSteps.length;

  return (
    <div className="step-controls-bar glass-panel">
      {/* Control Buttons */}
      <div className="controls-group">
        <button
          onClick={() => runCodeTrace(code)}
          disabled={isEvaluating}
          className="btn btn-primary"
          title="Re-run AST Trace Engine"
        >
          <Zap size={16} /> Run Engine
        </button>

        <button
          onClick={resetTrace}
          disabled={totalSteps === 0}
          className="btn btn-icon"
          title="Reset to Step 0"
        >
          <RotateCcw size={16} />
        </button>

        <button
          onClick={prevStep}
          disabled={currentStepIdx === 0 || totalSteps === 0}
          className="btn btn-icon"
          title="Previous Step"
        >
          <SkipBack size={16} />
        </button>

        <button
          onClick={togglePlay}
          disabled={totalSteps === 0}
          className="btn btn-accent"
          title={isPlaying ? 'Pause Playback' : 'Play Trace Animation'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button
          onClick={nextStep}
          disabled={currentStepIdx >= totalSteps - 1 || totalSteps === 0}
          className="btn btn-icon"
          title="Next Step"
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Timeline Scrubber */}
      <div className="timeline-scrubber-container">
        <span className="step-counter">
          Step {totalSteps > 0 ? currentStepIdx + 1 : 0} / {totalSteps}
        </span>
        <input
          type="range"
          min="0"
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIdx}
          onChange={(e) => seekStep(Number(e.target.value))}
          disabled={totalSteps === 0}
          className="scrubber-slider"
        />
      </div>

      {/* Speed & Op Metrics */}
      <div className="metrics-group">
        <div className="speed-selector">
          <Gauge size={14} color="var(--text-secondary)" />
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="speed-dropdown"
          >
            <option value={0.25}>0.25x</option>
            <option value={0.5}>0.5x</option>
            <option value={1}>1.0x</option>
            <option value={2}>2.0x</option>
            <option value={5}>5.0x</option>
          </select>
        </div>

        {activeStep && (
          <div className="op-count-badge">
            ⚡ {activeStep.opCount || 0} Ops
          </div>
        )}
      </div>
    </div>
  );
}
