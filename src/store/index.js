import vuex from 'vuex'
import Vue from 'vue'
import actions from "./action";
import mutations from "./mutation";
import getters from "./getter";
Vue.use(vuex);
const state = {
  productList: []
}
const store = new vuex.Store({
  state,
  actions,
  mutations,
  getters
})
export default store
