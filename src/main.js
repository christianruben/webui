import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/session'
import router from './router'
import store from './_store'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/styles/main.sass'

Vue.config.productionTip = false
Vue.use(Vuetify)
export default new Vue({
  icons: {
    iconfont: 'mdiSvg',
  },
  el: '#app',
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App)
})
window.$cookies.config(Infinity)