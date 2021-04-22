export const judgeBehavior = (scene, title, choice) => {
  let userChoice = choice.slice(0, 1)
  // 通过溶液组合数列existLiquid中的元素顺序，判断用户实验的一系列操作是否正确
  const matTubeLiquid = scene.getMaterialByName('matTubeLiquid')
  let acidIndex, alkaliIndex, indicatorIndex
  let returnObj = {
    operation: [],
    phenomenon: [],
    conclusion: { name: '', isCorrect: false, correctContent: '' },
  }

  const minNum = (liquidType, num1, num2) => {
    if (num1 === -1 && num2 === -1) {
      if (liquidType == 'acid') {
        returnObj.operation.push({
          name: `${title}-实验操作：滴加酸溶液`,
          content: '没有滴加酸溶液',
          isCorrect: false,
        })
      }
      if (liquidType == 'alkali') {
        returnObj.operation.push({
          name: `${title}-实验操作：滴加碱溶液`,
          content: '没有滴加碱溶液',
          isCorrect: false,
        })
      }
      return -1
    } else if (num1 != -1 && num2 != -1) {
      if (liquidType == 'acid') {
        returnObj.operation.push({
          name: `${title}-实验操作：滴加酸溶液`,
          content: '两种酸溶液混合滴加',
          isCorrect: false,
        })
      }
      if (liquidType == 'alkali') {
        returnObj.operation.push({
          name: `${title}-实验操作：滴加碱溶液`,
          content: '两种碱溶液混合滴加',
          isCorrect: false,
        })
      }
      if (num1 > num2) return num2
      else return num1
    } else {
      if (liquidType == 'acid') {
        returnObj.operation.push({
          name: `${title}-实验操作：滴加酸溶液`,
          content: '正确滴加了一种酸溶液',
          isCorrect: true,
        })
      }
      if (liquidType == 'alkali')
        returnObj.operation.push({
          name: `${title}-实验操作：滴加碱溶液`,
          content: '正确滴加了一种碱溶液',
          isCorrect: true,
        })
      if (liquidType == 'indicator') {
        returnObj.operation.push({
          name: `${title}-实验操作：滴加酸碱指示剂`,
          content: '正确滴加了一种酸碱指示剂',
          isCorrect: true,
        })
      }
      if (num1 === -1) return num2
      if (num2 === -1) return num1
    }
  }

  acidIndex = minNum('acid', scene.existLiquid.indexOf('acid_hcl'), scene.existLiquid.indexOf('acid_hno'))
  alkaliIndex = minNum(
    'alkali',
    scene.existLiquid.indexOf('alkali_naoh'),
    scene.existLiquid.indexOf('alkali_baoh')
  )
  indicatorIndex = minNum('indicator', scene.existLiquid.indexOf('pur'), scene.existLiquid.indexOf('phe'))
  if (
    (indicatorIndex > acidIndex && indicatorIndex < alkaliIndex) ||
    (indicatorIndex > alkaliIndex && indicatorIndex < acidIndex)
  ) {
    returnObj.operation.push({
      name: `${title}-实验操作：溶液滴加顺序`,
      content: '酸溶液、碱溶液、酸碱指示剂滴加顺序正确！',
      isCorrect: true,
    })
  } else {
    returnObj.operation.push({
      name: `${title}-实验操作：溶液滴加顺序`,
      content: '酸溶液、碱溶液、酸碱指示剂滴加顺序错误！',
      isCorrect: false,
    })
  }

  if (acidIndex === -1 || alkaliIndex === -1) {
    if (acidIndex === -1) {
      // 没有加酸溶液
      returnObj.phenomenon.push({
        name: `${title}-实验现象：滴加酸溶液的量`,
        content: '没有滴加酸溶液',
        isCorrect: false,
      })
      returnObj.phenomenon.push({
        name: `${title}-实验现象：滴加碱溶液的量`,
        content: '碱溶液滴加足量',
        isCorrect: true,
      })
      returnObj.phenomenon.push({
        name: `${title}-实验现象：指示剂颜色变化`,
        content: '不能观察到完整的颜色变化',
        isCorrect: false,
      })
      if (scene.indicatorType === 'pur') {
        returnObj.conclusion.name = `${title}-实验结论：紫色石蕊-先碱后酸`
        returnObj.conclusion.correctContent = 'B.石蕊试液先变紫再变红'
        switch (userChoice) {
          case 'B':
            returnObj.conclusion.isCorrect = true
            break
          case 'A':
          case 'C':
          case 'D':
            returnObj.conclusion.isCorrect = false
            break
        }
      }
      if (scene.indicatorType === 'phe') {
        returnObj.conclusion.name = `${title}-实验结论：无色酚酞-先碱后酸`
        returnObj.conclusion.correctContent = 'D.酚酞试液变无色'
        switch (userChoice) {
          case 'D':
            returnObj.conclusion.isCorrect = true
            break
          case 'A':
          case 'B':
          case 'C':
            returnObj.conclusion.isCorrect = false
            break
        }
      }
    }
    if (alkaliIndex === -1) {
      // 没有加碱溶液
      returnObj.phenomenon.push({
        name: `${title}-实验现象：滴加酸溶液的量`,
        content: '酸溶液滴加足量',
        isCorrect: true,
      })
      returnObj.phenomenon.push({
        name: `${title}-实验现象：滴加碱溶液的量`,
        content: '没有滴加碱溶液',
        isCorrect: false,
      })
      returnObj.phenomenon.push({
        name: `${title}-实验现象：指示剂颜色变化`,
        content: '不能观察到完整的颜色变化',
        isCorrect: false,
      })
      if (scene.indicatorType === 'pur') {
        returnObj.conclusion.name = `${title}-实验结论：紫色石蕊-先酸后碱`
        returnObj.conclusion.correctContent = 'A.石蕊试液先变紫再变蓝'
        switch (userChoice) {
          case 'A':
            returnObj.conclusion.isCorrect = true
            break
          case 'B':
          case 'C':
          case 'D':
            returnObj.conclusion.isCorrect = false
            break
        }
      }
      if (scene.indicatorType === 'phe') {
        returnObj.conclusion.name = `${title}-实验结论：无色酚酞-先酸后碱`
        returnObj.conclusion.correctContent = 'C.酚酞试液变红'
        switch (userChoice) {
          case 'C':
            returnObj.conclusion.isCorrect = true
            break
          case 'A':
          case 'B':
          case 'D':
            returnObj.conclusion.isCorrect = false
            break
        }
      }
    }
  } else if (scene.indicatorType === 'pur') {
    if (acidIndex < alkaliIndex) {
      // 紫色石蕊试剂，先加酸再加碱
      if (matTubeLiquid.diffuseColor.r == 0) {
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加酸溶液的量`,
          content: '酸溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加碱溶液的量`,
          content: '碱溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：指示剂颜色变化`,
          content: '能观察到完整的颜色变化',
          isCorrect: true,
        })
      } else {
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加酸溶液的量`,
          content: '酸溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加碱溶液的量`,
          content: '碱溶液滴加过少',
          isCorrect: false,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：指示剂颜色变化`,
          content: '不能观察到完整的颜色变化',
          isCorrect: false,
        })
      }
      returnObj.conclusion.name = `${title}-实验结论：紫色石蕊-先酸后碱`
      returnObj.conclusion.correctContent = 'A.石蕊试液先变紫再变蓝'
      switch (userChoice) {
        case 'A':
          returnObj.conclusion.isCorrect = true
          break
        case 'B':
        case 'C':
        case 'D':
          returnObj.conclusion.isCorrect = false
          break
      }
    } else {
      // 紫色石蕊试剂，先加碱再加酸
      if (matTubeLiquid.diffuseColor.r == 1) {
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加酸溶液的量`,
          content: '酸溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加碱溶液的量`,
          content: '碱溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：指示剂颜色变化`,
          content: '能观察到完整的颜色变化',
          isCorrect: true,
        })
      } else {
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加酸溶液的量`,
          content: '酸溶液滴加过少',
          isCorrect: false,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加碱溶液的量`,
          content: '碱溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：指示剂颜色变化`,
          content: '不能观察到完整的颜色变化',
          isCorrect: false,
        })
      }
      returnObj.conclusion.name = `${title}-实验结论：紫色石蕊-先碱后酸`
      returnObj.conclusion.correctContent = 'B.石蕊试液先变紫再变红'
      switch (userChoice) {
        case 'B':
          returnObj.conclusion.isCorrect = true
          break
        case 'A':
        case 'C':
        case 'D':
          returnObj.conclusion.isCorrect = false
          break
      }
    }
  } else if (scene.indicatorType === 'phe') {
    // 无色酚酞试剂，先加酸再加碱
    if (acidIndex < alkaliIndex) {
      if (matTubeLiquid.diffuseColor.b == 0) {
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加酸溶液的量`,
          content: '酸溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加碱溶液的量`,
          content: '碱溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：指示剂颜色变化`,
          content: '能观察到完整的颜色变化',
          isCorrect: true,
        })
      } else {
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加酸溶液的量`,
          content: '酸溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加碱溶液的量`,
          content: '碱溶液滴加过少',
          isCorrect: false,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：指示剂颜色变化`,
          content: '不能观察到完整的颜色变化',
          isCorrect: false,
        })
      }
      returnObj.conclusion.name = `${title}-实验结论：无色酚酞-先酸后碱`
      returnObj.conclusion.correctContent = 'C.酚酞试液变红'
      switch (userChoice) {
        case 'C':
          returnObj.conclusion.isCorrect = true
          break
        case 'A':
        case 'B':
        case 'D':
          returnObj.conclusion.isCorrect = false
          break
      }
    } else {
      // 无色酚酞试剂，先加碱再加酸
      if (matTubeLiquid.diffuseColor.b == 1) {
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加酸溶液的量`,
          content: '酸溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加碱溶液的量`,
          content: '碱溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：指示剂颜色变化`,
          content: '能观察到完整的颜色变化',
          isCorrect: true,
        })
      } else {
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加酸溶液的量`,
          content: '酸溶液滴加过少',
          isCorrect: false,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：滴加碱溶液的量`,
          content: '碱溶液滴加足量',
          isCorrect: true,
        })
        returnObj.phenomenon.push({
          name: `${title}-实验现象：指示剂颜色变化`,
          content: '不能观察到完整的颜色变化',
          isCorrect: false,
        })
      }
      returnObj.conclusion.name = `${title}-实验结论：无色酚酞-先碱后酸`
      returnObj.conclusion.correctContent = 'D.酚酞试液变无色'
      switch (userChoice) {
        case 'D':
          returnObj.conclusion.isCorrect = true
          break
        case 'A':
        case 'B':
        case 'C':
          returnObj.conclusion.isCorrect = false
          break
      }
    }
  }
  return returnObj
}
