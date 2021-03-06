import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import scene from './initScene'

let idleParam = scene.idleParam
let idleAnim = scene.idleAnim
let walkParam = scene.walkParam
let walkAnim = scene.walkAnim
let runParam = scene.runParam
let runAnim = scene.runAnim
let currentParam = idleParam
let onBeforeAnimation = scene.onBeforeAnimation

export default {
  changeGround(ground) {
    return new Promise((resolve) => {
      // if (ground == "") {
      //     mat.diffuseColor = new BABYLON.Color3(100 / 255, 100 / 255, 100 / 255)
      // }
      scene.mat.diffuseTexture = new BABYLON.Texture(ground, scene)
      scene.road.material = scene.mat
      resolve()
    })
  },
  runStart() {
    // return new Promise((resolve) => {
      if (currentParam === runParam) {
        return;
      }
      if (currentParam) {
        runParam.anim.syncAllAnimationsWith(null);
        currentParam.anim.syncAllAnimationsWith(runParam.anim.animatables[0]);
      }
      scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
      currentParam = runParam;
      scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
    //   resolve()
    // })
  },
  runStop() {
    if (currentParam === idleParam) {
      return;
    }
    scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
    currentParam = idleParam;
    scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
  },

  grassRun(time) {
    this.runStart();
    setTimeout(() => {
      this.runStop();
    }, time);
  },

  iceRun(animationkey) {
    const role = scene.meshes[3]
    const box = scene.meshes[4]
    const fakebox = scene.meshes[5]
    const xbot = [scene.getMeshByID('__root__')];
    const animation1 = new BABYLON.Animation("tutoAnimation",
      "position.z",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    let an1keys = [];
    for (let i = 0; i < 13; i++) {
      an1keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2
      })
    }
    for (let i = 36; i < 49; i++) {
      an1keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2 - (i - 24) * (i - 24) * animationkey
      })
    }
    animation1.setKeys(an1keys);

    const animation2 = new BABYLON.Animation("tutoAnimation",
      "position.z",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    let an2keys = [];
    for (let i = 0; i < 13; i++) {
      an2keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2 - 5
      })
    }
    for (let i = 36; i < 49; i++) {
      an2keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2 - (i - 24) * (i - 24) * animationkey - 5
      })
    }
    animation2.setKeys(an2keys);

    const animation3 = new BABYLON.Animation("tutoAnimation",
      "position.z",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    let an3keys = [];
    for (let i = 0; i < 13; i++) {
      an3keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2 - 10
      })
    }
    for (let i = 36; i < 49; i++) {
      an3keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2 - (i - 24) * (i - 24) * animationkey - 10
      })
    }
    animation3.setKeys(an3keys);

    let animationGroup1 = new BABYLON.AnimationGroup("my group");
    animationGroup1.addTargetedAnimation(animation1, xbot);
    animationGroup1.addTargetedAnimation(animation1, fakebox);
    animationGroup1.addTargetedAnimation(animation2, role);
    animationGroup1.addTargetedAnimation(animation3, box);
    this.grassRun(6000);
    animationGroup1.play(true);
  },

  woodRun(animationkey) {
    this.iceRun(animationkey)
  },

  changeArea() {
    const box = scene.getMeshByName('boxx')
    box.rotation.z = Math.PI / 2;
    box.rotation.x = Math.PI;
    box.position.y = 2.25
  },

  smallArea() {
    const box = scene.getMeshByName('boxx')
    box.rotation.z = Math.PI / 2;
    box.position.y = 2.25
  },
  largeArea() {
    const box = scene.getMeshByName('boxx')
    box.rotation.x = Math.PI / 2;
    box.position.y = 0.6
  },
  massChange(tools) {
    this['this.tools'] = tools
    this.showSlider = true
    if (this.confirm == true) {
      tools.goto({ paragraph: '轻松拉货' })
      this.showSlider = false
      this.confirm = false
    }
  },
  getGravity(gravityData) {
    this.confirm = true
    this.gravity = gravityData
    this.massChange(this['this.tools'])
  },
}