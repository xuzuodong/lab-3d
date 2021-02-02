<template>
  <div>
    <h4 v-if="!experiments">加载中...</h4>
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
    }
  },

  methods: {
    ...mapActions('experiment', ['selectAllExperiments']),
  },

  created() {
    this.selectAllExperiments({
      success: (experiments) => (this.experiments = experiments),
      failure: (res) => console.log(res),
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