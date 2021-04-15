<template>
  <div class="QTarget" v-if="showTarget">
    <q-dialog
      ref="dialog"
      seamless
      transition-show="slide-right"
      transition-hide="slide-left"
      class="q-pa-md row items-start q-gutter-md top-left-dialog"
    >
      <q-card class="my-card">
        <q-card-section class="bg-secondary text-white q-px-md">
          <div class="text-h6">{{ msg }}</div>
          <div class="text-h7 q-mb-sm">使用右侧工具箱进行实验。</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import storeData from './storeData'
export default {
  name: 'targetPage',
  data() {
    return {
      msg: '',
    }
  },
  props: {
    showTarget: Boolean,
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    jump() {
      this.hide()
      this.$emit('ok', this.msg)
    },
  },
  created: function () {
    if (storeData[0] == 'op1') this.msg = '尝试改变地面粗糙程度以减小摩擦'
    if (storeData[0] == 'op2') this.msg = '尝试改变物品与地面接触面积以减小摩擦'
    if (storeData[0] == 'op3') this.msg = '尝试改变物品质量以减小摩擦'
  },

}
</script>
<style scoped>
.qbutton {
  margin: 10px;
  position: relative;
  left: 75%;
}
</style>