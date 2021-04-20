<template>
  <div class="QParameter" @hide="onDialogHide">
    <q-dialog
      ref="dialog"
      transition-show="slide-left"
      transition-hide="slide-right"
      class="top-right-dialog"
      seamless
    >
      <q-card style="width: 350px">
        <q-card-section class="bg-secondary text-white q-px-md">
          <div class="text-h6 text-center">
            拉动木箱<span class="text-yellow">{{ information[0].msg }}</span>
          </div>
          <div class="text-h7 q-mt-sm text-center">达到受力平衡</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="bg-secondary text-white q-px-md">
          <div>
            <q-badge class="text-body1 bg-secondary text-white">机器人的拉力:</q-badge>
            <q-badge class="text-body1 bg-secondary text-white float-right">
              {{ information[0].force }}N
            </q-badge>
          </div>
          <div>
            <q-badge class="text-body1 bg-secondary text-white">摩擦系数（μ）：</q-badge>
            <q-badge class="text-body1 bg-secondary text-white float-right">
              {{ information[0].coefficient }}
            </q-badge>
          </div>
          <div>
            <q-badge class="text-body1 bg-secondary text-white">接触面积：</q-badge>
            <q-badge class="text-body1 bg-secondary text-white float-right">
              {{ information[0].square }}cm²
            </q-badge>
          </div>
          <div>
            <q-badge class="text-body1 bg-secondary text-white">木块质量：</q-badge>
            <q-badge class="text-body1 bg-secondary text-white float-right">
              {{ information[0].mass }}kg
            </q-badge>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'paramPage',
  props: {
    information: Array,
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
}
</script>