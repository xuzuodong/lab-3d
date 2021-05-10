import { Dialog } from 'quasar'
import { Notify } from 'quasar'
import storeOption from '../2d/storeOption'
import storeData from '../2d/storeData'
import woodjpg from '../2d/assets/wood.jpg'
import grasspng from '../2d/assets/grass.png'
import icejpg from '../2d/assets/ice.jpg'
import initGround from '../2d/assets/initGround.png'
import FreeInquiry from '../../../components/FreeInquiry'
import assumePage from '../2d/assumePage'
import targetPage from '../2d/targetPage'
import paramPage from '../2d/paramPage'
import testPage from '../2d/testPage'
import store from '../../../store'
import judgeOfAssume1 from './judgeOfAssume1'
import judgeOfAssume2 from './judgeOfAssume2'
import judgeOfAssume3 from './judgeOfAssume3'
import script from '../2d/script'

let count1 = 0
let count2 = 0
let count3 = 0
let experAssume = 0
let o1 = false
let o2 = false
let o3 = false
let gravity = 0
let kexperimentId
let warnMsg = '请按照左上角的假设进行实验！'
let matParam = 0
let areaParam = 0
let areaStatus = ''

function changeShape(scene) {
  if (storeData[0].mat == '荒地') {
    matParam = 0.5
    scene.changeGround(initGround)
  }
  if (storeData[0].mat == '草地') {
    matParam = 0.7
    scene.changeGround(grasspng)
  }
  if (storeData[0].mat == '木板') {
    matParam = 0.3
    scene.changeGround(woodjpg)
  }
  if (storeData[0].mat == '冰面') {
    matParam = 0.1
    scene.changeGround(icejpg)
  }
  if (areaStatus == '') {
    if (storeData[0].area == '侧躺放置') {
      areaParam = 5.4
      areaStatus = 'middle'
    }
    if (storeData[0].area == '平躺放置') {
      areaParam = 9
      scene.largeArea()
      areaStatus = 'large'
    }
    if (storeData[0].area == '竖向放置') {
      areaParam = 2.4
      scene.smallArea()
      areaStatus = 'small'
    }
  }
  else if (areaStatus == 'middle') {
    if (storeData[0].area == '侧躺放置') {
      areaParam = 5.4
      areaStatus = 'middle'
    }
    if (storeData[0].area == '平躺放置') {
      areaParam = 9
      scene.largeArea()
      areaStatus = 'large'
    }
    if (storeData[0].area == '竖向放置') {
      areaParam = 2.4
      scene.smallArea()
      areaStatus = 'small'
    }
  }
  else if (areaStatus == 'large') {
    scene.reLargeArea()
    if (storeData[0].area == '侧躺放置') {
      areaParam = 5.4
      areaStatus = 'middle'
    }
    if (storeData[0].area == '平躺放置') {
      areaParam = 9
      scene.largeArea()
      areaStatus = 'large'
    }
    if (storeData[0].area == '竖向放置') {
      areaParam = 2.4
      scene.smallArea()
      areaStatus = 'small'
    }
  }
  else if (areaStatus == 'small') {
    scene.reSmallArea()
    if (storeData[0].area == '侧躺放置') {
      areaParam = 5.4
      areaStatus = 'middle'
    }
    if (storeData[0].area == '平躺放置') {
      areaParam = 9
      scene.largeArea()
      areaStatus = 'large'
    }
    if (storeData[0].area == '竖向放置') {
      areaParam = 2.4
      scene.smallArea()
      areaStatus = 'small'
    }
  }
}

function cue() {
  Notify.create({
    message: warnMsg,
    position: 'center',
    type: 'negative',
    timeout: 3500,
    actions: [{ label: 'x', color: 'white', handler: () => { } }]
  })
}

