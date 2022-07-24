
import { message } from "ant-design-vue";
import axios from "axios";
// import router from './router/index';
import store from "./store/index";
const CancelToken = axios.CancelToken;
import { getSession, removeSession } from "./utils/auth";
import { filterObjectEmpty, addRequestData } from "./utils/tool";
import router from "./router/index";
const clearRequest = {
  source: {
    token: null,
    cancel: null,
  },
};
let requestCount = 0;
// 定义loading
function loadingStart() {
  if (requestCount === 0) {
    // 解决一个页面多个接口请求需要loading
    store.commit("loading/setSpining", true);
  }
  requestCount++;
}

// 隐藏loading
const hideLoading = () => {
  requestCount--;
  if (requestCount === 0) {
    store.commit("loading/setSpining", false);
  }
};

router.beforeEach(async (to, from, next) => {
  // 清楚请求
  const hasToken = getSession("token");
  if (hasToken) {
    //  token存在说明已权限已通
    next();
  } else {
    // console.log(to);
    // 不存在进入login页面重新获取权限
    if (to.path === "/login") {
      next();
    } else {
      if (window.location.hostname === "localhost") {
        next({ path: "/login" });
      } else {
        location.href = import.meta.env.VUE_APP_BASE_LOGIN;
      }
    }
  }
});

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    loadingStart();
    // 在发送请求之前做些什么
    // console.log(config);
    if (
      config.url !== "/system/loginByFutail" &&
      config.url !== "/system/getFutailToken"
    ) {
      const token = getSession("token");
      let cancelReq = null;
      config.cancelToken = new CancelToken((c) => {
        cancelReq = c;
      });
      if (token) {
        if (config.headers) {
          config.headers["X-Access-Token"] = token;
        }
      } else {
        cancelReq({ msg: "未获取授权", api: config.url });
      }
    }
    //过滤请求参数为空的字段
    // if (config.method == "get") {
    //   config.params = filterObjectEmpty(config.params);
    // } else {
    //   config.data = filterObjectEmpty(config.data);
    // }
    return config;
  },
  function (error) {
    hideLoading();
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    hideLoading();
    const { data } = response;
    let result;
    if (data.code) {
      switch (data.code) {
        case 200:
          result = data.result;
          break;
        case 401:
          message.warning("登录过期，请重新登录");
          removeSession("token");
          location.href = import.meta.env.VUE_APP_BASE_LOGIN;
          // ;
          break;
        case 402:
          message.warning("没有权限请联系运维同事或管理员开通");
          localStorage.removeItem("token");
          location.href = import.meta.env.VUE_APP_BASE_LOGIN;
          break;
        case 400:
          result = data.data;
          break;
        case 302:
          result = data;
          break;
        case 405:
          result = data;
          break;
        case 500:
          result = data;

          break;
        default:
          if (data.code !== 200) {
            message.error(data.msg);
          }
          break;
        // result = data;
      }
      return result;
    } else {
      return data;
    }
  },
  function (error) {
    hideLoading();
    console.error(error);
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
