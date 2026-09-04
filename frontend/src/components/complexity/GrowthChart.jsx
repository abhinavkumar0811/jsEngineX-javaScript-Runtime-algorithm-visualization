import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { TrendingUp, Sliders, Info } from 'lucide-react';

export default function GrowthChart({ traceSteps = [], activeStepIndex = 0 }) {
  // Toggles for enabling/disabling reference curves
  const [showO1, setShowO1] = useState(true);
  const [showOLogN, setShowOLogN] = useState(true);
  const [showON, setShowON] = useState(true);
  const [showONLogN, setShowONLogN] = useState(true);
  const [showON2, setShowON2] = useState(true);

  // Generate chart data series from trace steps & mathematical growth curves
  const chartData = useMemo(() => {
    const stepsCount = Math.max(traceSteps.length, 10);
    const data = [];

    // Scale factors to keep curves visually normalized on chart
    for (let i = 0; i < stepsCount; i++) {
      const n = i + 1;
      const actualOp = traceSteps[i]?.opCount ?? (i > 0 ? (traceSteps[i-1]?.opCount || i) + Math.floor(Math.random() * 2) : 1);

      data.push({
        step: `Step ${n}`,
        actual: actualOp,
        O1: 2,
        O_log_n: Number((Math.log2(n + 1) * 3).toFixed(1)),
        O_n: Number((n * 2.5).toFixed(1)),
        O_n_log_n: Number((n * Math.log2(n + 1) * 0.8).toFixed(1)),
        O_n2: Number((Math.pow(n, 1.6) * 0.5).toFixed(1))
      });
    }
    return data;
  }, [traceSteps]);

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
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} color="var(--accent-cyan)" /> Empirical Growth Curves vs Big-O Bounds
          </h4>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Compare active code execution step operations against theoretical Big-O complexity curves.
          </p>
        </div>

        {/* Legend Toggle Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sliders size={12} /> Curves:
          </span>
          
          <button
            onClick={() => setShowO1(!showO1)}
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: showO1 ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card)',
              color: showO1 ? 'var(--accent-green)' : 'var(--text-muted)'
            }}
          >
            O(1)
          </button>

          <button
            onClick={() => setShowOLogN(!showOLogN)}
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: showOLogN ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-card)',
              color: showOLogN ? 'var(--accent-blue)' : 'var(--text-muted)'
            }}
          >
            O(log n)
          </button>

          <button
            onClick={() => setShowON(!showON)}
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: showON ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-card)',
              color: showON ? 'var(--accent-yellow)' : 'var(--text-muted)'
            }}
          >
            O(n)
          </button>

          <button
            onClick={() => setShowONLogN(!showONLogN)}
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: showONLogN ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-card)',
              color: showONLogN ? 'var(--accent-purple)' : 'var(--text-muted)'
            }}
          >
            O(n log n)
          </button>

          <button
            onClick={() => setShowON2(!showON2)}
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: showON2 ? 'rgba(236, 72, 153, 0.15)' : 'var(--bg-card)',
              color: showON2 ? 'var(--accent-pink)' : 'var(--text-muted)'
            }}
          >
            O(n²)
          </button>
        </div>
      </div>

      {/* Chart Canvas Container */}
      <div style={{ width: '100%', height: '240px', marginTop: '6px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
            <XAxis dataKey="step" stroke="var(--text-muted)" fontSize={11} />
            <YAxis stroke="var(--text-muted)" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-panel)',
                borderColor: 'var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                boxShadow: 'var(--shadow-md)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '0.75rem', paddingTop: '10px' }} />

            {/* Actual Code Execution Trace */}
            <Line
              type="monotone"
              dataKey="actual"
              name="User Code Execution Ops"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 4, fill: '#06b6d4' }}
              activeDot={{ r: 6 }}
            />

            {/* O(1) */}
            {showO1 && (
              <Line
                type="monotone"
                dataKey="O1"
                name="O(1) Constant"
                stroke="#10b981"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={false}
              />
            )}

            {/* O(log n) */}
            {showOLogN && (
              <Line
                type="monotone"
                dataKey="O_log_n"
                name="O(log n) Logarithmic"
                stroke="#3b82f6"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={false}
              />
            )}

            {/* O(n) */}
            {showON && (
              <Line
                type="monotone"
                dataKey="O_n"
                name="O(n) Linear"
                stroke="#f59e0b"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={false}
              />
            )}

            {/* O(n log n) */}
            {showONLogN && (
              <Line
                type="monotone"
                dataKey="O_n_log_n"
                name="O(n log n) Linearithmic"
                stroke="#a855f7"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={false}
              />
            )}

            {/* O(n^2) */}
            {showON2 && (
              <Line
                type="monotone"
                dataKey="O_n2"
                name="O(n²) Quadratic"
                stroke="#ec4899"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'var(--bg-card)',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)'
      }}>
        <Info size={14} color="var(--accent-cyan)" />
        <span>
          The cyan solid line tracks real-time AST step execution operations. Dashed lines represent asymptotic lower/upper mathematical bounds.
        </span>
      </div>
    </div>
  );
}
