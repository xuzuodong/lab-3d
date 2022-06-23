import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import beaker from './meshes/beaker4.glb'
import backgroundGround from '../2d/assets/backgroundGround.png'
import flare from '../2d/assets/flare.png'
import condition from '../2d/conditionData'
import actions from './actions'

export default (scene) => {
    return new Promise((resolve) => {
        // 场景在这里初始化
        condition.liquidVolume = 40
        condition.saltAmount = 0
        condition.dissolvedSaltAmount = 0
        condition.temperature = 20
        condition.maxSolubility = -1
        condition.liquidType = ''
        condition.currentMaxSoluteParticle = 0
        condition.current盐的颗粒系数 = 80
        const backgroundRGB = new BABYLON.Color3(0, 0, 0)
        const backgroundHue = 1.0232558139534902 * condition.temperature + 205.90697674418604
        BABYLON.Color3.HSVtoRGBToRef(backgroundHue, 0.45, 0.3, backgroundRGB);
        scene.clearColor = backgroundRGB
        scene.createDefaultCamera(true, true, true)

        Promise.all([
            BABYLON.SceneLoader.ImportMeshAsync('', beaker, '', scene, undefined, '.glb')
        ]).then(function (newMeshes) {
            const meshes = []
            //console.log(scene.meshes)
            meshes.push(scene.getMeshByName("beaker"))
            meshes.push(scene.getMeshByName("liquid1"))
            meshes.push(scene.getMeshByName("liquid2"))

            //快捷相机的参数调整
            createCameraSystem()
            function createCameraSystem() {
                const camera = scene.activeCamera
                camera.beta = Math.PI / 3
                camera.radius = 155
                camera.target.y += 10
                camera.lowerBetaLimit = (Math.PI / 2) * 0.02
                camera.upperBetaLimit = (Math.PI / 2) * 0.9
                camera.lowerRadiusLimit = 120
                camera.upperRadiusLimit = 210
                camera.attachControl(true)
                camera.panningSensibility = 0
                camera.wheelPrecision = 5
                camera.useAutoRotationBehavior = true
                camera.useBouncingBehavior = true
                camera.targetScreenOffset = new BABYLON.Vector2(0, -10)
                scene.activeCameras.push(camera);
            }

            //灯光系统，其中方向光用来生成阴影，半球光用来照亮整个场景
            createLightSystem()
            function createLightSystem() {
                const light1 = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(150, -500, 0), scene);
                new BABYLON.DirectionalLight("shadowControlLight", new BABYLON.Vector3(10, -10, 0), scene);
                const light2 = new BABYLON.HemisphericLight("HemisphericLight2", new BABYLON.Vector3(-50, 500, -400), scene);
                light2.intensity = 0.8
                light1.intensity = 0.5
                //new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-500, 100, 500), scene);
                // new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0, 100, -100), scene);
                // new BABYLON.DirectionalLight("dir03", new BABYLON.Vector3(0, 100, 500), scene);
                // new BABYLON.DirectionalLight("dir04", new BABYLON.Vector3(500, 100, 0), scene);
                // new BABYLON.DirectionalLight("dir05", new BABYLON.Vector3(0, 100, 0), scene);
            }

            //地面
            createGround()
            function createGround() {
                const ground = BABYLON.MeshBuilder.CreateGround("myGround", { width: 600, height: 600, subdivisions: 4 }, scene);
                const groundMaterial = new BABYLON.BackgroundMaterial("ground", scene);
                groundMaterial.diffuseTexture = new BABYLON.Texture(backgroundGround, scene);
                groundMaterial.diffuseTexture.hasAlpha = true
                groundMaterial.opacityFresnel = true
                groundMaterial.alpha = 0.2
                ground.position.y = -2.05;
                ground.material = groundMaterial;
                ground.receiveShadows = true;
            }

            const beaker = meshes[0]
            const liquid1 = meshes[1]
            const liquid2 = meshes[2]
            //烧杯模型
            modifyMeshes()
            function modifyMeshes() {
                beaker.setParent(null)//官方做法
                liquid1.setParent(null)
                liquid2.setParent(null)
                beaker.material.alpha = 0.1
                //liquid1高度转换为毫升
                const matLiquid1 = new BABYLON.StandardMaterial('matLiquid1', scene);
                matLiquid1.diffuseColor = new BABYLON.Color3(40 / 255, 60 / 255, 1);
                liquid1.material = matLiquid1;
                liquid1.material.alpha = 0.4
                liquid1.scaling.y = condition.liquidVolume * 0.21576919670154812

                const matLiquid2 = new BABYLON.StandardMaterial('matLiquid2', scene);
                matLiquid2.diffuseColor = new BABYLON.Color3(0.96, 0.96, 0.96);
                liquid2.material = matLiquid2;
                liquid2.material.alpha = 0.1
            }

            // 地面下面的倒影层
            createMirrorGround()
            function createMirrorGround() {
                const mirrorGround = BABYLON.MeshBuilder.CreateGround("myGround", { width: 600, height: 600, subdivisions: 4 }, scene);
                mirrorGround.position.y -= 3
                const mirrorMaterial = new BABYLON.BackgroundMaterial("MirrorMat", scene);
                mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 512, scene, true);
                mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);
                mirrorMaterial.reflectionTexture.adaptiveBlurKernel = 128;
                mirrorMaterial.reflectionTexture.renderList = [beaker, liquid1, liquid2];
                mirrorGround.material = mirrorMaterial
            }

            //撒盐控制器
            const saltCreator = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 12 }, scene);
            saltCreator.position.y = 60
            saltCreator.actionManager = new BABYLON.ActionManager(scene);

            let solutionBalance = true
            let hint = {}
            let particleSystem = new BABYLON.ParticleSystem("particles", 20000, scene)
            let isParticleSystemStarted = false
            let isAnimating = false
            let isPush = true
            let isPost = false
            let isPress = false; //isPress = false 表示，目前没有点击撒盐 isPress = true 表示，目前是点击撒盐状态

            //撒盐控制，点击开始撒盐
            saltCreator.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickDownTrigger,
                    function () {
                        if (!isAnimating) {
                            if (condition.maxSolubility != -1) {
                                // hint.createNewHintCell("请先选择烧杯中的溶剂种类")
                                //点击撒盐图标后发生的事情写在这里
                                if (solutionBalance) {
                                    particleSystem.start();
                                    isParticleSystemStarted = true
                                    isAnimating = true;
                                    // isPush = true;
                                    // isPost = true;
                                    console.log("开始撒盐...")
                                }
                            }

                            isPress = true;
                        }
                    }
                )
            );

            //停止撒盐
            saltCreator.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickUpTrigger,
                    function () {
                        isAnimating = false;
                        particleSystem.stop()
                        isPress = false;
                    }
                )
            );
            saltCreator.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickOutTrigger,
                    function () {
                        isAnimating = false;
                        particleSystem.stop()
                        isPress = false;
                    }
                )
            );

            //盐（粒子效果）
            createParticleSystem()
            function createParticleSystem() {
                particleSystem.particleTexture = new BABYLON.Texture(flare, scene);
                particleSystem.emitter = saltCreator;
                // saltCreator.rotation.z = Math.PI//想让发射器向下喷，就得让它倒置，即沿x轴或z轴旋转180°
                particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
                particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
                particleSystem.minSize = 0.55;
                particleSystem.maxSize = 0.82;
                particleSystem.minLifeTime = 8.4;
                particleSystem.maxLifeTime = 8.5;
                particleSystem.emitRate = 150;
                // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
                // particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
                particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
                particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
                // Angular speed, in radians
                particleSystem.minAngularSpeed = 0;
                particleSystem.maxAngularSpeed = Math.PI;
                //速度
                particleSystem.minEmitPower = -5;
                particleSystem.maxEmitPower = -5;
                particleSystem.updateSpeed = 0.02;

                const radius = 0.5;
                const angle = Math.PI / 3;
                particleSystem.createConeEmitter(radius, angle);//圆锥形粒子喷射器
                particleSystem.onDispose = onDisposeParticleSystem
                particleSystem.updateFunction = updateParticles
            }

            function onDisposeParticleSystem() {
                createParticleSystem()
                condition.dissolvedSaltAmount = 0
                actions.updateData()
            }

            function getTopY(mesh) {
                let vectorsWorld = mesh.getBoundingInfo().boundingBox.vectorsWorld
                return vectorsWorld[0].y
            }

            let waterLevel = getTopY(liquid1)
            let currentSolutedParticle = 0
            let currentSoluteSpeed = 1
            let waterBottom = 2

            particleSystem.updateFunction = updateParticles
            function updateParticles(particles) {
                //粒子系统update时要做的事——判断每个存在的粒子，若其y值符合条件就让其继续下落
                //console.log(particles.length)
                //粒子遍历
                for (let index = 0; index < particles.length; index++) {
                    let particle = particles[index];
                    //粒子计数
                    if (particle.position.y < waterLevel) {
                        //saltNumForThisFrame++
                    }
                    //粒子进入水中，开始计时
                    if (particle.position.y >= waterLevel) {
                        particle.age = 0
                    }
                    particle.age += this._scaledUpdateSpeed;
                    //存在了2.5秒以上的粒子才判断是否进行溶解
                    if (particle.age > 2.5) {
                        //当前单位粒子未溶解，且溶液未饱和，必溶解
                        if (currentSolutedParticle < condition.currentMaxSoluteParticle && particle.scale.x != 0) {
                            if (Math.random() < currentSoluteSpeed) {//随机数控制溶解速度
                                particle.scale = { x: 0, y: 0 }
                                currentSolutedParticle++
                            }
                            continue;
                        }
                        //判断溶液是否过饱和，且当前单位粒子已溶解
                        else if (currentSolutedParticle > condition.currentMaxSoluteParticle + 1 && particle.scale.x == 0) {
                            //析出一部分粒子，使溶液正常饱和
                            particle.scale = { x: 1, y: 1 }
                            currentSolutedParticle--
                        }
                    }

                    //粒子移动
                    if (particle.position.y < waterBottom) {
                        continue
                    }
                    particle.age += this._scaledUpdateSpeed;
                    particle.angle += particle.angularSpeed * this._scaledUpdateSpeed;
                    particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
                    particle.position.addInPlace(this._scaledDirection);
                    this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
                    particle.direction.addInPlace(this._scaledGravity);
                }
                condition.dissolvedSaltAmount = currentSolutedParticle / condition.current盐的颗粒系数 //自定义几粒盐为1克
                condition.saltAmount = particles.length / condition.current盐的颗粒系数
                // if (condition.saltAmount) {
                //     actions.updateData("salt")
                // }
                console.log(condition);

            }
            //数据更新
            // actions.updateData()

            resolve()
        })
    })
}