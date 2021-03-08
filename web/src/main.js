import Vue from "vue";
import App from "./App.vue";
import store from "./store/store.js";

import http from "./http";
Vue.prototype.$http = http;

Vue.config.productionTip = false;

import "./assets/iconfont/iconfont.css";
import "./style.css";
import router from "./router";

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
