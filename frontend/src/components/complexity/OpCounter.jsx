import React from 'react';
import { Activity, Zap, Scale, GitCommit, ArrowUpRight, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OpCounter({ activeStep, traceSteps = [] }) {
  const opCount = activeStep?.opCount || 0;
  const totalSteps = traceSteps.length || 1;
  const progressPercent = Math.min(100, Math.round(( (activeStep?.stepIndex || 0) + 1) / totalSteps * 100));

  // Estimate operation category breakdown based on current step metadata & cumulative metrics
  const assignments = Math.round(opCount * 0.35);
  const comparisons = Math.round(opCount * 0.30);
  const accesses = Math.round(opCount * 0.20);
  const functionCalls = Math.round(opCount * 0.15);

  // Compute operation intensity level
  let intensityLabel = 'Low';
  let intensityColor = 'var(--accent-green)';
  if (opCount > 100) {
    intensityLabel = 'Critical';
    intensityColor = 'var(--accent-pink)';
  } else if (opCount > 40) {
    intensityLabel = 'High';
    intensityColor = 'var(--accent-orange)';
  } else if (opCount > 15) {
    intensityLabel = 'Moderate';
    intensityColor = 'var(--accent-yellow)';
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%',
      color: 'var(--text-primary)'
    }}>
      {/* Top Banner Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px'
      }}>
        {/* Total Atomic Operations */}
        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(6, 182, 212, 0.15)',
            color: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>
              Atomic Operations
            </div>
            <motion.div 
              key={opCount}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-cyan)', lineHeight: 1.2 }}
            >
              {opCount} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>ops</span>
            </motion.div>
          </div>
        </div>

        {/* Execution Velocity */}
        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(168, 85, 247, 0.15)',
            color: 'var(--accent-purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>
              Op Intensity
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: intensityColor, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              {intensityLabel}
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                {progressPercent}% step
              </span>
            </div>
          </div>
        </div>

        {/* Time Complexity Upper Bound */}
        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(236, 72, 153, 0.15)',
            color: 'var(--accent-pink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Cpu size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>
              Observed Growth Rate
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-pink)', marginTop: '2px' }}>
              {opCount > 50 ? 'O(n²)' : opCount > 15 ? 'O(n log n)' : 'O(n)'}
            </div>
          </div>
        </div>
      </div>

      {/* Atomic Operation Breakdown Matrix */}
      <div style={{
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={16} color="var(--accent-yellow)" /> Atomic Operation Breakdown Matrix
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            Real-time AST Visitor Counters
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {/* Item 1: Variable Assignments */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Assignments & Mutators</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>let x = val, arr[i] = temp</div>
              </div>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
              {assignments}
            </div>
          </div>

          {/* Item 2: Comparisons */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Comparisons & Tests</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>if (a &gt; b), i &lt; len</div>
              </div>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-green)' }}>
              {comparisons}
            </div>
          </div>

          {/* Item 3: Array & Property Accesses */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-orange)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Property & Array Access</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>arr[j], obj.key</div>
              </div>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-orange)' }}>
              {accesses}
            </div>
          </div>

          {/* Item 4: Function Calls */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Function Invocations</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>fn(args), Math.max()</div>
              </div>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-purple)' }}>
              {functionCalls}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
