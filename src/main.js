import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import store from './store'
import * as api from "./api";
import "./intercept.js";
import '@iconify/iconify'
global.api = api
// import {createPinia} from 'pinia'   .use(createPinia())
createApp(App).use(router).use(store).use(Antd).mount('#app')
