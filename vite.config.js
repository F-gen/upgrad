import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// more config  https://github.com/F-gen/vite_Vue3_Practice/blob/main/vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, './src')}`,
    },
  },

  plugins: [vue(), WindiCSS(),]
})
