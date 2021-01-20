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

    watch: {
        /**
         * 每次路由跳转执行检查，
         * 如果是进入实验内部，则隐藏导航栏；
         * 如果从实验内部出来，则确保 dialog 组件关闭
         */
        $route() {
            const insideExperiment = this.$route.matched.some((r) => r.path.match('/experiments/'))
            this.showNav = !insideExperiment
            let dialogNode = document.getElementById('dialog')
            if (dialogNode && !insideExperiment) document.body.removeChild(dialogNode)
        },
    },
}
</script>

<style>
</style>
