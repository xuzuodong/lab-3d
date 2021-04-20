<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    seamless
    class="top-left-dialog fixed-top-left"
    transition-show="slide-right"
    transition-hide="slide-left"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">自由探究环节</div>
        <div class="text-subtitle2">{{ hintInfo }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle2">可以随时点击下方的【结束实验】按钮，结束本次实验，并查看实验评价</div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="结束实验" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    hintInfo: String,
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

    onCancelClick() {
      this.hide()
    },
  },
}
</script>