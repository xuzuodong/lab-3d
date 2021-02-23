<template>
  <div id="app">
    <q-layout view="hhh lpR fff">
      <AppHeaderVue :insideExperiment="insideExperiment" />

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer v-if="!insideExperiment" class="container bg-white text-dark text-center">
        <q-separator />
        <div class="q-py-md">© Lab 3D 版权所有</div>
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
      insideExperiment: false,
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
  },

  watch: {
    // 每次路由跳转执行检查
    $route() {
      // 如果是进入实验内部，则隐藏导航栏
      const insideExperiment = this.$route.matched.some((r) => r.path.match('/scene/'))
      this.insideExperiment = insideExperiment

      // 如果从实验内部出来，则确保 talker 组件关闭
      let talkerNode = document.getElementById('talker')
      if (talkerNode && !insideExperiment) document.body.removeChild(talkerNode)

      // 进入实验内部时（通过输入 url 进入），如果没有登录，则回到首页
      if (insideExperiment && !this.userInfo) this.$router.replace({ path: '/' })
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
