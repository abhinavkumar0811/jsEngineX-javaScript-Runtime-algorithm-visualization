import React from 'react';
import { useTrace } from '../../context/TraceContext.jsx';
import { Network, Variable, Box } from 'lucide-react';

export default function ScopeChain() {
  const { activeStep } = useTrace();

  const scopeVariables = activeStep?.scope || {};
  const varEntries = Object.entries(scopeVariables);

  const getVarType = (val) => {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'Array';
    return typeof val;
  };

  return (
    <div className="visualizer-card glass-panel">
      <div className="card-header">
        <div className="card-title">
          <Network size={16} color="var(--accent-primary)" />
          <span>Execution Context & Scope Chain</span>
        </div>
        <span className="count-badge">{varEntries.length} Variable(s)</span>
      </div>

      <div className="scope-chain-container">
        {varEntries.length > 0 ? (
          <div className="scope-variables-grid">
            {varEntries.map(([name, val]) => {
              const varType = getVarType(val);
              const isObjectOrArray = varType === 'object' || varType === 'Array';

              return (
                <div key={name} className="variable-card">
                  <div className="var-header">
                    <div className="var-title">
                      <Variable size={14} color="var(--accent-amber)" />
                      <span className="var-name">{name}</span>
                    </div>
                    <span className={`type-tag type-${varType.toLowerCase()}`}>
                      {varType}
                    </span>
                  </div>

                  <div className="var-value">
                    {isObjectOrArray ? (
                      <pre className="value-json">{JSON.stringify(val)}</pre>
                    ) : (
                      <span className="primitive-val">{String(val)}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="scope-empty">
            <Box size={24} color="var(--text-muted)" />
            <span>No scope variables declared at this step.</span>
          </div>
        )}
      </div>
    </div>
  );
}
