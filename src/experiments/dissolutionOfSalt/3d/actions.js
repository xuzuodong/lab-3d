import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import condition from '../2d/conditionData'
import This from '../2d/this'

export default {
  //先拿到this，存在this.js里，用的时候取This[0]
  getThis(whichThis) {
    This.push(whichThis)
    console.log(This);
  },

  //更新数据
  updateData(whichOne) {
    const backgroundRGB = new BABYLON.Color3(0, 0, 0)
    if (whichOne) {
      if (whichOne == "temperature") {
        updateTemperature()
      } else if (whichOne == "water" || whichOne == "volume") {
        updateVolume()
      } else if (whichOne == "salt") {
        updateSalt()
      }
    } else {
      updateTemperature()
      updateVolume()
      updateSalt()
      updateMaxSolubility()
    }

    //改变场景背景颜色，HSVtoRGBToRef()中，前三个是参数，最后一个是输出。
    function updateTemperature() {
      const backgroundHue = 1.0232558139534902 * condition.temperature + 205.90697674418604
      BABYLON.Color3.HSVtoRGBToRef(backgroundHue, 0.45, 0.3, backgroundRGB);
      This[0].clearColor = backgroundRGB
    }

    function updateVolume() {
      This[0].getMeshByName('liquid1').scaling.y = condition.liquidVolume * 0.21576919670154812
    }

    function updateSalt() {
      //console.log(condition)
      const 质量分数 = ((condition.dissolvedSaltAmount / (condition.dissolvedSaltAmount + condition.liquidVolume)) * 100).toFixed(2)
    }

    function updateMaxSolubility() {
      switch (condition.liquidType) {
        case '水':
          condition.maxSolubility = 35.7118881118881 + 0.00848018648018435 * condition.temperature + 0.000317016317016339 * condition.temperature * condition.temperature
          break;
        case '酒精':
          condition.maxSolubility = 1 + 0.0056842935 * condition.temperature + 0.0004251478 * condition.temperature * condition.temperature
          break;
        case '油':
          condition.maxSolubility = 0.000000001;
          break;
      }
      condition.currentMaxSoluteParticle = (condition.liquidVolume * condition.maxSolubility * 0.01) * condition.current盐的颗粒系数
      console.log(condition.currentMaxSoluteParticle);
    }
  },

  //更改液体的颜色
  liquidType(liquid) {
    let matLiquid1 = This[0].getMaterialByName('matLiquid1')
    condition.liquidType = '水'
    switch (liquid) {
      //初始为case = 0，因current溶液已平衡 = false，（原因请看loop.js）所以其他按钮都没有效果。
      case '选择你想要的溶剂':
        // reset();
        matLiquid1.diffuseColor = new BABYLON.Color3(40 / 255, 60 / 255, 1);
        console.log("未选择");
        break;
      case '水':
        // reset();
        matLiquid1.diffuseColor = new BABYLON.Color3(40 / 255, 60 / 255, 1);
        console.log("水");
        condition.liquidType = '水'
        break;
      case '酒精':
        // reset();
        matLiquid1.diffuseColor = new BABYLON.Color3(1, 1, 1);
        console.log("酒精");
        condition.liquidType = '酒精'
        break;
      case '油':
        // reset();
        matLiquid1.diffuseColor = new BABYLON.Color3(1, 1, 0);
        console.log("油");
        condition.liquidType = '油'
        break;
    }
    this.updateData()
  },

  // reset() {
  //   current杯中已溶解粒子数 = 0
  //   最大溶解度 = -1
  //   isPush = false;
  //   isAnimating = false;
  //   isPost = false;
  //   isSaturated = false;
  //   isParticleSystemStarted = false;
  //   scene.particleSystems[0].dispose()
  //   drawer.clear()
  //   liquid1.scaling.y = originLiquidScaleY //液体还原
  //   condition.temperature = 20 //温度还原
  //   condition.saltAmount = 0
  //   currentUser.manipulateHistory.splice(0, currentUser.manipulateHistory.length);
  //   console.log(currentUser.manipulateHistory);

  //   voiceWarning.pause();
  //   voiceWarning.currentTime = 0;
  //   $("#temperature-warning").css({ display: "none" })
  //   $("#volume-warning").css({ display: "none" })


  //   if (submit2_style.display == "block") {
  //     $("#submit2").css({ display: "none" });
  //   }
  //   document.getElementById("form2").reset();

  //   if (hintID_style.visibility == "hidden") {
  //     $("#hintID").css({ visibility: "visible" });
  //   }
  //   if (finalHint_style.visibility == "visible") {
  //     $("#finalHint").css({ visibility: "hidden" });
  //   }
  //   hint.createNewHintCell("向烧杯中撒盐</br>杯中会有什么变化呢？")
  //   setTimeout(updateData, 50)
  // },

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