import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import '@babylonjs/loaders/glTF'
import createScene from './babylon/createScene'
import animationBox from './babylon/animationBox'
import generalOperations from './babylon/generalOperation'

export default class BabylonApp {
  constructor(domId) {
    this.canvas = document.getElementById(domId) // 得到canvas对象的引用
    this.engine = new BABYLON.Engine(this.canvas, true) // 初始化 BABYLON 3D engine
    this.scene = createScene(this.canvas, this.engine)

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })

    window.addEventListener('resize', () => {
      this.engine.resize()
    })
  }

  pullInCamera() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const pullInCamera = animationBox.moveCamera(
        this.scene.activeCamera,
        new BABYLON.Vector3(0, 47, 0),
        70,
        frameRate
      )
      this.scene.beginDirectAnimation(this.scene.activeCamera, pullInCamera, 0, frameRate, false)
      generalOperations.showDropper(this.scene).then(() => {
        resolve()
      })
    })
  }

  firstDropLiqiud() {
    return new Promise((resolve, reject) => {
      const frameRate = 12

      const moveDropperDown = animationBox.moveMesh(
        new BABYLON.Vector3(0, 50, 0),
        new BABYLON.Vector3(0, 40, 0),
        frameRate
      )
      const moveDropperDownGroup = new BABYLON.AnimationGroup('moveDropperDown')
      moveDropperDownGroup.addTargetedAnimation(moveDropperDown, this.scene.getTransformNodeByName('dropper'))
      moveDropperDownGroup.addTargetedAnimation(moveDropperDown, this.scene.getMeshByName('dropliquid'))
      moveDropperDownGroup.normalize(0, frameRate)
      moveDropperDownGroup.play()

      const resetDropperPosition = animationBox.moveMesh(
        new BABYLON.Vector3(0, 40, 0),
        new BABYLON.Vector3(0, 50, 0),
        frameRate
      )
      const resetPositionGroup = new BABYLON.AnimationGroup('resetDropperGroup')
      resetPositionGroup.addTargetedAnimation(
        resetDropperPosition,
        this.scene.getTransformNodeByName('dropper')
      )
      resetPositionGroup.addTargetedAnimation(resetDropperPosition, this.scene.getMeshByName('dropliquid'))
      resetPositionGroup.normalize(0, frameRate)

      moveDropperDownGroup.onAnimationEndObservable.add(() => {
        generalOperations.dropLiqiud(this.scene, 41, 3).then(() => {
          resetPositionGroup.play()
          generalOperations.hideDropper(this.scene).then(() => {
            resolve()
          })
        })
      })
    })
  }

  restCamera() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const pullInCamera = animationBox.moveCamera(
        this.scene.activeCamera,
        new BABYLON.Vector3(0, 10, 0),
        150,
        frameRate
      )
      this.scene.beginDirectAnimation(this.scene.activeCamera, pullInCamera, 0, frameRate, false, 1, () => {
        resolve()
      })
    })
  }

  tubeCloseUp() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const pullInCamera = animationBox.moveCamera(
        this.scene.activeCamera,
        new BABYLON.Vector3(0, 20, 0),
        60,
        frameRate
      )
      this.scene.beginDirectAnimation(this.scene.activeCamera, pullInCamera, 0, frameRate, false, 1, () => {
        resolve()
      })
    })
  }

  resetTube() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const main_liquid = this.scene.getMeshByName('main_liquid')
      const initialScaleY = main_liquid.scaling._x.toFixed(2) - 0.22
      const currentScaleY = main_liquid.scaling._y.toFixed(2)
      const deltaY = initialScaleY - currentScaleY
      let pivotAt = new BABYLON.Vector3(0, main_liquid.getBoundingInfo().boundingBox.vectorsWorld[0].y, 0)
      this.scene.beginDirectAnimation(
        main_liquid,
        main_liquid.scaleyFromPivot(pivotAt, 10 * deltaY, 0, frameRate),
        0,
        2.2 * frameRate,
        false,
        1,
        () => {
          main_liquid.material.diffuseColor = new BABYLON.Color3(1, 1, 1)
          resolve()
        }
      )
    })
  }

  pullInCameraToBottle() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const cameraAn = animationBox.moveCamera(
        this.scene.activeCamera,
        new BABYLON.Vector3(95, 0, 80),
        80,
        frameRate
      )
      this.scene.beginDirectAnimation(this.scene.activeCamera, cameraAn, 0, frameRate, false, 1, () => {
        resolve()
      })
    })
  }

  selectIndicator() {
    return new Promise((resolve, reject) => {
      const purBottle = this.scene.getMeshByName('purbottle')
      const pheBottle = this.scene.getMeshByName('phebottle')
      generalOperations.registClickActionOnBottle(this.scene).then(val => {
        resolve(val)
        // 移除酸碱指示剂的点击事件，即一旦选择完成则无法重选
        purBottle.actionManager.unregisterAction(purBottle.actionManager.actions[2])
        pheBottle.actionManager.unregisterAction(pheBottle.actionManager.actions[2])
      })
    })
  }

  resetAll() {
    return new Promise((resolve, reject) => {
      const main_liquid = this.scene.getMeshByName('main_liquid')
      const bottom_liquid = this.scene.getMeshByName('bottom_liquid')
      const liquidSphere = this.scene.getMeshByName('liquidSphere')
      let matTubeLiquid = this.scene.getMaterialByName('matTubeLiquid')
      matTubeLiquid.diffuseColor = new BABYLON.Color3(1, 1, 1)
      main_liquid.scaling.y = main_liquid.scaling.x
      let pivotAt = new BABYLON.Vector3(0, main_liquid.getBoundingInfo().boundingBox.vectorsWorld[0].y, 0)
      main_liquid.originalScale(pivotAt, -2.7)
      main_liquid.visibility = 0
      bottom_liquid.visibility = 0
      liquidSphere.visibility = 0
      resolve()
    })
  }
}
