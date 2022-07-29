import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
// more config  https://github.com/F-gen/vite_Vue3_Practice/blob/main/vite.config.ts
export default defineConfig(
  {
    resolve: {
      alias: {
        '@': `${path.resolve(__dirname, './src')}`,
      },
    },

    plugins: [
      vue(),
      WindiCSS(),
      Components({
        dts: true,
        resolvers: [AntDesignVueResolver()]
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue', 'vue-router', 'vuex', { '@/api/index': [['*', 'api']] }],
        dts: true,

        resolvers: [AntDesignVueResolver()],

        vueTemplate: true,
      }),
    ]
  }
)
