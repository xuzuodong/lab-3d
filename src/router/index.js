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

  // 虚拟实验例子，在地址栏输入该路由来查看（确保先登录，不然会被重定向回首页）å
  { path: '/scene/example-basic', component: () => import('../experiments/example-basic/Entry.vue') },
  { path: '/scene/example-hooks', component: () => import('../experiments/example-hooks/Entry.vue') },
  { path: '/scene/example-tools', component: () => import('../experiments/example-tools/Entry.vue') },

  // 注入虚拟实验内部的路由
  ...experimentsRoutes,

  { path: '*', component: () => import('../views/NotFound.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
