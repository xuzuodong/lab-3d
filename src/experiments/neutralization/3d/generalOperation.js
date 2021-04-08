import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import animationBox from './animationBox'

import { Dialog } from 'quasar'
import ControlPanelVue from '../2d/ControlPanel.vue'
import WarnPanelVue from '../2d/WarnPanel.vue'

const frameRate = 12
let indicatorUsed = ''

const resetCamera = (scene) => {
  const camera = scene.activeCamera
  return new Promise((resolve, reject) => {
    if (camera.getTarget().y === 10 && camera.radius === 150 && camera.alpha === -Math.PI / 2) {
      resolve()
    } else {
      const cameraAn = animationBox.moveCamera(camera, new BABYLON.Vector3(0, 10, 0), 150, frameRate)
      scene.beginDirectAnimation(camera, cameraAn, 0, frameRate, false, 1, () => {
        resolve()
      })
    }
  })
}

const defineOutAn = (bottle, dropper, liquid) => {
  const putOutLqDropper = animationBox.outDropper(bottle.position)
  const putOutLqDropperGroup = new BABYLON.AnimationGroup('putOutLqDropperGroup')
  putOutLqDropperGroup.normalize(0, frameRate)
  putOutLqDropperGroup.addTargetedAnimation(putOutLqDropper, dropper)
  putOutLqDropperGroup.addTargetedAnimation(putOutLqDropper, liquid)
  return putOutLqDropperGroup
}

const putBackDropper = (scene, liquid) => {
  return new Promise((resolve, reject) => {
    const defineAn = (bottle, dropper, liquid) => {
      const putBackDropper = animationBox.backDropper(bottle.position)
      const putBackLqDropperGroup = new BABYLON.AnimationGroup('putBackLqDropperGroup')
      putBackLqDropperGroup.normalize(0, frameRate)
      putBackLqDropperGroup.addTargetedAnimation(putBackDropper, dropper)
      putBackLqDropperGroup.addTargetedAnimation(putBackDropper, liquid)
      putBackLqDropperGroup.play()
      putBackLqDropperGroup.onAnimationEndObservable.add(() => {
        resolve()
      })
    }

    if (liquid === 'acid_hcl') {
      const hclBottle = scene.getMeshByName('hclBottle')
      const hclDropper = scene.getTransformNodeByName('hclDropper')
      const hclLiquid = scene.getMeshByName('hclLiquid')
      defineAn(hclBottle, hclDropper, hclLiquid)
    }
    if (liquid === 'acid_ch3cooh') {
      const coohBottle = scene.getMeshByName('coohBottle')
      const coohDropper = scene.getTransformNodeByName('coohDropper')
      const coohLiquid = scene.getMeshByName('coohLiquid')
      defineAn(coohBottle, coohDropper, coohLiquid)
    }
    if (liquid === 'alkali_naoh') {
      const naohBottle = scene.getMeshByName('naohBottle')
      const naohDropper = scene.getTransformNodeByName('naohDropper')
      const naohLiquid = scene.getMeshByName('naohLiquid')
      defineAn(naohBottle, naohDropper, naohLiquid)
    }
    if (liquid === 'alkali_nahco3') {
      const nahcoBottle = scene.getMeshByName('nahcoBottle')
      const nahcoDropper = scene.getTransformNodeByName('nahcoDropper')
      const nahcoLiquid = scene.getMeshByName('nahcoLiquid')
      defineAn(nahcoBottle, nahcoDropper, nahcoLiquid)
    }
    if (liquid === 'pur') {
      const purBottle = scene.getMeshByName('purbottle')
      const purDropper = scene.getTransformNodeByName('purdropper')
      const purLiquid = scene.getMeshByName('purliquid')
      defineAn(purBottle, purDropper, purLiquid)
    }
    if (liquid === 'phe') {
      const pheBottle = scene.getMeshByName('phebottle')
      const pheDropper = scene.getTransformNodeByName('phedropper')
      const pheLiquid = scene.getMeshByName('pheliquid')
      defineAn(pheBottle, pheDropper, pheLiquid)
    }
  })
}

