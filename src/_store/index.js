import Vue from 'vue'
import Vuex from 'vuex'

import {header} from './header.store'
import {authentication} from './auth.store'
import {loadpage} from './loading.store'
import {teachers} from './teacher.store'
import {students} from './student.store'
import {studies} from './studies.store'
import {schedules} from './schedule.store'
import {times} from './time.store'
import {settings} from './settings.store'
import {classdata} from './classdata.store';
import {newsStore} from './news.store';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    header,
    authentication,
    loadpage,
    teachers,
    students,
    studies,
    schedules,
    times,
    settings,
    classdata,
    newsStore
  }
})
