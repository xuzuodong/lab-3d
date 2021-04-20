<template>
  <div class="home">
    <q-parallax :height="300" :src="url_background">
      <h4 class="text-white">体验炫酷的科学实验！</h4>
    </q-parallax>
    <HomeExperimentsListVue />
  </div>
</template>

<script>
import HomeExperimentsListVue from './HomeExperimentsList.vue'
import url_background from '../assets/background.jpg'

//先把评价页链接在这里，到时候再改路径
export default {
  name: 'Home',

  components: { HomeExperimentsListVue},

  data() {
    return { url_background }
  },
}
</script>