const switchDropper = (scene) => {
  const hclDropper = scene.getTransformNodeByName('hclDropper')
  const coohDropper = scene.getTransformNodeByName('coohDropper')
  const naohDropper = scene.getTransformNodeByName('naohDropper')
  const nahcoDropper = scene.getTransformNodeByName('nahcoDropper')
  const purDropper = scene.getTransformNodeByName('purdropper')
  const pheDropper = scene.getTransformNodeByName('phedropper')

  let dropperArr = [hclDropper, coohDropper, naohDropper, nahcoDropper, purDropper, pheDropper]
  for (let i = 0; i < dropperArr.length; i++) {
    if (dropperArr[i].position.y == 50) {
      switch (dropperArr[i]) {
        case hclDropper:
          putBackDropper(scene, 'acid_hcl')
          break
        case coohDropper:
          putBackDropper(scene, 'acid_ch3cooh')
          break
        case naohDropper:
          putBackDropper(scene, 'alkali_naoh')
          break
        case nahcoDropper:
          putBackDropper(scene, 'alkali_nahco3')
          break
        case purDropper:
          putBackDropper(scene, 'pur')
          break
        case pheDropper:
          putBackDropper(scene, 'phe')
          break
      }
    }
  }
}

const registerClickOnAcid = (scene) => {
  const hclBottle = scene.getMeshByName('hclBottle')
  const hclDropper = scene.getTransformNodeByName('hclDropper')
  const hclLiquid = scene.getMeshByName('hclLiquid')
  const coohBottle = scene.getMeshByName('coohBottle')
  const coohDropper = scene.getTransformNodeByName('coohDropper')
  const coohLiquid = scene.getMeshByName('coohLiquid')

  // 因为加的酸碱溶液都是无色，所以出现时统一设置颜色，避免之前操作的影响
  const liquidSphere = scene.getMeshByName('liquidSphere')
  liquidSphere.material.diffuseColor = new BABYLON.Color3(1, 1, 1)

  return new Promise((resolve, reject) => {
    hclBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        if (scene.animatables.length === 0) {
          const putOutHclAn = defineOutAn(hclBottle, hclDropper, hclLiquid)
          switchDropper(scene)
          putOutHclAn.play()
          putOutHclAn.onAnimationEndObservable.add(() => {
            resolve('acid_hcl')
          })
        }
      })
    )
    coohBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        if (scene.animatables.length === 0) {
          const putOutCoohAn = defineOutAn(coohBottle, coohDropper, coohLiquid)
          switchDropper(scene)
          putOutCoohAn.play()
          putOutCoohAn.onAnimationEndObservable.add(() => {
            resolve('acid_ch3cooh')
          })
        }
      })
    )
  })
}

const registerClickOnAlkali = (scene) => {
  const naohBottle = scene.getMeshByName('naohBottle')
  const naohDropper = scene.getTransformNodeByName('naohDropper')
  const naohLiquid = scene.getMeshByName('naohLiquid')
  const nahcoBottle = scene.getMeshByName('nahcoBottle')
  const nahcoDropper = scene.getTransformNodeByName('nahcoDropper')
  const nahcoLiquid = scene.getMeshByName('nahcoLiquid')

  return new Promise((resolve, reject) => {
    naohBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        if (scene.animatables.length === 0) {
          const putOutHclAn = defineOutAn(naohBottle, naohDropper, naohLiquid)
          switchDropper(scene)
          putOutHclAn.play()
          putOutHclAn.onAnimationEndObservable.add(() => {
            resolve('alkali_naoh')
          })
        }
      })
    )
    nahcoBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        if (scene.animatables.length === 0) {
          const putOutCoohAn = defineOutAn(nahcoBottle, nahcoDropper, nahcoLiquid)
          switchDropper(scene)
          putOutCoohAn.play()
          putOutCoohAn.onAnimationEndObservable.add(() => {
            resolve('alkali_nahco3')
          })
        }
      })
    )
  })
}

