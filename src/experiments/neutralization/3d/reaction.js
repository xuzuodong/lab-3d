import * as BABYLON from '@babylonjs/core/Legacy/legacy'

// 滴入指示剂是判断标准色，如果试管为空，参数ph默认值为-1，不传参则默认返回原色
const standardColor = (dropType, ph = -1) => {
  if (dropType === 'pur') {
    switch (true) {
      case ph >= 0 && ph <= 5:
        return [1, 0, 0]
      case ph > 5 && ph < 8:
        return [153 / 255, 50 / 255, 204 / 255]
      case ph >= 8:
        return [0, 0, 1]
      case ph === -1:
        return [160 / 255, 32 / 255, 240 / 255]
    }
  }
  if (dropType === 'phe') {
    switch (true) {
      case ph >= 0 && ph <= 8.2:
        return [1, 1, 1]
      case ph > 8.2 && ph < 10:
        return [1, 100 / 255, 100 / 255]
      case ph >= 10:
        return [1, 0, 0]
      case ph === -1:
        return [1, 1, 1]
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
  const matTubeLiquid = scene.getMaterialByName('matTubeLiquid')
  const acidType = scene.acidType
  const indicatorType = scene.indicatorType
  let liquidAnalysis = { acid: 0, alkali: 0, indicatorType: '' }
  let ratio = 0

  liquidGroup.forEach((element) => {
    switch (element.lqName) {
      case 'acid_hcl':
        liquidAnalysis.acid += element.volume
        break
      case 'acid_ch3cooh':
        liquidAnalysis.acid += 0.1 * element.volume
        break
      case 'alkali_naoh':
        liquidAnalysis.alkali += element.volume
        break
      case 'alkali_nahco3':
        liquidAnalysis.alkali += 0.01 * element.volume
        break
      case 'pur':
        liquidAnalysis.indicatorType = 'pur'
        break
      case 'phe':
        liquidAnalysis.indicatorType = 'phe'
        break
    }
  })

  if (liquidAnalysis.acid != 0 && liquidAnalysis.alkali != 0) {
    ratio = Math.floor((liquidAnalysis.acid / liquidAnalysis.alkali) * 1000) / 1000
  }

  if (liquidAnalysis.indicatorType === 'pur') {
    if (dropType === 'acid_hcl') {
      if (ratio === 0) {
        // 因为加的是酸溶液，若ratio为0，则里面肯定没有碱溶液;不管是不是酸混合，石蕊显的色都是红色
        const color = standardColor('pur', 1)
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      } else {
        let color = []
        switch (true) {
          case ratio < 0.8:
            color = [0, 0, 1]
            break
          case ratio >= 0.8 && ratio <= 1.25:
            color = [153 / 255, 50 / 255, 204 / 255]
            break
          case ratio > 1.25:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (dropType === 'acid_ch3cooh') {
      if (ratio === 0) {
        const color = standardColor('pur', 1)
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      } else {
        let color = []
        switch (true) {
          case ratio < 0.8:
            color = [0, 0, 1]
            break
          case ratio >= 0.8 && ratio <= 1.25:
            color = [153 / 255, 50 / 255, 204 / 255]
            break
          case ratio > 1.25:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (dropType === 'alkali_naoh') {
      if (ratio === 0) {
        const color = standardColor('pur', 13)
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      } else {
        let color = []
        switch (true) {
          case ratio > 1.25:
            color = [1, 0, 0]
            break
          case ratio >= 0.8 && ratio <= 1.25:
            color = [153 / 255, 50 / 255, 204 / 255]
            break
          case ratio < 0.8:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (dropType === 'alkali_nahco3') {
      if (ratio === 0) {
        const color = standardColor('pur', 13)
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
      let color = []
      switch (true) {
        case ratio > 1.25:
          color = [1, 0, 0]
          break
        case ratio >= 0.8 && ratio <= 1.25:
          color = [153 / 255, 50 / 255, 204 / 255]
          break
        case ratio < 0.8:
          color = [0, 0, 1]
          break
      }
      matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
    }
    if (dropType === 'pur') {
      if (ratio === 0) {
        if (liquidAnalysis.acid != 0) {
          const color = standardColor('pur', 1)
          matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
        }
        if (liquidAnalysis.alkali != 0) {
          const color = standardColor('pur', 13)
          matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
        }
      } else {
        let color = []
        switch (true) {
          case ratio > 1.25:
            color = [0, 0, 1]
            break
          case ratio >= 0.8 && ratio <= 1.25:
            color = [153 / 255, 50 / 255, 204 / 255]
            break
          case ratio < 0.8:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    //if (dropType === 'phe') {
    //}
  }

  /*if (liquidAnalysis.indicatorType === 'phe') {
    if (dropType === 'acid_hcl') {
    }
    if (dropType === 'acid_ch3cooh') {
    }
    if (dropType === 'alkali_naoh') {
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
    if (dropType === 'pur') {
    }
    if (dropType === 'phe') {
    }
  }

  if (liquidAnalysis.indicatorType === '') {
  }*/



  
  /*if (acidType === 'acid_hcl') {
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
  }*/

  // if (dropType === 'pur') {
  //   const color = standardColor('pur', 1)
  //   matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
  // }
  // if (dropType === 'phe') {
  //   const color = standardColor('phe', 1)
  //   matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
  // }
}
