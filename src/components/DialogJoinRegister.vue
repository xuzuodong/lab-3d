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
      class="q-my-sm"
      filled
      type="password"
      v-model="password"
      label="密码"
      lazy-rules="ondemand"
      :rules="[(val) => (val !== null && val !== '') || '请输入密码']"
    />

    <q-input
      filled
      type="password"
      v-model="confirmPassword"
      label="确认密码"
      lazy-rules="ondemand"
      :rules="[
        (val) => (val !== null && val !== '') || '请确认密码',
        (val) => val == password || '两次输入的密码不一致',
      ]"
    />

    <div class="row justify-between items-center">
      <span class="text-subtitle1">身份：</span>
      <q-option-group v-model="userType" :options="userTypeOptiens" color="primary" inline />
    </div>

    <div class="q-my-md">
      <q-btn label="注册" type="submit" color="primary" class="full-width" />
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
      confirmPassword: null,
      userType: '0',
      userTypeOptiens: [
        { label: '学生', value: '0' },
        { label: '老师', value: '1' },
      ],
    }
  },

  methods: {
    ...mapActions('user', ['register']),

    onSubmit() {
      this.register({
        username: this.username,
        password: this.password,
        userType: this.userType,
        success: () => {
          this.$q.notify({ color: 'positive', icon: 'check', message: '注册成功！', position: 'top' })
          this.$emit('register-success')
        },
        failure: (error) => {
          const msg = error.data.code == 500 ? '用户名已存在' : '注册失败'
          this.$q.notify({ color: 'red', icon: 'error', message: msg, position: 'top' })
        },
      })
    },

    focus() {
      this.$refs.username.focus()
    },
  },
}
</script>