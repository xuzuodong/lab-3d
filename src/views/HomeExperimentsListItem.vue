<template>
  <div>
    <router-link :to="'/experiment/' + experiment.alias" v-if="experiment.alias != null">
      <q-card class="experiment-item cursor-pointer full-height">
        <q-img :src="experiment.image" width="100%" :ratio="3 / 2" />

        <q-card-section class="row items-top no-wrap">
          <div class="text-h6">
            {{ experiment.name }}
            <q-badge color="yellow-6" text-color="black">
              {{ experiment.subject }}
            </q-badge>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-snip:js="4">
          {{ experiment.description }}
        </q-card-section>
      </q-card>
    </router-link>
    <div v-if="experiment.alias == null" @click.prevent="openOldExperiment()">
      <q-card class="experiment-item cursor-pointer full-height">
        <q-img :src="experiment.image" width="100%" :ratio="3 / 2" />

        <q-card-section class="row items-top no-wrap">
          <div class="text-h6">
            {{ experiment.name }}
            <q-badge color="yellow-6" text-color="black">
              {{ experiment.subject }}
            </q-badge>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-snip:js="4">
          {{ experiment.description }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DialogJoinVue from '../components/DialogJoin.vue'
export default {
  props: { experiment: Object },
  computed: {
    ...mapState('user', ['userInfo']),
    oldExperiment: function () {
      if (this.experiment.id === 1) return 'saltpage'
      if (this.experiment.id === 2) return 'phpage'
      return 'homepage'
    },
  },
  methods: {
    openOldExperiment() {
      if (this.userInfo != null) {
        window.open(`http://47.98.192.17/${this.oldExperiment}.html?${this.userInfo.token}`, '_blank')
      } else {
        this.$q
          .dialog({
            component: DialogJoinVue,
            parent: this,
          })
          .onOk(() => {})
      }
    },
  },
}
</script>

<style scoped lang="scss">
.experiment-item {
  width: 250px;
}
a {
  text-decoration: none;
  color: black;
}
</style>
