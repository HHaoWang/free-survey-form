import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import { resolve } from 'path';
import dtsPlugin from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'vue',
        'dayjs',
        'free-survey-core',
        'lodash',
        'mitt',
        'tdesign-icons-vue-next',
        'tdesign-vue-next',
        'vuedraggable'
      ],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          preserveModulesRoot: 'packages',
          preserveModules: true
        },
        {
          format: 'cjs',
          dir: 'dist/lib',
          entryFileNames: '[name].js',
          preserveModulesRoot: 'packages',
          preserveModules: true,
          exports: 'named'
        }
      ]
    },
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      formats: ['es', 'cjs']
    }
  },
  plugins: [
    vue(),
    VueDevTools(),
    dtsPlugin({
      outDir: ['dist/es', 'dist/lib'],
      include: ['packages/**/*.ts']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});