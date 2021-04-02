<template>
  <div class="QTarget">
    <q-dialog
      ref="dialog"
      seamless
      class="top-left-dialog fixed-top-left"
      transition-show="slide-right"
      transition-hide="slide-left"
    >
      <q-card class="control-panel" flat>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">实验步骤：</div>
          <div v-for="(item, index) in progress" :key="item.step">
            <div class="text-body1 q-my-sm">
              {{ index + 1 }}、{{ stepName(item.step) }}
              <q-icon :name="fasCheckCircle" :class="[item.finished ? 'checked' : 'unchecked']" />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="倒空试管"
            @click="reset"
            v-if="couldReset"
            :disable="scene.existLiquid.length === 0"
          />
          <q-btn color="primary" label="完成" @click="finish" v-if="showBtn" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { fasCheckCircle } from '@quasar/extras/fontawesome-v5'
export default {
  name: 'targetPage',
  props: {
    progress: Array,
    scene: Object,
  },
  data() {
    return {
      fasCheckCircle: '',
    }
  },
  computed: {
    couldReset() {
      if (this.progress.length != 0) {
        if (this.progress[0].step.slice(0, 1) != '1') {
          return true
        } else return false
      } else return false
    },
    showBtn: function () {
      let showBtn
      for (let i = 0; i < this.progress.length; i++) {
        if (this.progress[i].finished === false) {
          showBtn = false
          break
        } else showBtn = true
      }
      return showBtn
    },
  },
  created() {
    this.fasCheckCircle = fasCheckCircle
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    async reset() {
      for (let i = 0; i < this.progress.length; i++) {
        this.progress[i].finished = false
      }
      this.scene.existLiquid.splice(0, this.scene.existLiquid.length)
      this.scene.freeExperiment('restart')
      await this.scene.resetAll()
    },
    finish() {
      this.hide()
      this.$emit('ok')
    },
    stepName(step) {
      switch (step) {
        case '1-1':
          return '请从左侧两种酸溶液中任选一种，并将其加入试管中'
        case '1-2':
          return '请从右侧两种碱溶液中任选一种，并将其加入试管中'
        case '2-1':
        case '2-3':
        case '3-1':
        case '3-3':
          return '请选择一种酸溶液或碱溶液，并将其加入试管中'
        case '2-2':
        case '3-2':
          return '请选择一种酸碱指示剂，并将其加入试管中'
      }
    },
  },
}
</script>
<style scoped>
.checked {
  opacity: 1;
}
.unchecked {
  opacity: 0;
}
</style>