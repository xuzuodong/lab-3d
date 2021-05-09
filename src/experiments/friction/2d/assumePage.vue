<template>
  <div class="QAssume" @hide="onDialogHide">
    <q-dialog
      ref="dialog"
      seamless
      transition-show="scale"
      transition-hide="scale"
      class="q-pa-md row items-start q-gutter-md"
    >
      <q-card class="my-card">
        <q-card-section class="bg-secondary text-white">
          <div class="text-h5">实验假设：请提出你的方法</div>
          <br />
          <div class="text-subtitle2">
            摩擦力，就是一个物体在另一个物体表面上运动或者将要运动时，产生的阻碍它们相对运动的力。你认为哪些方法能减小摩擦力？请选择选项并点击确定按钮进行探究。
          </div>
        </q-card-section>

        <q-separator />
        <div class="q-pa-lg">
          <q-option-group v-model="group" :options="options" color="secondary" />
          <q-btn color="secondary" label="确定" class="qbutton" @click="confirm" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import storeOption from './storeOption'
export default {
  name: 'assumePage',
  data() {
    return {
      group: '',
      options: [
        {
          label: '地面的粗糙程度也许会影响摩擦力',
          value: 'op1',
          disable: this.option1,
        },
        {
          label: '物体与地面的接触面积也许会影响摩擦力',
          value: 'op2',
          disable: this.option2,
        },
        {
          label: '物体对地面的压力也许会影响摩擦力',
          value: 'op3',
          disable: this.option3,
        },
      ],
    }
  },
  props: {
    option1: Boolean,
    option2: Boolean,
    option3: Boolean,
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

    confirm() {
      if (this.group != '') {
        console.log(this.group)
        storeOption.push(this.group)
        this.$emit('ok', this.group)
        this.hide()
      }
    },
  },
}
</script>
<style scoped>
.qbutton {
  margin: 10px;
  position: relative;
  left: 80%;
}
</style>