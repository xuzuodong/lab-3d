/**
 * BabylonApp 用来在 Vue 组件内创建 Babylon 实例
 * 本文件是复用的，所以在你的实验文件夹里 import 本文件
 */

import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import '@babylonjs/loaders/glTF'

export default class BabylonApp {
  constructor() {
    this.canvas = document.getElementById('renderCanvas')
    if (!this.canvas) {
      console.error(`未找到 id 为 'renderCanvas' 的元素，无法启动引擎`)
      return
    }

    this.engine = new BABYLON.Engine(this.canvas, true)
    this.engine.displayLoadingUI()

    this.resizeFunc = () => {
      this.engine.resize()
    }
    window.addEventListener('resize', this.resizeFunc)
  }

  createScene(options) {
    this.scene = new BABYLON.Scene(this.engine)

    this.scene.state = options?.state
    this.scene.actions = options?.actions

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })

    return this.scene
  }

  hideLoadingUI() {
    this.engine.hideLoadingUI()
  }

  destroy() {
    this.engine.dispose()
    this.scene = null
    this.canvas = null
    this.engine = null
    window.removeEventListener('resize', this.resizeFunc)
    this.resizeFunc = null
  }
}
