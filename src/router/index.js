import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import experimentsRoutes from './experiments'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/manual', component: () => import('../views/Manual.vue') },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/experiment/:alias', component: () => import('../views/ExperimentDetails.vue') },
  { path: '/realExperiment/:alias', component: () => import('../views/RealExperimentDetails.vue') },
  { path: '/classrooms-list', component: () => import('../views/ClassroomsList.vue') },
  { path: '/user-center', component: () => import('../views/UserCenter.vue') },
  { path: '/portfolio-recommendation', component: () => import('../views/PortfolioAndRecommendation.vue') },
  { path: '/kexperiments-list', component: () => import('../views/KexperimentsList.vue') },
  {
    path: '/dashboard',
    component: () => import('../views/TeacherDashboard.vue'),
    children: [
      { path: '', component: () => import('../views/TeacherDashboardContentHome.vue') },
      {
        path: 'classroom/:id',
        component: () => import('../views/TeacherDashboardContentClassroom.vue'),
      },
      {
        path: 'kexperiment-details/:id',
        component: () => import('../views/KexperimentDetails.vue'),
      },
      {
        path: 'real-kexperiment-details/:id',
        component: () => import('../views/RealKexperimentDetails.vue'),
      },
    ],
  },
  { path: '/kexperiment-details/:id', component: () => import('../views/KexperimentDetails.vue') },
  { path: '/kexperiment-overview/:id', component: () => import('../views/KexperimentOverview.vue') },
  {
    path: '/real-kexperiment-details/:id',
    component: () => import('../views/RealKexperimentDetails.vue'),
  },

  // 注入虚拟实验内部的路由
  ...experimentsRoutes,

  { path: '*', component: () => import('../views/NotFound.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
