import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
// import './plugins/session'
import router from './router'
import store from './_store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
