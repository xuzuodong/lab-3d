<template>
  <div :class="$q.dark.isActive ? 'bg-darkSurface' : 'bg-light'">
    <h5 v-if="!experiments && !failure" class="text-center text-grey">加载中...</h5>
    <h5 v-if="!experiments && failure" class="text-center text-grey">
      加载失败，
      <a @click="selectAllExperiments" class="cursor-pointer">点击重试</a>
    </h5>
    <div v-else class="container row justify-center q-py-lg">
      <HomeExperimentsListItemVue
        v-for="experiment in experiments"
        :key="experiment.id"
        :experiment="experiment"
        class="q-ma-md"
      />
      <div class="spacer q-mx-md" v-for="i in 8" :key="'spacer' + i" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HomeExperimentsListItemVue from './HomeExperimentsListItem.vue'

export default {
  components: { HomeExperimentsListItemVue },

  data() {
    return {
      experiments: null,
      failure: false,
    }
  },

  methods: {
    ...mapActions('experiment', ['selectAllExperiments']),
  },

  created() {
    this.selectAllExperiments({
      success: (experiments) => {
        console.log(experiments)
        this.experiments = experiments.reverse()
        this.failure = false
      },
      failure: (res) => {
        this.failure = true
        console.log(res)
      },
    })
  },
}
</script>

<style scoped lang="scss">
.spacer {
  width: 250px;
  height: 0;
}
</style>