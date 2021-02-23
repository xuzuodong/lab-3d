<template>
  <router-link tag="div" :to="'/experiment/' + experiment.alias">
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
</template>

<script>
export default {
  props: { experiment: Object },
}
</script>

<style scoped lang="scss">
.experiment-item {
  width: 250px;
}
</style>