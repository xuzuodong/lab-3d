<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-dark text-white text-center justify-between" horizontal>
        <q-card-section>
          <h6 class="q-my-sm">
            欢迎来到 Lab 3D
            <q-icon name="mdi-test-tube" size="sm" />
          </h6>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-btn class="q-ma-sm" flat color="white" round dense icon="close" @click="hide" />
        </q-card-section>
      </q-card-section>

      <q-card-section class="q-mt-md">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="登录" />
          <q-tab name="register" label="注册" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated ref="panels">
          <q-tab-panel name="login">
            <DialogJoinLoginVue @login-success="ok" />
          </q-tab-panel>

          <q-tab-panel name="register">
            <DialogJoinRegisterVue @register-success="tab = 'login'" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import smoothHeight from 'vue-smooth-height'
import DialogJoinLoginVue from './DialogJoinLogin.vue'
import DialogJoinRegisterVue from './DialogJoinRegister.vue'

export default {
  components: { DialogJoinLoginVue, DialogJoinRegisterVue },

  // 利用 vue-smooth-height 第三方 Mixin 来让登录/注册切换导致的高度变化平滑过渡
  mixins: [smoothHeight],

  props: {
    join: String,
  },

  data() {
    return {
      tab: this.join || 'login',
    }
  },

  methods: {
    // 必须具有 show() 和 hide()
    show() {
      this.$refs.dialog.show()

      this.$nextTick(() => {
        const el = this.$refs.panels.$el
        el.style.transition = 'height 0.3s'
        this.$smoothElement({ el })
      })
    },

    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      this.$emit('hide')
    },

    ok() {
      this.$emit('ok')
      this.hide()
    },
  },
}
</script>