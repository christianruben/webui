import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/News.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import(/* webpackChunkName: "teacher" */ './views/admin/Guru.vue')
    },
    {
      path: '/news/p/:id',
      name: 'newspost',
      component: () => import(/* webpackChunkName: "newspost" */ './views/Post.vue')
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import(/* webpackChunkName: "schedule" */ './views/Jadwal.vue')
    }
  ]
})

<<<<<<< HEAD
// router.beforeEach((to, from, next) => {
//   // const publicPages = ['/login'];
//   // const authRequired = !publicPages.includes(to.path);
//   // const isLogged = localStorage.getItem("user");

//   // if(authRequired && !isLogged){
//   //   return next('/login');
//   // }
=======
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const isLogged = localStorage.getItem("user");

  if(authRequired && !isLogged){
    return next('/login');
  }
>>>>>>> c167a16cd99e17ee360cf5e9f1bfe6710992cd9e

//   next();
// })

export default router