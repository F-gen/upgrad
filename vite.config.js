import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
// more config  https://github.com/F-gen/vite_Vue3_Practice/blob/main/vite.config.ts
export default defineConfig(

  {
    css: {
      preprocessorOptions: {
        less: { // 静态自定义样式
          modifyVars: {
            'primary-color': '#1890ff',
            'font-size-base': '12px',
            'tabs-horizontal-padding': '12px 16px',//tabs padding
            'card-padding-base': '16px', //a-card padding
            'card-head-padding': '14px', // 卡片
            'card-head-font-size': '12px', // 卡片字体大小
            'btn-border-radius-base': 0, //按钮边框
            'btn-height-base': '30px',
            'card-radius': '4px',
            'table-padding-vertical': '10px',
            'table-padding-horizontal': '18px',
            'background-color-light': '#F2F6FC',
            'table-row-hover-bg': '#e6f7ff', //table 中 行hover 背景
            'input-padding-vertical-base': '5px',
            'select-dropdown-line-height': '24px', //行高
            'border-radius-base': 0,
          },
          javascriptEnabled: true,
        },
      },
    },

    resolve: {
      alias: {
        '@': `${path.resolve(__dirname, './src')}`,
      },
    },

    plugins: [
      vue(),
      // WindiCSS(),
      Components({
        dts: true,
        resolvers: [AntDesignVueResolver({ importStyle: false })],
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


        vueTemplate: true,
      }),
    ]
  }
)
