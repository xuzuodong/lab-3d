<template>
    <div id="app">
        <q-layout view="hhh lpR fff">
            <q-header v-if="showNav" class="bg-primary text-white">
                <q-toolbar class="bg-black text-white">
                    <q-btn stretch flat label="Lab 3D" no-caps icon="mdi-test-tube" size="16px" to="/" />
                    <q-tabs shrink>
                        <q-route-tab label="首页" to="/" exact />
                        <q-route-tab label="关于我们" to="/about" exact />
                    </q-tabs>
                    <q-space />
                    <q-btn flat label="注册/登录" />
                </q-toolbar>
            </q-header>

            <q-page-container>
                <router-view />
            </q-page-container>

            <q-footer v-if="showNav" class="bg-white text-dark text-center">
                <div class="q-py-sm">© 杭州师范大学 版权所有</div>
            </q-footer>
        </q-layout>
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
