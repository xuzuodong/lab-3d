<template>
  <div id="QSlider" v-if="showSlider">
    <div class="q-pa-lg">
      <q-badge class="badge" color="secondary">将质量变为原质量的： {{ gravityData }} / 4</q-badge>
      <q-slider class="slider" v-model="gravityData" color="green" markers snap vertical :min="1" :max="3" />
      <q-btn color="secondary" label="确定" class="button" @click="dataPast" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gravityData: 2,
    }
  },
  props: {
    showSlider: Boolean,
    confirm: Boolean,
  },
  methods: {
    dataPast() {
      this.$emit('father', this.gravityData)
    },
  },
}
</script>
<style scoped>
#QSlider {
  margin: 0;
  padding: 12.5px;
  position: absolute;
  top: 20%;
  right: 10px;
  width: 250px;
  height: 275px;
  background-color: rgb(255, 255, 255, 0.3);
  border-radius: 5%;
}
.q-pa-lg {
  margin: 0;
  padding: 0;
  text-align: center;
}
.slider {
  top: 16px;
  left: 15%;
  display: flex;
}
.badge {
  height: 30px;
  width: auto;
  font-size: 16px;
}
.button {
  margin: 0;
  padding: 0;
  bottom: 100px;
  display: flex;
  left: 50%;
}
</style>