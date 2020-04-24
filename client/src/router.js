import Vue from 'vue'
import Router from 'vue-router'

//import Login from './components/Login.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Login.vue')
//import Home from "./components/Home.vue"
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Home.vue')
//import Welcome from "./components/Welcome.vue"
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Welcome.vue')

// import Pageos from "./components/page/Pageos";
// import Auto from "./components/page/Auto.vue"
const Pageos = () => import(/* webpackChunkName: "page" */ './components/page/Pageos.vue')
const Auto = () => import(/* webpackChunkName: "page" */ './components/page/Auto.vue')
const Manual = () => import(/* webpackChunkName: "page" */ './components/page/Manual.vue')

//import Graph from "./components/graph/Graph.vue"
//import GraphLi from "./components/graph/GraphLi";
const Graph = () => import(/* webpackChunkName: "graph" */ './components/graph/Graph.vue')
const GraphLi = () => import(/* webpackChunkName: "graph" */ './components/graph/GraphLi.vue')

//import PathsGraph from "./components/testcase/PathsGraph.vue";
//import GenTest from "./components/testcase/GenTest";
const PathsGraph = () => import(/* webpackChunkName: "testcase" */ './components/testcase/PathsGraph.vue')
const GenTest = () => import(/* webpackChunkName: "testcase" */ './components/testcase/GenTest.vue')


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
        {path:'/pageos',component:Pageos},
        {path:'/graph',component:Graph},
        {path:'/pathsGraph',component:PathsGraph},
        {path:'/testCase',component:GenTest},
        {path:'/graphLi',component:GraphLi},
        {path:'/manual',component:Manual}
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