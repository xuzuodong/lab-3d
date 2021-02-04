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

// 试管中的反应变化（即颜色改变）写在这里，接收三个参数
// 场景scene；当前试管中的是哪种酸溶液；当前滴加的是什么：碱溶液、石蕊或酚酞；现在滴加了多少
export const reactions = (scene, acidType, dropType, indicaterType, count) => {
  let matTubeLiquid = scene.getMaterialByName('matTubeLiquid')

  if (acidType === 'acid_hcl') {
    if (indicaterType === 'pur') {
      if (dropType === 'alkali_naoh') {
        let color = []
        switch (true) {
          case count === 1:
            color = [204 / 255, 25 / 255, 102 / 255]
            break
          case count === 2:
            color = [102 / 255, 14 / 255, 200 / 255]
            break
          case count === 3:
            color = [50 / 255, 7 / 255, 240 / 255]
            break
          case count >= 4:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
      if (dropType === 'alkali_nahco3') {
        let color = []
        switch (true) {
          case count === 1:
            color = [200 / 255, 10 / 255, 51 / 255]
            break
          case count === 2:
            color = [180 / 255, 30 / 255, 126 / 255]
            break
          case count === 3:
            color = [153 / 255, 50 / 255, 181 / 255]
            break
          case count === 4:
            color = [70 / 255, 25 / 255, 226 / 255]
            break
          case count >= 5:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (indicaterType === 'phe') {
      if (dropType === 'alkali_naoh') {
        let color = []
        switch (true) {
          case count === 1:
            color = [1, 1, 1]
            break
          case count === 2:
            color = [1, 80 / 255, 100 / 255]
            break
          case count === 3:
            color = [1, 50 / 255, 61 / 255]
            break
          case count >= 4:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
      if (dropType === 'alkali_nahco3') {
        let color = []
        switch (true) {
          case count === 1:
            color = [1, 1, 1]
            break
          case count === 2:
            color = [1, 1, 1]
            break
          case count === 3:
            color = [1, 182 / 255, 181 / 255]
            break
          case count === 4:
            color = [1, 100 / 255, 99 / 255]
            break
          case count >= 5:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
  }

  if (acidType === 'acid_ch3cooh') {
    if (indicaterType == 'pur') {
      if (dropType === 'alkali_naoh') {
        let color = []
        switch (true) {
          case count === 1:
            color = [102 / 255, 14 / 255, 200 / 255]
            break
          case count === 2:
            color = [51 / 255, 7 / 255, 226 / 255]
            break
          case count >= 3:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
      if (dropType === 'alkali_nahco3') {
        let color = []
        switch (true) {
          case count === 1:
            color = [220 / 255, 15 / 255, 61 / 255]
            break
          case count === 2:
            color = [160 / 255, 30 / 255, 132 / 255]
            break
          case count === 3:
            color = [81 / 255, 18 / 255, 203 / 255]
            break
          case count === 4:
            color = [42 / 255, 9 / 255, 230 / 255]
            break
          case count >= 5:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (indicaterType == 'phe') {
      if (dropType === 'alkali_naoh') {
        let color = []
        switch (true) {
          case count === 1:
            color = [1, 106 / 255, 98 / 255]
            break
          case count >= 2:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
      if (dropType === 'alkali_nahco3') {
        let color = []
        switch (true) {
          case count === 1:
            color = [1, 1, 1]
            break
          case count === 2:
            color = [1, 1, 1]
            break
          case count === 3:
            color = [1, 108 / 255, 110 / 255]
            break
          case count === 4:
            color = [1, 41 / 255, 42 / 255]
            break
          case count >= 5:
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
