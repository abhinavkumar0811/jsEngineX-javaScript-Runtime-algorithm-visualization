import React, { useState } from 'react';
import OpCounter from './OpCounter';
import GrowthChart from './GrowthChart';
import MathProof from './MathProof';
import { useTrace } from '../../context/TraceContext';
import { Activity, TrendingUp, Calculator, LayoutGrid } from 'lucide-react';

export default function ComplexityTab() {
  const { traceSteps, currentStepIdx } = useTrace();
  const activeStep = traceSteps?.[currentStepIdx] || null;
  const [activeSubTab, setActiveSubTab] = useState('all');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: 'var(--bg-panel)',
      color: 'var(--text-primary)',
      overflow: 'hidden'
    }}>
      {/* Sub-tab Navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveSubTab('all')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: activeSubTab === 'all' ? 'var(--accent-cyan)' : 'transparent',
              color: activeSubTab === 'all' ? '#000' : 'var(--text-secondary)'
            }}
          >
            <LayoutGrid size={14} /> Full Dashboard
          </button>

          <button
            onClick={() => setActiveSubTab('ops')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: activeSubTab === 'ops' ? 'var(--accent-cyan)' : 'transparent',
              color: activeSubTab === 'ops' ? '#000' : 'var(--text-secondary)'
            }}
          >
            <Activity size={14} /> Atomic Ops
          </button>

          <button
            onClick={() => setActiveSubTab('chart')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: activeSubTab === 'chart' ? 'var(--accent-cyan)' : 'transparent',
              color: activeSubTab === 'chart' ? '#000' : 'var(--text-secondary)'
            }}
          >
            <TrendingUp size={14} /> Growth Chart
          </button>

          <button
            onClick={() => setActiveSubTab('proof')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: activeSubTab === 'proof' ? 'var(--accent-cyan)' : 'transparent',
              color: activeSubTab === 'proof' ? '#000' : 'var(--text-secondary)'
            }}
          >
            <Calculator size={14} /> LaTeX Proofs
          </button>
        </div>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Phase 5 — Complexity Analyzer
        </span>
      </div>

      {/* Workspace Sub-tab Contents */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {activeSubTab === 'all' && (
          <>
            <OpCounter activeStep={activeStep} traceSteps={traceSteps} />
            <GrowthChart traceSteps={traceSteps} activeStepIndex={currentStepIdx} />
            <MathProof />
          </>
        )}

        {activeSubTab === 'ops' && (
          <OpCounter activeStep={activeStep} traceSteps={traceSteps} />
        )}

        {activeSubTab === 'chart' && (
          <GrowthChart traceSteps={traceSteps} activeStepIndex={currentStepIdx} />
        )}

        {activeSubTab === 'proof' && (
          <MathProof />
        )}
      </div>
    </div>
  );
}
