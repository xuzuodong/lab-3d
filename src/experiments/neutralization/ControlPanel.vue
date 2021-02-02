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
export default {
  name: 'controlPanel',
  props: { babylon: Object, controlFlag: Object },
  data() {
    return { isDropping: false, radio_step1: '', conclusion_step1: '' }
  },
  methods: {
    async drop() {
      if (!this.isDropping) {
        this.isDropping = true
        if (this.liquidType === 'acid' || this.liquidType === 'alkali') {
          await generalOperations.dropLiqiud(this.babylon.scene, 51, 5).then(() => {
            this.isDropping = false
          })
        }
        if (this.liquidType === 'phe') {
          await generalOperations.dropLiqiud(this.babylon.scene, 53, 5).then(() => {
            this.isDropping = false
          })
        }
        if (this.liquidType === 'pur') {
          await generalOperations
            .dropLiqiud(this.babylon.scene, 53, 5, new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255))
            .then(() => {
              this.isDropping = false
            })
        }
      }
    },
    stop() {
      if (!this.isDropping) {
        this.$emit('infoDeliver', 'showButton', false)
        if (this.liquidType === 'acid' || this.liquidType === 'alkali') {
          generalOperations.hideDropper(this.babylon.scene)
        } else {
          generalOperations.putBackDropper(this.babylon.scene, this.liquidType)
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
  computed: {
    liquidType: function() {
      return this.$store.state.liquidType
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
