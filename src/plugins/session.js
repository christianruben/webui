import Vue from 'vue'
import VueSession from 'vue-session'
import VueCookies from 'vue-cookies'

Vue.use(VueSession, {persist: true})
Vue.use(VueCookies)