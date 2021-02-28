import * as BABYLON from '@babylonjs/core/Legacy/legacy'

import animationBox from './animationBox'
import generalOperations from './generalOperation'

export default {
  pullInCamera() {
    return new Promise((resolve) => {
      const frameRate = 12
      const pullInCamera = animationBox.moveCamera(
        this.activeCamera,
        new BABYLON.Vector3(0, 47, 0),
        110,
        frameRate
      )
      this.beginDirectAnimation(this.activeCamera, pullInCamera, 0, frameRate, false, undefined, () => {
        // 摄像头动画完成，开始显示滴管
        generalOperations.showDropper(this).then(() => {
          // 显示滴管完成，小间隔 300ms 后继续对话
          setTimeout(() => {
            resolve()
          }, 300)
        })
      })
    })
  },

  firstDropLiqiud() {
    return new Promise((resolve) => {
      const mesh = this.getMeshByName('dropliquid')
      const frameRate = 12

      const moveDropperDown = animationBox.moveMesh(
        new BABYLON.Vector3(0, 50, 0),
        new BABYLON.Vector3(0, 40, 0),
        frameRate
      )
      const moveDropperDownGroup = new BABYLON.AnimationGroup('moveDropperDown')
      moveDropperDownGroup.addTargetedAnimation(moveDropperDown, this.getTransformNodeByName('dropper'))
      moveDropperDownGroup.addTargetedAnimation(moveDropperDown, mesh)
      moveDropperDownGroup.normalize(0, frameRate)
      moveDropperDownGroup.play()

      const resetDropperPosition = animationBox.moveMesh(
        new BABYLON.Vector3(0, 40, 0),
        new BABYLON.Vector3(0, 50, 0),
        frameRate
      )
      const resetPositionGroup = new BABYLON.AnimationGroup('resetDropperGroup')
      resetPositionGroup.addTargetedAnimation(resetDropperPosition, this.getTransformNodeByName('dropper'))
      resetPositionGroup.addTargetedAnimation(resetDropperPosition, mesh)
      resetPositionGroup.normalize(0, frameRate)

      moveDropperDownGroup.onAnimationEndObservable.add(() => {
        generalOperations.dropLiqiud(this, 41, 3).then(() => {
          resetPositionGroup.play()
          generalOperations.hideDropper(this).then(() => {
            resolve()
          })
        })
      })
    })
  }, 

  resetCamera() {
    return new Promise((resolve) => {
      const frameRate = 12
      const pullInCamera = animationBox.moveCamera(
        this.activeCamera,
        new BABYLON.Vector3(0, 10, 0),
        150,
        frameRate
      )
      this.beginDirectAnimation(this.activeCamera, pullInCamera, 0, frameRate, false, 1, () => {
        resolve()
      })
    })
  }, 

  
}
