import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { BookOpen, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';

export default function MathProof({ presetKey = 'bubble-sort' }) {
  const [selectedProof, setSelectedProof] = useState('bubble');

  return (
    <div style={{
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%',
      backdropFilter: 'blur(8px)',
      color: 'var(--text-primary)'
    }}>
      {/* Header & Theorem Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator size={16} color="var(--accent-purple)" /> Mathematical Derivations & LaTeX Proofs
          </h4>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Formal mathematical step proofs rendered using KaTeX.
          </p>
        </div>

        {/* Proof Preset Selector */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setSelectedProof('bubble')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: selectedProof === 'bubble' ? 'rgba(236, 72, 153, 0.15)' : 'var(--bg-card)',
              color: selectedProof === 'bubble' ? 'var(--accent-pink)' : 'var(--text-secondary)'
            }}
          >
            Bubble Sort O(n²)
          </button>

          <button
            onClick={() => setSelectedProof('binary')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: selectedProof === 'binary' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-card)',
              color: selectedProof === 'binary' ? 'var(--accent-blue)' : 'var(--text-secondary)'
            }}
          >
            Binary Search O(log n)
          </button>

          <button
            onClick={() => setSelectedProof('divide')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: selectedProof === 'divide' ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-card)',
              color: selectedProof === 'divide' ? 'var(--accent-purple)' : 'var(--text-secondary)'
            }}
          >
            Master Theorem O(n log n)
          </button>
        </div>
      </div>

      {/* Proof Content Box */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {selectedProof === 'bubble' && (
          <>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} /> Summation Series Proof for Nested Loop Comparisons
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              For an array of size <InlineMath math="n" />, the outer loop executes <InlineMath math="n-1" /> iterations. The inner loop executes <InlineMath math="n - i" /> comparisons per pass.
            </div>

            <div style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <BlockMath math="T(n) = \sum_{i=1}^{n-1} (n - i) = (n - 1) + (n - 2) + \dots + 2 + 1" />
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Applying arithmetic series closed-form identity:
            </div>

            <div style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
              color: 'var(--accent-pink)'
            }}>
              <BlockMath math="T(n) = \frac{(n-1)n}{2} = \frac{n^2 - n}{2} \in \Theta(n^2)" />
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} /> Asymptotic Upper Bound: <InlineMath math="O(n^2)" /> quadratic time complexity proven.
            </div>
          </>
        )}

        {selectedProof === 'binary' && (
          <>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} /> Search Space Halving Recurrence Proof
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              At each step <InlineMath math="k" />, Binary Search divides the remaining search interval in half. Termination occurs when interval size is 1:
            </div>

            <div style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <BlockMath math="\frac{n}{2^k} = 1 \implies 2^k = n" />
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Taking base-2 logarithm of both sides:
            </div>

            <div style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
              color: 'var(--accent-blue)'
            }}>
              <BlockMath math="k = \log_2 n \implies T(n) = \Theta(\log_2 n)" />
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} /> Asymptotic Logarithmic Bound: <InlineMath math="O(\log n)" /> proven.
            </div>
          </>
        )}

        {selectedProof === 'divide' && (
          <>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} /> Master Theorem Recurrence Relation Proof
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Divide & Conquer algorithms split problems of size <InlineMath math="n" /> into <InlineMath math="a" /> subproblems of size <InlineMath math="n/b" /> with combination cost <InlineMath math="f(n)" />:
            </div>

            <div style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
              color: 'var(--accent-purple)'
            }}>
              <BlockMath math="T(n) = 2T\left(\frac{n}{2}\right) + \Theta(n)" />
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Applying Master Theorem Case 2 (<InlineMath math="a = 2, b = 2, f(n) = n = n^{\log_b a}" />):
            </div>

            <div style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <BlockMath math="T(n) = \Theta(n^{\log_b a} \log n) = \Theta(n \log n)" />
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} /> Asymptotic Linearithmic Bound: <InlineMath math="O(n \log n)" /> proven.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
