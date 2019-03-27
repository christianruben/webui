import Vue from 'vue'
import Vuex from 'vuex'

import {header} from './header.store'
import {authentication} from './auth.store'
import {loadpage} from './loading.store'
import {teachers} from './teacher.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    header,
    authentication,
    loadpage,
    teachers,
  }
})
