import * as BABYLON from '@babylonjs/core/Legacy/legacy'

export const defaultOperations = (scene, { purText, pheText }) => {
  // 定义需要添加动作的物体
  const hclBottle = scene.getMeshByName('hclBottle')
  const hclDropper = scene.getTransformNodeByName('hclDropper')
  const hnoBottle = scene.getMeshByName('hnoBottle')
  const hnoDropper = scene.getTransformNodeByName('hnoDropper')
  const naohBottle = scene.getMeshByName('naohBottle')
  const naohDropper = scene.getTransformNodeByName('naohDropper')
  const baohBottle = scene.getMeshByName('baohBottle')
  const baohDropper = scene.getTransformNodeByName('baohDropper')
  const purBottle = scene.getMeshByName('purbottle')
  const purDropper = scene.getTransformNodeByName('purdropper')
  const pheBottle = scene.getMeshByName('phebottle')
  const pheDropper = scene.getTransformNodeByName('phedropper')

  //高光
  const highLight = new BABYLON.HighlightLayer('hl1', scene)

  // 创建试剂瓶的鼠标监听事件
  hclBottle.actionManager = new BABYLON.ActionManager(scene)
  hnoBottle.actionManager = new BABYLON.ActionManager(scene)
  naohBottle.actionManager = new BABYLON.ActionManager(scene)
  baohBottle.actionManager = new BABYLON.ActionManager(scene)
  purBottle.actionManager = new BABYLON.ActionManager(scene)
  pheBottle.actionManager = new BABYLON.ActionManager(scene)

  const meshHover = (bottle, dropper) => {
    bottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
        highLight.addMesh(bottle, BABYLON.Color3.Magenta())
        highLight.addMesh(dropper.getChildMeshes()[0], BABYLON.Color3.Magenta())
        highLight.addMesh(dropper.getChildMeshes()[1], BABYLON.Color3.Magenta())
      })
    )
    bottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
        highLight.removeMesh(bottle)
        highLight.removeMesh(dropper.getChildMeshes()[0])
        highLight.removeMesh(dropper.getChildMeshes()[1])
      })
    )
  }

  meshHover(hclBottle, hclDropper)
  meshHover(hnoBottle, hnoDropper)
  meshHover(naohBottle, naohDropper)
  meshHover(baohBottle, baohDropper)

  purBottle.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPointerOverTrigger, [
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
        highLight.addMesh(purBottle, BABYLON.Color3.Magenta())
        highLight.addMesh(purDropper.getChildMeshes()[0], BABYLON.Color3.Magenta())
        highLight.addMesh(purDropper.getChildMeshes()[1], BABYLON.Color3.Magenta())
      }),
      new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, purText, 'alpha', 1, 300)
    ])
  )

  purBottle.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPointerOutTrigger, [
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
        highLight.removeMesh(purBottle)
        highLight.removeMesh(purDropper.getChildMeshes()[0])
        highLight.removeMesh(purDropper.getChildMeshes()[1])
      }),
      new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, purText, 'alpha', 0, 300)
    ])
  )

  pheBottle.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPointerOverTrigger, [
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
        highLight.addMesh(pheBottle, BABYLON.Color3.Magenta())
        highLight.addMesh(pheDropper.getChildMeshes()[0], BABYLON.Color3.Magenta())
        highLight.addMesh(pheDropper.getChildMeshes()[1], BABYLON.Color3.Magenta())
      }),
      new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, pheText, 'alpha', 1, 300)
    ])
  )

  pheBottle.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPointerOutTrigger, [
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
        highLight.removeMesh(pheBottle)
        highLight.removeMesh(pheDropper.getChildMeshes()[0])
        highLight.removeMesh(pheDropper.getChildMeshes()[1])
      }),
      new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, pheText, 'alpha', 0, 300)
    ])
  )
}