<template>
  <div class="QTarget" @hide="onDialogHide">
    <q-dialog ref="dialog" transition-show="slide-right" transition-hide="slide-left" class="top-left-dialog">
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
  },
  created: function () {
    if (storeData[0] == 'op1') this.msg = '尝试改变地面粗糙程度以减小摩擦'
    if (storeData[0] == 'op2') this.msg = '尝试改变物品与地面接触面积以减小摩擦'
    if (storeData[0] == 'op3') this.msg = '尝试改变物品质量以减小摩擦'
  },
}
</script>