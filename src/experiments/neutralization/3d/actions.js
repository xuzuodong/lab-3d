import * as BABYLON from '@babylonjs/core/Legacy/legacy'

import animationBox from './animationBox'
import generalOperations from './generalOperation'

import { Notify } from 'quasar'

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
      } else if (liquidType === 'acid_hno') {
        acidDropper = this.getTransformNodeByName('hnoDropper')
        acidLiquid = this.getMeshByName('hnoLiquid')
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
        if (this.existLiquid.length < 40) {
          const main_liquid = this.getMeshByName('main_liquid')
          let height = main_liquid.getBoundingInfo().boundingBox.maximumWorld.y - 0.5
          generalOperations.dropLiqiud(this, 41, height).then(() => {
            resetPositionGroup.play()
            resetPositionGroup.onAnimationEndObservable.add(() => resolve())
          })
        } else {
          Notify.create({
            message: '当前试管中溶液已满，若要继续实验，请先倒空试管！',
            type: 'negative',
            position: 'center',
            timeout: 5000,
            actions: [{ label: 'X', color: 'white', handler: () => {} }],
          })
        }
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
      const hnoBottle = this.getMeshByName('hnoBottle')
      generalOperations.registerClickOnAcid(this).then((val) => {
        resolve(val)
        // 移除酸溶液的点击事件，即一旦选择完成则无法重选
        hclBottle.actionManager.unregisterAction(hclBottle.actionManager.actions[2])
        hnoBottle.actionManager.unregisterAction(hnoBottle.actionManager.actions[2])
      })
    })
  },

  registerClickOnAlkali() {
    return new Promise((resolve, reject) => {
      const naohBottle = this.getMeshByName('naohBottle')
      const baohBottle = this.getMeshByName('baohBottle')
      generalOperations.registerClickOnAlkali(this).then((val) => {
        resolve(val)
        // 移除碱溶液的点击事件，即一旦选择完成则无法重选
        naohBottle.actionManager.unregisterAction(naohBottle.actionManager.actions[2])
        baohBottle.actionManager.unregisterAction(baohBottle.actionManager.actions[2])
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
      main_liquid.originalScale(pivotAt, -main_liquid.scaling.y * 10 + 0.1)
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
  },

  panelDropperreset() {
    if (this.liquidPanel != null) {
      this.liquidPanel.hide()
      this.mutate({ liquidPanel: null })
    }
    if (this.targetPanel != null) {
      this.targetPanel.hide()
      this.mutate({ targetPanel: null })
    }
    generalOperations.switchDropper(this)
  },

  judgeBehavior(choice) {
    // 通过溶液组合数列existLiquid中的元素顺序，判断用户实验的一系列操作是否正确
    const matTubeLiquid = this.getMaterialByName('matTubeLiquid')
    let acidIndex, alkaliIndex, indicatorIndex
    let returnObj = {
      behavior: [],
      result: { content: '', isCorrect: false },
      isCorrect: false,
      correctContent: '',
    }

    const minNum = (liquidType, num1, num2) => {
      if (num1 === -1 && num2 === -1) {
        if (liquidType == 'acid')
          returnObj.behavior.push({ content: '实验操作错误：没有滴加酸溶液！', isCorrect: false })
        if (liquidType == 'alkali')
          returnObj.behavior.push({ content: '实验操作错误：没有滴加碱溶液！', isCorrect: false })
      } else {
        if (num1 === -1) return num2
        if (num2 === -1) return num1
      }
      if (num1 != 1 && num2 != -1) {
        if (liquidType == 'acid')
          returnObj.behavior.push({ content: '实验操作错误：两种酸溶液混合滴加！', isCorrect: false })
        if (liquidType == 'alkali')
          returnObj.behavior.push({ content: '实验操作错误：两种碱溶液混合滴加！', isCorrect: false })
      }
      if (num1 > num2) return num2
      else return num1
    }

    acidIndex = minNum('acid', this.existLiquid.indexOf('acid_hcl'), this.existLiquid.indexOf('acid_hno'))
    alkaliIndex = minNum(
      'alkali',
      this.existLiquid.indexOf('alkali_naoh'),
      this.existLiquid.indexOf('alkali_baoh')
    )
    indicatorIndex = minNum('indicator', this.existLiquid.indexOf('pur'), this.existLiquid.indexOf('phe'))
    if (
      (indicatorIndex > acidIndex && indicatorIndex < alkaliIndex) ||
      (indicatorIndex > alkaliIndex && indicatorIndex < acidIndex)
    ) {
      returnObj.behavior.push({
        content: '实验操作正确：酸溶液、碱溶液、指示剂滴加顺序正确！',
        isCorrect: true,
      })
    } else {
      returnObj.behavior.push({
        content: '实验操作错误：酸溶液、碱溶液、指示剂滴加顺序错误！',
        isCorrect: false,
      })
    }
    if (this.indicatorType === 'pur') {
      if (acidIndex === -1 || alkaliIndex === -1) {
        if (acidIndex === -1) returnObj.result = { content: '实验现象错误：未滴加酸溶液！', isCorrect: false }
        if (alkaliIndex === -1)
          returnObj.result = { content: '实验现象错误：未滴加碱溶液！', isCorrect: false }
      } else {
        if (acidIndex < alkaliIndex) {
          if (matTubeLiquid.diffuseColor.r == 0)
            returnObj.result = { content: '实验现象正确：可以观察到完整的颜色变化过程！', isCorrect: true }
          else returnObj.result = { content: '实验现象错误：碱溶液滴加过少！', isCorrect: false }
          returnObj.correctContent = '石蕊试液先变紫再变蓝'
          switch (choice) {
            case 'A':
              returnObj.isCorrect = true
              break
            case 'B':
            case 'C':
            case 'D':
              returnObj.isCorrect = false
              break
          }
        } else {
          if (matTubeLiquid.diffuseColor.r == 1)
            returnObj.result = { content: '实验现象正确：可以观察到完整的颜色变化过程！', isCorrect: true }
          else returnObj.result = { content: '实验现象错误：酸溶液滴加过少！', isCorrect: false }
          returnObj.correctContent = '石蕊试液先变紫再变红'
          switch (choice) {
            case 'B':
              returnObj.isCorrect = true
              break
            case 'A':
            case 'C':
            case 'D':
              returnObj.isCorrect = false
              break
          }
        }
      }
    } else {
      if (acidIndex === -1 || alkaliIndex === -1) {
        if (acidIndex === -1) returnObj.result = { content: '实验现象错误：未滴加酸溶液！', isCorrect: false }
        if (alkaliIndex === -1)
          returnObj.result = { content: '实验现象错误：未滴加碱溶液！', isCorrect: false }
      } else {
        if (acidIndex < alkaliIndex) {
          if (matTubeLiquid.diffuseColor.b == 0)
            returnObj.result = { content: '实验现象正确：可以观察到完整的颜色变化过程！', isCorrect: true }
          else returnObj.result = { content: '实验现象错误：碱溶液滴加过少！', isCorrect: false }
          returnObj.correctContent = '酚酞试液变红'
          switch (choice) {
            case 'C':
              returnObj.isCorrect = true
              break
            case 'A':
            case 'B':
            case 'D':
              returnObj.isCorrect = false
              break
          }
        } else {
          if (matTubeLiquid.diffuseColor.b == 1)
            returnObj.result = { content: '实验现象正确：可以观察到完整的颜色变化过程！', isCorrect: true }
          else returnObj.result = { content: '实验现象错误：酸溶液滴加过少！', isCorrect: false }
          returnObj.correctContent = '酚酞试液变无色'
          switch (choice) {
            case 'D':
              returnObj.isCorrect = true
              break
            case 'A':
            case 'B':
            case 'C':
              returnObj.isCorrect = false
              break
          }
        }
      }
    }
    return returnObj
  },
}
