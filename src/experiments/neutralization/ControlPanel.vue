<template>
  <div id="controlPanel">
    <div v-if="controlFlag.showButton">
      <q-btn color="black" label="滴加" @click="drop" />
      <q-btn color="black" label="结束" @click="stop" />
    </div>
    <div class="q-gutter-sm" v-if="controlFlag.showRadio">
      <p>以下哪一种才是使用胶头滴管的正确方式？</p>
      <q-radio v-model="radio_step1" val="A、1" label="A、1" />
      <q-radio v-model="radio_step1" val="B、2" label="B、2" />
      <q-radio v-model="radio_step1" val="C、3" label="C、3" />
      <q-radio v-model="radio_step1" val="D、4" label="D、4" />
      <q-btn color="black" label="提交" @click="radio_submit" />
    </div>
    <div v-if="controlFlag.showConPanel">
      <p>在刚刚“酸溶液”和“碱溶液”的反应中，你有观察到它们之间发生了什么明显的变化吗？</p>
      <div class="q-pa-md" style="max-width: 300px">
        <q-input v-model="conclusion_step1" filled autogrow />
      </div>
      <q-btn color="black" label="提交" @click="text_submit" />
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
    controlFlag: Object,
    acidType: String,
    dropType: String,
    clearIndicater: Boolean
  },
  data() {
    return {
      isDropping: false,
      radio_step1: '',
      conclusion_step1: '',
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
        this.$emit('infoDeliver', 'showButton', false)
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
    },
    radio_submit() {
      if (this.radio_step1 != '') {
        this.$emit('infoDeliver', 'showRadio', false)
      }
    },
    text_submit() {
      if (this.conclusion_step1 != '') {
        this.$emit('infoDeliver', 'showConPanel', false)
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
