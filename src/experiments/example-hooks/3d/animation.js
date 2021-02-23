import * as BABYLON from '@babylonjs/core/Legacy/legacy'

const keyFrames = []

keyFrames.push({
  frame: 0,
  value: new BABYLON.Color3.Red()
})

keyFrames.push({
  frame: 30,
  value: new BABYLON.Color3.Yellow()
})

keyFrames.push({
  frame: 45,
  value: new BABYLON.Color3.Yellow()
})

const changeColorAnimation = new BABYLON.Animation(
  'changeColor',
  'diffuseColor',
  30,
  BABYLON.Animation.ANIMATIONTYPE_COLOR3
)

changeColorAnimation.setKeys(keyFrames)

export default changeColorAnimation
