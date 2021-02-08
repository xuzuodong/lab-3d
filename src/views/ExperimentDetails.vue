<template>
  <div class="container">
    <!-- 加载界面 -->
    <div v-if="!experiment" class="absolute-spinner">
      <q-spinner color="primary" size="3rem" :thickness="5" />
    </div>
    <!-- 实验详情 -->
    <div v-else>
      <div class="row no-wrap q-pt-lg">
        <q-img
          class="experiment-image rounded-borders"
          :src="experiment.image"
          :ratio="1"
          spinner-color="primary"
          spinner-size="25px"
        />
        <div class="q-pl-lg col">
          <h5 class="q-my-sm">{{ experiment.name }}</h5>
          <p>{{ experiment.introduction }}</p>
        </div>
      </div>
      <div class="text-center q-mt-sm">
        <q-btn
          :to="'/scene/' + $route.params.alias"
          color="primary"
          label="进入实验"
          icon-right="arrow_forward"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DialogJoinVue from '../components/DialogJoin.vue'

export default {
  data() {
    return {
      experiment: null,
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
  },

  methods: {
    ...mapActions('experiment', ['selectExperimentByAlias']),
  },

  created() {
    this.selectExperimentByAlias({
      alias: this.$route.params.alias,
      success: (experiment) => {
        this.experiment = experiment
      },
      failure: (error) => {
        console.log(error)
      },
    })
  },

  beforeRouteLeave(to, from, next) {
    if (!this.userInfo && to.path.match('/scene')) {
      this.$q
        .dialog({
          component: DialogJoinVue,
          parent: this,
          text: 'something',
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
  },
}
</script>

<style scoped lang="scss">
.experiment-image {
  width: 180px;
}
</style>