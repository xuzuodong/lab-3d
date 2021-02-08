import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import experimentsRoutes from './experiments'

Vue.use(VueRouter)

// 非虚拟实验内部的路由在这里注册
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/experiment/:alias', component: () => import('../views/ExperimentDetails.vue') },
  ...experimentsRoutes, // 注入虚拟实验内部的路由
  { path: '*', component: () => import('../views/NotFound.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router