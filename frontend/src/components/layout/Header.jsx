import React, { useState } from 'react';
import { useTrace, DEVELOPER_THEMES } from '../../context/TraceContext.jsx';
import { ALGORITHM_PRESETS } from '../../constants/algorithmPresets.js';
import JSEngineXLogo from '../common/JSEngineXLogo.jsx';
import { PlayCircle, CheckCircle2, AlertTriangle, RefreshCw, Palette, Share2, Copy } from 'lucide-react';

export default function Header() {
  const {
    code,
    activePresetId,
    loadPreset,
    theme,
    changeTheme,
    isEvaluating,
    isPlaying,
    traceError,
    traceSteps,
    currentStepIdx,
    setCode
  } = useTrace();

  const [isSharing, setIsSharing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareSnippet = async () => {
    setIsSharing(true);
    setCopiedLink(false);
    try {
      const response = await fetch('http://localhost:5000/api/v1/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          title: 'Shared JS Trace Snippet',
          category: 'Community'
        })
      });

      const data = await response.json();
      if (data.success && data.data?.shareId) {
        const shareUrl = `${window.location.origin}/?snippet=${data.data.shareId}`;
        await navigator.clipboard.writeText(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
      }
    } catch (err) {
      console.warn('Backend API share fallback:', err);
      // Fallback local share URL using base64 encoding if backend offline
      const encoded = btoa(encodeURIComponent(code));
      const shareUrl = `${window.location.origin}/?code=${encoded}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } finally {
      setIsSharing(false);
    }
  };

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
          <label htmlFor="preset-select">Preset:</label>
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

        {/* 6 Developer Themes Switcher */}
        <div className="theme-selector-container">
          <Palette size={15} color="var(--accent-primary)" />
          <select
            value={theme}
            onChange={(e) => changeTheme(e.target.value)}
            className="theme-dropdown"
            title="Switch Developer IDE Theme"
          >
            {DEVELOPER_THEMES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Share Snippet Button */}
        <button
          onClick={handleShareSnippet}
          disabled={isSharing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: copiedLink ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-glass)',
            color: copiedLink ? 'var(--accent-green)' : 'var(--text-primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Share code snippet & copy link"
        >
          {copiedLink ? (
            <>
              <CheckCircle2 size={14} color="var(--accent-green)" /> Link Copied!
            </>
          ) : (
            <>
              <Share2 size={14} color="var(--accent-cyan)" /> Share
            </>
          )}
        </button>

        {/* Status Indicator */}
        {getStatusBadge()}
      </div>
    </header>
  );
}
