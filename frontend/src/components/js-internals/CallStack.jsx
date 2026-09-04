import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrace } from '../../context/TraceContext.jsx';
import { Layers, ArrowUpRight } from 'lucide-react';

export default function CallStack() {
  const { activeStep } = useTrace();

  const stackFrames = activeStep?.stack || [{ name: '<global>', line: 1 }];

  return (
    <div className="visualizer-card glass-panel">
      <div className="card-header">
        <div className="card-title">
          <Layers size={16} color="var(--accent-secondary)" />
          <span>Call Stack (LIFO)</span>
        </div>
        <span className="depth-badge">{stackFrames.length} Frame(s)</span>
      </div>

      <div className="call-stack-container">
        <AnimatePresence mode="popLayout">
          {stackFrames.slice().reverse().map((frame, index) => {
            const frameDepth = stackFrames.length - index;
            const isTopFrame = index === 0;

            return (
              <motion.div
                key={`${frame.name}-${frameDepth}`}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`stack-frame-card ${isTopFrame ? 'top-frame' : ''}`}
              >
                <div className="frame-meta">
                  <span className="frame-name">{frame.name}</span>
                  {isTopFrame && <span className="top-indicator">Active</span>}
                </div>
                <div className="frame-line">
                  <ArrowUpRight size={12} />
                  <span>Line L{frame.line || activeStep?.line || 1}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
