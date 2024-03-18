import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    alias: {
      '@': resolve(__dirname, './src'),
      'react-layout-kit': resolve(__dirname, './src'),
    },
  },
});
