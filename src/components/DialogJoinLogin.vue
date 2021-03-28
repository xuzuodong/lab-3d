<template>
  <q-form @submit="onSubmit" class="q-my-md">
    <q-input
      class="q-my-sm"
      filled
      v-model="username"
      ref="username"
      label="用户名"
      lazy-rules="ondemand"
      :rules="[(val) => (val && val.length > 0) || '请输入用户名']"
    />

    <q-input
      filled
      type="password"
      v-model="password"
      label="密码"
      lazy-rules="ondemand"
      :rules="[(val) => (val !== null && val !== '') || '请输入密码']"
    />

    <div class="q-my-md">
      <q-btn label="登录" type="submit" color="primary" class="full-width" />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      username: null,
      password: null,
    }
  },

  methods: {
    ...mapActions('user', ['login']),

    onSubmit() {
      this.login({
        username: this.username,
        password: this.password,
        success: () => {
          this.$emit('login-success')
          this.$q.notify({ color: 'positive', icon: 'check', message: '登录成功！', position: 'top' })
        },
        failure: () => {
          this.$q.notify({
            color: 'red',
            icon: 'error',
            message: '登录失败！请检查账号密码是否正确。',
            position: 'top',
          })
        },
      })
    },
  },

  mounted() {
    this.$refs.username.focus()
  },
}
</script>
