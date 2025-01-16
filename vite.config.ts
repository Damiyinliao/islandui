import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    dts({
      outDir: 'dist/types',
      include: ['src/packages/**/*.ts', 'src/packages/**/*.vue'],
      exclude: ['src/App.vue', 'src/main.ts']
    })
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/packages/index.ts'),
      name: 'IslandUI',
      formats: ['es', 'umd'],
      fileName: `packages/[name]/index.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'dist/packages',
          entryFileNames: 'islandui.es.js',
          preserveModules: true,
          preserveModulesRoot: 'src/packages/components'
        },
        {
          format: 'umd',
          dir: 'dist',
          entryFileNames: 'islandui.umd.js',
          name: 'IslandUI',
          globals: {
            vue: 'Vue'
          }
        }
      ]
    }
  }
})

