import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrace } from '../../context/TraceContext.jsx';
import { BarChart3, ArrowDown } from 'lucide-react';

export default function ArrayViz() {
  const { activeStep } = useTrace();

  // Extract array from scope state or details
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
  ['i', 'j', 'low', 'high', 'mid', 'k', 'temp'].forEach((pKey) => {
    if (typeof scope[pKey] === 'number') {
      pointers[pKey] = scope[pKey];
    }
  });

  const getElementState = (idx) => {
    // Check if comparing or swapping
    const action = activeStep?.action || '';
    if (action === 'ARRAY_SWAP') return 'swapping';
    if (action === 'ARRAY_COMPARE') return 'comparing';

    // Highlight active pointers
    if (Object.values(pointers).includes(idx)) return 'active';
    return 'default';
  };

  return (
    <div className="visualizer-card glass-panel">
      <div className="card-header">
        <div className="card-title">
          <BarChart3 size={16} color="var(--accent-primary)" />
          <span>Array & Linear Structure Visualizer ({arrayVarName})</span>
        </div>
        <span className="count-badge">{arrayData.length} Elements</span>
      </div>

      <div className="array-viz-stage">
        {/* Pointers Legend Badges */}
        <div className="pointers-legend">
          {Object.entries(pointers).map(([pName, pIdx]) => (
            <span key={pName} className={`pointer-badge badge-${pName}`}>
              {pName} = {pIdx}
            </span>
          ))}
        </div>

        {/* Animated Array Bars */}
        <div className="bars-container">
          <AnimatePresence mode="popLayout">
            {arrayData.map((val, idx) => {
              const heightPercent = Math.max(15, Math.min(100, (val / maxVal) * 100));
              const state = getElementState(idx);

              // Find pointers pointing to this index
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
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Pointer Arrow */}
                  {activePointerNames.length > 0 && (
                    <div className="pointer-arrow-group">
                      <ArrowDown size={14} color="var(--accent-cyan)" />
                      <span className="pointer-labels">{activePointerNames.join(', ')}</span>
                    </div>
                  )}

                  <span className="bar-value">{val}</span>
                  <span className="bar-index">[{idx}]</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
