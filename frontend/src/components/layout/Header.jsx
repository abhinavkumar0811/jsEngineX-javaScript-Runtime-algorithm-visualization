import React, { useState, useEffect } from 'react';
import { useTrace, DEVELOPER_THEMES } from '../../context/TraceContext.jsx';
import { ALGORITHM_PRESETS } from '../../constants/algorithmPresets.js';
import JSEngineXLogo from '../common/JSEngineXLogo.jsx';
import KeyboardShortcutsModal from '../common/KeyboardShortcutsModal.jsx';
import ExportModal from '../common/ExportModal.jsx';
import OnboardingTourModal from '../common/OnboardingTourModal.jsx';
import { PlayCircle, CheckCircle2, AlertTriangle, RefreshCw, Palette, Share2, Download, Keyboard, HelpCircle, Sparkles } from 'lucide-react';

export default function Header() {
  const {
    code,
    activePresetId,
    loadPreset,
    theme,
    changeTheme,
    isEvaluating,
    isPlaying,
    setIsPlaying,
    traceError,
    traceSteps,
    currentStepIdx,
    setCurrentStepIdx,
    runCodeTrace
  } = useTrace();

  const [isSharing, setIsSharing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showTour, setShowTour] = useState(false);

  // Global Keyboard Shortcuts Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing inside Monaco editor or inputs
      const activeEl = document.activeElement;
      const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.classList.contains('inputarea'));

      if (isInput && !(e.ctrlKey || e.metaKey)) return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCodeTrace(code);
      } else if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        if (!isInput) {
          e.preventDefault();
          setIsPlaying(!isPlaying);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        if (!isInput) {
          e.preventDefault();
          setCurrentStepIdx((prev) => Math.min(traceSteps.length - 1, prev + 1));
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'j' || e.key === 'J') {
        if (!isInput) {
          e.preventDefault();
          setCurrentStepIdx((prev) => Math.max(0, prev - 1));
        }
      } else if (e.key === 'r' || e.key === 'R') {
        if (!isInput) {
          e.preventDefault();
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }
      } else if (e.key === '?') {
        if (!isInput) {
          e.preventDefault();
          setShowShortcuts((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, isPlaying, traceSteps.length]);

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

        {/* Export Button */}
        <button
          onClick={() => setShowExport(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-glass)',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          title="Export source code or raw trace JSON"
        >
          <Download size={14} color="var(--accent-yellow)" /> Export
        </button>

        {/* Share Snippet Button */}
        <button
          onClick={handleShareSnippet}
          disabled={isSharing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
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

        {/* Keyboard Shortcuts Button */}
        <button
          onClick={() => setShowShortcuts(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 10px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-glass)',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
          title="Developer Keyboard Shortcuts (?)"
        >
          <Keyboard size={15} />
        </button>

        {/* Guided Tour Button */}
        <button
          onClick={() => setShowTour(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'rgba(168, 85, 247, 0.12)',
            color: 'var(--accent-purple)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          title="Start JSEngineX Tour"
        >
          <Sparkles size={14} /> Tour
        </button>

        {/* Status Indicator */}
        {getStatusBadge()}
      </div>

      {/* Modals */}
      <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} code={code} traceSteps={traceSteps} activePresetId={activePresetId} />
      <OnboardingTourModal isOpen={showTour} onClose={() => setShowTour(false)} />
    </header>
  );
}
