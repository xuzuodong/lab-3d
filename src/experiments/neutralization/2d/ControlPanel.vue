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

      <q-card-section class="hide-overflow">
        <div class="text-body1">已加入的溶液</div>
        <transition-group name="slide">
          <li v-for="item in liquidGroup" :key="item.lqName">
            {{ changeLiquidName(item.lqName) }} {{ item.volume + 'ml' }}
          </li>
        </transition-group>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="滴加" @click="drop" class="q-ma-md" unelevated dense />
        <q-btn color="primary" label="结束" @click="stop" class="q-ma-md" outline dense />
      </q-card-actions>

      <q-card-actions align="center" v-if="allFinished">
        <q-btn color="primary" label="清空试管" @click="freeResart" class="q-mb-xs" unelevated dense />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import generalOperations from '../3d/generalOperation'
import { reactions } from '../3d/reaction'
import { Notify } from 'quasar'

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

  computed: {
    isAddIndicater: function () {
      if (this.scene.existLiquid.indexOf('pur') != -1 || this.scene.existLiquid.indexOf('phe') != -1) {
        return true
      } else return false
    },
    liquidGroup: function () {
      let initArr = this.scene.existLiquid
      let formatArr = []
      let returnArr = []
      for (let i = 0; i < initArr.length; i++) {
        if (formatArr.indexOf(initArr[i]) === -1) {
          formatArr.push(initArr[i])
          let volume = 0
          for (let j = i; j < initArr.length; j++) {
            if (initArr[i] === initArr[j]) {
              volume++
            }
          }
          returnArr.push({ lqName: initArr[i], volume: Math.floor(volume) / 10 })
        } else continue
      }
      return returnArr
    },
    allFinished: function () {
      return this.scene.allFinished
    },
  },

  methods: {
    show() {
      this.$refs.dialog.show()
    },

    hide() {
      this.$refs.dialog.hide()
      this.scene.mutate({ liquidPanel: null })
    },

    onDialogHide() {
      this.$emit('hide')
    },

    changeLiquidName(temp) {
      switch (temp) {
        case 'acid_hcl':
          return '稀盐酸'
        case 'acid_hno':
          return '稀硝酸'
        case 'alkali_naoh':
          return '氢氧化钠溶液'
        case 'alkali_baoh':
          return '氢氧化钡溶液'
        case 'pur':
          return '紫色石蕊试剂'
        case 'phe':
          return '酚酞试剂'
        default:
          return ''
      }
    },

    countDropType(dropType) {
      let count = 0
      for (let i = 0; i < this.scene.existLiquid.length; i++) {
        if (this.scene.existLiquid[i] == dropType) count++
      }
      return count
    },

    finishStep(dropType) {
      if (!this.allFinished) {
        if (this.scene.progress[0].step.slice(0, 1) != '1') {
          if (dropType === 'pur' || dropType === 'phe') {
            this.scene.progress[1].finished = true
          } else {
            if (!this.scene.progress[0].finished) {
              if (this.countDropType(dropType) === 1) this.scene.progress[0].finished = true
            } else {
              if (this.countDropType(dropType) === 1) this.scene.progress[2].finished = true
            }
          }
        }
      } else {
        this.finishStep = function () {}
      }
    },

    liquidLevel() {
      const main_liquid = this.scene.getMeshByName('main_liquid')
      let height = main_liquid.getBoundingInfo().boundingBox.maximumWorld.y - 0.5
      return height
    },

    async drop() {
      if (!this.isDropping && this.scene.existLiquid.length < 40 && this.scene.animatables.length === 0) {
        this.clickCount++
        this.isDropping = true

        if (this.dropType === 'acid_hcl' || this.dropType === 'acid_hno') {
          await generalOperations.dropLiqiud(this.scene, 53, this.liquidLevel()).then(() => {
            this.scene.mutate({ acidType: this.dropType })
            this.scene.existLiquid.push(this.dropType)
            this.finishStep(this.dropType)
            this.isDropping = false
            reactions(this.scene, this.liquidGroup, this.dropType)
          })
        }

        if (this.dropType === 'alkali_naoh' || this.dropType === 'alkali_baoh') {
          await generalOperations.dropLiqiud(this.scene, 53, this.liquidLevel()).then(() => {
            this.scene.mutate({ alkaliType: this.dropType })
            this.scene.existLiquid.push(this.dropType)
            this.finishStep(this.dropType)
            this.isDropping = false
            if (this.isAddIndicater) {
              reactions(this.scene, this.liquidGroup, this.dropType)
            }
          })
        }

        if (this.dropType === 'phe') {
          await generalOperations.dropLiqiud(this.scene, 53, this.liquidLevel()).then(() => {
            const purBottle = this.scene.getMeshByName('purbottle')
            const pheBottle = this.scene.getMeshByName('phebottle')
            purBottle.actionManager.unregisterAction(purBottle.actionManager.actions[2])
            pheBottle.actionManager.unregisterAction(pheBottle.actionManager.actions[2])
            if (!this.allFinished) {
              if (this.scene.progress[0].step.slice(0, 1) == '2') this.scene.mutate({ indicatorUsed: 'phe' })
            }
            this.scene.mutate({ indicatorType: this.dropType })
            this.scene.existLiquid.push(this.dropType)
            this.finishStep(this.dropType)
            this.isDropping = false
            reactions(this.scene, this.liquidGroup, this.dropType)
          })
        }

        if (this.dropType === 'pur') {
          await generalOperations
            .dropLiqiud(
              this.scene,
              53,
              this.liquidLevel(),
              new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255)
            )
            .then(() => {
              const purBottle = this.scene.getMeshByName('purbottle')
              const pheBottle = this.scene.getMeshByName('phebottle')
              purBottle.actionManager.unregisterAction(purBottle.actionManager.actions[2])
              pheBottle.actionManager.unregisterAction(pheBottle.actionManager.actions[2])
              if (!this.allFinished) {
                if (this.scene.progress[0].step.slice(0, 1) == '2')
                  this.scene.mutate({ indicatorUsed: 'pur' })
              }
              this.scene.mutate({ indicatorType: this.dropType })
              this.scene.existLiquid.push(this.dropType)
              this.finishStep(this.dropType)
              this.isDropping = false
              reactions(this.scene, this.liquidGroup, this.dropType)
            })
        }
      } else if (this.scene.existLiquid.length == 40) {
        Notify.create({
          message: '当前试管中溶液已满，若要继续实验，请先倒空试管！',
          type: 'negative',
          position: 'center',
          timeout: 5000,
          actions: [{ label: 'X', color: 'white', handler: () => {} }],
        })
      }
    },

    stop() {
      if (!this.isDropping) {
        if (
          this.dropType === 'acid_hcl' ||
          this.dropType === 'acid_hno' ||
          this.dropType === 'alkali_naoh' ||
          this.dropType === 'alkali_baoh'
        ) {
          generalOperations.putBackDropper(this.scene, this.dropType)
        } else {
          generalOperations.putBackDropper(this.scene, this.dropType)
        }

        this.$emit('ok')
        this.hide()
      }
    },

    async freeResart() {
      this.scene.existLiquid.splice(0, this.scene.existLiquid.length)
      this.scene.freeExperiment('freshAll')
      await this.scene.resetAll()
    },
  },
}
</script>

<style scoped>
.control-panel {
  max-width: 30vw;
}
.hide-overflow {
  overflow: hidden;
}
</style>
