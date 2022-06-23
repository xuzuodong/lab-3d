<template>
  <div class="QTest">
    <q-dialog
      ref="dialog"
      @hide="onDialogHide"
      seamless
      transition-show="slide-right"
      transition-hide="slide-left"
      class="bottom-left-dialog"
    >
      <q-card class="my-card bg-indigo-8 dialogStyle">
        <q-card-section class="q-py-xl q-my-lg">
          <q-badge class="text-h6 absolute-top q-ml-md" color="indigo-8">将溶剂设置为：</q-badge>
          <q-btn-dropdown :label="dropdown" flat vertical class="absolute-center" text-color="white">
            <q-list>
              <q-item
                clickable
                v-close-popup
                v-for="item in datas"
                :key="item.message"
                style="text-align: center"
                @click="onItemClick(item.message)"
              >
                <q-item-section>
                  <q-item-label>{{ item.message }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-section>

        <q-separator />

        <q-card-section class="bg-indigo-8">
          <q-badge class="text-h6 q-mb-lg" color="indigo-8">将溶剂温度设置为：{{ temperatureData }}</q-badge>
          <q-badge class="text-h7" color="indigo-8">℃</q-badge>
          <q-slider
            v-model="temperatureData"
            color="white"
            :min="0"
            :max="100"
            :step="1"
            label
            label-always
            label-color="indigo-8"
            label-text-color="white"
            dense
            @input="temperaturePast"
          />
        </q-card-section>

        <q-separator />

        <q-card-section class="bg-indigo-8">
          <q-badge class="text-h6 q-mb-lg" color="indigo-8">将溶剂体积设置为：{{ volumeData }}</q-badge>
          <q-badge class="text-h7" color="indigo-8">mL</q-badge>
          <q-slider
            v-model="volumeData"
            color="white"
            :min="5"
            :max="100"
            :step="1"
            label
            label-always
            label-color="indigo-8"
            label-text-color="white"
            dense
            @input="volumePast"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import condition from './conditionData'
import eventBus from './eventBus.js'
import actions from '../3d/actions.js'

export default {
  name: 'test-page',
  data() {
    return {
      temperatureData: condition.temperature,
      volumeData: condition.liquidVolume,
      dropdown: '选择你想要的溶剂',
      datas: this.data,
      tthiss: this.tthis,
    }
  },
  props: { data: Array, tthis: Object },
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
    onOKClick() {
      this.$emit('ok')
      this.hide()
    },
    onItemClick(solute) {
      // console.log('Clicked on an Item')
      this.dropdown = solute
      actions.liquidType(solute)
    },

    temperaturePast() {
      condition.temperature = this.temperatureData
      eventBus.$emit('aMsg', '来自A页面的消息')
      actions.updateData('temperature')
    },
    volumePast() {
      condition.liquidVolume = this.volumeData
      eventBus.$emit('aMsg', '来自A页面的消息')
      actions.updateData('volume')
    },
  },
  mounted() {
    actions.getThis(this.tthiss)
    actions.updateData()
  },
}
</script>
<style scoped>
.my-card {
  width: 400px;
}
.dialogStyle {
  height: 100%;
}
</style>