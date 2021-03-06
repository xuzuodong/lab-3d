import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import xbot from './meshes/Xbot.glb'

export default (scene) => {
    return new Promise((resolve) => {
        // 场景在这里初始化
        // const scene = new BABYLON.Scene(engine)
        // scene.clearColor = new BABYLON.Color3(240 / 255, 240 / 255, 240 / 255)
        scene.createDefaultCamera(true, true, true)

        Promise.all([
            BABYLON.SceneLoader.ImportMeshAsync('', xbot, '', scene, undefined, '.glb')
        ]).then(function (newMeshes) {

            const role = BABYLON.MeshBuilder.CreateBox("box", { depth: 10, height: 0.01, width: 0.01 }, scene);
            role.position = new BABYLON.Vector3(0, 1.15, -5.0);
            const box = BABYLON.MeshBuilder.CreateBox("boxx", { depth: 1.2, height: 2, width: 4.5 }, scene);
            box.position = new BABYLON.Vector3(0, 1, -10);
            const fakebox = BABYLON.MeshBuilder.CreateBox("box", { depth: 0.001, height: 0.001, width: 0.001 }, scene);
            fakebox.position = new BABYLON.Vector3(0, 1, 0);

            // 添加一个相机，并绑定鼠标事件
            const alpha = Math.PI / 4;
            const beta = Math.PI / 3;
            const distance = 13;
            const mainCamera = new BABYLON.ArcRotateCamera("mainCamera", alpha, beta, distance, new BABYLON.Vector3(0, 10, 0), scene);
            mainCamera.attachControl(true);
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
            }, scene);
            road.position = new BABYLON.Vector3(0, 0, 0);
            road.material = mat;
            road.receiveShadows = true;

            let idleAnim = scene.animationGroups.find(a => a.name === 'idle');
            let idleParam = { name: "Idle", anim: idleAnim, weight: 1 };
            let currentParam
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
        })
        resolve()
    })
}