import * as BABYLON from '@babylonjs/core/Legacy/legacy'

export const createMaterials = (scene) => {
  // 定义地面材质
  const matGround = new BABYLON.StandardMaterial('matGround', scene)
  matGround.diffuseColor = new BABYLON.Color3(218 / 255, 218 / 255, 218 / 255)
  matGround.opacityFresnel = true

  // 定义场景中间实验试管的材质
  const matTube = new BABYLON.StandardMaterial('matTube', scene)
  matTube.diffuseColor = new BABYLON.Color3(1, 1, 1)
  matTube.alpha = 0.5

  // 定义场景中间实验试管内溶液的材质
  const matTubeLiquid = new BABYLON.StandardMaterial('matTubeLiquid', scene)
  matTubeLiquid.diffuseColor = new BABYLON.Color3(1, 1, 1)
  matTubeLiquid.alpha = 0.95

  // 定义通用试剂瓶、滴管的玻璃材质
  const matGlass = new BABYLON.StandardMaterial('matGlass', scene)
  matGlass.diffuseColor = new BABYLON.Color3(1, 1, 1)
  matGlass.alpha = 0.3

  // 定义通用滴管内溶液的材质，即液滴的材质
  const matDropperLiquid = new BABYLON.StandardMaterial('matDropperLiquid', scene)
  matDropperLiquid.diffuseColor = new BABYLON.Color3(1, 1, 1)
  // matDropperLiquid.alpha = 0.9

  // 定义紫色石蕊试剂的材质
  const matPursolution = new BABYLON.StandardMaterial('matPursolution', scene)
  matPursolution.diffuseColor = new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255)
  matPursolution.alpha = 0.9

  // 定义无色酚酞试剂的材质
  const matPhesolution = new BABYLON.StandardMaterial('matPhesolution', scene)
  matPhesolution.diffuseColor = new BABYLON.Color3(1, 1, 1)
  matPhesolution.alpha = 0.9

  const matBrownGlass = new BABYLON.StandardMaterial('matBrownGlass', scene)
  matBrownGlass.diffuseColor = new BABYLON.Color3(115 / 255, 74 / 255, 18/ 255)
  matBrownGlass.alpha = 0.4
}
