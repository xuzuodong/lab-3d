import * as BABYLON from '@babylonjs/core/Legacy/legacy'

const frameRate = 12

// 通用动画缓动函数，ease-in，形如二次函数，先慢后快
const easeInFunction = new BABYLON.QuadraticEase()
easeInFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN)

const easeInOutFunction = new BABYLON.CubicEase()
easeInOutFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT)

let midPositon = (initPosition) => {
  return new BABYLON.Vector3(initPosition.x, initPosition.y + 20, initPosition.z)
}

// 拿出试剂瓶上的滴灌
const outDropper = (initPosition) => {
  const outDropper = new BABYLON.Animation(
    'outDropper',
    'position',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const outFrames = []
  outFrames.push({
    frame: 0,
    value: initPosition
  })
  outFrames.push({
    frame: 0.5 * frameRate,
    value: midPositon(initPosition)
  })
  outFrames.push({
    frame: 1.5 * frameRate,
    value: new BABYLON.Vector3(0, 50, 0)
  })
  outDropper.setKeys(outFrames)
  return outDropper
}

// 放回试剂瓶上的滴灌
const backDropper = (initPosition) => {
  const backDropper = new BABYLON.Animation(
    'backDropper',
    'position',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const backFrames = []
  backFrames.push({
    frame: 0,
    value: new BABYLON.Vector3(0, 50, 0)
  })
  backFrames.push({
    frame: frameRate,
    value: midPositon(initPosition)
  })
  backFrames.push({
    frame: 1.5 * frameRate,
    value: initPosition
  })
  backDropper.setKeys(backFrames)
  return backDropper
}

// 滴管中滴出溶液的过程(由于必定向下低落，故直接取名xx_y)
const dropLiquid_y = (beginPosition_y, endPosition_y) => {
  const dropLiquid_y = new BABYLON.Animation(
    'dropLiquid_y',
    'position.y',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const dropFrames = []
  dropFrames.push({
    frame: 0,
    value: beginPosition_y
  })
  dropFrames.push({
    frame: frameRate,
    value: endPosition_y
  })
  dropLiquid_y.setKeys(dropFrames)
  dropLiquid_y.setEasingFunction(easeInFunction)

  return dropLiquid_y
}

// 液滴变大的过程
const liquidScale = new BABYLON.Animation(
  'liquidScale',
  'scaling',
  frameRate,
  BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
)
const scaleFrames = []
scaleFrames.push({
  frame: 0,
  value: new BABYLON.Vector3(1, 1, 1)
})
scaleFrames.push({
  frame: 0.3 * frameRate,
  value: new BABYLON.Vector3(3, 3, 3)
})
liquidScale.setKeys(scaleFrames)

// 控制液滴可见性
const liquidSphereVisible = new BABYLON.Animation(
  'liquidSphereVisible',
  'visibility',
  frameRate,
  BABYLON.Animation.ANIMATIONTYPE_FLOAT,
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
)
const visibileFrames = []
visibileFrames.push({
  frame: 0,
  value: 1
})
visibileFrames.push({
  frame: 0.95 * frameRate,
  value: 1
})
visibileFrames.push({
  frame: frameRate,
  value: 0
})
liquidSphereVisible.setKeys(visibileFrames)

// 通过改变相机的target合radius来移动相机的函数，接受四个参数（需要移动的相机，相机指向的目标点，最终距离目标的半径, 结束帧）
const moveCamera = (camera, endTarget, endRadius, endFrame, alpha = -Math.PI / 2) => {
  const changeTarget = new BABYLON.Animation(
    'changeTarget',
    'target',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const changeTargetFrames = []
  changeTargetFrames.push({
    frame: 0,
    value: camera.target
  })
  changeTargetFrames.push({
    frame: endFrame,
    value: endTarget
  })
  changeTarget.setKeys(changeTargetFrames)
  changeTarget.setEasingFunction(easeInOutFunction)

  const changeRadius = new BABYLON.Animation(
    'changeRadius',
    'radius',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const changeRadiusFrames = []
  changeRadiusFrames.push({
    frame: 0,
    value: camera.radius
  })
  changeRadiusFrames.push({
    frame: endFrame,
    value: endRadius
  })
  changeRadius.setKeys(changeRadiusFrames)
  changeRadius.setEasingFunction(easeInOutFunction)

  const changeAlpha = new BABYLON.Animation(
    'changeAlpha',
    'alpha',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const changeAlphaFrames = []
  changeAlphaFrames.push({
    frame: 0,
    value: camera.alpha
  })
  changeAlphaFrames.push({
    frame: endFrame,
    value: alpha
  })
  changeAlpha.setKeys(changeAlphaFrames)
  changeAlpha.setEasingFunction(easeInOutFunction)

  const changeBeta = new BABYLON.Animation(
    'changeBeta',
    'beta',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const changeBetaFrames = []
  changeBetaFrames.push({
    frame: 0,
    value: camera.beta
  })
  changeBetaFrames.push({
    frame: endFrame,
    value: camera.upperBetaLimit
  })
  changeBeta.setKeys(changeBetaFrames)
  changeBeta.setEasingFunction(easeInOutFunction)

  return [changeTarget, changeRadius, changeAlpha, changeBeta]
}

// 显示物体的动画（从不可见到可见），接收一个参数（结束帧）
const showMesh = (endFrame) => {
  const showMesh = new BABYLON.Animation(
    'showMesh',
    'visibility',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const showMeshFrames = []
  showMeshFrames.push({
    frame: 0,
    value: 0
  })
  showMeshFrames.push({
    frame: endFrame,
    value: 1
  })
  showMesh.setKeys(showMeshFrames)
  showMesh.setEasingFunction(easeInFunction)

  return showMesh
}

// 隐藏物体的动画（从可见到不可见），接收一个参数（结束帧）
const hideMesh = (endFrame) => {
  const hideMesh = new BABYLON.Animation(
    'hideMesh',
    'visibility',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const hideMeshFrames = []
  hideMeshFrames.push({
    frame: 0,
    value: 1
  })
  hideMeshFrames.push({
    frame: endFrame,
    value: 0
  })
  hideMesh.setKeys(hideMeshFrames)
  hideMesh.setEasingFunction(easeInFunction)

  return hideMesh
}

// 物体位置变换动画（position相关）
const moveMesh = (beginPosition, endPosition, endFrame) => {
  const moveMesh = new BABYLON.Animation(
    'moveMesh',
    'position',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )

  const moveMeshFrames = []
  moveMeshFrames.push({
    frame: 0,
    value: beginPosition
  })
  moveMeshFrames.push({
    frame: endFrame,
    value: endPosition
  })
  moveMesh.setKeys(moveMeshFrames)

  moveMesh.setEasingFunction(easeInFunction)
  return moveMesh
}

// 定义试管中溶液增减动画的函数
BABYLON.Mesh.prototype.scaleyFromPivot = function(
  pivotPoint,
  t,
  midFrame = 0.8 * frameRate,
  endFrame = frameRate
) {
  let _sy = (this.scaling.y + t / 10) / this.scaling.y

  const blscaleY = new BABYLON.Animation(
    'blscaleY',
    'scaling.y',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const blscaleYFrames = []
  blscaleYFrames.push({
    frame: 0,
    value: this.scaling.y
  })
  blscaleYFrames.push({
    frame: midFrame,
    value: this.scaling.y
  })
  blscaleYFrames.push({
    frame: endFrame,
    value: this.scaling.y + t / 10
  })
  blscaleY.setKeys(blscaleYFrames)

  const blpositionY = new BABYLON.Animation(
    'blpositionY',
    'position.y',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  )
  const blpositionYFrames = []
  blpositionYFrames.push({
    frame: 0,
    value: this.position.y
  })
  blpositionYFrames.push({
    frame: midFrame,
    value: this.position.y
  })
  blpositionYFrames.push({
    frame: endFrame,
    value: pivotPoint.y + _sy * (this.position.y - pivotPoint.y)
  })
  blpositionY.setKeys(blpositionYFrames)

  return [blscaleY, blpositionY]
}

const animationBox = new Object({
  outDropper,
  backDropper,
  dropLiquid_y,
  liquidScale,
  liquidSphereVisible,
  moveCamera,
  showMesh,
  hideMesh,
  moveMesh
})

export default animationBox
