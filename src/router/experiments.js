const experimentsRoutes = [
  // 酸碱中和
  {
    path: '/scene/neutralization',
    component: () => import('../experiments/neutralization/Entry.vue')
  },

  // 摩擦力
  {
    path: '/scene/friction',
    component: () => import('../experiments/friction/Entry.vue')
  }
]

export default experimentsRoutes
