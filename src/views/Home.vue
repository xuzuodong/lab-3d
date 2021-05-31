<template>
  <div class="home">
    <q-img height="300" :src="url_background"></q-img>
    <div class="container">
      <div style="width: 40%; margin: 20px auto 0px auto">
        <q-img :src="exp" />
      </div>
    </div>
    <img src="../assets/competitionAssets/bg-item1.png" style="position: absolute; left: 0" />

    <HomeExperimentsListVue />

    <img src="../assets/competitionAssets/bg-item2.png" style="position: absolute; right: 0" />

    <div class="container">
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vuePlyr from 'vue-plyr'
import DialogJoinVue from '../components/DialogJoin.vue'
import HomeExperimentsListVue from './HomeExperimentsList.vue'
import url_background from '../assets/competitionAssets/111.png'
import exp from '../assets/competitionAssets/exp.png'
import edu from '../assets/competitionAssets/edu.png'
import intro from '../assets/competitionAssets/intro.png'
import use from '../assets/competitionAssets/use.png'
import neump4 from '../assets/competitionAssets/neump4.mp4'

//先把评价页链接在这里，到时候再改路径
export default {
  name: 'Home',

  components: { HomeExperimentsListVue, vuePlyr },

  data() {
    return { url_background, exp, edu, intro, use, neump4 }
  },

  computed: {
    ...mapState('user', ['userInfo']),
  },

  beforeRouteLeave(to, from, next) {
    if (!this.userInfo && to.path.match('/realExperiment/chemicalPropertiesOfDiluteSulfuricAcid')) {
      this.$q
        .dialog({
          component: DialogJoinVue,
          parent: this,
        })
        .onOk(() => {
          next()
        })
        .onCancel(() => {
          next(false)
        })
        .onDismiss(() => {
          next(false)
        })
    } else {
      next()
    }

    document.title = 'Lab 3D - 体验炫酷的科学实验！'
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
