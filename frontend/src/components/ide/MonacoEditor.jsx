import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTrace } from '../../context/TraceContext.jsx';
import { Code2 } from 'lucide-react';

export default function MonacoEditorWrapper() {
  const { code, setCode, activeStep, isPlaying, theme } = useTrace();
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Define Monaco themes for 5 developer themes
    const themesConfig = {
      'tokyo-night': { bg: '#1a1b26', line: '#16161e', kw: '#bb9af7', str: '#9ece6a', num: '#e0af68', lineNum: '#565f89', activeLineNum: '#7dcfff' },
      'dracula': { bg: '#282a36', line: '#21222c', kw: '#ff79c6', str: '#50fa7b', num: '#bd93f9', lineNum: '#6272a4', activeLineNum: '#bd93f9' },
      'one-dark': { bg: '#282c34', line: '#21252b', kw: '#c678dd', str: '#98c379', num: '#d19a66', lineNum: '#5c6370', activeLineNum: '#61afef' },
      'github-dark': { bg: '#0d1117', line: '#161b22', kw: '#ff7b72', str: '#a5d6ff', num: '#79c0ff', lineNum: '#484f58', activeLineNum: '#58a6ff' },
      'synthwave': { bg: '#241b2f', line: '#1a1423', kw: '#ff7edb', str: '#72f1b8', num: '#feef6d', lineNum: '#614d69', activeLineNum: '#36f9f6' }
    };

    Object.entries(themesConfig).forEach(([themeKey, cfg]) => {
      monaco.editor.defineTheme(themeKey, {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
          { token: 'keyword', foreground: cfg.kw.replace('#', ''), fontStyle: 'bold' },
          { token: 'number', foreground: cfg.num.replace('#', '') },
          { token: 'string', foreground: cfg.str.replace('#', '') },
        ],
        colors: {
          'editor.background': cfg.bg,
          'editor.lineHighlightBackground': cfg.line,
          'editorLineNumber.foreground': cfg.lineNum,
          'editorLineNumber.activeForeground': cfg.activeLineNum
        }
      });
    });

    monaco.editor.setTheme(theme || 'tokyo-night');
  };

  // Sync Monaco Editor theme dynamically when global theme changes
  useEffect(() => {
    if (monacoRef.current && theme) {
      monacoRef.current.editor.setTheme(theme);
    }
  }, [theme]);

  // Update line execution decoration whenever activeStep changes
  useEffect(() => {
    if (!editorRef.current || !activeStep || !activeStep.line) return;

    const editor = editorRef.current;
    const lineNumber = activeStep.line;

    // Highlight line with glowing cyan execution style
    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
      {
        range: {
          startLineNumber: lineNumber,
          startColumn: 1,
          endLineNumber: lineNumber,
          endColumn: 1000
        },
        options: {
          isWholeLine: true,
          className: 'active-execution-line',
          glyphMarginClassName: 'active-execution-glyph'
        }
      }
    ]);

    // Scroll to active line smoothly
    editor.revealLineInCenterIfOutsidePath(lineNumber);
  }, [activeStep]);

  return (
    <div className="monaco-editor-container">
      <div className="panel-header">
        <div className="panel-title">
          <Code2 size={16} color="var(--accent-primary)" />
          <span>Source Code Editor</span>
        </div>
        {activeStep && (
          <span className="current-line-badge">
            Executing Line {activeStep.line}
          </span>
        )}
      </div>

      <div className="editor-wrapper">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: 'Fira Code, monospace',
            minimap: { enabled: false },
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: isPlaying,
            automaticLayout: true,
            glyphMargin: true
          }}
        />
      </div>
    </div>
  );
}
