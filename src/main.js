import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)

// require('./api/mes/mock');

new Vue({
  router,  
  store,   
  render: h => h(App)  
}).$mount('#app')  