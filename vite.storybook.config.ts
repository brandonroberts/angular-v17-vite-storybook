/// <reference types="vitest" />

import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    angular({ jit: true, tsconfig: './.storybook/tsconfig.json' }),
    {
      name: '@storybook/angular',
      transform(code) {
        if (code.includes('"@storybook/angular"')) {
          return code.replace(/\"@storybook\/angular\"/g, '\"@storybook/angular/dist/client\"');
        }

        return;
      }
    }
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
    'process.env.FORCE_SIMILAR_INSTEAD_OF_MAP': 'false'
  },
}));
