import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes =[
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:()=>import('../views/index/Index')
  },
  {
    path:'/detail/:iid',
    component:()=>import('../views/detail/Detail')
  },
  {
    path:'/categroy',
    component:()=>import('../views/categroy/Categroy')
  },
  {
    path:'/cart',
    component:()=>import('../views/cart/Cart')
  },
  {
    path:'/profile',
    component:()=>import('../views/profile/Profile')
  }
]
export default new Router({
  routes,
  mode:'history'
})
