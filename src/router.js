import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
    },
    {
      path: '/admin/login',
      name: 'adminlogin',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const isLogged = localStorage.getItem("user");
  const adminpublicPages = ['/admin/login'];
  const authRequiredAdmin = !adminpublicPages.includes(to.path);

  const arrfirst = to.path.split('/')[1];
  // return to /login if user is not logged
  if(arrfirst !== 'admin' && authRequired && !isLogged){
    return next('/login');
  }
  // return to /admin/login if admin not logged
  if(arrfirst === 'admin' && authRequiredAdmin && !isLogged){
    return next('/admin/login');
  }
  // return to home if user has logged and try access to login path
  if(arrfirst !== 'admin' && !authRequired && isLogged){
    return next('/');
  }
  // return to home if admin has logged and try access to login path
  if(arrfirst === 'admin' && !authRequiredAdmin && isLogged){
    return ('/admin');
  }
  next();
})

export default router