import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    open: true
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-monaco': ['@monaco-editor/react'],
          'vendor-flow': ['@xyflow/react'],
          'vendor-charts': ['recharts'],
          'vendor-katex': ['katex', 'react-katex'],
          'vendor-motion': ['framer-motion']
        }
      }
    }
  },
  worker: {
    format: 'es'
  }
});
