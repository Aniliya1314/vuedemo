import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import "../node_modules/swiper/css/swiper.css";

Vue.config.productionTip = false
Vue.prototype.$bus  = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
