import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@src': '../src',
      '@test': './',
    },
    root: './test',

    threads: false,
    maxThreads: 1,
    maxConcurrency: 1,
    bail: 1,
    hookTimeout: 100000,
    testTimeout: 100000,
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
    },
  },
  plugins: [swc.vite()],

});