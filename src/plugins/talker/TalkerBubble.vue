<template>
  <q-card class="bubble rounded-borders shadow-transition column">
    <slot></slot>
    <div class="row">
      <transition name="fade">
        <q-card-section
          class="text-body2 fixed-bottom text-grey-7 column items-center q-mb-md"
          v-show="clickable"
        >
          点击【继续】按钮或按空格键继续……
        </q-card-section>
      </transition>
      <transition name="fade">
        <q-card-section class="fixed-bottom-right q-ma-md" v-show="clickable">
          <q-btn label="继续" color="primary" @click="handleClick" />
        </q-card-section>
      </transition>
    </div>
  </q-card>
</template>

<script>
export default {
  props: {
    clickable: Boolean,
  },

  data() {
    return {}
  },

  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    },
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.isComposing || e.keyCode === 32) {
        this.handleClick()
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.bubble {
  min-height: 25vh;
  font-size: 2.2vmin;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>