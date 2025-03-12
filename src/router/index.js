import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/quality/inspection',
    name: 'ProductInspection',
    component: () => import('../views/quality/ProductInspection.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/production/finish-order',
    name: 'FinishOrder',
    component: () => import('@/views/production/FinishOrder.vue')
  },
  {
    path: '/quality/material-check',
    name: 'MaterialCheck',
    component: () => import('../views/quality/MaterialCheck.vue')
  }
]

const router = new VueRouter({
  mode: 'history',  
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router