<template>
  <q-header v-if="!insideExperiment" class="bg-navBar">
    <q-toolbar class="container toolbar text-white q-mx-auto">
      <q-btn stretch flat label="Lab 3D" no-caps icon="mdi-test-tube" size="16px" to="/" />
      <q-tabs shrink content-class="tabs">
        <q-route-tab label="首页" to="/" exact />
        <q-route-tab label="实验列表" to="/experiments-list" exact />
        <q-route-tab label="服务与支持" to="/about" exact />
        <q-route-tab label="教学研究" to="/about" exact />
        <q-route-tab label="使用手册" to="/mamual" exact />
        <q-route-tab label="关于我们" to="/about" exact />
      </q-tabs>
      <q-space />
      <q-btn v-if="!userInfo" flat label="注册/登录" @click="openLoginDialog" />
      <div v-else>
        <q-btn dense unelevated class="q-mr-xs" no-caps padding="6px 15px">
          <q-avatar size="sm" :icon="userInfo.avatar ? null : 'person'">
            <q-img v-if="userInfo.avatar" :src="userInfo.avatar" :ratio="1" />
          </q-avatar>
          <span>{{ userInfo.name }}</span>
          <q-menu
            anchor="bottom middle"
            self="top middle"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list style="min-width: 150px" :class="{ 'bg-grey-9': $q.dark.isActive }">
              <q-item clickable @click="openUserCenter">
                <q-item-section side>
                  <q-icon name="account_circle" size="sm" />
                </q-item-section>
                <q-item-section>个人中心</q-item-section>
              </q-item>

              <q-item
                v-if="userInfo.type == '学生'"
                clickable
                v-close-popup
                :to="'/classrooms-list'"
                :active-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                <q-item-section side>
                  <q-icon name="group" size="sm" />
                </q-item-section>
                <q-item-section>班级</q-item-section>
              </q-item>

              <q-item to="/kexperiments-list">
                <q-item-section side>
                  <q-icon name="history" size="sm" />
                </q-item-section>
                <q-item-section>我的实验记录</q-item-section>
              </q-item>

              <q-item
                v-if="userInfo.type == '教师'"
                clickable
                v-close-popup
                :to="'/dashboard'"
                :active-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                <q-item-section side>
                  <q-icon name="manage_accounts" size="sm" />
                </q-item-section>
                <q-item-section>教师控制台</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout">
                <q-item-section side>
                  <q-icon name="logout" size="sm" />
                </q-item-section>
                <q-item-section>退出登录</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>

  <div v-else>
    <q-page-sticky position="top-left" :offset="[18, 18]">
      <q-btn
        fab-mini
        icon="arrow_back"
        :color="$q.dark.isActive ? 'dark' : 'white'"
        :text-color="$q.dark.isActive ? 'white' : 'dark'"
        @click="leaveConfirm"
      />
    </q-page-sticky>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import DialogJoinVue from './components/DialogJoin.vue'
import UserCenter from './views/UserCenter'

export default {
  props: {
    insideExperiment: {
      type: Boolean,
    },
  },

  computed: {
    ...mapState('user', ['userInfo']),
  },

  methods: {
    ...mapMutations('user', ['logout']),

    openLoginDialog() {
      this.$q
        .dialog({
          component: DialogJoinVue,
          parent: this,
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {})
    },

    openUserCenter() {
      this.$q
        .dialog({
          component: UserCenter,
          parent: this,
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {})
    },

    leaveConfirm() {
      this.$q
        .dialog({
          title: '离开实验',
          message: '实验进度将不会保存，确认离开吗？',
          cancel: true,
        })
        .onOk(() => {
          this.$router.go(-1)
        })
    },
  },
}
</script>

<style>
</style>