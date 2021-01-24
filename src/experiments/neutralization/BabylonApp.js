import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import '@babylonjs/loaders/glTF'
import createScene from './babylon/createScene'
import animationBox from './babylon/animationBox'

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
      const pullInCamera = animationBox.moveCameraByPosition(
        this.scene.activeCamera,
        new BABYLON.Vector3(0, 50, -80),
        2 * frameRate
      )
      const showDropper = animationBox.showMesh(2 * frameRate)
      this.scene.activeCamera.setTarget(new BABYLON.Vector3(0, 50, 0))
      this.scene.beginDirectAnimation(this.scene.activeCamera, [pullInCamera], 0, 2 * frameRate, false, 1)

      const showDropperGroup = new BABYLON.AnimationGroup('showDropper')
      showDropperGroup.addTargetedAnimation(showDropper, this.scene.getMeshByName('dropper_primitive0'))
      showDropperGroup.addTargetedAnimation(showDropper, this.scene.getMeshByName('dropper_primitive1'))
      showDropperGroup.addTargetedAnimation(showDropper, this.scene.getMeshByName('dropliquid'))
      showDropperGroup.normalize(0, 2 * frameRate)
      showDropperGroup.play()
      showDropperGroup.onAnimationEndObservable.add(() => {
        resolve()
      })
    })
  }

  firstDropLiqiud() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const liquidSphere = this.scene.getMeshByName('liquidSphere')
      liquidSphere.position.y = 41

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
      const hideDropper = animationBox.hideMesh(frameRate)
      const resetDropperGroup = new BABYLON.AnimationGroup('resetDropperGroup')
      resetDropperGroup.addTargetedAnimation(
        resetDropperPosition,
        this.scene.getTransformNodeByName('dropper')
      )
      resetDropperGroup.addTargetedAnimation(resetDropperPosition, this.scene.getMeshByName('dropliquid'))
      resetDropperGroup.addTargetedAnimation(hideDropper, this.scene.getMeshByName('dropper_primitive0'))
      resetDropperGroup.addTargetedAnimation(hideDropper, this.scene.getMeshByName('dropper_primitive1'))
      resetDropperGroup.addTargetedAnimation(hideDropper, this.scene.getMeshByName('dropliquid'))
      resetDropperGroup.normalize(0, frameRate)

      moveDropperDownGroup.onAnimationEndObservable.add(() => {
        this.scene.beginDirectAnimation(
          liquidSphere,
          [
            animationBox.dropLiquid_y(41, 5, 2 * frameRate),
            animationBox.liquidSphereVisible,
            animationBox.liquidScale
          ],
          0,
          2 * frameRate,
          false,
          1,
          () => {
            resetDropperGroup.play()
          }
        )
      })

      resetDropperGroup.onAnimationEndObservable.add(() => {
        resolve()
      })
    })
  }
}
