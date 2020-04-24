import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'



//导入NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import  'nprogress/nprogress.css'
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1'
//在request拦截器中，展示进度条 NProgress.start()
// axios.defaults.baseURL ='http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须return config
  return config
})
//在response拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.devtools = true
Vue.directive('highlight',function(el){
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
});
//导入字体图标
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
