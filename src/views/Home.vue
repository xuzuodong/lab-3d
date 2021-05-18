<template>
  <div class="home">
    <q-parallax :height="300" :src="url_background">
      <h4 class="text-white">体验炫酷的科学实验！</h4>
    </q-parallax>
    <HomeExperimentsListVue />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DialogJoinVue from '../components/DialogJoin.vue'
import HomeExperimentsListVue from './HomeExperimentsList.vue'
import url_background from '../assets/background.jpg'

//先把评价页链接在这里，到时候再改路径
export default {
  name: 'Home',

  components: { HomeExperimentsListVue },

  data() {
    return { url_background }
  },

  computed: {
    ...mapState('user', ['userInfo']),
  },

  beforeRouteLeave(to, from, next) {
    if (!this.userInfo && to.path.match('/realExperiment')) {
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
