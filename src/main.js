import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import router from './router'
import store from './store'
import * as api from "./api/";
import "./intercept.js";
global.api = api
// import {createPinia} from 'pinia'   .use(createPinia())
createApp(App).use(router).use(store).mount('#app')
