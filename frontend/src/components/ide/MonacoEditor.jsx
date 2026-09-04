import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTrace } from '../../context/TraceContext.jsx';
import { Code2 } from 'lucide-react';

export default function MonacoEditorWrapper() {
  const { code, setCode, activeStep, isPlaying } = useTrace();
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define custom dark theme
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: '8b5cf6', fontStyle: 'bold' },
        { token: 'number', foreground: 'f59e0b' },
        { token: 'string', foreground: '10b981' },
      ],
      colors: {
        'editor.background': '#0a0d14',
        'editor.lineHighlightBackground': '#121824',
        'editorLineNumber.foreground': '#64748b',
        'editorLineNumber.activeForeground': '#6366f1'
      }
    });

    monaco.editor.setTheme('custom-dark');
  };

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
