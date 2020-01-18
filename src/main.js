import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import toast from "./components/toast";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
import "../node_modules/swiper/css/swiper.css";

Vue.config.productionTip = false;
Vue.prototype.$bus  = new Vue();
FastClick.attach(document.body);
Vue.use(toast)
Vue.use(VueLazyload,{
  loading:require('./assets/image/common/loading.gif')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
