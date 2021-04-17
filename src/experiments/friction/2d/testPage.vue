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
          <div class="text-h6">改变接触面积</div>
          <div>
            <q-btn color="secondary" label="使物品与地面接触面积变大" class="q-my-sm" @click="large" />
          </div>
          <div>
            <q-btn color="secondary" label="使物品与地面接触面积变小" class="q-my-sm" @click="small" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">改变地面材质</div>
          <div>
            <q-btn color="secondary" class="q-mx-sm q-my-sm" @click="grass">
              草地
              <br />
              (非常粗糙)
            </q-btn>
            <q-btn color="secondary" class="q-mx-sm q-my-sm" @click="wood">
              木板
              <br />
              (较为光滑)
            </q-btn>
            <q-btn color="secondary" class="q-mx-sm q-my-sm" @click="ice">
              冰面
              <br />
              (非常光滑)
            </q-btn>
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section class="q-pa-md bg-secondary text-white">
          <q-badge class="text-h6 q-mb-xl" color="secondary">将质量改变为：{{ gravityData }}</q-badge>
          <q-badge class="text-h7" color="secondary">kg</q-badge>
          <q-btn color="secondary" label="确定" class="qbutton q-ml-xl" @click="dataPast" />
          <q-slider
            v-model="gravityData"
            color="white"
            markers
            :min="25"
            :max="75"
            :step="25"
            label
            label-always
            label-color="secondary"
            label-text-color="white"
            dense
          />
        </q-card-section>
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
      gravityData: 75,
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