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
          { label: '大', value: 'exlarge' },
          { label: '中', value: 'large' },
          { label: '小', value: 'normal' },
        ]"
        @click="websize"
      />
    </div>
    <div class="container">
      <div style="width: 40%; margin: 20px auto 0px auto">
        <q-img :src="exp" />
      </div>
    </div>

    <img src="../assets/bg-item1.png" style="position: absolute; left: 0" />
    <img src="../assets/bg-item2.png" style="position: absolute; right: 0; bottom: 0%" />

    <HomeExperimentsListVue />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DialogJoinVue from '../components/DialogJoin.vue'
import HomeExperimentsListVue from './HomeExperimentsList.vue'
import url_background from '../assets/banner.png'
import exp from '../assets/exp.png'

export default {
  name: 'Home',

  components: { HomeExperimentsListVue },

  data() {
    return {
      url_background,
      exp,
      model: 'large',
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
  },

  created() {
    this.websize()
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

  methods: {
    websize() {
      let body = document.getElementsByTagName('body')[0]
      if (this.model == 'exlarge') body.setAttribute('style', 'zoom: 1.4')
      if (this.model == 'large') body.setAttribute('style', 'zoom: 1.2')
      if (this.model == 'normal') body.setAttribute('style', 'zoom: 1')
    },
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
