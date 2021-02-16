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
    /**
     * 初始化 Babylon 的引擎，
     * 注意 babylonApp 的声明要在 `export` 语句的外面，然后在 `mounted` 里赋值
     */
    babylonApp = new BabylonApp()
    const scene = babylonApp.createScene() // 用 babylonApp 创建一个空场景

    // 开始搭建初始场景

    // 相机
    const camera = new BABYLON.UniversalCamera('cam', new BABYLON.Vector3(10, 10, 10))
    camera.setTarget(BABYLON.Vector3.Zero())
    camera.attachControl()

    // 光照
    scene.createDefaultLight()

    // 3D 物体（mesh）
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 1 })
    sphere.position.y += 0.5
    BABYLON.MeshBuilder.CreateGround('ground', { height: 10, width: 10, subdivisions: 4 })

    babylonApp.hideLoadingUI() // 初始场景搭建完毕后，隐藏加载界面

    // 开始剧情对话
    this.$talker({ script: script })
  },

  beforeDestroy() {
    // Vue 实例销毁前，记得调用下面两句来确保销毁 3D 引擎
    babylonApp.destroy()
    babylonApp = null
  },
}
</script>