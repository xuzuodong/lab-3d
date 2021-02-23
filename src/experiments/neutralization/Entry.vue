<template>
  <div id="canvasContainer">
    <canvas id="renderCanvas"></canvas>
    <div id="gui">
      <Narrative :babylon="babylon" />
    </div>
  </div>
</template>

<script>
import BabylonApp from './BabylonApp'
import Narrative from './Narrative.vue'

export default {
  components: { Narrative },
  data() {
    return {
      babylon: {}
    }
  },
  mounted() {
    this.babylon = new BabylonApp('renderCanvas')
  }, 
  
  beforeDestroy() {
    this.babylon.engine.dispose()
  }
}
</script>

<style></style>