const dropLiqiud = (scene, beginPosition_y, endPosition_y, liquidColor = new BABYLON.Color3(1, 1, 1)) => {
  return new Promise((resolve, reject) => {
    const liquidSphere = scene.getMeshByName('liquidSphere')
    const main_liquid = scene.getMeshByName('main_liquid')
    const bottom_liquid = scene.getMeshByName('bottom_liquid')
    liquidSphere.material.diffuseColor = liquidColor

    let pivotAt = new BABYLON.Vector3(0, bottom_liquid.getBoundingInfo().boundingBox.maximumWorld.y, 0)
    scene.beginDirectAnimation(
      liquidSphere,
      [
        animationBox.dropLiquid_y(beginPosition_y, endPosition_y),
        animationBox.liquidSphereVisible,
        animationBox.liquidScale
      ],
      0,
      frameRate,
      false,
      1,
      () => {
        if (scene.existLiquid.length === 0) {
          bottom_liquid.visibility = 1
          main_liquid.visibility = 1
          resolve()
        }
      }
    )
    if (scene.existLiquid.length != 0) {
      // 第一次滴液只出现，不增长液面
      scene.beginDirectAnimation(
        main_liquid,
        main_liquid.scaleyFromPivot(pivotAt, 0.2),
        0,
        frameRate,
        false,
        1,
        () => {
          resolve()
        }
      )
    }
  })
}

const openLiquidPanel = (scene, val) => {
  if (scene.liquidPanel != null) {
    scene.liquidPanel.hide()
  }
  const liquidPanel = Dialog.create({
    component: ControlPanelVue,
    scene,
    dropType: val
  })
  scene.mutate({ liquidPanel })
}

const openWarnPanel = (warnInfo) => {
  Dialog.create({
    component: WarnPanelVue,
    warnInfo: warnInfo
  })
}

const liquidWarn = (scene, liquidType) => {
  if (scene.progress[0].step.slice(0, 1) != '1') {
    if (!scene.progress[0].finished) {
      if (liquidType === 'pur' || liquidType === 'phe') {
        openWarnPanel('当前进行实验第一步，请先滴加酸或碱溶液吧！')
      }
    } else if (!scene.progress[1].finished) {
      if (liquidType != 'pur' && liquidType != 'phe') {
        openWarnPanel('当前进行实验第二步， 请滴加酸碱指示剂')
      }
    } else if (!scene.progress[2].finished) {
      let haveAcid, haveIndicator, haveAlkali
      if (scene.existLiquid.indexOf('acid_hcl') != -1 || scene.existLiquid.indexOf('acid_ch3cooh') != -1) {
        haveAcid = true
      }
      if (scene.existLiquid.indexOf('pur') != -1 || scene.existLiquid.indexOf('phe') != -1) {
        haveIndicator = true
      }
      if (
        scene.existLiquid.indexOf('alkali_naoh') != -1 ||
        scene.existLiquid.indexOf('alkali_nahco3') != -1
      ) {
        haveAlkali = true
      }
      switch (liquidType) {
        case 'acid_hcl':
        case 'acid_ch3cooh':
          if (haveAcid) openWarnPanel('您已滴加过酸溶液，现在进行实验第三步，请滴加碱溶液！')
          break
        case 'alkali_naoh':
        case 'alkali_nahco3':
          if (haveAlkali) openWarnPanel('您已滴加过碱溶液，现在进行实验第三步，请滴加酸溶液！')
          break
        case 'pur':
        case 'phe':
          if (haveIndicator) {
            if (haveAcid) openWarnPanel('您已滴加过酸碱指示剂，现在进行实验第三步，请滴加碱溶液！')
            if (haveAlkali) openWarnPanel('您已滴加过酸碱指示剂，现在进行实验第三步，请滴加酸溶液！')
          }
      }
    } else {
      openWarnPanel('您现在已完成本轮自由实验，可点击左侧面板的“完成”按钮结束实验！')
    }
  }
}

