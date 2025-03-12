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
  }
]

const router = new VueRouter({
  mode: 'history',  
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router