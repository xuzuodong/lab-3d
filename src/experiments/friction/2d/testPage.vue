<template>
  <div class="QTest" v-if="showTest">
    <q-dialog
      ref="dialog"
      seamless
      transition-show="slide-left"
      transition-hide="slide-right"
      class="top-right-dialog"
    >
      <q-card class="my-card">
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">改变地面材质</div>
          <div>
            <q-btn color="secondary" label="草地" class="q-mx-md q-my-sm" @click="grass" />
            <q-btn color="secondary" label="木板" class="q-mx-md q-my-sm" @click="wood" />
            <q-btn color="secondary" label="冰面" class="q-mx-md q-my-sm" @click="ice" />
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">改变接触面积</div>
          <div>
            <q-btn color="secondary" label="使物品与地面接触面积变大" class="q-my-sm" @click="large" />
          </div>
          <div>
            <q-btn color="secondary" label="使物品与地面接触面积变小" class="q-my-sm" @click="small" />
          </div>
        </q-card-section>

        <q-separator />
        <div class="q-pa-md bg-secondary text-white">
          <q-badge class="text-h6" color="secondary">将质量变为原质量的： {{ gravityData }} / 4</q-badge>
          <q-slider v-model="gravityData" color="white" markers snap :min="1" :max="3" />
          <q-btn color="secondary" label="确定" class="qbutton" @click="dataPast" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import storeData from './storeData'
export default {
  name: 'testPage',
  data() {
    return {
      gravityData: 2,
    }
  },
  props: {
    showTest: Boolean,
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    grass() {
      this.hide()
      storeData.splice(0, storeData.length)
      storeData.push('grass')
      this.$emit('ok', this)
    },
    wood() {
      this.hide()
      storeData.splice(0, storeData.length)
      storeData.push('wood')
      this.$emit('ok', this)
    },
    ice() {
      this.hide()
      storeData.splice(0, storeData.length)
      storeData.push('ice')
      this.$emit('ok', this)
    },
    large() {
      this.hide()
      storeData.splice(0, storeData.length)
      storeData.push('large')
      this.$emit('ok', this)
    },
    small() {
      this.hide()
      storeData.splice(0, storeData.length)
      storeData.push('small')
      this.$emit('ok', this)
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
.qbutton {
  position: relative;
  left: 108px;
}
</style>