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
      meta: {
        title: 'Login'
      },
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
      meta: {
        title: 'Home'
      },
      component: () => import(/* webpackChunkName: "newspost" */ './views/Post.vue')
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import(/* webpackChunkName: "schedule" */ './views/Jadwal.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        title: 'Admin: Home'
      },
      component: () => import(/* webpackChunkName: "admin" */ './views/admin/Home.vue')
    }
    ,
    {
      path: '/admin/login',
      name: 'adminlogin',
      meta: {
        title: 'Admin: Login'
      },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/admin/guru',
      name: 'adminguru',
      meta: {
        title: 'Admin: Guru'
      },
      component: () => import(/* webpackChunkName: "guru" */'./views/admin/Guru.vue')
    },
    {
      path: '/admin/siswa',
      name: 'adminsiswa',
      meta: {
        title: 'Admin: Siswa'
      },
      component: () => import(/* webpackChunkName: "siswa" */'./views/admin/Siswa.vue')
    },
    {
      path: '/admin/user',
      name: 'adminuser',
      meta: {
        title: 'Admin: User'
      },
      component: () => import(/* webpackChunkName: "adminlist" */'./views/admin/Admin.vue')
    },
    {
      path: '/admin/akun',
      name: 'adminakun',
      meta: {
        title: 'Admin: Akun'
      },
      component: () => import(/* webpackChunkName: "akun" */'./views/admin/Akun.vue')
    },
    {
      path: '/admin/jadwal',
      name: 'adminjadwal',
      meta: {
        title: 'Admin: Jadwal'
      },
      component: () => import(/* webpackChunkName: "jadwal" */'./views/admin/Jadwal.vue')
    },
    {
      path: '/admin/pelajaran',
      name: 'adminpelajaran',
      meta: {
        title: 'Admin: Pelajaran'
      },
      component: () => import(/* webpackChunkName: "pelajaran" */'./views/admin/Admin.vue')
    },
    {
      path: '/admin/kelas',
      name: 'adminkelas',
      meta: {
        title: 'Admin: Kelas'
      },
      component: () => import(/* webpackChunkName: "kelas" */'./views/admin/Admin.vue')
    },
    {
      path: '/admin/berita',
      name: 'adminberita',
      meta: {
        title: 'Admin: Berita'
      },
      component: () => import(/* webpackChunkName: "berita" */'./views/admin/Berita.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const isLogged = localStorage.getItem("user");
  const level = localStorage.getItem("level")
  const adminpublicPages = ['/admin/login'];
  const authRequiredAdmin = !adminpublicPages.includes(to.path);
  Vue.nextTick( ()=>{
    document.title = to.meta.title ? to.meta.title : "Home"
  })

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
    return next('/admin');
  }

  if((arrfirst !== 'admin') && isLogged && level == 2){
    return next('/admin')
  }
  next();
})

export default router