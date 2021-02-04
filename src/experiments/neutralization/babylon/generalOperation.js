import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import animationBox from './animationBox'

const frameRate = 12

// 通用滴加酸碱溶液的试管，因为加的酸碱溶液都是无色，所以出现时统一设置颜色，避免之前操作的影响
const showDropper = scene => {
  return new Promise((resolve, reject) => {
    const liquidSphere = scene.getMeshByName('liquidSphere')
    const dropperLiquid = scene.getMeshByName('dropliquid')
    liquidSphere.material.diffuseColor = new BABYLON.Color3(1, 1, 1)
    dropperLiquid.material.diffuseColor = new BABYLON.Color3(1, 1, 1)
    const showDropper = animationBox.showMesh(frameRate)
    const showDropperGroup = new BABYLON.AnimationGroup('showDropper')
    showDropperGroup.addTargetedAnimation(showDropper, scene.getMeshByName('dropper_primitive0'))
    showDropperGroup.addTargetedAnimation(showDropper, scene.getMeshByName('dropper_primitive1'))
    showDropperGroup.addTargetedAnimation(showDropper, scene.getMeshByName('dropliquid'))
    showDropperGroup.normalize(0, frameRate)
    showDropperGroup.play()
    showDropperGroup.onAnimationEndObservable.add(() => {
      resolve()
    })
  })
}

const hideDropper = scene => {
  return new Promise((resolve, reject) => {
    const hideDropper = animationBox.hideMesh(frameRate)
    const hideDropperGroup = new BABYLON.AnimationGroup('hideDropper')
    hideDropperGroup.addTargetedAnimation(hideDropper, scene.getMeshByName('dropper_primitive0'))
    hideDropperGroup.addTargetedAnimation(hideDropper, scene.getMeshByName('dropper_primitive1'))
    hideDropperGroup.addTargetedAnimation(hideDropper, scene.getMeshByName('dropliquid'))
    hideDropperGroup.normalize(0, frameRate)
    hideDropperGroup.play()
    hideDropperGroup.onAnimationEndObservable.add(() => {
      resolve()
    })
  })
}

const dropLiqiud = (scene, beginPosition_y, endPosition_y, liquidColor = new BABYLON.Color3(1, 1, 1)) => {
  return new Promise((resolve, reject) => {
    const liquidSphere = scene.getMeshByName('liquidSphere')
    const dropperLiquid = scene.getMeshByName('dropliquid')
    const main_liquid = scene.getMeshByName('main_liquid')
    const bottom_liquid = scene.getMeshByName('bottom_liquid')
    liquidSphere.material.diffuseColor = liquidColor
    dropperLiquid.material.diffuseColor = liquidColor
    bottom_liquid.visibility = 1
    main_liquid.visibility = 1

    let pivotAt = new BABYLON.Vector3(0, main_liquid.getBoundingInfo().boundingBox.vectorsWorld[0].y, 0)
    scene.beginDirectAnimation(
      liquidSphere,
      [
        animationBox.dropLiquid_y(beginPosition_y, endPosition_y),
        animationBox.liquidSphereVisible,
        animationBox.liquidScale
      ],
      0,
      2 * frameRate,
      false
    )
    scene.beginDirectAnimation(
      main_liquid,
      main_liquid.scaleyFromPivot(pivotAt, 0.2),
      0,
      2.2 * frameRate,
      false,
      1,
      () => {
        resolve()
      }
    )
  })
}

const registClickActionOnBottle = scene => {
  const purBottle = scene.getMeshByName('purbottle')
  const purDropper = scene.getTransformNodeByName('purdropper')
  const purLiquid = scene.getMeshByName('purliquid')
  const pheBottle = scene.getMeshByName('phebottle')
  const pheDropper = scene.getTransformNodeByName('phedropper')
  const pheLiquid = scene.getMeshByName('pheliquid')

  return new Promise((resolve, reject) => {
    purBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        if (scene.animatables.length === 0) {
          animationBox.outFrames[0].value = new BABYLON.Vector3(80, 0, 80)
          animationBox.outFrames[1].value = new BABYLON.Vector3(80, 20, 80)
          scene.beginDirectAnimation(purDropper, [animationBox.outDropper], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(purLiquid, [animationBox.outDropper], 0, 3 * frameRate, false, 1, () => {
            resolve('pur')
          })
        }
      })
    )

    pheBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        if (scene.animatables.length === 0) {
          animationBox.outFrames[0].value = new BABYLON.Vector3(110, 0, 80)
          animationBox.outFrames[1].value = new BABYLON.Vector3(110, 20, 80)
          scene.beginDirectAnimation(pheDropper, [animationBox.outDropper], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(pheLiquid, [animationBox.outDropper], 0, 3 * frameRate, false, 1, () => {
            resolve('phe')
          })
        }
      })
    )
  })
}

const putBackDropper = (scene, indicator) => {
  const purDropper = scene.getTransformNodeByName('purdropper')
  const purLiquid = scene.getMeshByName('purliquid')
  const pheDropper = scene.getTransformNodeByName('phedropper')
  const pheLiquid = scene.getMeshByName('pheliquid')
  if (indicator === 'pur') {
    animationBox.backFrames[1].value = new BABYLON.Vector3(80, 20, 80)
    animationBox.backFrames[2].value = new BABYLON.Vector3(80, 0, 80)
    scene.beginDirectAnimation(purDropper, [animationBox.backDropper], 0, 3 * frameRate, false)
    scene.beginDirectAnimation(purLiquid, [animationBox.backDropper], 0, 3 * frameRate, false)
  }
  if (indicator === 'phe') {
    animationBox.backFrames[1].value = new BABYLON.Vector3(110, 20, 80)
    animationBox.backFrames[2].value = new BABYLON.Vector3(110, 0, 80)
    scene.beginDirectAnimation(pheDropper, [animationBox.backDropper], 0, 3 * frameRate, false)
    scene.beginDirectAnimation(pheLiquid, [animationBox.backDropper], 0, 3 * frameRate, false)
  }
}

const generalAction = new Object({
  showDropper,
  hideDropper,
  dropLiqiud,
  registClickActionOnBottle,
  putBackDropper
})

export default generalAction
