import React, { useState } from 'react';
import { X, Sparkles, ChevronRight, ChevronLeft, Check, Layers, Cpu, Activity, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingTourModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      icon: <Sparkles size={28} color="var(--accent-cyan)" />,
      title: 'Welcome to JSEngineX',
      description: 'An industry-grade JavaScript Runtime & Algorithm Visualization platform. Powered by an off-main-thread Web Worker AST execution engine for smooth 60 FPS visual rendering.'
    },
    {
      icon: <Cpu size={28} color="var(--accent-yellow)" />,
      title: 'Monaco Code Editor & Playback Scrubber',
      description: 'Write JavaScript code in full VS Code editor. Use the step scrubber bar to Play, Pause, Step Next/Prev, or seek to any execution step frame.'
    },
    {
      icon: <Layers size={28} color="var(--accent-purple)" />,
      title: 'JavaScript Runtime Internals Visualizer',
      description: 'Demystify JavaScript under the hood! Inspect the Call Stack (LIFO), Scope Chain variable bindings, Heap Memory Object graph, and Event Loop rotators.'
    },
    {
      icon: <Activity size={28} color="var(--accent-pink)" />,
      title: 'DSA Visualizers & Big-O Complexity',
      description: 'Watch array bar swaps with Framer Motion physics, tree traversals with React Flow, real-time operation counters, Recharts growth curves, and KaTeX mathematical proofs.'
    },
    {
      icon: <Palette size={28} color="var(--accent-green)" />,
      title: '6 Developer Themes & 1-Click Link Sharing',
      description: 'Personalize your workspace with 6 coder-favorite dark/light themes (Tokyo Night, Dracula, One Dark Pro, GitHub Dark, SynthWave \'84, GitHub Light). Share snippets instantly with shareable URL links!'
    }
  ];

  const current = tourSteps[step];

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <motion.div
          key={step}
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            padding: '28px',
            boxShadow: 'var(--shadow-lg)',
            color: 'var(--text-primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Step {step + 1} of {tourSteps.length}
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Icon & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {current.icon}
            </div>

            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                {current.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            {current.description}
          </p>

          {/* Progress Indicators */}
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', margin: '6px 0' }}>
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: idx === step ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: idx === step ? 'var(--accent-cyan)' : 'var(--border-color)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          {/* Footer Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
            <button
              disabled={step === 0}
              onClick={() => setStep(prev => prev - 1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: step === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: step === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < tourSteps.length - 1 ? (
              <button
                onClick={() => setStep(prev => prev + 1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--accent-cyan)',
                  color: '#000',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--accent-green)',
                  color: '#000',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Get Started <Check size={16} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
