<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    class="top-right-dialog fixed-top-right"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="control-panel q-dialog-plugin" flat>
      <q-card-section>
        <div class="text-h6">滴加试剂</div>
        <div class="text-subtitle2">
          向试管中滴加
          <strong>{{ dropTypeDisplayName }}</strong>
          吧！
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-body1">已加入的溶液</div>
        <li>稀盐酸 1 ml</li>
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
    babylon: Object,
    acidType: String,
    dropType: String,
    clearIndicater: Boolean,
    scene: Object,
  },

  data() {
    return {
      isDropping: false,
      indicaterType: '',
      isAddIndicater: false,
      clickCount: 0,
    }
  },

  computed: {
    dropTypeDisplayName() {
      return this.dropType == 'alkali_nahco3' ? '小苏打' : '氢氧化钠'
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

    async drop() {
      if (!this.isDropping) {
        this.clickCount++
        this.isDropping = true

        if (this.dropType === 'acid_hcl' || this.dropType === 'acid_ch3cooh') {
          await generalOperations.dropLiqiud(this.scene, 51, 3).then(() => {
            this.isDropping = false
          })
        }

        if (this.dropType === 'alkali_naoh' || this.dropType === 'alkali_nahco3') {
          await generalOperations.dropLiqiud(this.scene, 51, 3).then(() => {
            this.isDropping = false
            if (this.isAddIndicater) {
              reactions(this.scene, this.acidType, this.dropType, this.indicaterType, this.clickCount)
            }
          })
        }

        if (this.dropType === 'phe') {
          await generalOperations.dropLiqiud(this.scene, 53, 3).then(() => {
            this.isDropping = false
            this.indicaterType = 'phe'
            this.isAddIndicater = true
            reactions(this.scene, this.acidType, this.dropType, this.indicaterType, this.clickCount)
          })
        }

        if (this.dropType === 'pur') {
          await generalOperations
            .dropLiqiud(this.scene, 53, 3, new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255))
            .then(() => {
              this.isDropping = false
              this.indicaterType = 'pur'
              this.isAddIndicater = true
              reactions(this.scene, this.acidType, this.dropType, this.indicaterType, this.clickCount)
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

  watch: {
    dropType: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.clickCount = 0
      }
    },

    clearIndicater: function (newVal, oldVal) {
      if (newVal) {
        this.isAddIndicater = false
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
