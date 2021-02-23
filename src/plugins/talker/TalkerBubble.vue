<template>
  <div
    @click="handleClick"
    @mousedown="mousedown = true"
    @mouseup="mousedown = false"
    class="bubble bg-white rounded-borders shadow-transition"
    :class="mousedown ? 'shadow-5' : 'shadow-1'"
  >
    <slot></slot>
  </div>
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