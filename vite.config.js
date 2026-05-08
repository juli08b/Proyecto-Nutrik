import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/Proyecto-Nutrik/' : '/',
  server: {
    port: 5173,
    open: true,
    host: true,
  },
}));
