// import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter } from 'vue-router'
import store from '@/store'
// import { VueCookieNext } from 'vue-cookie-next'

import Login from './components/auth/Login.vue'
import Logout from './components/auth/Logout.vue'
import MasterLandingPage from './components/landing_page/MasterLandingPage.vue'
import MasterArticle from './components/guest/article/MasterArticle.vue'
import MasterProgram from './components/guest/program/MasterProgram.vue'
import MasterFasilitas from './components/guest/fasilitas/MasterFasilitas.vue'
import MasterDonasi from './components/guest/donasi/MasterDonasi.vue'
import MasterAbout from './components/guest/about/MasterAbout.vue'

import MasterDashboard from './components/admin/dashboard/MasterDashboard.vue'
import AdminMasterArticle from './components/admin/article/MasterArticle.vue'

// createApp.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'MasterMenu',
      component: MasterLandingPage,
      meta: {
        title: 'YPA Jernih balaki Apps',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: Login,
      meta: {
        title: 'Login Page | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/logout',
      name: 'LogoutPage',
      component: Logout,
      meta: {
        title: 'Logout Page | YPA Jernih balaki',
        middleware: true,
        navigation: 'auth',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/article',
      name: 'MasterArticle',
      component: MasterArticle,
      meta: {
        title: 'Article | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/article/read/:article',
      name: 'ReadArticle',
      component: MasterArticle,
      meta: {
        title: 'Read Article | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/program',
      name: 'MasterProgram',
      component: MasterProgram,
      meta: {
        title: 'Program | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/program/read/:program',
      name: 'ReadProgram',
      component: MasterProgram,
      meta: {
        title: 'Read Program | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/fasilitas',
      name: 'MasterFasilitas',
      component: MasterFasilitas,
      meta: {
        title: 'Fasilitas | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/fasilitas/read/:fasilitas',
      name: 'ReadFasilitas',
      component: MasterFasilitas,
      meta: {
        title: 'Read Fasilitas | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/donasi',
      name: 'MasterDonasi',
      component: MasterDonasi,
      meta: {
        title: 'Fasilitas | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/donasi/read/:donasi',
      name: 'ReadDonasi',
      component: MasterDonasi,
      meta: {
        title: 'Read Donasi | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/about',
      name: 'MasterAbout',
      component: MasterAbout,
      meta: {
        title: 'About | YPA Jernih balaki',
        middleware: false,
        navigation: 'guest',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    // Admin
    {
      path: '/admin/dashboard',
      name: 'DashboardPage',
      component: MasterDashboard,
      meta: {
        title: 'Dashboard Page | YPA Jernih Balaki',
        middleware: true,
        navigation: 'auth',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/admin/article',
      name: 'AdminMasterArticle',
      component: AdminMasterArticle,
      meta: {
        title: 'Article | YPA Jernih Balaki',
        middleware: true,
        navigation: 'auth',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/admin/article/:actions',
      name: 'MasterArticleActions',
      component: AdminMasterArticle,
      meta: {
        title: 'Manage Article | YPA Jernih Balaki',
        middleware: true,
        navigation: 'auth',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
    {
      path: '/admin/article/read/:slug',
      name: 'MasterArticleReads',
      component: AdminMasterArticle,
      meta: {
        title: 'Read Article | YPA Jernih Balaki',
        middleware: true,
        navigation: 'auth',
        enterAnimate : 'animate__animated animate__fadeIn animate__faster',
        leaveAnimate : 'animate__animated animate__fadeOut animate__faster',
      }
    },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.meta.middleware) {
    // If UnAuthentication Redirect to Login
    store.dispatch('checkAuth').then(() => {
        next();
      }).catch(() => {
        // router.push({name: 'LoginPage'})
        return window.location.href = '/login';
      })
  }
  // In Authentication Redirect to Next
  next();
})

export default router