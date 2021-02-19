import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import { PositionGizmo } from '@babylonjs/core/Legacy/legacy'
import '@babylonjs/loaders/glTF'
import createScene from './babylon/createScene'

export default class BabylonApp {
    constructor(domId) {
        this.canvas = document.getElementById(domId) // 得到canvas对象的引用
        this.engine = new BABYLON.Engine(this.canvas, true) // 初始化 BABYLON 3D engine
        this.scene = createScene(this.canvas, this.engine)

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })

        window.addEventListener('resize', () => {
            this.engine.resize()
        })
    }
    changeGround(ground) {
        let mat = new BABYLON.StandardMaterial("", this.scene)
            // if (ground == "") {
            //     mat.diffuseColor = new BABYLON.Color3(100 / 255, 100 / 255, 100 / 255)
            // }
        mat.diffuseTexture = new BABYLON.Texture(ground, this.scene)
        let road = this.scene.getMeshByName('road')
        road.material = mat
    }
    runStart() {
        let scene = this.scene
        let idleAnim = this.scene.animationGroups.find(a => a.name === 'idle');
        let idleParam = { name: "Idle", anim: idleAnim, weight: 1 };
        let currentParam
        idleAnim.play(true);
        idleAnim.setWeightForAllAnimatables(1);

        let walkAnim = this.scene.animationGroups.find(a => a.name === 'walk');
        let walkParam = { name: "Walk", anim: walkAnim, weight: 0 };
        walkAnim.play(true);
        walkAnim.setWeightForAllAnimatables(0);

        let runAnim = this.scene.animationGroups.find(a => a.name === 'run');
        let runParam = { name: "Run", anim: runAnim, weight: 0 };
        runAnim.play(true);
        runAnim.setWeightForAllAnimatables(0);

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
    }
    runStop() {
        let scene = this.scene
        let idleAnim = this.scene.animationGroups.find(a => a.name === 'idle');
        let idleParam = { name: "Idle", anim: idleAnim, weight: 0 };

        idleAnim.play(true);
        idleAnim.setWeightForAllAnimatables(1);

        let walkAnim = this.scene.animationGroups.find(a => a.name === 'walk');
        let walkParam = { name: "Walk", anim: walkAnim, weight: 0 };
        walkAnim.play(true);
        walkAnim.setWeightForAllAnimatables(0);

        let runAnim = this.scene.animationGroups.find(a => a.name === 'run');
        let runParam = { name: "Run", anim: runAnim, weight: 1 };
        runAnim.play(true);
        runAnim.setWeightForAllAnimatables(0);
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
            if ((currentParam && currentParam.weight === 1) ||
                (idleParam.weight === 0 && walkParam.weight === 0 && runParam.weight === 0)) {
                scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
            }
        }
        if (currentParam === idleParam) {
            return;
        }
        scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
        currentParam = idleParam;
        scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
    }

    grassRun(time) {
        this.runStart();
        setTimeout(() => {
            this.runStop();
        }, time);
    }

    iceRun(animationkey) {
        const role = this.scene.meshes[3]
        const box = this.scene.meshes[4]
        const fakebox = this.scene.meshes[5]
        const xbot = [this.scene.getMeshByID('__root__')];
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
    }

    woodRun(animationkey) {
        this.iceRun(animationkey)
    }

    changeArea() {
        const box = this.scene.getMeshByName('boxx')
        box.rotation.z = Math.PI / 2;
        box.rotation.x = Math.PI;
        box.position.y = 2.25
    }

    smallArea() {
        const box = this.scene.getMeshByName('boxx')
        box.rotation.z = Math.PI / 2;
        box.position.y = 2.25
    }
    largeArea() {
        const box = this.scene.getMeshByName('boxx')
        box.rotation.x = Math.PI / 2;
        box.position.y = 0.6
    }
}