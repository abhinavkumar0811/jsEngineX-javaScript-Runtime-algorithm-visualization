import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { runTrace } from '../engine/traceEngine.js';
import { ALGORITHM_PRESETS } from '../constants/algorithmPresets.js';

export const DEVELOPER_THEMES = [
  { id: 'tokyo-night', name: 'Tokyo Night (Cyberpunk)', color: '#7dcfff' },
  { id: 'dracula', name: 'Dracula (Gothic Dark)', color: '#bd93f9' },
  { id: 'one-dark', name: 'One Dark Pro (Atom)', color: '#61afef' },
  { id: 'github-dark', name: 'GitHub Dark (Official)', color: '#58a6ff' },
  { id: 'synthwave', name: 'SynthWave \'84 (Retro Glow)', color: '#ff7edb' },
  { id: 'github-light', name: 'GitHub Light (Clean White)', color: '#0969da' }
];

const TraceContext = createContext();

export function TraceProvider({ children }) {
  const [code, setCode] = useState(ALGORITHM_PRESETS[0].code);
  const [activePresetId, setActivePresetId] = useState(ALGORITHM_PRESETS[0].id);
  const [traceSteps, setTraceSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x default
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [traceError, setTraceError] = useState(null);

  // Theme State (Tokyo Night default)
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('jsenginex_theme') || 'tokyo-night';
  });

  const changeTheme = (newThemeId) => {
    setThemeState(newThemeId);
    localStorage.setItem('jsenginex_theme', newThemeId);
    document.body.setAttribute('data-theme', newThemeId);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const timerRef = useRef(null);

  // Trigger AST trace generation
  const runCodeTrace = async (codeToRun = code) => {
    setIsEvaluating(true);
    setTraceError(null);
    setIsPlaying(false);
    try {
      const steps = await runTrace(codeToRun);
      setTraceSteps(steps);
      setCurrentStepIdx(0);
    } catch (err) {
      console.error('Trace evaluation failed:', err);
      setTraceError(err.message || 'Syntax or evaluation error');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Run initial trace on mount
  useEffect(() => {
    runCodeTrace(code);
  }, []);

  // Playback timer tick loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(100, 1000 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= traceSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, traceSteps.length]);

  const togglePlay = () => {
    if (currentStepIdx >= traceSteps.length - 1) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.min(traceSteps.length - 1, prev + 1));
  };

  const prevStep = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
  };

  const seekStep = (idx) => {
    setIsPlaying(false);
    setCurrentStepIdx(Math.max(0, Math.min(traceSteps.length - 1, idx)));
  };

  const resetTrace = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const loadPreset = (presetId) => {
    const preset = ALGORITHM_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setActivePresetId(preset.id);
      setCode(preset.code);
      runCodeTrace(preset.code);
    }
  };

  const activeStep = traceSteps[currentStepIdx] || null;

  return (
    <TraceContext.Provider
      value={{
        code,
        setCode,
        activePresetId,
        loadPreset,
        theme,
        changeTheme,
        traceSteps,
        currentStepIdx,
        activeStep,
        isPlaying,
        togglePlay,
        nextStep,
        prevStep,
        seekStep,
        resetTrace,
        playbackSpeed,
        setPlaybackSpeed,
        isEvaluating,
        traceError,
        runCodeTrace
      }}
    >
      {children}
    </TraceContext.Provider>
  );
}

export function useTrace() {
  const context = useContext(TraceContext);
  if (!context) {
    throw new Error('useTrace must be used within a TraceProvider');
  }
  return context;
}
