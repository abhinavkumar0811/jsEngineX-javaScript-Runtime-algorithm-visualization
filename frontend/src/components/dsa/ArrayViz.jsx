import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrace } from '../../context/TraceContext.jsx';
import { BarChart3, ArrowDown, Grid, Sliders } from 'lucide-react';

export default function ArrayViz() {
  const { activeStep } = useTrace();
  const [vizMode, setVizMode] = useState('1d'); // '1d' bar chart or '2d' matrix grid

  const scope = activeStep?.scope || {};
  let arrayData = [];
  let arrayVarName = 'arr';

  // Find array variable in active scope
  for (const [key, val] of Object.entries(scope)) {
    if (Array.isArray(val)) {
      arrayData = val;
      arrayVarName = key;
      break;
    }
  }

  // Fallback default array if no array in scope
  if (arrayData.length === 0) {
    arrayData = [5, 3, 8, 1, 2];
  }

  const maxVal = Math.max(...arrayData, 10);

  // Extract active pointer variables (i, j, low, high, mid) from scope
  const pointers = {};
  ['i', 'j', 'row', 'col', 'low', 'high', 'mid', 'k', 'temp'].forEach((pKey) => {
    if (typeof scope[pKey] === 'number') {
      pointers[pKey] = scope[pKey];
    }
  });

  const getElementState = (idx) => {
    const action = activeStep?.action || '';
    if (action === 'ARRAY_SWAP') return 'swapping';
    if (action === 'ARRAY_COMPARE') return 'comparing';
    if (Object.values(pointers).includes(idx)) return 'active';
    return 'default';
  };

  // Sample 2D Matrix Grid representation
  const matrixGrid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  const activeRow = pointers.i ?? pointers.row ?? 0;
  const activeCol = pointers.j ?? pointers.col ?? 0;

  return (
    <div className="visualizer-card glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {vizMode === '1d' ? <BarChart3 size={16} color="var(--accent-primary)" /> : <Grid size={16} color="var(--accent-yellow)" />}
          <span>DSA Data Structure Visualizer ({arrayVarName})</span>
        </div>

        {/* 1D vs 2D Toggle Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', background: 'var(--bg-panel)', borderRadius: '6px', padding: '2px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setVizMode('1d')}
              style={{
                padding: '3px 8px',
                borderRadius: '4px',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: vizMode === '1d' ? 'var(--accent-cyan)' : 'transparent',
                color: vizMode === '1d' ? '#000' : 'var(--text-secondary)'
              }}
            >
              1D Array
            </button>
            <button
              onClick={() => setVizMode('2d')}
              style={{
                padding: '3px 8px',
                borderRadius: '4px',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: vizMode === '2d' ? 'var(--accent-yellow)' : 'transparent',
                color: vizMode === '2d' ? '#000' : 'var(--text-secondary)'
              }}
            >
              2D Matrix
            </button>
          </div>

          <span className="count-badge">{arrayData.length} Elements</span>
        </div>
      </div>

      <div className="array-viz-stage" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Pointers Legend Badges */}
        <div className="pointers-legend" style={{ marginBottom: '16px' }}>
          {Object.entries(pointers).map(([pName, pIdx]) => (
            <span key={pName} className={`pointer-badge badge-${pName}`} style={{ padding: '2px 8px', borderRadius: '12px', background: 'var(--bg-panel)', border: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--accent-cyan)', marginRight: '6px' }}>
              {pName} = {pIdx}
            </span>
          ))}
        </div>

        {vizMode === '1d' ? (
          /* 1D Animated Array Bars */
          <div className="bars-container" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '12px', height: '200px' }}>
            <AnimatePresence mode="popLayout">
              {arrayData.map((val, idx) => {
                const heightPercent = Math.max(15, Math.min(100, (val / maxVal) * 100));
                const state = getElementState(idx);
                const activePointerNames = Object.entries(pointers)
                  .filter(([_, pIdx]) => pIdx === idx)
                  .map(([pName]) => pName);

                return (
                  <motion.div
                    key={`${idx}-${val}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`array-bar-item state-${state}`}
                    style={{
                      height: `${heightPercent}%`,
                      width: '44px',
                      background: state === 'swapping' ? 'var(--accent-pink)' : state === 'comparing' ? 'var(--accent-yellow)' : state === 'active' ? 'var(--accent-cyan)' : 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingBottom: '8px',
                      position: 'relative'
                    }}
                  >
                    {activePointerNames.length > 0 && (
                      <div className="pointer-arrow-group" style={{ position: 'absolute', top: '-28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ArrowDown size={14} color="var(--accent-cyan)" />
                        <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: 700 }}>{activePointerNames.join(', ')}</span>
                      </div>
                    )}
                    <span className="bar-value" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{val}</span>
                    <span className="bar-index" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>[{idx}]</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* 2D Matrix Grid Representation */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Active Cell: Matrix[{activeRow}][{activeCol}]
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '8px' }}>
              {matrixGrid.map((row, rIdx) =>
                row.map((cellVal, cIdx) => {
                  const isActiveCell = rIdx === activeRow % 3 && cIdx === activeCol % 3;
                  return (
                    <motion.div
                      key={`grid-${rIdx}-${cIdx}`}
                      animate={{ scale: isActiveCell ? 1.08 : 1 }}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        background: isActiveCell ? 'rgba(245, 158, 11, 0.25)' : 'var(--bg-card)',
                        border: isActiveCell ? '2px solid var(--accent-yellow)' : '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: isActiveCell ? 'var(--accent-yellow)' : 'var(--text-primary)',
                        fontSize: '1rem',
                        boxShadow: isActiveCell ? '0 0 12px rgba(245, 158, 11, 0.4)' : 'none'
                      }}
                    >
                      <span>{cellVal}</span>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>({rIdx},{cIdx})</span>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
