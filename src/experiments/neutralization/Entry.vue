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
        acidType: '', // 选择的酸溶液 'acid_hcl' or 'acid_ch3cooh', 数组第二项表示现在是否已经加入
        alkaliType: '', // 选择的碱溶液 'alkali_naoh' or 'alkali_nahco3'，数组第二项表示现在是否已经加入
        indicatorType: '', // 选择的酸碱指示剂 'pur' or 'phe'，数组第二项表示现在是否已经加入
        existLiquid: [], // 试管中已经存在的溶液，每点击一次滴加溶液，就往数组中push相应字符串（酸、碱、指示剂）
        // 根据重复字符串个数，算出滴加的溶液量为多少
      },
      actions,
    })

    initScene(scene).then(() => {
      babylonApp.hideLoadingUI()
      this.$talker({ script, hooks, scene, debug: '滴加碱溶液' })
    })
  },

  beforeDestroy() {
    babylonApp.destroy()
    babylonApp = null
  },
}
</script>