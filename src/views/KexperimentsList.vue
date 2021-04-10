<template>
  <div>
    <router-link to="/kexperiment-details/123">查看详情</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('user', ['selectMyKexperiment']),
  },
  created() {
    this.selectMyKexperiment({
      success: (res) => {
        console.log(res)
      },
      failure: (res) => {},
    })
  },
}
</script>

<style>
</style>