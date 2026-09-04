import React, { useMemo, useState } from 'react';
import { parse } from '@babel/parser';
import { useTrace } from '../../context/TraceContext.jsx';
import { Code2, ChevronRight, ChevronDown, Binary, CheckCircle2 } from 'lucide-react';

export default function ASTTab() {
  const { code, activeStep } = useTrace();
  const activeLine = activeStep?.line || 1;

  // Parse code into AST JSON structure
  const astData = useMemo(() => {
    try {
      const parsed = parse(code, {
        sourceType: 'module',
        plugins: ['jsx']
      });
      return parsed;
    } catch (err) {
      return null;
    }
  }, [code]);

  // Recursively render AST node items
  const renderASTNode = (node, keyName = 'program', depth = 0) => {
    if (!node || typeof node !== 'object') return null;

    const nodeType = node.type || typeof node;
    const startLine = node.loc?.start?.line;
    const endLine = node.loc?.end?.line;
    const isActiveNode = startLine && activeLine >= startLine && activeLine <= (endLine || startLine);

    if (Array.isArray(node)) {
      return (
        <div key={keyName} style={{ paddingLeft: `${depth * 12}px` }}>
          {node.map((child, idx) => renderASTNode(child, `${keyName}-${idx}`, depth))}
        </div>
      );
    }

    if (!node.type) return null;

    return (
      <div
        key={`${node.type}-${startLine}-${depth}`}
        style={{
          paddingLeft: `${Math.min(depth * 14, 120)}px`,
          margin: '4px 0'
        }}
      >
        <div
          style={{
            background: isActiveNode ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
            border: isActiveNode ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '6px 10px',
            fontSize: '0.78rem',
            fontFamily: 'Fira Code, monospace',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: isActiveNode ? '0 0 10px rgba(6, 182, 212, 0.3)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: isActiveNode ? 'var(--accent-cyan)' : 'var(--accent-purple)', fontWeight: 700 }}>
              {node.type}
            </span>
            {node.id?.name && (
              <span style={{ color: 'var(--accent-yellow)', fontWeight: 600 }}>
                id: "{node.id.name}"
              </span>
            )}
          </div>

          {startLine && (
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Line {startLine}{endLine && endLine !== startLine ? `-${endLine}` : ''}
            </span>
          )}
        </div>

        {/* Render child AST properties */}
        {node.body && Array.isArray(node.body) && (
          <div style={{ marginTop: '2px' }}>
            {node.body.map((b, idx) => renderASTNode(b, `body-${idx}`, depth + 1))}
          </div>
        )}
        {node.body && !Array.isArray(node.body) && renderASTNode(node.body, 'body', depth + 1)}
        {node.declarations && Array.isArray(node.declarations) && (
          <div style={{ marginTop: '2px' }}>
            {node.declarations.map((d, idx) => renderASTNode(d, `decl-${idx}`, depth + 1))}
          </div>
        )}
      </div>
    );
  };

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
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code2 size={16} color="var(--accent-cyan)" />
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Babel Abstract Syntax Tree (AST) Inspector</span>
        </div>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Active Execution Pointer: Line {activeLine}
        </span>
      </div>

      {/* AST Tree Container */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto'
      }}>
        {astData ? (
          renderASTNode(astData.program, 'program', 0)
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <Binary size={28} style={{ marginBottom: '8px' }} />
            <span>Parsing Babel AST tree...</span>
          </div>
        )}
      </div>
    </div>
  );
}