export default [
  {
    paragraph: '原因分析',
    talk: 0,
    method: ({ next }) => {
      next()
    }
  },
  //跳转到选择后的对应段落，并禁用该选项。
  {
    paragraph: '摩擦力是什么',
    talk: 'last',
    method: ({ goto, scene }) => {
      const assume = Dialog.create({
        component: assumePage,
        option1: o1,
        option2: o2,
        option3: o3,
      }).onOk(async () => {
        console.log(storeOption);
        if (storeOption[storeOption.length - 1] == 'op1') {
          experAssume = 1
          goto({ paragraph: '改变接触面粗糙程度' })
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '如何降低摩擦力',
          //   type: 'BEHAVIOR_ASSUMPTION',
          //   content: '认为【改变接触面粗糙程度】可以降低摩擦力',
          //   correctContent: '认为【改变接触面粗糙程度】可以降低摩擦力',
          //   isCorrect: '',
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        } else if (storeOption[storeOption.length - 1] == 'op2') {
          experAssume = 2
          goto({ paragraph: '改变与接触面的面积' })
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '如何降低摩擦力',
          //   type: 'BEHAVIOR_ASSUMPTION',
          //   content: '认为【改变与接触面的面积】可以降低摩擦力',
          //   correctContent: '认为【改变与接触面的面积】可以降低摩擦力',
          //   isCorrect: '',
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        } else if (storeOption[storeOption.length - 1] == 'op3') {
          experAssume = 3
          goto({ paragraph: '改变物体的质量' })
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '如何降低摩擦力',
          //   type: 'BEHAVIOR_ASSUMPTION',
          //   content: '认为【改变物体的质量】可以降低摩擦力',
          //   correctContent: '认为【改变物体的质量】可以降低摩擦力',
          //   isCorrect: '',
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
      })
      scene.mutate({ assumePanel: assume })
    },
  },

  //如果刚才选择了**改变接触面粗糙程度**的选项，则跳转到这里创建一个targetPage
  {
    paragraph: '改变接触面粗糙程度',
    talk: 0,
    method: ({ next, scene }) => {
      const target = Dialog.create({
        component: targetPage,
      })
      scene.mutate({ targetPanel: target })
      next()
    },
  },

  //创建工具箱，并作为跳转的跳板
  {
    paragraph: '改变接触面粗糙程度',
    talk: 1,
    method: ({ scene, goto, next, script }) => {
      const test = Dialog.create({
        component: testPage,
        disTestPage: false,
      }).onOk(async () => {
        let judgeResult = judgeOfAssume1.judge(o1)
        if (judgeResult == '荒地' || judgeResult == '草地' || judgeResult == '木板' || judgeResult == '冰面') {
          changeShape(scene)
          count1++
          script.paragraphs.find(e => e.id == judgeResult).talks[0] = '变量调整完毕！我看到地面材质变成**' + storeData[0].mat + '**，货物翻转为**' + storeData[0].area + '**，对接触面的压力变成**' + storeData[0].mass + '**N了。'
          goto({ paragraph: judgeResult })
          o1 = true
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变接触面粗糙程度',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将地面改变为' + judgeResult,
          //   correctContent: '改变接触面粗糙程度中选择了【' + judgeResult + '】',
          //   isCorrect: true,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (judgeResult == '侧躺放置' || judgeResult == '平躺放置' || judgeResult == '竖向放置') {
          cue()
          next()
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变接触面粗糙程度',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: judgeResult,
          //   correctContent: '在该选项中，应该选择改变地面粗糙程度的选项',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (judgeResult == 250 || judgeResult == 500 || judgeResult == 750 || judgeResult == 1000) {
          cue()
          gravity = -1
          next()
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变接触面粗糙程度',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将物体的质量改变为' + judgeResult + 'kg',
          //   correctContent: '在该选项中，应该选择改变地面粗糙程度的选项',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (judgeResult == 'goback') next()
        else next()
        scene.backToStart()
        script.paragraphs.find(e => e.id == '改变接触面粗糙程度').talks[1] = '实验师可以继续通过控制地面材质来探索它们的关系！'
      })
      scene.mutate({ testPanel: test })
    },
  },

  {
    paragraph: '改变接触面粗糙程度',
    talk: 2,
    method: ({ goto }) => {
      Notify.create({
        message: '请使用控制变量法来进行探究',
        position: 'center',
        type: 'negative',
        timeout: 3500,
        actions: [{ label: 'x', color: 'white', handler: () => { } }]
      })
      goto({ paragraph: '改变接触面粗糙程度', talk: 1 })
    },
  },

  {
    paragraph: '荒地',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.iceRun(0.08)
      setTimeout(() => {
        goto({ paragraph: '荒地后' })
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            coefficient: matParam,
            mass: storeData[0].mass,
            force: storeData[0].mass * matParam,
            square: areaParam,
            mat: storeData[0].mat.substr(0, 2)
          }]
        })
        scene.mutate({ paramPanel: param })
      }, 4000)
    },
  },

  {
    paragraph: '荒地后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.paramPanel.hide()
      if (count1 >= 3) {
        goto({ paragraph: '接触面总结' })
        count1 = 0
        scene.targetPanel.hide()
      } else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 1 })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 1 })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 1 })
      }
    },
  },
  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '草地',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.iceRun(0.08)
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            coefficient: matParam,
            mass: storeData[0].mass,
            force: storeData[0].mass * matParam,
            square: areaParam,
            mat: storeData[0].mat.substr(0, 2)
          }]
        })
        goto({ paragraph: '草地后' })
        scene.mutate({ paramPanel: param })
      }, 4000)
    },
  },

  //判断是否所有地面都选择过，如果选择过跳转到接触面总结段落，不然就继续改变接触面段落
  {
    paragraph: '草地后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.paramPanel.hide()
      if (count1 >= 3) {
        goto({ paragraph: '接触面总结' })
        count1 = 0
        scene.targetPanel.hide()
      } else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 1 })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 1 })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 1 })
      }
    },
  },

  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '木板',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.iceRun(0.08)
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            coefficient: matParam,
            mass: storeData[0].mass,
            force: storeData[0].mass * matParam,
            square: areaParam,
            mat: storeData[0].mat.substr(0, 2)
          }]
        })
        scene.mutate({ paramPanel: param })
        goto({ paragraph: '木板后' })
      }, 4000)
    },
  },

  //判断是否所有地面都选择过，如果选择过跳转到接触面总结段落，不然就继续改变接触面段落
  {
    paragraph: '木板后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.paramPanel.hide()
      if (count1 >= 3) {
        goto({ paragraph: '接触面总结' })
        count1 = 0
        scene.targetPanel.hide()
      } else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 1 })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 1 })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 1 })
      }
    },
  },

  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '冰面',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.iceRun(0.08)
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            coefficient: matParam,
            mass: storeData[0].mass,
            force: storeData[0].mass * matParam,
            square: areaParam,
            mat: storeData[0].mat.substr(0, 2)
          }]
        })
        scene.mutate({ paramPanel: param })
        goto({ paragraph: '冰面后' })
      }, 4000)
    },
  },

  //判断是否所有地面都选择过，如果选择过跳转到接触面总结段落，不然就继续改变接触面段落
  {
    paragraph: '冰面后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.paramPanel.hide()
      if (count1 >= 3) {
        goto({ paragraph: '接触面总结' })
        count1 = 0
        scene.targetPanel.hide()
      } else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 1 })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 1 })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 1 })
      }
    },
  },
  {
    paragraph: '接触面总结',
    talk: 'last',
    method: ({ goto }) => {
      if (o1 == true && o2 == true && o3 == true) {
        goto({ paragraph: '机器人的吐槽' })
      }
      else goto({ paragraph: '摩擦力是什么' })
    },
  },

  //如果刚才选择了**改变接触面粗糙程度**的选项，则跳转到这里创建一个targetPage
  {
    paragraph: '改变与接触面的面积',
    talk: 0,
    method: ({ next, scene }) => {
      const target = Dialog.create({
        component: targetPage,
      })
      scene.mutate({ targetPanel: target })
      next()
    },
  },

  //创建工具箱，并作为跳转的跳板
  {
    paragraph: '改变与接触面的面积',
    talk: 1,
    method: ({ scene, goto, next, script }) => {
      const test = Dialog.create({
        component: testPage,
        disTestPage: false,
      }).onOk(async () => {
        let judgeResult = judgeOfAssume2.judge(o2)
        if (judgeResult == '荒地' || judgeResult == '草地' || judgeResult == '木板' || judgeResult == '冰面') {
          cue()
          next()
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变接触面粗糙程度',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将地面改变为' + judgeResult,
          //   correctContent: '改变接触面粗糙程度中选择了【' + judgeResult + '】',
          //   isCorrect: true,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (judgeResult == '侧躺放置' || judgeResult == '平躺放置' || judgeResult == '竖向放置') {
          script.paragraphs.find(e => e.id == judgeResult).talks[0] = '变量调整完毕！我看到地面材质变成**' + storeData[0].mat + '**，货物翻转为**' + storeData[0].area + '**，对接触面的压力变成**' + storeData[0].mass + '**N了。'
          changeShape(scene)
          count2++
          goto({ paragraph: judgeResult })
          o2 = true
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变接触面粗糙程度',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: judgeResult,
          //   correctContent: '在该选项中，应该选择改变地面粗糙程度的选项',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (judgeResult == 250 || judgeResult == 500 || judgeResult == 750 || judgeResult == 1000) {
          script.paragraphs.find(e => e.id == '轻松拉货').talks[0] = '变量调整完毕！我看到地面材质变成**' + storeData[0].mat + '**，货物翻转为**' + storeData[0].area + '**，对接触面的压力变成**' + storeData[0].mass + '**N了。'
          cue()
          gravity = -2
          next()
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变接触面粗糙程度',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将物体的质量改变为' + judgeResult + 'kg',
          //   correctContent: '在该选项中，应该选择改变地面粗糙程度的选项',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (judgeResult == 'goback') next()
        else next()
        scene.backToStart()
        script.paragraphs.find(e => e.id == '改变与接触面的面积').talks[1] = '实验师可以继续通过变换货物放置位置来探索它们的关系！'
      })
      scene.mutate({ testPanel: test })
    },
  },

  {
    paragraph: '改变与接触面的面积',
    talk: 2,
    method: ({ goto }) => {
      Notify.create({
        message: '请使用控制变量法来进行探究',
        position: 'center',
        type: 'negative',
        timeout: 3500,
        actions: [{ label: 'x', color: 'white', handler: () => { } }]
      })
      goto({ paragraph: '改变与接触面的面积', talk: 1 })
    },
  },

  //侧躺放置后跑步动画，并设置至少看3秒
  {
    paragraph: '侧躺放置',
    talk: 1,
    method: ({ next, scene }) => {
      scene.iceRun(0.08)
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            coefficient: matParam,
            mass: storeData[0].mass,
            force: storeData[0].mass * matParam,
            square: areaParam,
            mat: storeData[0].mat.substr(0, 2)
          }]
        })
        scene.mutate({ paramPanel: param })
        next()
      }, 3000)
    },
  },

  //停止跑步，并跳转
  {
    paragraph: '侧躺放置',
    talk: 'last',
    method: ({ goto, scene }) => {
      if (count2 >= 3) {
        goto({ paragraph: '接触面积总结' })
        count2 = 0
        scene.targetPanel.hide()
      }
      else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 1 })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 1 })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 1 })
      }
      scene.paramPanel.hide()
    },
  },

  //竖向放置后跑步动画，并设置至少看3秒
  {
    paragraph: '竖向放置',
    talk: 1,
    method: ({ next, scene }) => {
      scene.iceRun(0.08)
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            coefficient: matParam,
            mass: storeData[0].mass,
            force: storeData[0].mass * matParam,
            square: areaParam,
            mat: storeData[0].mat.substr(0, 2)
          }]
        })
        scene.mutate({ paramPanel: param })
        next()
      }, 3000)
    },
  },

  //停止跑步，并跳转
  {
    paragraph: '竖向放置',
    talk: 'last',
    method: ({ goto, scene }) => {
      if (count2 >= 3) {
        goto({ paragraph: '接触面积总结' })
        count2 = 0
        scene.targetPanel.hide()
      }
      else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 1 })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 1 })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 1 })
      }
      scene.paramPanel.hide()
    },
  },

  //开始跑步并设置至少看3秒
  {
    paragraph: '平躺放置',
    talk: 1,
    method: ({ next, scene }) => {
      scene.iceRun(0.08)
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            coefficient: matParam,
            mass: storeData[0].mass,
            force: storeData[0].mass * matParam,
            square: areaParam,
            mat: storeData[0].mat.substr(0, 2)
          }]
        })
        scene.mutate({ paramPanel: param })
        next()
      }, 3000)
    },
  },

  //停止跑步，并跳转
  {
    paragraph: '平躺放置',
    talk: 'last',
    method: ({ goto, scene }) => {
      if (count2 >= 3) {
        goto({ paragraph: '接触面积总结' })
        count2 = 0
        scene.targetPanel.hide()
      }
      else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 1 })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 1 })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 1 })
      }
      scene.paramPanel.hide()
    },
  },

  {
    paragraph: '接触面积总结',
    talk: 'last',
    method: ({ goto }) => {
      if (o1 == true && o2 == true && o3 == true) {
        goto({ paragraph: '机器人的吐槽' })
      }
      else goto({ paragraph: '摩擦力是什么' })
    },
  },

  //如果刚才选择了**改变物体的质量**的选项，则跳转到这里创建一个targetPage
  {
    paragraph: '改变物体的质量',
    talk: 0,
    method: ({ next, scene }) => {
      const target = Dialog.create({
        component: targetPage,
      })
      scene.mutate({ targetPanel: target })
      next()
    },
  },

  //创建工具箱，并作为跳转的跳板
  {
    paragraph: '改变物体的质量',
    talk: 1,
    method: ({ goto, scene, next, script }) => {
      const test = Dialog.create({
        component: testPage,
        disTestPage: false,
      }).onOk(async () => {
        let judgeResult = judgeOfAssume3.judge(o3)
        if (judgeResult == '荒地' || judgeResult == '草地' || judgeResult == '木板' || judgeResult == '冰面') {
          script.paragraphs.find(e => e.id == judgeResult).talks[0] = '变量调整完毕！我看到地面材质变成**' + storeData[0].mat + '**，货物翻转为**' + storeData[0].area + '**，对接触面的压力变成**' + storeData[0].mass + '**N了。'
          cue()
          next()
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变接触面粗糙程度',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将地面改变为' + judgeResult,
          //   correctContent: '改变接触面粗糙程度中选择了【' + judgeResult + '】',
          //   isCorrect: true,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (judgeResult == '侧躺放置' || judgeResult == '平躺放置' || judgeResult == '竖向放置') {
          script.paragraphs.find(e => e.id == judgeResult).talks[0] = '变量调整完毕！我看到地面材质变成**' + storeData[0].mat + '**，货物翻转为**' + storeData[0].area + '**，对接触面的压力变成**' + storeData[0].mass + '**N了。'
          cue()
          next()
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变接触面粗糙程度',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: judgeResult,
          //   correctContent: '在该选项中，应该选择改变地面粗糙程度的选项',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (judgeResult == 250 || judgeResult == 500 || judgeResult == 750 || judgeResult == 1000) {
          count3++
          script.paragraphs.find(e => e.id == '轻松拉货').talks[0] = '变量调整完毕！我看到地面材质变成**' + storeData[0].mat + '**，货物翻转为**' + storeData[0].area + '**，对接触面的压力变成**' + storeData[0].mass + '**N了。'
          gravity = 1
          goto({ paragraph: '轻松拉货' })
          changeShape(scene)
          o3 = true
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变接触面粗糙程度',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将物体的质量改变为' + judgeResult + 'kg',
          //   correctContent: '在该选项中，应该选择改变地面粗糙程度的选项',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (judgeResult == 'goback') next()
        else next()
        scene.backToStart()
        script.paragraphs.find(e => e.id == '改变物体的质量').talks[1] = '实验师可以继续通过调整压力大小来探索它们的关系！'
      })
      scene.mutate({ testPanel: test })
    },
  },

  {
    paragraph: '改变物体的质量',
    talk: 2,
    method: ({ goto }) => {
      Notify.create({
        message: '请使用控制变量法来进行探究',
        position: 'center',
        type: 'negative',
        timeout: 3500,
        actions: [{ label: 'x', color: 'white', handler: () => { } }]
      })
      goto({ paragraph: '改变物体的质量', talk: 1 })
    },
  },

  //根据刚才改变的质量设置跑步速度
  {
    paragraph: '轻松拉货',
    talk: 1,
    method: ({ next, scene }) => {
      scene.iceRun(0.08)
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            coefficient: matParam,
            mass: storeData[0].mass,
            force: storeData[0].mass * matParam,
            square: areaParam,
            mat: storeData[0].mat.substr(0, 2)
          }]
        })
        scene.mutate({ paramPanel: param })
        next()
      }, 4000)
    },
  },

  //退出参数页面
  {
    paragraph: '轻松拉货',
    talk: 'last',
    method: ({ goto, scene }) => {
      if (count3 >= 3) {
        goto({ paragraph: '质量总结' })
        count3 = 0
        scene.targetPanel.hide()
      }
      else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 1 })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 1 })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 1 })
      }
      scene.paramPanel.hide()
    },
  },
  {
    paragraph: '质量总结',
    talk: 'last',
    method: ({ goto }) => {
      if (o1 == true && o2 == true && o3 == true) {
        goto({ paragraph: '机器人的吐槽' })
      }
      else goto({ paragraph: '摩擦力是什么' })
    },
  },
  //最后的总结题目
  {
    paragraph: '总结任务1',
    talk: 0,
    method: ({ next, scene, script }) => {
      const question = Dialog.create({
        title: '关于滑动摩擦力大小与物体之间接触面的粗糙程度关系说法正确的是？( )',
        options: {
          type: 'radio',
          model: '',
          items: [
            { label: '滑动摩擦力大小与接触面粗糙程度无关', value: 'rough1' },
            { label: '接触面越光滑，滑动摩擦力越小', value: 'rough2' },
            { label: '接触面越粗糙，滑动摩擦力越小', value: 'rough3' },
          ],
        },
        persistent: true
      }).onOk((value) => {
        if (value == 'rough2') {
          script.paragraphs.find(e => e.id == '总结任务1').talks[1] = '恭喜你！回答正确！'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体之间接触面的粗糙程度关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面越光滑，滑动摩擦力越小',
          //   correctContent: '接触面越光滑，滑动摩擦力越小',
          //   isCorrect: true,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (value == 'rough1') {
          script.paragraphs.find(e => e.id == '总结任务1').talks[1] = '很遗憾噢，正确答案为**接触面越光滑，滑动摩擦力越小**。'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体之间接触面的粗糙程度关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '滑动摩擦力大小与接触面粗糙程度无关',
          //   correctContent: '接触面越光滑，滑动摩擦力越小',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (value == 'rough3') {
          script.paragraphs.find(e => e.id == '总结任务1').talks[1] = '很遗憾噢，正确答案为**接触面越光滑，滑动摩擦力越小**。'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体之间接触面的粗糙程度关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面越粗糙，滑动摩擦力越小',
          //   correctContent: '接触面越光滑，滑动摩擦力越小',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else {
          script.paragraphs.find(e => e.id == '总结任务1').talks[1] = '请回答问题！正确答案为**接触面越光滑，滑动摩擦力越小**。'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体之间接触面的粗糙程度关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '未选择选项',
          //   correctContent: '接触面越光滑，滑动摩擦力越小',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        next()
      })
      scene.mutate({ questionPanel: question })
    },
  },

  //最后的总结题目
  {
    paragraph: '总结任务2',
    talk: 0,
    method: ({ next, scene, script }) => {
      const question = Dialog.create({
        title: '关于滑动摩擦力大小与物体之间接触面的面积大小关系说法正确的是？( )',
        options: {
          type: 'radio',
          model: '',
          items: [
            { label: '滑动摩擦力大小与接触面的面积大小无关', value: 'area1' },
            { label: '接触面越大，滑动摩擦力越小', value: 'area2' },
            { label: '接触面越小，滑动摩擦力越小', value: 'area3' },
          ],
        },
        persistent: true,
      }).onOk((value) => {
        if (value == 'area1') {
          script.paragraphs.find(e => e.id == '总结任务2').talks[1] = '恭喜你！回答正确！'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体之间接触面的面积大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '滑动摩擦力大小与接触面的面积大小无关',
          //   correctContent: '滑动摩擦力大小与接触面的面积大小无关',
          //   isCorrect: true,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (value == 'area2') {
          script.paragraphs.find(e => e.id == '总结任务2').talks[1] = '很遗憾噢，正确答案为**滑动摩擦力大小与接触面的面积大小无关**。'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体之间接触面的面积大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面越大，滑动摩擦力越小',
          //   correctContent: '滑动摩擦力大小与接触面的面积大小无关',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (value == 'area3') {
          script.paragraphs.find(e => e.id == '总结任务2').talks[1] = '很遗憾噢，正确答案为**滑动摩擦力大小与接触面的面积大小无关**。'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体之间接触面的面积大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面越小，滑动摩擦力越小',
          //   correctContent: '滑动摩擦力大小与接触面的面积大小无关',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else {
          script.paragraphs.find(e => e.id == '总结任务2').talks[1] = '请回答问题！正确答案为**滑动摩擦力大小与接触面的面积大小无关**。'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体之间接触面的面积大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '未选择选项',
          //   correctContent: '滑动摩擦力大小与接触面的面积大小无关',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        next()
      })
      scene.mutate({ questionPanel: question })
    },
  },

  //最后的总结题目
  {
    paragraph: '总结任务3',
    talk: 0,
    method: ({ next, scene, script }) => {
      const question = Dialog.create({
        title: '关于滑动摩擦力大小与物体对接触面的压力大小关系说法正确的是？( )',
        options: {
          type: 'radio',
          model: '',
          items: [
            { label: '滑动摩擦力与物体对接触面的压力大小大小无关', value: 'pressure1' },
            { label: '物体对地面的压力越小，滑动摩擦力越小', value: 'pressure2' },
            { label: '物体对地面的压力越大，滑动摩擦力越小', value: 'pressure3' },
          ],
        },
        persistent: true,
      }).onOk((value) => {
        if (value == 'pressure2') {
          script.paragraphs.find(e => e.id == '总结任务3').talks[1] = '恭喜你！回答正确！'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体对接触面的压力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '物体对地面的压力越小，滑动摩擦力越小',
          //   correctContent: '物体对地面的压力越小，滑动摩擦力越小',
          //   isCorrect: true,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (value == 'pressure1') {
          script.paragraphs.find(e => e.id == '总结任务3').talks[1] = '很遗憾噢，正确答案为**物体对地面的压力越小，滑动摩擦力越小**。'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体对接触面的压力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '滑动摩擦力与物体对接触面的压力大小大小无关',
          //   correctContent: '物体对地面的压力越小，滑动摩擦力越小',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else if (value == 'pressure3') {
          script.paragraphs.find(e => e.id == '总结任务3').talks[1] = '很遗憾噢，正确答案为**物体对地面的压力越小，滑动摩擦力越小**。'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体对接触面的压力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '物体对地面的压力越大，滑动摩擦力越小',
          //   correctContent: '物体对地面的压力越小，滑动摩擦力越小',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        else {
          script.paragraphs.find(e => e.id == '总结任务3').talks[1] = '请回答问题！正确答案为**物体对地面的压力越小，滑动摩擦力越小**。'
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '滑动摩擦力大小与物体对接触面的压力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '未选择选项',
          //   correctContent: '物体对地面的压力越小，滑动摩擦力越小',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        next()
      })
      scene.mutate({ questionPanel: question })
    },
  },
]
