<template>
  <q-dialog ref="dialog" @hide="onDialogHide" position="top" auto-close>
    <q-card>
      <q-card-section>
        <div class="text-weight-bold">注意：{{ warnInfo }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    warnInfo: String,
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
  },
}
</script>

<style scoped>
</style>