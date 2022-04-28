<template>
  <div class="QTarget" @hide="onDialogHide">
    <q-dialog
      ref="dialog"
      transition-show="slide-right"
      transition-hide="slide-left"
      class="top-left-dialog"
      seamless
    >
      <q-card class="my-card">
        <q-card-section class="bg-secondary text-white q-px-md">
          <div class="text-h6 text-weight-light">
            探究因素：<span class="text-weight-bold">{{ msg }}</span>
          </div>
          <div class="text-h7 text-weight-light">
            滑动摩擦力大小与<span class="text-weight-bold">{{ msg }}</span>之间有什么关系呢？
          </div>
          <div class="text-h7 q-mb-xs text-weight-light">使用右侧的工具箱进行实验探究吧</div>
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
    if (storeData[0] == 'op1') this.msg = '接触面的粗糙程度'
    if (storeData[0] == 'op2') this.msg = '物体与地面的接触面积'
    if (storeData[0] == 'op3') this.msg = '物体给地面的压力'
  },
}
</script>