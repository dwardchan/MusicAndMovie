import axios from "axios";
import router from "./router";
import store from "./store/store.js";

const http = axios.create({
  baseURL: "http://localhost:3000/web/api",
});

http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//在封装的axios统一做响应拦截并返回前端页面
http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.data.message) {
      console.log(err.response);
      store.state.LoginMessage = err.response.data.message;
      //如果没有token则返回401跳回登录页
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
    return Promise.reject();
  }
);

export default http;
