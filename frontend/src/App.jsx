import React from 'react';
import { TraceProvider } from './context/TraceContext.jsx';
import IDELayout from './components/layout/IDELayout.jsx';

export default function App() {
  return (
    <TraceProvider>
      <IDELayout />
    </TraceProvider>
  );
}
