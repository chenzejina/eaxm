import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import './common.scss'
import VueSocketIO from 'vue-socket.io'
Vue.use(ElementUI)
 
Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'http://8.131.89.181:7001',    //这个地址是服务端地址
  connection: 'http://192.168.0.120:7001',    //这个地址是服务端地址
}))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
