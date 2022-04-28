import * as BABYLON from '@babylonjs/core/Legacy/legacy'

export default {
  changeGround(ground) {
    let groundMaterial = this.getMaterialByName('groundMaterial')
    let road = this.getMeshByName('road')
    return new Promise((resolve) => {
      groundMaterial.diffuseTexture = new BABYLON.Texture(ground, this)
      road.material = groundMaterial
      resolve()
    })
  },
  runStart() {
    let idleAnim = this.getAnimationGroupByName('idle')
    let idleParam = { name: "Idle", anim: idleAnim, weight: 1 };
    idleAnim.play(true);
    idleAnim.setWeightForAllAnimatables(1);
    let walkAnim = this.getAnimationGroupByName('walk')
    let walkParam = { name: "Walk", anim: walkAnim, weight: 0 };
    walkAnim.play(true);
    walkAnim.setWeightForAllAnimatables(0);
    let runAnim = this.getAnimationGroupByName('run')
    let runParam = { name: "Run", anim: runAnim, weight: 0 };
    runAnim.play(true);
    runAnim.setWeightForAllAnimatables(0);
    let currentParam = idleParam
    let scene = this
    //0.01是动画变速的速率，0.05就会很快了已经。
    function onBeforeAnimation() {
      // Increment the weight of the current override animation
      if (currentParam) {
        currentParam.weight = BABYLON.Scalar.Clamp(currentParam.weight + 0.01, 0, 1);
        currentParam.anim.setWeightForAllAnimatables(currentParam.weight);
      }

      // Decrement the weight of all override animations that aren't current
      if (currentParam !== idleParam) {
        idleParam.weight = BABYLON.Scalar.Clamp(idleParam.weight - 0.01, 0, 1);
        idleParam.anim.setWeightForAllAnimatables(idleParam.weight);
      }

      if (currentParam !== walkParam) {
        walkParam.weight = BABYLON.Scalar.Clamp(walkParam.weight - 0.01, 0, 1);
        walkParam.anim.setWeightForAllAnimatables(walkParam.weight);
      }

      if (currentParam !== runParam) {
        runParam.weight = BABYLON.Scalar.Clamp(runParam.weight - 0.01, 0, 1);
        runParam.anim.setWeightForAllAnimatables(runParam.weight);
      }
      // Remove the callback the current animation weight reaches 1 or
      // when all override animations reach 0 when current is undefined
      if ((currentParam && currentParam.weight === 1) ||
        (idleParam.weight === 0 && walkParam.weight === 0 && runParam.weight === 0)) {
        scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
      }
    }
    return new Promise((resolve) => {
      if (currentParam === runParam) {
        return;
      }
      if (currentParam) {
        runParam.anim.syncAllAnimationsWith(null);
        currentParam.anim.syncAllAnimationsWith(runParam.anim.animatables[0]);
      }
      this.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
      currentParam = runParam;
      this.onBeforeAnimationsObservable.add(onBeforeAnimation);
      resolve()
    })
  },
  runStop() {
    let idleAnim = this.getAnimationGroupByName('idle')
    let idleParam = { name: "Idle", anim: idleAnim, weight: 0 };
    idleAnim.play(true);
    idleAnim.setWeightForAllAnimatables(1);
    let walkAnim = this.getAnimationGroupByName('walk')
    let walkParam = { name: "Walk", anim: walkAnim, weight: 0 };
    walkAnim.play(true);
    walkAnim.setWeightForAllAnimatables(0);
    let runAnim = this.getAnimationGroupByName('run')
    let runParam = { name: "Run", anim: runAnim, weight: 1 };
    runAnim.play(true);
    runAnim.setWeightForAllAnimatables(0);
    let scene = this
    let currentParam = runParam
    //0.01是动画变速的速率，0.05就会很快了已经。
    function onBeforeAnimation() {
      // Increment the weight of the current override animation
      if (currentParam) {
        currentParam.weight = BABYLON.Scalar.Clamp(currentParam.weight + 0.01, 0, 1);
        currentParam.anim.setWeightForAllAnimatables(currentParam.weight);
      }

      // Decrement the weight of all override animations that aren't current
      if (currentParam !== idleParam) {
        idleParam.weight = BABYLON.Scalar.Clamp(idleParam.weight - 0.01, 0, 1);
        idleParam.anim.setWeightForAllAnimatables(idleParam.weight);
      }

      if (currentParam !== walkParam) {
        walkParam.weight = BABYLON.Scalar.Clamp(walkParam.weight - 0.01, 0, 1);
        walkParam.anim.setWeightForAllAnimatables(walkParam.weight);
      }

      if (currentParam !== runParam) {
        runParam.weight = BABYLON.Scalar.Clamp(runParam.weight - 0.01, 0, 1);
        runParam.anim.setWeightForAllAnimatables(runParam.weight);
      }
      // Remove the callback the current animation weight reaches 1 or
      // when all override animations reach 0 when current is undefined
      if ((currentParam && currentParam.weight === 1) ||
        (idleParam.weight === 0 && walkParam.weight === 0 && runParam.weight === 0)) {
        scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
      }
    }
    return new Promise((resolve) => {
      if (currentParam === idleParam) {
        return;
      }
      this.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
      currentParam = idleParam;
      this.onBeforeAnimationsObservable.add(onBeforeAnimation);
      resolve()
    })
  },

  grassRun(time) {
    this.runStart();
    setTimeout(() => {
      this.runStop();
    }, time);
  },

  iceRun(animationkey) {
    const box = this.meshes[5]
    const xbot = this.meshes[0]
    const role = this.meshes[3]
    const fakebox = this.meshes[4]
    const animation1 = new BABYLON.Animation("tutoAnimation",
      "position.z",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    let an1keys = [];
    for (let i = 0; i < 13; i++) {
      an1keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2 + fakebox.position.z
      })
    }
    for (let i = 36; i < 49; i++) {
      an1keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2 - (i - 24) * (i - 24) * animationkey + fakebox.position.z
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
        value: (animationkey * i + animationkey) * i / 2 + role.position.z
      })
    }
    for (let i = 36; i < 49; i++) {
      an2keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2 - (i - 24) * (i - 24) * animationkey + role.position.z
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
        value: (animationkey * i + animationkey) * i / 2 + box.position.z
      })
    }
    for (let i = 36; i < 49; i++) {
      an3keys.push({
        frame: i * 10,
        value: (animationkey * i + animationkey) * i / 2 - (i - 24) * (i - 24) * animationkey + box.position.z
      })
    }
    animation3.setKeys(an3keys);

    let animationGroup1 = new BABYLON.AnimationGroup("icerunGroup");
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

  smallArea() {
    const box = this.getMeshByName('box')
    box.rotation.z = Math.PI / 2;
    box.position.y = 2.25
  },
  reSmallArea() {
    const box = this.getMeshByName('box')
    box.rotation.z = Math.PI;
    box.position.y = 1
  },
  largeArea() {
    const box = this.getMeshByName('box')
    box.rotation.x = Math.PI / 2;
    box.position.y = 0.6
  },
  reLargeArea() {
    const box = this.getMeshByName('box')
    box.rotation.x = Math.PI;
    box.position.y = 1
  },

  backToStart() {
    const box = this.meshes[5]
    const xbot = this.meshes[0]
    const role = this.meshes[3]
    const fakebox = this.meshes[4]
    if (xbot.position.z > 1650) {
      box.position = new BABYLON.Vector3(0, 1, -10);
      role.position = new BABYLON.Vector3(0, 1.15, -5.0);
      fakebox.position = new BABYLON.Vector3(0, 1, 0);
      xbot.position = new BABYLON.Vector3(0, 0, 0)
    }
  }
}