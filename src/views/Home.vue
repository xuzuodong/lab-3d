<template>
  <div class="home">
    <q-parallax :height="300" :src="url_background">
      <h4 class="text-white">体验炫酷的科学实验！</h4>
    </q-parallax>
    <div class="row justify-end">
      <div class="text-subtitle1 self-center">页面大小：</div>
      <q-btn-toggle
        v-model="model"
        toggle-color="primary"
        flat
        class="q-mr-md"
        :options="[
          { label: '大', value: 'large' },
          { label: '中', value: 'middle' },
          { label: '小', value: 'small' },
        ]"
        @click="websize"
      />
    </div>

    <HomeExperimentsListVue />
  </div>
</template>

<script>
import HomeExperimentsListVue from './HomeExperimentsList.vue'
import url_background from '../assets/background.jpg'

//先把评价页链接在这里，到时候再改路径
export default {
  name: 'Home',

  components: { HomeExperimentsListVue },

  data() {
    return {
      url_background,
      model: 'middle',
    }
  },

  methods: {
    websize() {
      let body = document.getElementsByTagName('body')[0]
      console.log(body)
      if (this.model == 'large') body.style.zoom = 1.4
      if (this.model == 'middle') body.style.zoom = 1.2
      if (this.model == 'small') body.style.zoom = 1
    },
  },
  created() {
    this.websize()
  },
}
</script>
