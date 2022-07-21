import { createStore } from "vuex";
import getters from "./getter";
// import.meta.globEager("./module/*.js") 
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const  store =createStore({
  modules, getters
})
export default store
