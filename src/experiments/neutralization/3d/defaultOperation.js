import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import animationBox from './animationBox'

export const defaultOperations = (
  scene,
  { purBottle, purDropper, pheBottle, pheDropper, purText, pheText }
) => {
  //高光
  const highLight = new BABYLON.HighlightLayer('hl1', scene)

  // 两个检测试剂瓶的鼠标监听事件
  purBottle.actionManager = new BABYLON.ActionManager(scene)
  pheBottle.actionManager = new BABYLON.ActionManager(scene)

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
