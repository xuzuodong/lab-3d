<template>
  <div class="home">
    <q-parallax :height="300" :src="url_background">
      <h4 class="text-white">体验炫酷的科学实验！</h4>
    </q-parallax>
    <HomeExperimentsListVue />
    <Evaluation />
  </div>
</template>

<script>
import HomeExperimentsListVue from './HomeExperimentsList.vue'
import url_background from '../assets/background.jpg'

//先把评价页链接在这里，到时候再改路径
import Evaluation from './Evaluation.vue'
export default {
  name: 'Home',

  components: { HomeExperimentsListVue, Evaluation },

  data() {
    return { url_background }
  },
}
</script>
