import React from 'react';

/**
 * Technical Logo for JSEngineX — JavaScript Runtime & Algorithm Visualization
 * Hexagonal Engine Core with JS emblem and neon energy circuit lines.
 */
export default function JSEngineXLogo({ size = 38 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="jsenginex-logo-svg"
    >
      <defs>
        {/* Neon Core Gradients */}
        <linearGradient id="engineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        <linearGradient id="coreGlow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        <filter id="neonGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hexagonal Engine Outer Shell */}
      <polygon
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
        fill="#121824"
        stroke="url(#engineGrad)"
        strokeWidth="3.5"
        filter="url(#neonGlowFilter)"
      />

      {/* Internal Circuit Lines */}
      <path
        d="M50 5 L50 25 M90 27.5 L70 38 M90 72.5 L70 62 M50 95 L50 75 M10 72.5 L30 62 M10 27.5 L30 38"
        stroke="url(#engineGrad)"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />

      {/* Center Core Engine Box */}
      <rect
        x="30"
        y="30"
        width="40"
        height="40"
        rx="8"
        fill="#0a0d14"
        stroke="url(#coreGlow)"
        strokeWidth="2"
      />

      {/* JS Emblem Text */}
      <text
        x="37"
        y="58"
        fill="#f8fafc"
        fontSize="22"
        fontWeight="800"
        fontFamily="Fira Code, monospace"
        letterSpacing="-1"
      >
        JS
      </text>

      {/* X Spark Energy Nodes */}
      <circle cx="50" cy="15" r="3" fill="#06b6d4" />
      <circle cx="80" cy="32" r="3" fill="#6366f1" />
      <circle cx="80" cy="68" r="3" fill="#10b981" />
      <circle cx="50" cy="85" r="3" fill="#f59e0b" />
      <circle cx="20" cy="68" r="3" fill="#8b5cf6" />
      <circle cx="20" cy="32" r="3" fill="#06b6d4" />
    </svg>
  );
}
