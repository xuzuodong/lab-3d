<template>
  <div id="canvasContainer">
    <canvas id="renderCanvas"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import BabylonApp from '../BabylonApp.js'
import script from './2d/script'
import materialAnimation from './3d/animation'

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

    // 创建材质，以及材质动画（材质动画定义在 `./3d/animation.js` 中）
    const material = new BABYLON.StandardMaterial('redMaterial', scene)
    material.diffuseColor = new BABYLON.Color3(1, 0, 0)
    material.animations = [materialAnimation]

    const box = BABYLON.MeshBuilder.CreateBox('box', { height: 1, width: 1, depth: 1 })
    box.position.y += 0.5
    box.material = material

    babylonApp.hideLoadingUI()

    this.$talker({
      script: script,
      hooks: [
        {
          paragraph: '初始画面',
          choice: 0,
          method: (tools) => {
            scene.beginAnimation(material, 0, 45, false, 1, () => {
              // 动画完成后，记得调用下面这句代码，来继续后面的剧情对话
              tools.next()
            })
          },
        },
        {
          paragraph: '让用户选择正确的选项',
          talk: 0,
          method: (tools) => {
            // 使用 Quasar dialog 插件来弹出对话框
            this.$q
              .dialog({
                title: '刚刚盒子变成了什么颜色',
                options: {
                  type: 'radio',
                  model: '',
                  items: [
                    { label: '红色', value: 'color1' },
                    { label: '黄色', value: 'color2' },
                    { label: '绿色', value: 'color3' },
                  ],
                },
                persistent: true,
              })
              .onOk(() => {
                tools.next()
              })
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