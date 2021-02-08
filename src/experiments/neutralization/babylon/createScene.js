import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import * as GUI from '@babylonjs/gui'
import tube from './meshes/tube.glb'
import purbottle from './meshes/purbottle.glb'
import phebottle from './meshes/phebottle.glb'
import dropper from './meshes/dropper.glb'
import { defaultOperations } from './defaultOperation'
import { createMaterials } from './materials'

export default function(canvas, engine) {
  // 创建一个场景scene
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color3(240 / 255, 240 / 255, 240 / 255)
  scene.createDefaultCamera(true, true, true)

  Promise.all([
    BABYLON.SceneLoader.ImportMeshAsync('', tube, '', scene, undefined, '.glb'),
    BABYLON.SceneLoader.ImportMeshAsync('', purbottle, '', scene, undefined, '.glb'),
    BABYLON.SceneLoader.ImportMeshAsync('', phebottle, '', scene, undefined, '.glb'),
    BABYLON.SceneLoader.ImportMeshAsync('', dropper, '', scene, undefined, '.glb')
  ]).then(function() {
    const tubeMesh = []
    tubeMesh.push(scene.getMeshByName('tube'))
    tubeMesh.push(scene.getMeshByName('bottom_liquid'))
    tubeMesh.push(scene.getMeshByName('main_liquid'))

    const purbottleMesh = []
    purbottleMesh.push(scene.getTransformNodeByName('purdropper'))
    purbottleMesh.push(scene.getMeshByName('purliquid'))
    purbottleMesh.push(scene.getMeshByName('purbottle'))
    purbottleMesh.push(scene.getMeshByName('pursolution'))

    const phebottleMesh = []
    phebottleMesh.push(scene.getTransformNodeByName('phedropper'))
    phebottleMesh.push(scene.getMeshByName('pheliquid'))
    phebottleMesh.push(scene.getMeshByName('phebottle'))
    phebottleMesh.push(scene.getMeshByName('phesolution'))

    const dropperMesh = []
    dropperMesh.push(scene.getTransformNodeByName('dropper'))
    dropperMesh.push(scene.getMeshByName('dropliquid'))

    // 停止模型自带动画
    const myan = scene.animationGroups.find(a => a.name === 'All Animations')
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

    // 添加一个相机，并绑定鼠标事件
    const camera = scene.activeCamera
    settingCamera()
    function settingCamera() {
      camera.beta = Math.PI / 3
      camera.alpha = -Math.PI / 2
      camera.setTarget(new BABYLON.Vector3(0, 10, 0))
      camera.radius = 150
      camera.lowerBetaLimit = (Math.PI / 2) * 0.02
      camera.upperBetaLimit = (Math.PI / 2) * 0.85
      camera.lowerRadiusLimit = 20
      camera.upperRadiusLimit = 250
      camera.panningSensibility = 1
      camera.wheelPrecision = 3
      camera.useBouncingBehavior = true
      camera.useFramingBehavior = true
    }

    // 添加一组灯光到场景
    settingLight()
    function settingLight() {
      const light1 = new BABYLON.HemisphericLight(
        'HemisphericLight',
        new BABYLON.Vector3(150, -500, 0),
        scene
      )
      const light2 = new BABYLON.HemisphericLight(
        'HemisphericLight2',
        new BABYLON.Vector3(100, 500, 0),
        scene
      )
      const shadowLight = new BABYLON.DirectionalLight(
        'shadowControlLight',
        new BABYLON.Vector3(100, -100, 0),
        scene
      )
      shadowLight.position = new BABYLON.Vector3(-80, 80, 0)
      light1.intensity = 0.6
      light2.intensity = 0.6
      shadowLight.intensity = 0.7
    }

    // 添加一个地面
    settingGround()
    function settingGround() {
      const ground = BABYLON.MeshBuilder.CreateGround('myGround', { width: 500, height: 500 }, scene)
      ground.material = materials.matGround
      ground.receiveShadows = true
    }

    // 定义试管中溶液增减动画的函数
    BABYLON.Mesh.prototype.originalScale = function(pivotPoint, t) {
      let _sy = (this.scaling.y + t / 10) / this.scaling.y
      this.scaling.y = this.scaling.y + t / 10
      this.position.y = pivotPoint.y + _sy * (this.position.y - pivotPoint.y)
    }

    // 设置试管参数
    let tube = tubeMesh[0]
    let bottom_liquid = tubeMesh[1]
    let main_liquid = tubeMesh[2]
    modifyTubeMeshes()
    function modifyTubeMeshes() {
      tube.parent = null
      bottom_liquid.parent = null
      main_liquid.parent = null

      let pivotAt = new BABYLON.Vector3(0, main_liquid.getBoundingInfo().boundingBox.vectorsWorld[0].y, 0)
      main_liquid.originalScale(pivotAt, -2.7)
      main_liquid.visibility = 0
      bottom_liquid.visibility = 0

      tube.material = materials.matTube
      bottom_liquid.material = materials.matTubeLiquid
      main_liquid.material = materials.matTubeLiquid
    }

    // 设置紫色石蕊试剂参数
    let purDropper = purbottleMesh[0]
    let purLiquid = purbottleMesh[1]
    let purBottle = purbottleMesh[2]
    let purSolution = purbottleMesh[3]
    modifyPurbottlMeshes()
    function modifyPurbottlMeshes() {
      purDropper.parent = null
      purLiquid.parent = null
      purBottle.parent = null
      purSolution.parent = null

      purDropper.position = new BABYLON.Vector3(80, 0, 80)
      purLiquid.position = new BABYLON.Vector3(80, 0, 80)
      purBottle.position = new BABYLON.Vector3(80, 0, 80)
      purSolution.position = new BABYLON.Vector3(80, 0, 80)

      purSolution.material = materials.matPursolution
      purLiquid.material = materials.matPursolution
      purBottle.material = materials.matGlass
      purDropper.getChildMeshes()[0].material = materials.matGlass
    }

    // 设置无色酚酞试剂参数
    let pheDropper = phebottleMesh[0]
    let pheLiquid = phebottleMesh[1]
    let pheBottle = phebottleMesh[2]
    let pheSolution = phebottleMesh[3]
    modifyPhebottleMeshes()
    function modifyPhebottleMeshes() {
      pheDropper.parent = null
      pheLiquid.parent = null
      pheBottle.parent = null
      pheSolution.parent = null

      pheDropper.position = new BABYLON.Vector3(110, 0, 80)
      pheLiquid.position = new BABYLON.Vector3(110, 0, 80)
      pheBottle.position = new BABYLON.Vector3(110, 0, 80)
      pheSolution.position = new BABYLON.Vector3(110, 0, 80)

      pheSolution.material = materials.matPhesolution
      pheBottle.material = materials.matGlass
      pheDropper.getChildMeshes()[0].material = materials.matGlass
    }

    // 设置添加溶液的滴管参数
    let dropper = dropperMesh[0]
    let dropliquid = dropperMesh[1]
    modifyDropperMeshes()
    function modifyDropperMeshes() {
      dropper.parent = null
      dropliquid.parent = null

      dropper.position = new BABYLON.Vector3(0, 50, 0)
      dropliquid.position = new BABYLON.Vector3(0, 50, 0)

      dropliquid.visibility = 0
      dropper.getChildMeshes()[0].visibility = 0
      dropper.getChildMeshes()[1].visibility = 0

      dropper.getChildMeshes()[0].material = materials.matGlass
      dropliquid.material = materials.matDropperLiquid
    }

    // 添加阴影
    settingShadow()
    function settingShadow() {
      let directionalLight = scene.getLightByName('shadowControlLight')
      const shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight)
      shadowGenerator.addShadowCaster(main_liquid)
      shadowGenerator.addShadowCaster(purBottle)
      shadowGenerator.addShadowCaster(pheBottle)
      shadowGenerator.useExponentialShadowMap = true
      shadowGenerator.setTransparencyShadow(true)
      shadowGenerator.setDarkness(0.36) //阴影灰度，0为全黑，1为无阴影
      shadowGenerator.useBlurExponentialShadowMap = true
      shadowGenerator.useKernelBlur = true
      shadowGenerator.blurKernel = 150
    }

    const advancedTexture = new GUI.AdvancedDynamicTexture.CreateFullscreenUI('uiContainer')

    // 试剂瓶上的提示，动画暂未添加
    const purText = new GUI.TextBlock()
    purText.text = '紫色石蕊试剂'
    purText.resizeToFit = true
    purText.color = 'balck'
    purText.fontSize = 20
    advancedTexture.addControl(purText)
    purText.linkWithMesh(purBottle)
    purText.linkOffsetY = 50
    purText.alpha = 0

    const pheText = new GUI.TextBlock()
    pheText.text = '酚酞试剂'
    pheText.resizeToFit = true
    pheText.color = 'balck'
    pheText.fontSize = 20
    advancedTexture.addControl(pheText)
    pheText.linkWithMesh(pheBottle)
    pheText.linkOffsetY = 50
    pheText.alpha = 0

    // 模拟液滴
    const liquidSphere = BABYLON.MeshBuilder.CreateSphere(
      'liquidSphere',
      { diameter: 0.4, segments: 32 },
      scene
    )
    liquidSphere.visibility = 0
    liquidSphere.material = materials.matDropperLiquid

    defaultOperations(scene, {
      purBottle,
      purDropper,
      pheBottle,
      pheDropper,
      purText,
      pheText
    })
  })

  return scene
}