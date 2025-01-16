import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import configPkg from './src/config';

const input = {}

configPkg.components.forEach((element) => {
  const { name } = element;
  input[name] = `./src/packages/components/${name.toLocaleLowerCase()}/index.taro.ts`
})

console.log('Taro build input:', JSON.stringify(input, null, 2))

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }]
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return (
              tag.startsWith('island-') ||
              tag.startsWith('scroll-view') ||
              tag.startsWith('swiper') ||
              tag.startsWith('swiper-item') ||
              tag.startsWith('picker') ||
              tag.startsWith('picker-view') ||
              tag.startsWith('picker-view-column')
            )
          },
          whitespace: 'preserve'
        }
      }
    })
  ],
  build: {
    minify: false, // Taro 相关的构建不能开启，开启后会导致找不到模板
    target: 'es2015',
    lib: {
      entry: '',
      name: 'index',
      // fileName: (format) => format,
      formats: ['es']
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue', 'vue-router', '@tarojs/taro', '@/packages/locale', '@nutui/icons-vue-taro'],
      input,
      output: {
        paths: {},
        dir: path.resolve(__dirname, './dist/packages'),
        entryFileNames: (chunkInfo) => `${chunkInfo.name.toLowerCase()}/${chunkInfo.name}.js`,
        plugins: []
      }
    },
    emptyOutDir: false
  }
})
