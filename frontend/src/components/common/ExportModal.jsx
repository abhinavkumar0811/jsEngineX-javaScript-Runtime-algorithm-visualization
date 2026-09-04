import React from 'react';
import { Download, FileCode, FileJson, Copy, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExportModal({ isOpen, onClose, code, traceSteps, activePresetId }) {
  const [copiedCode, setCopiedCode] = React.useState(false);

  if (!isOpen) return null;

  // Download raw code as .js file
  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePresetId || 'jsenginex-code'}.js`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download full trace steps array as JSON
  const handleDownloadTraceJson = () => {
    const tracePayload = {
      platform: 'JSEngineX',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      presetId: activePresetId,
      code,
      totalSteps: traceSteps.length,
      traceSteps
    };
    const blob = new Blob([JSON.stringify(tracePayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePresetId || 'jsenginex'}-execution-trace.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy code to clipboard
  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)',
            color: 'var(--text-primary)'
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '14px',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(168, 85, 247, 0.15)',
                color: 'var(--accent-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Download size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>
                Export Code & Execution Trace
              </h3>
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

          {/* Export Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Option 1: Trace JSON */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileJson size={24} color="var(--accent-cyan)" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Execution Trace JSON</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {traceSteps.length} step snapshots (Stack, Scope, Heap, Ops)
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadTraceJson}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--accent-cyan)',
                  color: '#000',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Download JSON
              </button>
            </div>

            {/* Option 2: JS Source Code */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileCode size={24} color="var(--accent-yellow)" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>JavaScript Source (.js)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Save active Monaco Code Editor contents
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadCode}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-panel)',
                  color: 'var(--text-primary)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Download JS
              </button>
            </div>

            {/* Option 3: Copy Code */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Copy size={24} color="var(--accent-pink)" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Copy Code to Clipboard</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Copy formatted code string
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyCode}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: copiedCode ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-panel)',
                  color: copiedCode ? 'var(--accent-green)' : 'var(--text-primary)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {copiedCode ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
