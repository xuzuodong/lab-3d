import * as GUI from '@babylonjs/gui'
import * as BABYLON from '@babylonjs/core/Legacy/legacy'

import tube from './meshes/tube.glb'
import purbottle from './meshes/purbottle.glb'
import phebottle from './meshes/phebottle.glb'
import bottle from './meshes/bottle.glb'

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
      BABYLON.SceneLoader.ImportMeshAsync('', phebottle, '', scene, undefined, '.glb'),
      BABYLON.SceneLoader.ImportMeshAsync('', bottle, '', scene, undefined, '.glb'),
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
        matPhesolution: scene.getMaterialByName('matPhesolution'),
        matBrownGlass: scene.getMaterialByName('matBrownGlass'),
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

      const hclMeshes = []
      hclMeshes.push(scene.getTransformNodeByName('hclDropper'))
      hclMeshes.push(scene.getMeshByName('hclLiquid'))
      hclMeshes.push(scene.getMeshByName('hclBottle'))
      hclMeshes.push(scene.getMeshByName('hclSolution'))

      const cloneBottle = (name) => {
        return [
          hclMeshes[0].clone(name + 'Dropper'),
          hclMeshes[1].clone(name + 'Liquid'),
          hclMeshes[2].clone(name + 'Bottle'),
          hclMeshes[3].clone(name + 'Solution'),
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
        let pivotAt = new BABYLON.Vector3(0, bottom_liquid.getBoundingInfo().boundingBox.maximumWorld.y, 0)
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
        purSolution.visibility = 0
        purLiquid.visibility = 0
        purBottle.visibility = 0
        purDropper.getChildMeshes()[0].visibility = 0
        purDropper.getChildMeshes()[1].visibility = 0
        purBottle.isPickable = false //  设置不能被选取，隐藏的物体默认还是会相应鼠标事件；设置此属性以实现真正的隐藏
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
      pheSolution.visibility = 0
      pheBottle.visibility = 0
      pheLiquid.visibility = 0
      pheDropper.getChildMeshes()[0].visibility = 0
      pheDropper.getChildMeshes()[1].visibility = 0
      pheBottle.isPickable = false
      pheDropper.position = new BABYLON.Vector3(15, 0, 80)
      pheLiquid.position = new BABYLON.Vector3(15, 0, 80)
      pheBottle.position = new BABYLON.Vector3(15, 0, 80)
      pheSolution.position = new BABYLON.Vector3(15, 0, 80)
      pheSolution.material = materials.matPhesolution
      pheBottle.material = materials.matGlass
      pheDropper.getChildMeshes()[0].material = materials.matGlass

      // // 设置稀盐酸溶液的参数
      let hclDropper = hclMeshes[0]
      let hclLiquid = hclMeshes[1]
      let hclBottle = hclMeshes[2]
      let hclSolution = hclMeshes[3]
      hclDropper.parent = null
      hclLiquid.parent = null
      hclBottle.parent = null
      hclSolution.parent = null
      hclDropper.position = new BABYLON.Vector3(-120, 0, 80)
      hclLiquid.position = new BABYLON.Vector3(-120, 0, 80)
      hclBottle.position = new BABYLON.Vector3(-120, 0, 80)
      hclSolution.position = new BABYLON.Vector3(-120, 0, 80)
      hclSolution.material = materials.matPhesolution
      hclBottle.material = materials.matGlass
      hclDropper.getChildMeshes()[0].material = materials.matGlass

      let hnoDropper, hnoLiquid, hnoBottle, hnoSolution
      const hnoMeshes = ([hnoDropper, hnoLiquid, hnoBottle, hnoSolution] = cloneBottle('hno'))
      changeMeshPosition(hnoMeshes, new BABYLON.Vector3(-90, 0, 80))
      hnoDropper.getChildMeshes()[0].material = materials.matBrownGlass
      hnoBottle.material = materials.matBrownGlass

      let naohDropper, naohLiquid, naohBottle, naohSolution
      const naohMeshes = ([naohDropper, naohLiquid, naohBottle, naohSolution] = cloneBottle('naoh'))
      changeMeshPosition(naohMeshes, new BABYLON.Vector3(90, 0, 80))

      let baohDropper, baohLiquid, baohBottle, baohSolution
      const baohMeshes = ([baohDropper, baohLiquid, baohBottle, baohSolution] = cloneBottle('baoh'))
      changeMeshPosition(baohMeshes, new BABYLON.Vector3(120, 0, 80))

      // // 添加阴影
      let directionalLight = scene.getLightByName('shadowControlLight')
      const shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight)
      shadowGenerator.addShadowCaster(main_liquid)
      shadowGenerator.addShadowCaster(hclBottle)
      shadowGenerator.addShadowCaster(hnoBottle)
      shadowGenerator.addShadowCaster(naohBottle)
      shadowGenerator.addShadowCaster(baohBottle)
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

      const hnoText = new GUI.TextBlock()
      hnoText.text = '稀硝酸'
      advancedTexture.addControl(hnoText)
      hnoText.linkWithMesh(hnoBottle)

      const naohText = new GUI.TextBlock()
      naohText.text = '氢氧化钠溶液'
      advancedTexture.addControl(naohText)
      naohText.linkWithMesh(naohBottle)

      const baohText = new GUI.TextBlock()
      baohText.text = '氢氧化钡溶液'
      advancedTexture.addControl(baohText)
      baohText.linkWithMesh(baohBottle)

      formatText([purText, pheText, hclText, hnoText, naohText, baohText])

      // // 模拟液滴
      const liquidSphere = BABYLON.MeshBuilder.CreateSphere(
        'liquidSphere',
        { diameter: 0.4, segments: 32 },
        scene
      )
      liquidSphere.visibility = 0
      liquidSphere.material = materials.matDropperLiquid

      defaultOperations(scene, { purText, pheText })

      // 由于无法取到阴影生成器，故采用添加监听的方法解决（牺牲了一部分性能），场景渲染好之后启动
      // 等到指示剂的试剂瓶完全出现之后，就加上阴影，然后就销毁该监听
      scene.onAfterRenderObservable.add(() => {
        if (purBottle.visibility === 1) {
          shadowGenerator.addShadowCaster(purBottle)
          shadowGenerator.addShadowCaster(pheBottle)
          scene.onAfterRenderObservable.clear()
        }
      })

      resolve()
    })
  })
}
