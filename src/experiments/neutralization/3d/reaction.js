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

// 试管中的反应变化（即颜色改变）写在这里，接收三个参数
// 场景scene；试管中的溶液组合；现在滴加的是什么
export const reactions = (scene, liquidGroup, dropType) => {
  const matTubeLiquid = scene.getMaterialByName('matTubeLiquid')
  let liquidAnalysis = { acid: 0, alkali: 0, indicatorType: '' }
  let ratio = 0

  // 统计试管中所含酸溶液，碱溶液含量、指示剂类型
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
        liquidAnalysis.alkali += 0.1 * element.volume
        break
      case 'pur':
        liquidAnalysis.indicatorType = 'pur'
        break
      case 'phe':
        liquidAnalysis.indicatorType = 'phe'
        break
    }
  })

  // 计算试管中，酸溶液与碱溶液的比值
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
        if (liquidAnalysis.acid === 0 && liquidAnalysis.alkali === 0) {
          const color = standardColor('pur')
          matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
        }
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
  }

  if (liquidAnalysis.indicatorType === 'phe') {
    if (dropType === 'acid_hcl') {
      if (ratio === 0) {
        const color = standardColor('phe', 1)
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      } else {
        let color = []
        switch (true) {
          case ratio >= 0.8:
            color = [1, 1, 1]
            break
          case ratio > 0.5 && ratio < 0.8:
            color = [1, 100 / 255, 100 / 255]
            break
          case ratio <= 0.5:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (dropType === 'acid_ch3cooh') {
      if (ratio === 0) {
        const color = standardColor('phe', 1)
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      } else {
        let color = []
        switch (true) {
          case ratio >= 0.8:
            color = [1, 1, 1]
            break
          case ratio > 0.5 && ratio < 0.8:
            color = [1, 100 / 255, 100 / 255]
            break
          case ratio <= 0.5:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (dropType === 'alkali_naoh') {
      if (ratio === 0) {
        const color = standardColor('phe', 13)
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      } else {
        let color = []
        switch (true) {
          case ratio >= 0.8:
            color = [1, 1, 1]
            break
          case ratio > 0.5 && ratio < 0.8:
            color = [1, 100 / 255, 100 / 255]
            break
          case ratio <= 0.5:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (dropType === 'alkali_nahco3') {
      if (ratio === 0) {
        const color = standardColor('phe', 13)
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      } else {
        let color = []
        switch (true) {
          case ratio >= 0.8:
            color = [1, 1, 1]
            break
          case ratio > 0.5 && ratio < 0.8:
            color = [1, 100 / 255, 100 / 255]
            break
          case ratio <= 0.5:
            color = [1, 0, 0]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
    if (dropType === 'phe') {
      if (ratio === 0) {
        if (liquidAnalysis.acid != 0) {
          const color = standardColor('phe', 1)
          matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
        }
        if (liquidAnalysis.alkali != 0) {
          const color = standardColor('phe', 13)
          matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
        }
        if (liquidAnalysis.acid === 0 && liquidAnalysis.alkali === 0) {
          const color = standardColor('phe')
          matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
        }
      } else {
        let color = []
        switch (true) {
          case ratio >= 0.8:
            color = [1, 0, 0]
            break
          case ratio > 0.5 && ratio < 0.8:
            color = [153 / 255, 50 / 255, 204 / 255]
            break
          case ratio <= 0.5:
            color = [0, 0, 1]
            break
        }
        matTubeLiquid.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2])
      }
    }
  }
}
