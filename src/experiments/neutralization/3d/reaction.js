import * as BABYLON from '@babylonjs/core/Legacy/legacy'

const standardColor = (dropType, ph) => {
  if (dropType === 'pur') {
    switch (true) {
      case ph <= 5:
        return [1, 0, 0]
      case ph > 5 && ph < 8:
        return [153 / 255, 50 / 255, 204 / 255]
      case ph >= 8:
        return [0, 0, 1]
    }
  }
  if (dropType === 'phe') {
    switch (true) {
      case ph <= 8.2:
        return [1, 1, 1]
      case ph > 8.2 && ph < 10:
        return [1, 100 / 255, 100 / 255]
      case ph >= 10:
        return [1, 0, 0]
    }
  }
}

const getRatio = (liquidGroup, acid1, alkali1) => {
  const acid = liquidGroup.find((p) => p.lqName === acid1)
  const alkali = liquidGroup.find((p) => p.lqName === alkali1)
  return Math.floor((acid.volume / alkali.volume) * 1000) / 1000
}

// 试管中的反应变化（即颜色改变）写在这里，接收三个参数
// 场景scene；试管中的溶液组合；现在滴加的是什么
export const reactions = (scene, liquidGroup, dropType) => {
  let matTubeLiquid = scene.getMaterialByName('matTubeLiquid')
  const acidType = scene.acidType
  const indicatorType = scene.indicatorType

  if (acidType === 'acid_hcl') {
    if (indicatorType === 'pur') {
      if (dropType === 'alkali_naoh') {
        const ratio = getRatio(liquidGroup, acidType, dropType)
        let color = []
        switch (true) {
          case ratio > 1:
            color = [1, 0, 0]
            break
          case ratio === 1:
            color = [153 / 255, 50 / 255, 204 / 255]
            break
          case ratio < 1 && ratio > 0.2:
            color = [ratio * (153 / 255), ratio * (50 / 255), 1 - (51 / 255) * ratio]
            break
          case ratio <= 0.2:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
      if (dropType === 'alkali_nahco3') {
        const ratio = getRatio(liquidGroup, acidType, dropType)
        let color = []
        switch (true) {
          case ratio > 0.5:
            color = [1, 0, 0]
            break
          case ratio === 0.5:
            color = [153 / 255, 50 / 255, 204 / 255]
            break
          case ratio < 0.5 && ratio > 0.125:
            color = [ratio * (153 / 255), ratio * (50 / 255), 1 - (51 / 255) * ratio]
            break
          case ratio <= 0.125:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (indicatorType === 'phe') {
      if (dropType === 'alkali_naoh') {
        const ratio = getRatio(liquidGroup, acidType, dropType)
        let color = []
        switch (true) {
          case ratio >= 1:
            color = [1, 1, 1]
            break
          case ratio < 1 && ratio >= 0.5:
            color = [1, 100 / 255, 100 / 255]
            break
          case ratio < 0.5:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
      if (dropType === 'alkali_nahco3') {
        const ratio = getRatio(liquidGroup, acidType, dropType)
        let color = []
        switch (true) {
          case ratio >= 0.5:
            color = [1, 1, 1]
            break
          case ratio < 0.5 && ratio >= 0.125:
            color = [1, (100 / 255) * ratio, (100 / 255) * ratio]
            break
          case ratio < 0.125:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
  }

  if (acidType === 'acid_ch3cooh') {
    if (indicatorType == 'pur') {
      if (dropType === 'alkali_naoh') {
        const ratio = getRatio(liquidGroup, acidType, dropType)
        let color = []
        switch (true) {
          case ratio >= 2:
            color = [153 / 255, 50 / 255, 204 / 255]
            break
          case ratio < 2 && ratio >= 1.5:
            color = [ratio * (153 / 255), ratio * (50 / 255), 1 - (51 / 255) * ratio]
            break
          case ratio < 1.5:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
      if (dropType === 'alkali_nahco3') {
        const ratio = getRatio(liquidGroup, acidType, dropType)
        let color = []
        switch (true) {
          case ratio >= 1:
            color = [153 / 255, 50 / 255, 204 / 255]
            break
          case ratio < 1 && ratio >= 0.333:
            color = [ratio * (153 / 255), ratio * (50 / 255), 1 - (51 / 255) * ratio]
            break
          case ratio < 0.333:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (indicatorType == 'phe') {
      if (dropType === 'alkali_naoh') {
        const ratio = getRatio(liquidGroup, acidType, dropType)
        let color = []
        switch (true) {
          case ratio >= 2:
            color = [1, 1, 1]
            break
          case ratio < 2 && ratio >= 1.5:
            color = [1, 100 / 255, 100 / 255]
            break
          case ratio < 1.5:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
      if (dropType === 'alkali_nahco3') {
        let color = []
        const ratio = getRatio(liquidGroup, acidType, dropType)
        switch (true) {
          case ratio >= 1:
            color = [1, 1, 1]
            break
          case ratio < 1 && ratio >= 0.5:
            color = [1, 100 / 255, 100 / 255]
            break
          case ratio < 0.5:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
  }

  if (dropType === 'pur') {
    const color = standardColor('pur', 1)
    matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
  }
  if (dropType === 'phe') {
    const color = standardColor('phe', 1)
    matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
  }
}
