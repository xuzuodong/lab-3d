import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import xbot from './meshes/Xbot.glb'
import initGround from '../2d/assets/initGround.png'
import crate from '../2d/assets/crate.png'

export default (scene) => {
    return new Promise((resolve) => {
        // 场景在这里初始化
        scene.clearColor = new BABYLON.Color3(217 / 255, 234 / 255, 244 / 255)
        scene.createDefaultCamera(true, true, true)

        Promise.all([
            BABYLON.SceneLoader.ImportMeshAsync('', xbot, '', scene, undefined, '.glb')
        ]).then(function (newMeshes) {

            //创建材质
            const boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
            boxMaterial.diffuseTexture = new BABYLON.Texture(crate, scene);
            boxMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
            const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
            groundMaterial.diffuseTexture = new BABYLON.Texture(initGround, scene);

            //创建Meshes
            const role = BABYLON.MeshBuilder.CreateBox("role", { depth: 10, height: 0.01, width: 0.01 }, scene);
            role.position = new BABYLON.Vector3(0, 1.15, -5.0);
            const fakebox = BABYLON.MeshBuilder.CreateBox("fakebox", { depth: 0.001, height: 0.001, width: 0.001 }, scene);
            fakebox.position = new BABYLON.Vector3(0, 1, 0);
            const box = BABYLON.MeshBuilder.CreateBox("box", { depth: 1.2, height: 2, width: 4.5 }, scene);
            box.position = new BABYLON.Vector3(0, 1, -10);
            box.material = boxMaterial;

            // 添加一个相机，并绑定鼠标事件
            settingCamera()

            function settingCamera() {
                const mainCamera = new BABYLON.ArcRotateCamera("mainCamera", Math.PI / 2.5, Math.PI / 3, 13, new BABYLON.Vector3(0, 10, 0), scene);
                mainCamera.attachControl(true);
                mainCamera.lowerRadiusLimit = 2;
                mainCamera.upperRadiusLimit = 15;
                mainCamera.upperBetaLimit = (Math.PI / 2) * 0.9;
                mainCamera.wheelDeltaPercentage = 0.01;
                mainCamera.lockedTarget = fakebox;
                scene.activeCameras.push(mainCamera);
            }
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
                light2.position = new BABYLON.Vector3(0, 180, 1800);
                light2.intensity = 0.4;
                const shadowGenerator = new BABYLON.ShadowGenerator(2048, light2);
                shadowGenerator.useBlurExponentialShadowMap = true;
                // shadowGenerator.getShadowMap().renderList.push(role);
                // shadowGenerator.getShadowMap().renderList.push(box);
                // shadowGenerator.addShadowCaster(scene.meshes[0], true);
            }

            const road = BABYLON.MeshBuilder.CreateGround("road", {
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                width: 300,
                height: 1800,
                tileSize: 1800,
                tileWidth: 300
            }, scene);
            road.position = new BABYLON.Vector3(0, 0, 880);
            road.material = groundMaterial;
            road.receiveShadows = true;

            resolve()
        })
    })
}