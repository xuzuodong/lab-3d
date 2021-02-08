<template>
  <div id="app">
    <q-layout view="hhh lpR fff">
      <AppHeaderVue v-if="showNav" />

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
import { mapState } from 'vuex'
import AppHeaderVue from './AppHeader.vue'

export default {
  components: { AppHeaderVue },

  data() {
    return {
      showNav: true,
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
  },

  watch: {
    /**
     * 每次路由跳转执行检查，
     * 如果是进入实验内部，则隐藏导航栏；
     * 如果从实验内部出来，则确保 dialog 组件关闭；
     * 进入实验内部时（通过输入 url 进入），如果没有登录，则回到首页
     */
    $route() {
      const insideExperiment = this.$route.matched.some((r) => r.path.match('/scene/'))
      this.showNav = !insideExperiment
      let dialogNode = document.getElementById('dialog')
      if (dialogNode && !insideExperiment) document.body.removeChild(dialogNode)
      if (insideExperiment && !this.userInfo) this.$router.replace({ path: '/', query: { join: 'login' } })
    },
  },
}
</script>

<style lang="scss">
.toolbar {
  max-width: 1280px;
  .tabs .q-tab__content {
    min-width: 0;
  }
}
</style>
