import React from 'react';
import { useTrace } from '../../context/TraceContext.jsx';
import { ALGORITHM_PRESETS } from '../../constants/algorithmPresets.js';
import { Cpu, PlayCircle, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function Header() {
  const { activePresetId, loadPreset, isEvaluating, isPlaying, traceError, traceSteps, currentStepIdx } = useTrace();

  const getStatusBadge = () => {
    if (isEvaluating) {
      return (
        <span className="status-badge status-evaluating">
          <RefreshCw className="animate-spin" size={14} /> Parsing AST & Tracing...
        </span>
      );
    }
    if (traceError) {
      return (
        <span className="status-badge status-error">
          <AlertTriangle size={14} /> Error Detected
        </span>
      );
    }
    if (isPlaying) {
      return (
        <span className="status-badge status-playing">
          <PlayCircle size={14} /> Playing Step {currentStepIdx + 1}
        </span>
      );
    }
    if (traceSteps.length > 0) {
      return (
        <span className="status-badge status-ready">
          <CheckCircle2 size={14} /> Ready ({traceSteps.length} Steps)
        </span>
      );
    }
    return null;
  };

  return (
    <header className="app-header glass-panel">
      <div className="header-brand">
        <div className="brand-icon">
          <Cpu size={22} color="var(--accent-primary)" />
        </div>
        <div className="brand-text">
          <h2>CS Execution Platform</h2>
          <span className="brand-subtitle">JS Internals & AST Visualization</span>
        </div>
      </div>

      <div className="header-actions">
        {/* Preset Selector */}
        <div className="preset-selector-container">
          <label htmlFor="preset-select">Code Preset:</label>
          <select
            id="preset-select"
            value={activePresetId}
            onChange={(e) => loadPreset(e.target.value)}
            className="preset-dropdown"
          >
            {ALGORITHM_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.category} — {preset.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Indicator */}
        {getStatusBadge()}
      </div>
    </header>
  );
}
