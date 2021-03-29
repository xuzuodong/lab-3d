<template>
  <div id="canvasContainer">
    <canvas id="renderCanvas"></canvas>
  </div>
</template>

<script>
import BabylonApp from '../BabylonApp'
import initScene from './3d/initScene'
import actions from './3d/actions'
import script from './2d/script'
import hooks from './hooks'

let babylonApp = null

export default {
  mounted() {
    babylonApp = new BabylonApp()
    const scene = babylonApp.createScene({
      state: { targetPanel: Object },
      actions,
    })

    initScene(scene).then(() => {
      babylonApp.hideLoadingUI()
      this.$talker({ script, hooks, scene, debug: '摩擦力是什么' })
    })
  },

  beforeDestroy() {
    babylonApp.destroy()
    babylonApp = null
  },
}
</script>