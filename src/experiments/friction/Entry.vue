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
import Narrative from './Narrative'

export default {
  components: { Narrative },
  data() {
    return {
      babylon: {},
    }
  },

  mounted() {
    this.babylon = new BabylonApp('renderCanvas')
  },
}
</script>

<style>
</style>