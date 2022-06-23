<template>
  <div class="QParameter" @hide="onDialogHide">
    <q-dialog
      ref="dialog"
      transition-show="slide-left"
      transition-hide="slide-right"
      class="top-right-dialog"
      seamless
    >
      <q-card style="width: 350px" class="bg-indigo-8">
        <q-card-section class="bg-indigo-8 text-white q-px-md">
          <div class="text-h6 text-center">实时数据</div>
        </q-card-section>
        <q-card-section class="bg-indigo-8 text-white q-px-md">
          <div>
            <q-badge class="text-body1 bg-indigo-8 text-white">当前下落的盐共：{{ saltAmount }} g</q-badge>
          </div>
          <div>
            <q-badge class="text-body1 bg-indigo-8 text-white">
              其中溶解在溶剂中的盐共：{{ dissolvedSaltAmount }} g
            </q-badge>
          </div>
          <div>
            <q-badge class="text-body1 bg-indigo-8 text-white">温度：{{ temperature }} ℃</q-badge>
          </div>
          <div>
            <q-badge class="text-body1 bg-indigo-8 text-white">体积：{{ liquidVolume }} mL</q-badge>
          </div>
          <div>
            <q-badge class="text-body1 bg-indigo-8 text-white">溶液的浓度 C = {{ Concentration }} %</q-badge>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import condition from './conditionData'
import eventBus from './eventBus.js'
export default {
  name: 'param-page',
  data() {
    return {
      saltAmount: 0,
      dissolvedSaltAmount: 0,
      liquidVolume: 0,
      temperature: 0,
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
    updateData() {
      this.saltAmount = condition.saltAmount
      this.dissolvedSaltAmount = condition.dissolvedSaltAmount
      this.temperature = condition.temperature
      this.liquidVolume = condition.liquidVolume
    },
  },
  mounted() {
    eventBus.$on('aMsg', (msg) => {
      // A发送来的消息
      this.updateData()
    })
    this.updateData()
  },
  computed: {
    Concentration() {
      if (this.liquidVolume != 0) {
        return ((this.dissolvedSaltAmount / (this.dissolvedSaltAmount + this.liquidVolume)) * 100).toFixed(2)
      } else return 0
    },
  },
  watch: {
    saltAmount() {
      this.saltAmount = condition.saltAmount
    },
    dissolvedSaltAmount() {
      this.dissolvedSaltAmount = condition.dissolvedSaltAmount
    },
  },
}
</script>