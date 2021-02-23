<template>
  <div id="canvasContainer">
    <canvas id="renderCanvas"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import BabylonApp from '../BabylonApp.js'
import script from './2d/script'

let babylonApp = null

export default {
  mounted() {
    babylonApp = new BabylonApp()
    const scene = babylonApp.createScene()

    const camera = new BABYLON.UniversalCamera('cam', new BABYLON.Vector3(3, 3, 3))
    camera.setTarget(BABYLON.Vector3.Zero())
    camera.attachControl()

    scene.createDefaultLight()

    BABYLON.MeshBuilder.CreateGround('ground', { height: 10, width: 10, subdivisions: 4 })

    const box = BABYLON.MeshBuilder.CreateBox('box', { height: 1, width: 1, depth: 1 })
    box.position.y += 0.5

    babylonApp.hideLoadingUI()

    this.$talker({
      script: script,
      hooks: [
        {
          paragraph: '实验指导',
          reply: { choice: 'last', index: 'last' },
          method: (tools) => {
            tools.restart()
          },
        },
        {
          paragraph: '第二段落',
          choice: 'last',
          method: (tools) => {
            tools.goto({ paragraph: '实验指导' })
          },
        },
      ],
    })
  },

  beforeDestroy() {
    babylonApp.destroy()
    babylonApp = null
  },
}
</script>