<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-primary text-white row" v-if="dialogType == 'useDropperRadio'">
        <div class="text-h6">以下哪一种才是使用胶头滴管的正确方式？</div>
        <div class="col-xs-12 col-sm-6 q-pa-sm">
          <q-radio v-model="conclusion.useDropper" val="A" label="A ." color="white" />
          <q-img :src="radioImgUrl.radioA" style="height: 125px; max-width: 80px" contain />
        </div>
        <div class="col-xs-12 col-sm-6 q-pa-sm">
          <q-radio v-model="conclusion.useDropper" val="B" label="B ." color="white" />
          <q-img :src="radioImgUrl.radioB" style="height: 125px; max-width: 80px" contain />
        </div>
        <div class="col-xs-12 col-sm-6 q-pa-sm">
          <q-radio v-model="conclusion.useDropper" val="C" label="C ." color="white" />
          <q-img :src="radioImgUrl.radioC" style="height: 125px; max-width: 80px" contain />
        </div>
        <div class="col-xs-12 col-sm-6 q-pa-sm">
          <q-radio v-model="conclusion.useDropper" val="D" label="D ." color="white" />
          <q-img :src="radioImgUrl.radioD" style="height: 125px; max-width: 80px" contain />
        </div>
      </q-card-section>
      <q-card-section class="bg-primary text-white" v-if="dialogType == 'textConclusion'">
        <div class="text-h6">
          在刚刚{{ acid }}和{{ alkali }}的反应中，你有观察到它们之间发生了什么明显的变化吗？
        </div>
        <q-input filled v-model="conclusion.textConclusion" :dense="false" />
      </q-card-section>
      <q-card-section class="bg-primary text-white row" v-if="dialogType == 'radioConclusion'">
        <div class="text-h6">在刚刚的中和反应中，你观察到了什么反应现象？</div>
        <q-radio
          v-model="conclusion.radioConclusion"
          val="A"
          label="A .石蕊试液先变紫再变蓝"
          color="white"
          class="col-12"
        />
        <q-radio
          v-model="conclusion.radioConclusion"
          val="B"
          label="B .石蕊试液先变蓝再变紫"
          color="white"
          class="col-12"
        />
        <q-radio
          v-model="conclusion.radioConclusion"
          val="C"
          label="C .酚酞试液变红"
          color="white"
          class="col-12"
        />
        <q-radio
          v-model="conclusion.radioConclusion"
          val="D"
          label="D .酚酞试液变蓝"
          color="white"
          class="col-12"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="确定" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import radioA from './assets/a.png'
import radioB from './assets/b.png'
import radioC from './assets/c.png'
import radioD from './assets/d.png'
export default {
  props: {
    dialogType: String,
    acid_alkali: Array,
  },

  data() {
    return {
      conclusion: {
        useDropper: '',
        textConclusion: '',
        radioConclusion: '',
      },
      radioImgUrl: { radioA, radioB, radioC, radioD },
    }
  },

  computed: {
    acid: function () {
      if (this.acid_alkali[0] == 'acid_hcl') {
        return '稀盐酸'
      } else {
        return '醋酸溶液'
      }
    },
    alkali: function () {
      if (this.acid_alkali[1] == 'alkali_naoh') {
        return '氢氧化钠溶液'
      } else {
        return '小苏打溶液'
      }
    },
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
        case 'useDropperRadio':
          if (this.conclusion.useDropper != '') {
            this.$emit('ok', this.conclusion)
            this.hide()
          }
          break
        case 'textConclusion':
          if (this.conclusion.textConclusion != '') {
            this.$emit('ok', this.conclusion)
            this.hide()
          }
          break
        case 'radioConclusion':
          if (this.conclusion.radioConclusion != '') {
            this.$emit('ok', this.conclusion)
            this.hide()
          }
          break
      }
    },
  },
}
</script>
