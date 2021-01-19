<template>
    <div id="app">
        <div id="nav" v-show="showNav">
            <router-link to="/">首页</router-link> |
            <router-link to="/about">关于我们</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            showNav: true,
        }
    },
    mounted() {
        this.$router.beforeEach((to, from, next) => {
            const insideExperiment = to.matched.some((r) => r.path.match('/experiments/'))
            this.showNav = !insideExperiment
            next()
        })
    },
}
</script>

<style>
</style>
