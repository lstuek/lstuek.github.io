import { defineConfig } from 'vite';

// User site at https://lstuek.github.io: base path "/".
// No inlining: every built file except index.html is a separate content-hashed file.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    target: 'es2022',
    chunkSizeWarningLimit: 1024,
  },
});
