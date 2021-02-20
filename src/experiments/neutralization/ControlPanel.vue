<template>
  <div id="controlPanel">
    <div v-if="showButton">
      <q-btn color="black" label="滴加" @click="drop" />
      <q-btn color="black" label="结束" @click="stop" />
    </div>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import generalOperations from './babylon/generalOperation'
import { reactions } from './babylon/reaction'
export default {
  name: 'controlPanel',
  props: {
    babylon: Object,
    showButton: Boolean,
    acidType: String,
    dropType: String,
    clearIndicater: Boolean
  },
  data() {
    return {
      isDropping: false,
      indicaterType: '',
      isAddIndicater: false,
      clickCount: 0
    }
  },
  methods: {
    async drop() {
      if (!this.isDropping) {
        this.clickCount++
        this.isDropping = true
        if (this.dropType === 'acid_hcl' || this.dropType === 'acid_ch3cooh') {
          await generalOperations.dropLiqiud(this.babylon.scene, 51, 3).then(() => {
            this.isDropping = false
          })
        }
        if (this.dropType === 'alkali_naoh' || this.dropType === 'alkali_nahco3') {
          await generalOperations.dropLiqiud(this.babylon.scene, 51, 3).then(() => {
            this.isDropping = false
            if (this.isAddIndicater) {
              reactions(this.babylon.scene, this.acidType, this.dropType, this.indicaterType, this.clickCount)
            }
          })
        }
        if (this.dropType === 'phe') {
          await generalOperations.dropLiqiud(this.babylon.scene, 53, 3).then(() => {
            this.isDropping = false
            this.indicaterType = 'phe'
            this.isAddIndicater = true
            reactions(this.babylon.scene, this.acidType, this.dropType, this.indicaterType, this.clickCount)
          })
        }
        if (this.dropType === 'pur') {
          await generalOperations
            .dropLiqiud(this.babylon.scene, 53, 3, new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255))
            .then(() => {
              this.isDropping = false
              this.indicaterType = 'pur'
              this.isAddIndicater = true
              reactions(this.babylon.scene, this.acidType, this.dropType, this.indicaterType, this.clickCount)
            })
        }
      }
    },
    stop() {
      if (!this.isDropping) {
        this.$emit('infoDeliver', false)
        if (
          this.dropType === 'acid_hcl' ||
          this.dropType === 'acid_ch3cooh' ||
          this.dropType === 'alkali_naoh' ||
          this.dropType === 'alkali_nahco3'
        ) {
          generalOperations.hideDropper(this.babylon.scene)
        } else {
          generalOperations.putBackDropper(this.babylon.scene, this.dropType)
        }
      }
    }
  },
  watch: {
    dropType: function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.clickCount = 0
      }
    },
    clearIndicater: function(newVal, oldVal) {
      if (newVal) {
        this.isAddIndicater = false
      }
    }
  }
}
</script>

<style scoped>
#controlPanel {
  position: absolute;
  top: 20px;
  z-index: 5;
}
</style>
