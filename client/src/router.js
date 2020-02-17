import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from "./components/Home.vue"
import Welcome from "./components/Welcome.vue"
import Auto from "./components/page/Auto.vue"
import Graph from "./components/page/Graph.vue"


Vue.use(Router)

const router =  new Router({
  routes: [
    {path:'/',redirect:'/login'},
    {path:'/login',component:Login},
    {path:'/home',component:Home,
      redirect:'/welcome',
      children:[
        {path:'/welcome',component:Welcome},
        {path:'/auto',component:Auto},
        {path:'/graph',component:Graph}
      ]},
  ]
})
//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to 将要访问的路径
  //from 从那个路径跳转而来
  //next是一个函数，代表放行
  //next() 放行 next('/login')
  if(to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router