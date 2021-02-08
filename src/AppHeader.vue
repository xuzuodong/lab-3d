<template>
  <q-header class="bg-black text-white">
    <q-toolbar class="container toolbar text-white q-mx-auto">
      <q-btn stretch flat label="Lab 3D" no-caps icon="mdi-test-tube" size="16px" to="/" />
      <q-tabs shrink content-class="tabs">
        <q-route-tab label="首页" to="/" exact />
        <q-route-tab label="关于我们" to="/about" exact />
      </q-tabs>
      <q-space />
      <q-btn v-if="!userInfo" flat label="注册/登录" @click="openLoginDialog" />
      <div v-else>
        <q-btn rounded dense class="q-mr-xs" no-caps padding="6px 15px">
          <q-avatar size="sm" :icon="userInfo.avatar ? null : 'person'">
            <q-img v-if="userInfo.avatar" :src="userInfo.avatar" :ratio="1" />
          </q-avatar>
          <span>{{ userInfo.name }}</span>
          <q-menu
            dark
            anchor="bottom middle"
            self="top middle"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list style="min-width: 150px">
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
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import DialogJoinVue from './components/DialogJoin.vue'
export default {
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
          text: 'something',
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {})
    },
  },
}
</script>

<style>
</style>