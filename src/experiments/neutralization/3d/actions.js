import * as BABYLON from '@babylonjs/core/Legacy/legacy'

import animationBox from './animationBox'
import generalOperations from './generalOperation'

export default {
  // 用户点击试剂瓶选择酸碱溶液后，酸碱滴管到位，拉近相机的动作
  pullInCamera() {
    return new Promise((resolve) => {
      const frameRate = 12
      const pullInCamera = animationBox.moveCamera(
        this.activeCamera,
        new BABYLON.Vector3(0, 47, 0),
        110,
        frameRate
      )
      // 拉近相机，延时300ms，再继续对话
      this.beginDirectAnimation(this.activeCamera, pullInCamera, 0, frameRate, false, undefined, () => {
        setTimeout(() => resolve(), 300)
      })
    })
  },

  firstDropAcid(liquidType) {
    return new Promise((resolve) => {
      const frameRate = 12
      let acidDropper, acidLiquid
      if (liquidType === 'acid_hcl') {
        acidDropper = this.getTransformNodeByName('hclDropper')
        acidLiquid = this.getMeshByName('hclLiquid')
      } else if (liquidType === 'acid_ch3cooh') {
        acidDropper = this.getTransformNodeByName('coohDropper')
        acidLiquid = this.getMeshByName('coohLiquid')
      }

      const moveDropperDown = animationBox.moveMesh(
        new BABYLON.Vector3(0, 50, 0),
        new BABYLON.Vector3(0, 40, 0),
        frameRate
      )
      const moveDropperDownGroup = new BABYLON.AnimationGroup('moveDropperDown')
      moveDropperDownGroup.addTargetedAnimation(moveDropperDown, acidDropper)
      moveDropperDownGroup.addTargetedAnimation(moveDropperDown, acidLiquid)
      moveDropperDownGroup.normalize(0, frameRate)
      moveDropperDownGroup.play()

      const resetDropperPosition = animationBox.moveMesh(
        new BABYLON.Vector3(0, 40, 0),
        new BABYLON.Vector3(0, 50, 0),
        frameRate
      )
      const resetPositionGroup = new BABYLON.AnimationGroup('resetDropperGroup')
      resetPositionGroup.addTargetedAnimation(resetDropperPosition, acidDropper)
      resetPositionGroup.addTargetedAnimation(resetDropperPosition, acidLiquid)
      resetPositionGroup.normalize(0, frameRate)

      moveDropperDownGroup.onAnimationEndObservable.add(() => {
        generalOperations.dropLiqiud(this, 41, 3).then(() => {
          resetPositionGroup.play()
          resetPositionGroup.onAnimationEndObservable.add(() => resolve())
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
      this.beginDirectAnimation(this.activeCamera, pullInCamera, 0, frameRate, false, 1, () => resolve())
    })
  },

  registerClickOnAcid() {
    return new Promise((resolve, reject) => {
      const hclBottle = this.getMeshByName('hclBottle')
      const coohBottle = this.getMeshByName('coohBottle')
      generalOperations.registerClickOnAcid(this).then((val) => {
        resolve(val)
        // 移除酸溶液的点击事件，即一旦选择完成则无法重选
        hclBottle.actionManager.unregisterAction(hclBottle.actionManager.actions[2])
        coohBottle.actionManager.unregisterAction(coohBottle.actionManager.actions[2])
      })
    })
  },

  registerClickOnAlkali() {
    return new Promise((resolve, reject) => {
      const naohBottle = this.getMeshByName('naohBottle')
      const nahcoBottle = this.getMeshByName('nahcoBottle')
      generalOperations.registerClickOnAlkali(this).then((val) => {
        resolve(val)
        // 移除碱溶液的点击事件，即一旦选择完成则无法重选
        naohBottle.actionManager.unregisterAction(naohBottle.actionManager.actions[2])
        nahcoBottle.actionManager.unregisterAction(nahcoBottle.actionManager.actions[2])
      })
    })
  },

  tubeCloseUp() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const pullInCamera = animationBox.moveCamera(
        this.activeCamera,
        new BABYLON.Vector3(0, 20, 0),
        60,
        frameRate
      )
      this.beginDirectAnimation(this.activeCamera, pullInCamera, 0, frameRate, false, 1, () => resolve())
    })
  },

  resetTube() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const main_liquid = this.getMeshByName('main_liquid')
      const initialScaleY = main_liquid.scaling._x.toFixed(2) - 0.22
      const currentScaleY = main_liquid.scaling._y.toFixed(2)
      const deltaY = initialScaleY - currentScaleY
      let pivotAt = new BABYLON.Vector3(0, main_liquid.getBoundingInfo().boundingBox.vectorsWorld[0].y, 0)
      this.beginDirectAnimation(
        main_liquid,
        main_liquid.scaleyFromPivot(pivotAt, 10 * deltaY, 0, frameRate),
        0,
        frameRate,
        false,
        1,
        () => {
          main_liquid.material.diffuseColor = new BABYLON.Color3(1, 1, 1)
          resolve()
        }
      )
    })
  },

  showIndicatorBottle() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const showAn = animationBox.showMesh(frameRate)
      const showAnGroup = new BABYLON.AnimationGroup('putBackLqDropperGroup')
      showAnGroup.normalize(0, frameRate)
      showAnGroup.addTargetedAnimation(showAn, this.getTransformNodeByName('purdropper').getChildMeshes()[0])
      showAnGroup.addTargetedAnimation(showAn, this.getTransformNodeByName('purdropper').getChildMeshes()[1])
      showAnGroup.addTargetedAnimation(showAn, this.getMeshByName('purliquid'))
      showAnGroup.addTargetedAnimation(showAn, this.getMeshByName('purbottle'))
      showAnGroup.addTargetedAnimation(showAn, this.getMeshByName('pursolution'))
      showAnGroup.addTargetedAnimation(showAn, this.getTransformNodeByName('phedropper').getChildMeshes()[0])
      showAnGroup.addTargetedAnimation(showAn, this.getTransformNodeByName('phedropper').getChildMeshes()[1])
      showAnGroup.addTargetedAnimation(showAn, this.getMeshByName('pheliquid'))
      showAnGroup.addTargetedAnimation(showAn, this.getMeshByName('phebottle'))
      showAnGroup.addTargetedAnimation(showAn, this.getMeshByName('phesolution'))
      showAnGroup.play()
      this.getMeshByName('purbottle').isPickable = true
      this.getMeshByName('phebottle').isPickable = true
      showAnGroup.onAnimationEndObservable.add(() => resolve())
    })
  },

  resetAll() {
    return new Promise((resolve, reject) => {
      const main_liquid = this.getMeshByName('main_liquid')
      const bottom_liquid = this.getMeshByName('bottom_liquid')
      const liquidSphere = this.getMeshByName('liquidSphere')
      let matTubeLiquid = this.getMaterialByName('matTubeLiquid')
      matTubeLiquid.diffuseColor = new BABYLON.Color3(1, 1, 1)
      let pivotAt = new BABYLON.Vector3(0, bottom_liquid.getBoundingInfo().boundingBox.maximumWorld.y, 0)
      main_liquid.originalScale(pivotAt, - main_liquid.scaling.y * 10 + 0.1)
      main_liquid.visibility = 0
      bottom_liquid.visibility = 0
      liquidSphere.visibility = 0
      resolve()
    })
  },

  freeExperiment(flag = 'new') {
    // flag用于控制重置已使用指示剂的记录，一次自由实验如果不满意可以重复进行，故不能记录用过的指示剂；
    // 只有等到用户确定做完一次自由实验，才保留指示剂（即还原时不再还原generalOpeartion.js中的indicatorUsed变量）
    // 可能的取值：restart：单次实验重复做（需要还原） 默认值——new：开始新的实验，不还原
    generalOperations.registerAllAction(this, flag)
  }
}
