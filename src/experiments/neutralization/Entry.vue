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
        acidType: ['', false], // 选择的酸溶液 'acid_hcl' or 'acid_ch3cooh', 数组第二项表示现在是否已经加入
        alkaliType: ['', false], // 选择的碱溶液 'alkali_naoh' or 'alkali_nahco3'，数组第二项表示现在是否已经加入
        indicatorType: ['', false], // 选择的酸碱指示剂 'pur' or 'phe'，数组第二项表示现在是否已经加入
      },
      actions,
    })

    initScene(scene).then(() => {
      babylonApp.hideLoadingUI()
      this.$talker({ script, hooks, scene, debug: '选择碱溶液' })
    })
  },

  beforeDestroy() {
    babylonApp.destroy()
    babylonApp = null
  },
}
</script>