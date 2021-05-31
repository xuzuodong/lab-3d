<template>
  <div class="container">
    <pdf ref="pdf" :src="url"></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: {
    pdf,
  },
  data() {
    return {
      url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
    }
  },
}
</script>   


<style scoped>
</style>