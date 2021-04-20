<template>
  <div class="QSlider" @hide="onDialogHide">
    <q-dialog
      ref="dialog"
      seamless
      transition-show="slide-left"
      transition-hide="slide-right"
      class="top-right-dialog"
    >
      <div class="q-pa-lg">
        <q-badge class="text-h6" color="secondary">将质量变为原质量的： {{ gravityData }} / 4</q-badge>
        <q-slider
          v-model="gravityData"
          color="secondary"
          markers
          snap
          :min="1"
          :max="3"
        />
        <q-btn color="secondary" label="确定" class="qbutton" @click="dataPast" />
      </div>
    </q-dialog>
  </div>
</template>
<script>
import storeData from './storeData'
export default {
  name: 'gravitySlider',
  data() {
    return {
      gravityData: 2,
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
    onOKClick() {
      this.$emit('ok')
      this.hide()
    },

    dataPast() {
      this.hide()
      storeData.splice(0, storeData.length)
      storeData.push(this.gravityData)
      this.$emit('ok', this.gravityData)
    },
  },
}
</script>
<style scoped>
.qbutton{
  position: relative;
  left: 100px;
}
</style>