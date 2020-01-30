import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import 'vuetify/src/stylus/app.styl'
import 'vuetify/src/styles/main.sass'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify, {
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
  iconfont: 'mdiSvg',
})
