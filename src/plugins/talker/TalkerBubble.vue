<template>
  <q-card
    @click="handleClick"
    @mousedown="mousedown = true"
    @mouseup="mousedown = false"
    class="bubble rounded-borders shadow-transition"
    :class="[mousedown ? 'shadow-5' : 'shadow-1', $q.dark.isActive ? 'bg-dark' : 'bg-white']"
  >
    <slot></slot>
  </q-card>
</template>

<script>
export default {
  props: {
    clickable: Boolean,
  },

  data() {
    return {
      mousedown: false,
    }
  },

  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.bubble {
  min-height: 25vh;
  font-size: 2.2vmin;
  cursor: pointer;
}
</style>