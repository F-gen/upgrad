- Vite+Vue3.2 + windcss3.5+ vuex4 +andv 3.2

- npm init @vitejs/app project-name

- npm i -D vite-plugin-windicss windicss

- npm install vuex@next --save

```js
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── Main                   # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── intercept.js           # 请求拦截
├── .env.xxx                   # 环境变量配置
├── .eslintignore              # eslint 不检测文件
├── .eslintrc.js               # eslint 配置项
├── auto-import.d.ts           # 自动生成 自动导入需要的引入文件
├── components.d.ts            # 自动生成
├── jsconfig.json              # jsconfig.json
├── vite.config.js             # vite 包配置
└── package.json               # package.json
```

[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

[更多vite 模板见(awesome-vite](https://github.com/vitejs/awesome-vite)

