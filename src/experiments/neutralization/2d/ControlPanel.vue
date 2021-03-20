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
        <transition name="slide">
          <li v-for="item in liquidGroup" :key="item.lqName">
            {{ changeLiquidName(item.lqName) }} {{ item.volume + 'ml' }}
          </li>
        </transition>
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

    <q-dialog v-model="fullAlert" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">注意！</div>
        </q-card-section>

        <q-separator />

        <q-card-section>试管中的溶液容量已达上限，请重新进行实验！</q-card-section>

        <q-card-actions align="right">
          <q-btn label="确定" color="primary" v-close-popup unelevated dense />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      fullAlert: false,
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
      if (!this.isDropping && this.scene.existLiquid.length < 40) {
        this.clickCount++
        this.isDropping = true

        if (this.dropType === 'acid_hcl' || this.dropType === 'acid_ch3cooh') {
          await generalOperations.dropLiqiud(this.scene, 51, 3).then(() => {
            this.scene.mutate({ acidType: this.dropType })
            this.scene.existLiquid.push(this.dropType)
            this.isDropping = false
          })
        }

        if (this.dropType === 'alkali_naoh' || this.dropType === 'alkali_nahco3') {
          await generalOperations.dropLiqiud(this.scene, 51, 3).then(() => {
            this.scene.mutate({ alkaliType: this.dropType })
            this.scene.existLiquid.push(this.dropType)
            this.isDropping = false
            if (this.isAddIndicater) {
              reactions(this.scene, this.liquidGroup, this.dropType)
            }
          })
        }

        if (this.dropType === 'phe') {
          await generalOperations.dropLiqiud(this.scene, 53, 3).then(() => {
            this.scene.mutate({ indicatorType: this.dropType })
            this.scene.existLiquid.push(this.dropType)
            this.isDropping = false
            reactions(this.scene, this.liquidGroup, this.dropType)
          })
        }

        if (this.dropType === 'pur') {
          await generalOperations
            .dropLiqiud(this.scene, 53, 3, new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255))
            .then(() => {
              this.scene.mutate({ indicatorType: this.dropType })
              this.scene.existLiquid.push(this.dropType)
              this.isDropping = false
              reactions(this.scene, this.liquidGroup, this.dropType)
            })
        }
      } else if (this.scene.existLiquid.length == 40) {
        this.fullAlert = true
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
}
</script>

<style scoped>
.control-panel {
  max-width: 30vw;
}
</style>
