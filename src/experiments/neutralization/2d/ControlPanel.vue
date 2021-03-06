<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    class="top-right-dialog fixed-top-right"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="control-panel q-dialog-plugin" flat>
      <q-card-section v-if="dropType != 'pur' && dropType != 'phe'">
        <div class="text-h6">滴加试剂</div>
        <div class="text-subtitle2">
          向试管中滴加
          <strong>{{ changeLiquidName(dropType) }}</strong>
          吧！
        </div>
      </q-card-section>

      <q-card-section v-if="dropType == 'pur' || dropType == 'phe'">
        <div class="text-h6">添加酸碱指示剂</div>
        <div class="text-subtitle2">
          向试管中滴加
          <strong>{{ changeLiquidName(dropType) }}</strong>
          吧！
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-body1">已加入的溶液</div>
        <li v-for="item in existLiquid" :key="item">
          {{ changeLiquidName(item) }}
        </li>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="滴加" @click="drop" class="q-ma-md" unelevated dense />
        <q-btn
          :disable="clickCount == 0"
          color="primary"
          label="结束"
          @click="stop"
          class="q-ma-md"
          outline
          dense
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import generalOperations from '../3d/generalOperation'
import { reactions } from '../3d/reaction'

export default {
  name: 'controlPanel',
  props: {
    scene: Object,
    dropType: String,
  },

  data() {
    return {
      isDropping: false,
      clickCount: 0,
    }
  },

  methods: {
    show() {
      this.$refs.dialog.show()
    },

    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      this.$emit('hide')
    },

    changeLiquidName(temp) {
      switch (temp) {
        case 'acid_hcl':
          return '稀盐酸'
        case 'acid_ch3cooh':
          return '醋酸溶液'
        case 'alkali_naoh':
          return '氢氧化钠溶液'
        case 'alkali_nahco3':
          return '小苏打溶液'
        case 'pur':
          return '紫色石蕊试剂'
        case 'phe':
          return '酚酞试剂'
        default:
          return ''
      }
    },

    async drop() {
      if (!this.isDropping) {
        this.clickCount++
        this.isDropping = true

        if (this.dropType === 'acid_hcl' || this.dropType === 'acid_ch3cooh') {
          await generalOperations.dropLiqiud(this.scene, 51, 3).then(() => {
            this.scene.mutate({ acidType: [this.dropType, true] })
            this.isDropping = false
          })
        }

        if (this.dropType === 'alkali_naoh' || this.dropType === 'alkali_nahco3') {
          await generalOperations.dropLiqiud(this.scene, 51, 3).then(() => {
            this.scene.mutate({ alkaliType: [this.dropType, true] })
            this.isDropping = false
            if (this.isAddIndicater) {
              reactions(
                this.scene,
                this.scene.acidType[0],
                this.dropType,
                this.scene.indicatorType[0],
                this.clickCount
              )
            }
          })
        }

        if (this.dropType === 'phe') {
          await generalOperations.dropLiqiud(this.scene, 53, 3).then(() => {
            this.scene.mutate({ indicatorType: [this.dropType, true] })
            this.isDropping = false
            reactions(
              this.scene,
              this.scene.acidType[0],
              this.dropType,
              this.scene.indicatorType[0],
              this.clickCount
            )
          })
        }

        if (this.dropType === 'pur') {
          await generalOperations
            .dropLiqiud(this.scene, 53, 3, new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255))
            .then(() => {
              this.scene.mutate({ indicatorType: [this.dropType, true] })
              this.isDropping = false
              reactions(
                this.scene,
                this.scene.acidType[0],
                this.dropType,
                this.scene.indicatorType[0],
                this.clickCount
              )
            })
        }
      }
    },

    stop() {
      if (!this.isDropping) {
        if (
          this.dropType === 'acid_hcl' ||
          this.dropType === 'acid_ch3cooh' ||
          this.dropType === 'alkali_naoh' ||
          this.dropType === 'alkali_nahco3'
        ) {
          generalOperations.hideDropper(this.scene)
        } else {
          generalOperations.putBackDropper(this.scene, this.dropType)
        }

        this.$emit('ok')
        this.hide()
      }
    },
  },

  computed: {
    isAddIndicater: function () {
      return this.scene.indicatorType[1]
    },
    existLiquid: function () {
      let liquidList = []
      if (this.scene.acidType[1]) {
        liquidList.push(this.scene.acidType[0])
      }
      if (this.scene.alkaliType[1]) {
        liquidList.push(this.scene.alkaliType[0])
      }
      if (this.scene.indicatorType[1]) {
        liquidList.push(this.scene.indicatorType[0])
      }
      return liquidList
    },
  },
}
</script>

<style scoped>
.control-panel {
  max-width: 30vw;
}
</style>
