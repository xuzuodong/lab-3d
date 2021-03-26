import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import animationBox from './animationBox'

const frameRate = 12
let indicaterUsed = ''

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

// 通用滴加酸碱溶液的试管，因为加的酸碱溶液都是无色，所以出现时统一设置颜色，避免之前操作的影响
const showDropper = (scene) => {
  return new Promise((resolve, reject) => {
    const liquidSphere = scene.getMeshByName('liquidSphere')
    liquidSphere.material.diffuseColor = new BABYLON.Color3(1, 1, 1)
    const showDropper = animationBox.showMesh(frameRate)
    const showDropperGroup = new BABYLON.AnimationGroup('showDropper')
    showDropperGroup.normalize(0, frameRate)
    showDropperGroup.play()
    showDropperGroup.onAnimationEndObservable.add(() => {
      resolve()
    })
  })
}

const hideDropper = (scene) => {
  return new Promise((resolve, reject) => {
    const hideDropper = animationBox.hideMesh(frameRate)
    const hideDropperGroup = new BABYLON.AnimationGroup('hideDropper')
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
    const main_liquid = scene.getMeshByName('main_liquid')
    const bottom_liquid = scene.getMeshByName('bottom_liquid')
    liquidSphere.material.diffuseColor = liquidColor
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
      frameRate,
      false
    )
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
  })
}

const registClickActionOnBottle = (scene) => {
  const purBottle = scene.getMeshByName('purbottle')
  const purDropper = scene.getTransformNodeByName('purdropper')
  const purLiquid = scene.getMeshByName('purliquid')
  const pheBottle = scene.getMeshByName('phebottle')
  const pheDropper = scene.getTransformNodeByName('phedropper')
  const pheLiquid = scene.getMeshByName('pheliquid')

  return new Promise((resolve, reject) => {
    if (indicaterUsed != 'pur') {
      purBottle.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
          if (scene.animatables.length === 0) {
            resetCamera(scene).then(() => {
              scene.beginDirectAnimation(
                purDropper,
                [animationBox.outDropper(purBottle.position)],
                0,
                3 * frameRate,
                false
              )
              scene.beginDirectAnimation(
                purLiquid,
                [animationBox.outDropper(purBottle.position)],
                0,
                1.5 * frameRate,
                false,
                1,
                () => {
                  resolve('pur')
                  indicaterUsed = 'pur'
                }
              )
            })
          }
        })
      )
    }

    if (indicaterUsed != 'phe') {
      pheBottle.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
          if (scene.animatables.length === 0) {
            resetCamera(scene).then(() => {
              scene.beginDirectAnimation(
                pheDropper,
                [animationBox.outDropper(pheBottle.position)],
                0,
                3 * frameRate,
                false
              )
              scene.beginDirectAnimation(
                pheLiquid,
                [animationBox.outDropper(pheBottle.position)],
                0,
                1.5 * frameRate,
                false,
                1,
                () => {
                  resolve('phe')
                  indicaterUsed = 'phe'
                }
              )
            })
          }
        })
      )
    }
  })
}

const putBackDropper = (scene, indicator) => {
  const purBottle = scene.getMeshByName('purbottle')
  const purDropper = scene.getTransformNodeByName('purdropper')
  const purLiquid = scene.getMeshByName('purliquid')
  const pheBottle = scene.getMeshByName('phebottle')
  const pheDropper = scene.getTransformNodeByName('phedropper')
  const pheLiquid = scene.getMeshByName('pheliquid')
  if (indicator === 'pur') {
    scene.beginDirectAnimation(
      purDropper,
      [animationBox.backDropper(purBottle.position)],
      0,
      1.5 * frameRate,
      false
    )
    scene.beginDirectAnimation(
      purLiquid,
      [animationBox.backDropper(purBottle.position)],
      0,
      1.5 * frameRate,
      false
    )
  }
  if (indicator === 'phe') {
    scene.beginDirectAnimation(
      pheDropper,
      [animationBox.backDropper(pheBottle.position)],
      0,
      1.5 * frameRate,
      false
    )
    scene.beginDirectAnimation(
      pheLiquid,
      [animationBox.backDropper(pheBottle.position)],
      0,
      1.5 * frameRate,
      false
    )
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
