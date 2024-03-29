import { createApp } from 'vue'
import App from './App.vue'


import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less'; // 静态自定义样式
import "./intercept.js";
import "@/assets/iconfont/iconfont.css";
import "@/style/commont.css";
import * as Icons from '@ant-design/icons-vue'
// import {createPinia} from 'pinia'   .use(createPinia())
const app = createApp(App)
app.use(router).use(store).mount('#app')

for (const i in Icons) {
  app.component(i, Icons[i])
}
