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
        acidType: '', // 选择的酸溶液 'acid_hcl' or 'acid_hno', 数组第二项表示现在是否已经加入
        alkaliType: '', // 选择的碱溶液 'alkali_naoh' or 'alkali_baoh'，数组第二项表示现在是否已经加入
        indicatorType: '', // 选择的酸碱指示剂 'pur' or 'phe'，数组第二项表示现在是否已经加入
        existLiquid: [], // 试管中已经存在的溶液，每点击一次滴加溶液，就往数组中push相应字符串（酸、碱、指示剂）
        // 根据重复字符串个数，算出滴加的溶液量为多少
        progress: [], // 一个对象数组，记录实验步骤；{step: string, finished: boolen}，当前第几步，是否完成
        targetPanel: null,
        liquidPanel: null,
        inquiryPanel: null,
        allFinished: false, // 判断用户是否全部做完，以此判断是否没有引导，完全自由探究
      },
      actions,
    })

    initScene(scene).then(() => {
      babylonApp.hideLoadingUI()
      this.$talker({ script, hooks, scene, debug: '' })
    })
  },

  beforeDestroy() {
    babylonApp.scene.state.targetPanel?.hide && babylonApp.scene.state.targetPanel.hide()
    babylonApp.scene.state.liquidPanel?.hide && babylonApp.scene.state.liquidPanel.hide()
    babylonApp.scene.state.inquiryPanel?.hide && babylonApp.scene.state.inquiryPanel.hide()
    babylonApp.destroy()
    babylonApp = null
  },
}
</script>