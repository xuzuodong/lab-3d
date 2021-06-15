<template>
  <div class="home">
    <q-img height="300" :src="url_background" />
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
    <div class="container">
      <div style="width: 40%; margin: 20px auto 0px auto">
        <q-img :src="exp" />
      </div>
    </div>

    <img src="../assets/competitionAssets/bg-item1.png" style="position: absolute; left: 0" />
    <img src="../assets/competitionAssets/bg-item2.png" style="position: absolute; right: 0; bottom: 0%" />

    <HomeExperimentsListVue />

    <!-- <div class="container">
      <div style="width: 40%; margin: 10px auto 30px auto"><q-img :src="edu" /></div>
      <q-img :src="use" />
      <div style="width: 40%; margin: 30px auto"><q-img :src="intro" /></div>
      <div class="q-my-md">
        <vue-plyr>
          <video controls crossorigin playsinline>
            <source size="720" :src="neump4" type="video/mp4" />
          </video>
        </vue-plyr>
      </div>
    </div> -->
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import vuePlyr from 'vue-plyr'
// import DialogJoinVue from '../components/DialogJoin.vue'
import HomeExperimentsListVue from './HomeExperimentsList.vue'
import url_background from '../assets/competitionAssets/banner.png'
import exp from '../assets/competitionAssets/exp.png'
// import edu from '../assets/competitionAssets/edu.png'
// import intro from '../assets/competitionAssets/intro.png'
// import use from '../assets/competitionAssets/use.png'
// import neump4 from '../assets/competitionAssets/neump4.mp4'

//先把评价页链接在这里，到时候再改路径
export default {
  name: 'Home',

  components: { HomeExperimentsListVue },

  data() {
    return {
      url_background,
      exp,
      // edu,
      // intro,
      // use,
      // neump4,
      model: 'middle',
    }
  },

  methods: {
    websize() {
      let body = document.getElementsByTagName('body')[0]
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

<style scoped>
.bg-title {
  font-weight: bold;
}
.cen {
  margin: 0 auto;
}
</style>
