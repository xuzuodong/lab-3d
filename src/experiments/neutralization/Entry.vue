<template>
  <div id="canvasContainer">
    <canvas id="renderCanvas" />
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
      state: {
        acidType: '', // 选择的酸溶液 'acid_hcl' or 'acid_ch3cooh'
        alkaliType: '', // 选择的碱溶液 'alkali_naoh' or 'alkali_nahco3'
      },
      actions,
    })

    initScene(scene).then(() => {
      babylonApp.hideLoadingUI()
      this.$talker({ script, hooks, scene })
    })
  },

  beforeDestroy() {
    babylonApp.destroy()
    babylonApp = null
  },
}
</script>