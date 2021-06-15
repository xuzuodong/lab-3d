<template>
  <div class="container">
    <iframe
      style="width: 100%; height: 100vh;"
      scrolling="no"
      :src="`${baseUrl}web/viewer.html?file=${baseUrl}web/manual.pdf`"
    ></iframe>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      baseUrl: process.env.BASE_URL,
    }
  },
}
</script>

<style scoped>
.test-color {
  background-color: red;
}
</style>