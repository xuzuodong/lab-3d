import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') },
    {
        path: '/experiment-details',
        name: 'experimentDetails',
        component: () => import(/* webpackChunkName: "about" */ '../views/ExperimentDetails.vue'),
    },
    {
        path: '/experiments/neutralization',
        name: 'neutralization',
        component: () => import(/* webpackChunkName: "about" */ '../experiments/neutralization/Experiment.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
