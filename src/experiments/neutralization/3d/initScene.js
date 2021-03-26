import * as GUI from '@babylonjs/gui'
import * as BABYLON from '@babylonjs/core/Legacy/legacy'

import tube from './meshes/tube.glb'
import purbottle from './meshes/purbottle.glb'
import phebottle from './meshes/phebottle.glb'

import { createMaterials } from './materials'
import { defaultOperations } from './defaultOperation'

export default (scene) => {
  return new Promise((resolve) => {
    // 场景在这里初始化
    scene.clearColor = new BABYLON.Color3(240 / 255, 240 / 255, 240 / 255)

    scene.createDefaultCamera(true, true, true)
    const camera = scene.activeCamera
    camera.beta = Math.PI / 3
    camera.alpha = -Math.PI / 2
    camera.setTarget(new BABYLON.Vector3(0, 10, 0))
    camera.radius = 150
    camera.lowerBetaLimit = (Math.PI / 2) * 0.42
    camera.upperBetaLimit = (Math.PI / 2) * 0.85
    camera.lowerRadiusLimit = 20
    camera.upperRadiusLimit = 250
    camera.panningSensibility = 1
    camera.wheelPrecision = 3
    camera.useBouncingBehavior = true
    camera.useFramingBehavior = true

    const light1 = new BABYLON.HemisphericLight('HemisphericLight', new BABYLON.Vector3(150, -500, 0), scene)
    const light2 = new BABYLON.HemisphericLight('HemisphericLight2', new BABYLON.Vector3(100, 500, 0), scene)
    const shadowLight = new BABYLON.DirectionalLight(
      'shadowControlLight',
      new BABYLON.Vector3(100, -100, 0),
      scene
    )

    shadowLight.position = new BABYLON.Vector3(-80, 80, 0)
    light1.intensity = 0.6
    light2.intensity = 0.6
    shadowLight.intensity = 0.7

    Promise.all([
      BABYLON.SceneLoader.ImportMeshAsync('', tube, '', scene, undefined, '.glb'),
      BABYLON.SceneLoader.ImportMeshAsync('', purbottle, '', scene, undefined, '.glb'),
      BABYLON.SceneLoader.ImportMeshAsync('', phebottle, '', scene, undefined, '.glb')
    ]).then(() => {
      const myan = scene.animationGroups.find((a) => a.name === 'All Animations')
      myan.stop()

      createMaterials(scene)

      const materials = {
        matGround: scene.getMaterialByName('matGround'),
        matTube: scene.getMaterialByName('matTube'),
        matTubeLiquid: scene.getMaterialByName('matTubeLiquid'),
        matGlass: scene.getMaterialByName('matGlass'),
        matDropperLiquid: scene.getMaterialByName('matDropperLiquid'),
        matPursolution: scene.getMaterialByName('matPursolution'),
        matPhesolution: scene.getMaterialByName('matPhesolution')
      }

      const tubeMesh = []
      tubeMesh.push(scene.getMeshByName('tube'))
      tubeMesh.push(scene.getMeshByName('bottom_liquid'))
      tubeMesh.push(scene.getMeshByName('main_liquid'))

      const purMeshes = []
      purMeshes.push(scene.getTransformNodeByName('purdropper'))
      purMeshes.push(scene.getMeshByName('purliquid'))
      purMeshes.push(scene.getMeshByName('purbottle'))
      purMeshes.push(scene.getMeshByName('pursolution'))

      const pheMeshes = []
      pheMeshes.push(scene.getTransformNodeByName('phedropper'))
      pheMeshes.push(scene.getMeshByName('pheliquid'))
      pheMeshes.push(scene.getMeshByName('phebottle'))
      pheMeshes.push(scene.getMeshByName('phesolution'))

      const cloneBottle = (name) => {
        return [
          pheMeshes[0].clone(name + 'Dropper'),
          pheMeshes[1].clone(name + 'Liquid'),
          pheMeshes[2].clone(name + 'Bottle'),
          pheMeshes[3].clone(name + 'Solution')
        ]
      }

      const changeMeshPosition = (meshArr, position) => {
        for (let i = 0; i < meshArr.length; i++) {
          meshArr[i].parent = null
          meshArr[i].position = position
        }
      }

      const ground = BABYLON.MeshBuilder.CreateGround('myGround', { width: 500, height: 500 }, scene)
      ground.material = materials.matGround
      ground.receiveShadows = true

      // // 定义试管中溶液增减动画的函数
      BABYLON.Mesh.prototype.originalScale = function(pivotPoint, t) {
        let _sy = (this.scaling.y + t / 10) / this.scaling.y
        this.scaling.y = this.scaling.y + t / 10
        this.position.y = pivotPoint.y + _sy * (this.position.y - pivotPoint.y)
      }

      // // 设置试管参数
      let tube1 = tubeMesh[0]
      let bottom_liquid = tubeMesh[1]
      let main_liquid = tubeMesh[2]
      modifyTubeMeshes()
      function modifyTubeMeshes() {
        tube1.parent = null
        bottom_liquid.parent = null
        main_liquid.parent = null
        let pivotAt = new BABYLON.Vector3(0, main_liquid.getBoundingInfo().boundingBox.vectorsWorld[0].y, 0)
        main_liquid.originalScale(pivotAt, -2.7)
        main_liquid.visibility = 0
        bottom_liquid.visibility = 0
        tube1.material = materials.matTube
        bottom_liquid.material = materials.matTubeLiquid
        main_liquid.material = materials.matTubeLiquid
      }

      // // 设置紫色石蕊试剂参数
      let purDropper = purMeshes[0]
      let purLiquid = purMeshes[1]
      let purBottle = purMeshes[2]
      let purSolution = purMeshes[3]
      modifyPurbottlMeshes()
      function modifyPurbottlMeshes() {
        purDropper.parent = null
        purLiquid.parent = null
        purBottle.parent = null
        purSolution.parent = null
        purDropper.position = new BABYLON.Vector3(-15, 0, 80)
        purLiquid.position = new BABYLON.Vector3(-15, 0, 80)
        purBottle.position = new BABYLON.Vector3(-15, 0, 80)
        purSolution.position = new BABYLON.Vector3(-15, 0, 80)
        purSolution.material = materials.matPursolution
        purLiquid.material = materials.matPursolution
        purBottle.material = materials.matGlass
        purDropper.getChildMeshes()[0].material = materials.matGlass
      }

      // // 设置无色酚酞试剂参数
      let pheDropper = pheMeshes[0]
      let pheLiquid = pheMeshes[1]
      let pheBottle = pheMeshes[2]
      let pheSolution = pheMeshes[3]
      pheDropper.parent = null
      pheLiquid.parent = null
      pheBottle.parent = null
      pheSolution.parent = null
      pheDropper.position = new BABYLON.Vector3(15, 0, 80)
      pheLiquid.position = new BABYLON.Vector3(15, 0, 80)
      pheBottle.position = new BABYLON.Vector3(15, 0, 80)
      pheSolution.position = new BABYLON.Vector3(15, 0, 80)
      pheSolution.material = materials.matPhesolution
      pheBottle.material = materials.matGlass
      pheDropper.getChildMeshes()[0].material = materials.matGlass

      let hclDropper, hclLiquid, hclBottle, hclSolution
      const hclMeshes = ([hclDropper, hclLiquid, hclBottle, hclSolution] = cloneBottle('hcl'))
      changeMeshPosition(hclMeshes, new BABYLON.Vector3(-120, 0, 80))

      let coohDropper, coohLiquid, coohBottle, coohSolution
      const coohMeshes = ([coohDropper, coohLiquid, coohBottle, coohSolution] = cloneBottle('cooh'))
      changeMeshPosition(coohMeshes, new BABYLON.Vector3(-90, 0, 80))

      let naohDropper, naohLiquid, naohBottle, naohSolution
      const naohMeshes = ([naohDropper, naohLiquid, naohBottle, naohSolution] = cloneBottle('naoh'))
      changeMeshPosition(naohMeshes, new BABYLON.Vector3(90, 0, 80))

      let nahcoDropper, nahcoLiquid, nahcoBottle, nahcoSolution
      const nahcoMeshes = ([nahcoDropper, nahcoLiquid, nahcoBottle, nahcoSolution] = cloneBottle('nahco'))
      changeMeshPosition(nahcoMeshes, new BABYLON.Vector3(120, 0, 80))

      // // 添加阴影
      let directionalLight = scene.getLightByName('shadowControlLight')
      const shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight)
      shadowGenerator.addShadowCaster(main_liquid)
      shadowGenerator.addShadowCaster(purBottle)
      shadowGenerator.addShadowCaster(pheBottle)
      shadowGenerator.addShadowCaster(hclBottle)
      shadowGenerator.addShadowCaster(coohBottle)
      shadowGenerator.addShadowCaster(naohBottle)
      shadowGenerator.addShadowCaster(nahcoBottle)
      shadowGenerator.useExponentialShadowMap = true
      shadowGenerator.setTransparencyShadow(true)
      shadowGenerator.setDarkness(0.36) //阴影灰度，0为全黑，1为无阴影
      shadowGenerator.useBlurExponentialShadowMap = true
      shadowGenerator.useKernelBlur = true
      shadowGenerator.blurKernel = 150

      const advancedTexture = new GUI.AdvancedDynamicTexture.CreateFullscreenUI('uiContainer')

      const formatText = (textArr) => {
        for (let i = 0; i < textArr.length; i++) {
          textArr[i].resizeToFit = true
          textArr[i].color = 'balck'
          textArr[i].fontSize = 20
          textArr[i].linkOffsetY = 50
        }
      }

      // // 试剂瓶上的提示，动画暂未添加
      const purText = new GUI.TextBlock()
      purText.text = '紫色石蕊试剂'
      advancedTexture.addControl(purText)
      purText.linkWithMesh(purBottle)
      purText.alpha = 0

      const pheText = new GUI.TextBlock()
      pheText.text = '酚酞试剂'
      advancedTexture.addControl(pheText)
      pheText.linkWithMesh(pheBottle)
      pheText.alpha = 0

      const hclText = new GUI.TextBlock()
      hclText.text = '稀盐酸'
      advancedTexture.addControl(hclText)
      hclText.linkWithMesh(hclBottle)

      const coohText = new GUI.TextBlock()
      coohText.text = '醋酸溶液'
      advancedTexture.addControl(coohText)
      coohText.linkWithMesh(coohBottle)

      const naohText = new GUI.TextBlock()
      naohText.text = '氢氧化钠溶液'
      advancedTexture.addControl(naohText)
      naohText.linkWithMesh(naohBottle)

      const nahcoText = new GUI.TextBlock()
      nahcoText.text = '碳酸氢钠溶液'
      advancedTexture.addControl(nahcoText)
      nahcoText.linkWithMesh(nahcoBottle)

      formatText([purText, pheText, hclText, coohText, naohText, nahcoText])

      // // 模拟液滴
      const liquidSphere = BABYLON.MeshBuilder.CreateSphere(
        'liquidSphere',
        { diameter: 0.4, segments: 32 },
        scene
      )
      liquidSphere.visibility = 0
      liquidSphere.material = materials.matDropperLiquid

      defaultOperations(scene, { purText, pheText })

      resolve()
    })
  })
}
