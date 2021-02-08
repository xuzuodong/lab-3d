// 虚拟实验内部的路由在这里依次注册
const experimentsRoutes = [
  // 酸碱中和
  {
    path: '/scene/neutralization',
    component: () => import('../experiments/neutralization/App.vue')
  },

  // 摩擦力
  {
    path: '/scene/friction',
    component: () => import('../experiments/friction/App.vue')
  }
]

export default experimentsRoutes
