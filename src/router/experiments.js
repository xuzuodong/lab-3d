/**
 * 虚拟实验在 /src/experiments/list.json 中注册，
 * 然后这里的代码会根据 json 解析所有对应路由
 */

import list from '../experiments/list.json'

const experimentsRoutes = []

list.forEach((experiment) => {
  if (experiment.type == 'virtual') {
    experimentsRoutes.push({
      path: `/scene/${experiment.alias}`,
      component: () => import(`../experiments/${experiment.alias}/Entry.vue`),
    })
  }
  if (experiment.type == 'real') {
    experimentsRoutes.push({
      path: `/scene/${experiment.alias}`,
      component: () => import('../views/RealExperiment.vue'),
      props: { experimentName: experiment.name },
    })
  }
})

export default experimentsRoutes
