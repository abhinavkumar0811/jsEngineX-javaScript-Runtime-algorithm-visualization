import React from 'react';
import { useTrace } from '../../context/TraceContext.jsx';
import { ALGORITHM_PRESETS } from '../../constants/algorithmPresets.js';
import JSEngineXLogo from '../common/JSEngineXLogo.jsx';
import { PlayCircle, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

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
        <div className="brand-logo-wrapper">
          <JSEngineXLogo size={42} />
        </div>
        <div className="brand-text">
          <h2>
            JSEngine<span className="brand-x">X</span>
          </h2>
          <span className="brand-subtitle">JavaScript Runtime & Algorithm Visualization</span>
        </div>
      </div>

      <div className="header-actions">
        {/* Preset Selector */}
        <div className="preset-selector-container">
          <label htmlFor="preset-select">Algorithm Preset:</label>
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
