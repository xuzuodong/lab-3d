import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import * as GUI from '@babylonjs/gui'
import xbot from './meshes/Xbot.glb'
import woodjpg from '../../../assets/wood.jpg'
import grasspng from '../../../assets/grass.png'
import icejpg from '../../../assets/ice.jpg'

export default function(canvas, engine) {
    // 创建一个场景scene
    const scene = new BABYLON.Scene(engine)
        // scene.clearColor = new BABYLON.Color3(240 / 255, 240 / 255, 240 / 255)
    scene.createDefaultCamera(true, true, true)

    Promise.all([
        BABYLON.SceneLoader.ImportMeshAsync('', xbot, '', scene, undefined, '.glb')
    ]).then(function(newMeshes) {
        const xbot = [];
        xbot.push(scene.getMeshByID('__root__'));

        function boxdata(dep, hei, wid) {
            return { depth: dep, height: hei, width: wid }
        }

        const role = BABYLON.MeshBuilder.CreateBox("box",
            boxdata(10, 0.01, 0.01),
            scene);
        role.position = new BABYLON.Vector3(0, 1.15, -5.0);
        // { depth: 4.5, height: 2, width: 1.2 }
        const box = BABYLON.MeshBuilder.CreateBox("boxx", { depth: 1.2, height: 2, width: 4.5 }, scene);
        // box.scaling = new BABYLON.Vector3(4.5, 2, 1.2)
        box.position = new BABYLON.Vector3(0, 1, -10);

        const fakebox = BABYLON.MeshBuilder.CreateBox("box",
            boxdata(0.001, 0.001, 0.001),
            scene);
        fakebox.position = new BABYLON.Vector3(0, 1, 0);

        // 添加一个相机，并绑定鼠标事件
        const alpha = Math.PI / 4;
        const beta = Math.PI / 3;
        const distance = 13;

        const mainCamera = new BABYLON.ArcRotateCamera("mainCamera", alpha, beta, distance, new BABYLON.Vector3(0, 10, 0), scene);
        mainCamera.attachControl(canvas, true);
        mainCamera.lowerRadiusLimit = 2;
        mainCamera.upperRadiusLimit = 15;
        mainCamera.wheelDeltaPercentage = 0.01;
        mainCamera.lockedTarget = fakebox;
        scene.activeCameras.push(mainCamera);

        // 添加一组灯光到场景
        settingLight()

        function settingLight() {
            const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.6;
            light.specular = BABYLON.Color3.Black();
        }

        // 阴影
        settingShadow()

        function settingShadow() {
            const light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
            light2.position = new BABYLON.Vector3(0, 50, 50);
            const shadowGenerator = new BABYLON.ShadowGenerator(2048, light2);
            shadowGenerator.useBlurExponentialShadowMap = true;
            shadowGenerator.getShadowMap().renderList.push(role);
            shadowGenerator.getShadowMap().renderList.push(box);
            // shadowGenerator.blurKernel = 16;
            shadowGenerator.addShadowCaster(scene.meshes[0], true);
            for (let i = 0; i < newMeshes.length; i++) {
                newMeshes[i].receiveShadows = false;
            }
        }

        let mat = new BABYLON.StandardMaterial("", scene);
        // mat.diffuseTexture = new BABYLON.Texture(woodjpg, scene);
        mat.diffuseColor = new BABYLON.Color3(100 / 255, 100 / 255, 100 / 255)

        const road = BABYLON.MeshBuilder.CreateGround("road", {
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                width: 100,
                height: 600,
                tileSize: 600,
                tileWidth: 100
            },
            scene);
        road.position = new BABYLON.Vector3(0, 0, 0);
        road.material = mat;
        road.receiveShadows = true;

        // Initialize override animations, turn on idle by default(初始化替代动画，默认情况下启用idle这个动画)
        //idleAnim是定义动画，idleParam是定义参数。如果.play = false就会变成默认的None.
        let idleAnim = scene.animationGroups.find(a => a.name === 'idle');
        let idleParam = { name: "Idle", anim: idleAnim, weight: 1 };
        idleAnim.play(true);
        idleAnim.setWeightForAllAnimatables(1);

        let walkAnim = scene.animationGroups.find(a => a.name === 'walk');
        let walkParam = { name: "Walk", anim: walkAnim, weight: 0 };
        walkAnim.play(true);
        walkAnim.setWeightForAllAnimatables(0);

        let runAnim = scene.animationGroups.find(a => a.name === 'run');
        let runParam = { name: "Run", anim: runAnim, weight: 0 };
        runAnim.play(true);
        runAnim.setWeightForAllAnimatables(0);

        // Initialize additive poses. Slice of reference pose at first frame(初始化附加姿势。 第一帧参考姿势的切片)
        //如果第二个数字比第一个数字大会往后乱动，如果是小则会往前乱动 0.03333333507180214
        // console.log(scene.animationGroups)
        let sadPoseAnim = BABYLON.AnimationGroup.MakeAnimationAdditive(scene.animationGroups.find(a => a.name === 'sad_pose'));
        let sadPoseParam = { name: "Sad Pose", anim: sadPoseAnim, weight: 0 };
        sadPoseAnim.start(true, 1, 0.03333333507180214, 0.03333333507180214);
        // console.log(sadPoseAnim.start);
        let sneakPoseAnim = BABYLON.AnimationGroup.MakeAnimationAdditive(scene.animationGroups.find(a => a.name === 'sneak_pose'));
        let sneakPoseParam = { name: "Sneak Pose", anim: sneakPoseAnim, weight: 0 };
        sneakPoseAnim.start(true, 1, 0.03333333507180214, 0.03333333507180214);

        // Initialize additive animations(初始化附加动画)
        let headShakeAnim = BABYLON.AnimationGroup.MakeAnimationAdditive(scene.animationGroups.find(a => a.name === 'headShake'));
        let headShakeParam = { name: "Head Shake", anim: headShakeAnim, weight: 0 };
        headShakeAnim.play(true);

        let agreeAnim = BABYLON.AnimationGroup.MakeAnimationAdditive(scene.animationGroups.find(a => a.name === 'agree'));
        let agreeParam = { name: "Agree", anim: agreeAnim, weight: 0 };
        agreeAnim.play(true);

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

        // let advancedTexture = new GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        // const UiPanel = new GUI.StackPanel();
        // UiPanel.width = "220px";
        // UiPanel.fontSize = "14px";
        // UiPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        // UiPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        // advancedTexture.addControl(UiPanel);

        // Keep track of the current override animation
        let currentParam = idleParam;

        const animation1 = new BABYLON.Animation("tutoAnimation",
            "position.z",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        // Animation an1keys
        let an1keys = [];

        for (let i = 0; i < 12; i++) {
            an1keys.push({
                frame: i * 10,
                value: (0.1 * i + 0.1) * i / 2
            })
        }

        for (let i = 12; i < 24; i++) {
            an1keys.push({
                frame: i * 10,
                value: (0.1 * i + 0.1) * i / 2 - (i - 11) * (i - 11) * 0.1
            })
        }

        animation1.setKeys(an1keys);

        const animation2 = new BABYLON.Animation("tutoAnimation",
            "position.z",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        let an2keys = [];

        for (let i = 0; i < 12; i++) {
            an2keys.push({
                frame: i * 10,
                value: (0.1 * i + 0.1) * i / 2 - 5
            })
        }

        for (let i = 12; i < 24; i++) {
            an2keys.push({
                frame: i * 10,
                value: (0.1 * i + 0.1) * i / 2 - (i - 11) * (i - 11) * 0.1 - 5
            })
        }

        animation2.setKeys(an2keys);

        const animation3 = new BABYLON.Animation("tutoAnimation",
            "position.z",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        let an3keys = [];

        for (let i = 0; i < 12; i++) {
            an3keys.push({
                frame: i * 10,
                value: (0.1 * i + 0.1) * i / 2 - 10
            })
        }

        for (let i = 12; i < 24; i++) {
            an3keys.push({
                frame: i * 10,
                value: (0.1 * i + 0.1) * i / 2 - (i - 11) * (i - 11) * 0.1 - 10
            })
        }

        animation3.setKeys(an3keys);

        let animationGroup1 = new BABYLON.AnimationGroup("my group");
        animationGroup1.addTargetedAnimation(animation1, xbot);
        animationGroup1.addTargetedAnimation(animation1, fakebox);
        animationGroup1.addTargetedAnimation(animation2, role);
        animationGroup1.addTargetedAnimation(animation3, box);

        let animation4 = new BABYLON.Animation("tutoAnimation",
            "alpha",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT); //CONSTANT animate will stop at the last frame.

        // Animation an1keys
        let an4keys = [];

        an4keys.push({
            frame: 0,
            value: Math.PI / 4
        })

        an4keys.push({
            frame: 120,
            value: Math.PI / 4
        })

        an4keys.push({
            frame: 180,
            value: Math.PI / 2
        })

        an4keys.push({
            frame: 420,
            value: Math.PI / 2
        })

        an4keys.push({
            frame: 480,
            value: Math.PI / 4
        })

        //Adding an1keys to the animation object
        animation4.setKeys(an4keys);

        let animation5 = new BABYLON.Animation("tutoAnimation",
            "distance",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        // Animation an1keys
        let an5keys = [];

        an5keys.push({
            frame: 0,
            value: 6
        })

        an5keys.push({
            frame: 360,
            value: 6
        })

        an5keys.push({
            frame: 420,
            value: 10
        })

        //Adding an1keys to the animation object
        animation5.setKeys(an5keys);

        let animationGroup2 = new BABYLON.AnimationGroup("my group");
        animationGroup2.addTargetedAnimation(animation4, mainCamera);
        animationGroup2.addTargetedAnimation(animation5, mainCamera);

        function styleBut(butname) {
            butname.paddingTop = "10px";
            butname.width = "100px";
            butname.height = "50px";
            butname.color = "white";
            butname.background = "green";
        }

        function noneFunc() {
            // Remove current animation
            currentParam = undefined;
            // Restart animation observer
            scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
            scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
        }

        function idleFunc() {
            // Do nothing if idle is already the current animation
            if (currentParam === idleParam) {
                return;
            }
            // Restart animation observer with idle set to current
            scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
            currentParam = idleParam;
            scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
        }

        function walkFunc() {
            // Do nothing if walk is already the current animation
            if (currentParam === walkParam) {
                return;
            }
            // Synchronize animations
            if (currentParam) {
                walkParam.anim.syncAllAnimationsWith(null);
                currentParam.anim.syncAllAnimationsWith(walkParam.anim.animatables[0]);
            }
            // Restart animation observer with walk set to current
            scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
            currentParam = walkParam;
            scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
        }

        function runFunc() {
            // Do nothing if run is already the current animation
            if (currentParam === runParam) {
                return;
            }
            // Synchronize animations
            if (currentParam) {
                runParam.anim.syncAllAnimationsWith(null);
                currentParam.anim.syncAllAnimationsWith(runParam.anim.animatables[0]);
            }
            // Restart animation observer with run set to current
            scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
            currentParam = runParam;
            scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
        }

        // Button for blending to bind pose
        // let button = GUI.Button.CreateSimpleButton("but0", "None");
        // styleBut(button);
        // button.onPointerDownObservable.add(function() {
        //     noneFunc();
        // });
        // UiPanel.addControl(button);
        // // Button for blending to idle
        // let button1 = GUI.Button.CreateSimpleButton("but1", "Idle");
        // styleBut(button1);
        // button1.onPointerDownObservable.add(function() {
        //     idleFunc();
        // });
        // UiPanel.addControl(button1);
        // // Button for blending to walk
        // let button2 = GUI.Button.CreateSimpleButton("but2", "Walk");
        // styleBut(button2);
        // button2.onPointerDownObservable.add(function() {
        //     walkFunc();
        // });
        // UiPanel.addControl(button2);
        // // Button for blending to run
        // let button3 = GUI.Button.CreateSimpleButton("but3", "Run");
        // styleBut(button3);
        // button3.onPointerDownObservable.add(function() {
        //     runFunc();
        //     animationGroup2.play(true);
        //     animationGroup2.play(false);
        // });
        // UiPanel.addControl(button3);
        // // Button for blending to go on
        // let button4 = GUI.Button.CreateSimpleButton("but4", "Go");
        // styleBut(button4);
        // button4.onPointerDownObservable.add(function() {
        //     runFunc();
        //     animationGroup1.play(true);
        // });
        // UiPanel.addControl(button4);

        // // Create a slider to control the weight of each additive pose/animation
        // let params = [
        //     sadPoseParam,
        //     sneakPoseParam,
        //     headShakeParam,
        //     agreeParam
        // ]
        // params.forEach((param) => {
        //     // 标签
        //     let header = new GUI.TextBlock();
        //     header.text = param.name + ":" + param.weight.toFixed(2);
        //     header.height = "40px";
        //     header.color = "green";
        //     header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        //     header.paddingTop = "10px";
        //     UiPanel.addControl(header);

        //     // Slider
        //     let slider = new GUI.Slider();
        //     slider.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        //     slider.minimum = 0;
        //     slider.maximum = 1;
        //     slider.color = "green";
        //     slider.value = param.anim.weight;
        //     slider.height = "20px";
        //     slider.width = "205px";
        //     UiPanel.addControl(slider);

        //     // Update animation weight value according to slider value
        //     slider.onValueChangedObservable.add((v) => {
        //         param.anim.setWeightForAllAnimatables(v);
        //         param.weight = v;
        //         header.text = param.name + ":" + param.weight.toFixed(2);
        //     })
        //     param.anim._slider = slider;
        //     slider.value = param.weight;
        // });
    })
    return scene
}