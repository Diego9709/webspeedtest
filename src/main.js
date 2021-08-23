import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './icons' // SvgIcon
import axios from 'axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.prototype.$ajax=axios;
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App)
}).$mount('#app')
