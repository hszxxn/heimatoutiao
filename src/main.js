import Vue from 'vue'
import App from './App.vue'
import router from './premission'
import './styles/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/axios-config'
import Component from './components/index'
Vue.use(Component)
Vue.use(axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
