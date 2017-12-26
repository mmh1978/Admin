import Vue from 'vue'
import ElementUI from 'element-ui'
import Egrid from 'egrid'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import './mock'

Vue.use(ElementUI)
Vue.use(Egrid)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})