const registerAllAction = (scene, flag) => {
  const hclBottle = scene.getMeshByName('hclBottle')
  const hclDropper = scene.getTransformNodeByName('hclDropper')
  const hclLiquid = scene.getMeshByName('hclLiquid')
  const coohBottle = scene.getMeshByName('coohBottle')
  const coohDropper = scene.getTransformNodeByName('coohDropper')
  const coohLiquid = scene.getMeshByName('coohLiquid')
  const naohBottle = scene.getMeshByName('naohBottle')
  const naohDropper = scene.getTransformNodeByName('naohDropper')
  const naohLiquid = scene.getMeshByName('naohLiquid')
  const nahcoBottle = scene.getMeshByName('nahcoBottle')
  const nahcoDropper = scene.getTransformNodeByName('nahcoDropper')
  const nahcoLiquid = scene.getMeshByName('nahcoLiquid')
  const purBottle = scene.getMeshByName('purbottle')
  const purDropper = scene.getTransformNodeByName('purdropper')
  const purLiquid = scene.getMeshByName('purliquid')
  const pheBottle = scene.getMeshByName('phebottle')
  const pheDropper = scene.getTransformNodeByName('phedropper')
  const pheLiquid = scene.getMeshByName('pheliquid')

  if (flag === 'restart') indicatorUsed = ''

  hclBottle.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
      new Promise((resolve, reject) => {
        if (scene.animatables.length === 0) {
          const putOutHclAn = defineOutAn(hclBottle, hclDropper, hclLiquid)
          switchDropper(scene)
          liquidWarn(scene, 'acid_hcl')
          putOutHclAn.play()
          putOutHclAn.onAnimationEndObservable.add(() => {
            resolve('acid_hcl')
          })
        }
      }).then((val) => openLiquidPanel(scene, val))
    })
  )

  coohBottle.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
      new Promise((resolve, reject) => {
        if (scene.animatables.length === 0) {
          const putOutCoohAn = defineOutAn(coohBottle, coohDropper, coohLiquid)
          switchDropper(scene)
          liquidWarn(scene, 'acid_ch3cooh')
          putOutCoohAn.play()
          putOutCoohAn.onAnimationEndObservable.add(() => {
            resolve('acid_ch3cooh')
          })
        }
      }).then((val) => openLiquidPanel(scene, val))
    })
  )

  naohBottle.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
      new Promise((resolve, reject) => {
        if (scene.animatables.length === 0) {
          const putOutHclAn = defineOutAn(naohBottle, naohDropper, naohLiquid)
          switchDropper(scene)
          liquidWarn(scene, 'alkali_naoh')
          putOutHclAn.play()
          putOutHclAn.onAnimationEndObservable.add(() => {
            resolve('alkali_naoh')
          })
        }
      }).then((val) => openLiquidPanel(scene, val))
    })
  )

  nahcoBottle.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
      new Promise((resolve, reject) => {
        if (scene.animatables.length === 0) {
          const putOutCoohAn = defineOutAn(nahcoBottle, nahcoDropper, nahcoLiquid)
          switchDropper(scene)
          liquidWarn(scene, 'alkali_nahco3')
          putOutCoohAn.play()
          putOutCoohAn.onAnimationEndObservable.add(() => {
            resolve('alkali_nahco3')
          })
        }
      }).then((val) => openLiquidPanel(scene, val))
    })
  )

  if (indicatorUsed != 'pur') {
    purBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        new Promise((resolve, reject) => {
          if (scene.animatables.length === 0) {
            resetCamera(scene).then(() => {
              const putOutPurAn = defineOutAn(purBottle, purDropper, purLiquid)
              switchDropper(scene)
              liquidWarn(scene, 'pur')
              putOutPurAn.play()
              putOutPurAn.onAnimationEndObservable.add(() => {
                resolve('pur')
                indicatorUsed = 'pur'
              })
            })
          }
        }).then((val) => openLiquidPanel(scene, val))
      })
    )
  }

  if (indicatorUsed != 'phe') {
    pheBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        new Promise((resolve, reject) => {
          if (scene.animatables.length === 0) {
            resetCamera(scene).then(() => {
              switchDropper(scene)
              const putOutPheAn = defineOutAn(pheBottle, pheDropper, pheLiquid)
              switchDropper(scene)
              liquidWarn(scene, 'phe')
              putOutPheAn.play()
              putOutPheAn.onAnimationEndObservable.add(() => {
                resolve('phe')
                indicatorUsed = 'phe'
              })
            })
          }
        }).then((val) => openLiquidPanel(scene, val))
      })
    )
  }
}

const generalAction = new Object({
  registerClickOnAcid,
  registerClickOnAlkali,
  putBackDropper,
  dropLiqiud,
  registerAllAction,
  openLiquidPanel,
  switchDropper
})

export default generalAction
