import * as BABYLON from '@babylonjs/core/Legacy/legacy'
// import * as GUI from '@babylonjs/gui'
import xbot from './meshes/Xbot.glb'

export default function(canvas, engine) {
    // 创建一个场景scene
    const scene = new BABYLON.Scene(engine)
        // scene.clearColor = new BABYLON.Color3(240 / 255, 240 / 255, 240 / 255)
    scene.createDefaultCamera(true, true, true)

    Promise.all([
        BABYLON.SceneLoader.ImportMeshAsync('', xbot, '', scene, undefined, '.glb')
    ]).then(function(newMeshes) {

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
        }, scene);
        road.position = new BABYLON.Vector3(0, 0, 0);
        road.material = mat;
        road.receiveShadows = true;
    })
    return scene
}