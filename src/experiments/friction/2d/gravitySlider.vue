<template>
  <div id="QSlider" v-if="showSlider">
    <q-dialog
      ref="dialog"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <div class="q-pa-lg">
        <q-badge class="text-h6" color="secondary">将质量变为原质量的： {{ gravityData }} / 4</q-badge>
        <q-slider
          class="slider"
          v-model="gravityData"
          color="green"
          markers
          snap
          vertical
          :min="1"
          :max="3"
        />
        <q-btn color="secondary" label="确定" class="button" @click="decrGravityRun" />
      </div>
    </q-dialog>
  </div>
</template>
<script>
import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import actions from '../3d/actions'
import initScene from '../3d/initScene'

export default {
  name: 'gravitySlider',
  data() {
    return {
      gravityData: 2,
    }
  },
  props: {
    showSlider: Boolean,
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },

    hide() {
      this.$refs.dialog.hide()
    },
    dataPast() {
      this.$emit('father', this.gravityData)
    },
    decrGravityRun() {
      console.log(this.gravityData)
      if (this.gravityData == 1) actions.iceRun(0.08)
      else if (this.gravityData == 2) actions.iceRun(0.06)
      else if (this.gravityData == 3) actions.iceRun(0.04)
    },
  },
}
</script>
<style scoped>
/* #QSlider {
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
} */
</style>