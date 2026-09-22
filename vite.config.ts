import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative assets support both username.github.io and /repository/ Pages sites.
  base: process.env.VITE_BASE_PATH || './',
  define: {
    __HAS_RESUME__: JSON.stringify(existsSync(resolve('public/resume.pdf'))),
  },
});
