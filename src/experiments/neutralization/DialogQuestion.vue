<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-primary text-white" v-if="dialogType == 'con1'">
        <div class="text-h6">以下哪一种才是使用胶头滴管的正确方式？</div>
        <q-radio v-model="conclusion.useDropper" val="A" label="A ." color="red" />
        <q-img :src="radioImgUrl.radioA" style="height: 125px; max-width: 80px" contain />
        <q-radio v-model="conclusion.useDropper" val="B" label="B ." color="red" />
        <q-img :src="radioImgUrl.radioB" style="height: 125px; max-width: 80px" contain />
        <q-radio v-model="conclusion.useDropper" val="C" label="C ." color="red" />
        <q-img :src="radioImgUrl.radioC" style="height: 125px; max-width: 80px" contain />
        <q-radio v-model="conclusion.useDropper" val="D" label="D ." color="red" />
        <q-img :src="radioImgUrl.radioD" style="height: 125px; max-width: 80px" contain />
      </q-card-section>
      <q-card-section class="bg-primary text-white"></q-card-section>
      <q-card-section class="bg-primary text-white"></q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="确定" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import radioA from '../../assets/neutralization/a.png'
import radioB from '../../assets/neutralization/b.png'
import radioC from '../../assets/neutralization/c.png'
import radioD from '../../assets/neutralization/d.png'
export default {
  props: {
    dialogType: String
  },
  data() {
    return {
      conclusion: {
        useDropper: ''
      },
      radioImgUrl: { radioA, radioB, radioC, radioD }
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
      // 发出“ok”事件（带有可选的有效负载: this.$emit('ok', { ... })）
      // this.$emit('ok', this.conclusion)
      switch (this.dialogType) {
        case 'con1':
          if (this.conclusion.useDropper != '') {
            this.$emit('ok', this.conclusion)
            this.hide()
          }
          break;
      }
    }
  }
}
</script>
