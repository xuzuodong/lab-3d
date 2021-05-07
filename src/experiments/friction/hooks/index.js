import { Dialog } from 'quasar'
import { Notify } from 'quasar'
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

let experAssume = 0
let o1 = false
let o2 = false
let o3 = false
let waste = 0
let grass = 0
let wood = 0
let ice = 0
let large = 0
let middle = 0
let small = 0
let gravity = 0
let kexperimentId
let warnMsg = '请按照左上角的假设进行实验！'

function changeShape(scene) {
  if (storeData[0].mat == '荒地') {
    scene.changeGround(initGround)
  }
  if (storeData[0].mat == '草地') {
    scene.changeGround(grasspng)
  }
  if (storeData[0].mat == '木板') {
    scene.changeGround(woodjpg)
  }
  if (storeData[0].mat == '冰面') {
    scene.changeGround(icejpg)
  }
  if (storeData[0].area == '侧躺放置') {
    scene.reSmallArea()
  }
  if (storeData[0].area == '平躺放置') {
    scene.reSmallArea()
    scene.largeArea()
  }
  if (storeData[0].area == '竖向放置') {
    scene.reSmallArea()
    scene.smallArea()
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

function getRunSpeed() {
  let runSpeed = 0.04
  switch (storeData[0].mat) {
    case '荒地':
      runSpeed = (1000 - (storeData[0].mass * 0.5 * 10)) / (storeData[0].mass * 487.5)
      break
    case '草地':
      runSpeed = (1000 - (storeData[0].mass * 0.7 * 10)) / (storeData[0].mass * 487.5)
      break
    case '木板':
      runSpeed = (1000 - (storeData[0].mass * 0.3 * 10)) / (storeData[0].mass * 487.5)
      break
    case '冰面':
      runSpeed = (1000 - (storeData[0].mass * 0.1 * 10)) / (storeData[0].mass * 487.5)
      break
  }
  return runSpeed
}
export default [
  //开始实验，并获取kexperimentId
  {
    paragraph: '原因分析',
    talk: 0,
    method: ({ next }) => {
      // store.dispatch('user/startExperiment', {
      //   experimentId: 9,
      //   success: (res) => {
      //     kexperimentId = res.kexperimentId
      //     console.log(kexperimentId);
      //   },
      //   failure: (res) => {
      //     console.log(res)
      //   },
      // })
      next()
    },
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
        if (storeData[0] == 'op1') {
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
        } else if (storeData[0] == 'op2') {
          experAssume = 2
          goto({ paragraph: '改变与接触面的面积' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '如何降低摩擦力',
            type: 'BEHAVIOR_ASSUMPTION',
            content: '认为【改变与接触面的面积】可以降低摩擦力',
            correctContent: '认为【改变与接触面的面积】可以降低摩擦力',
            isCorrect: '',
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        } else if (storeData[0] == 'op3') {
          experAssume = 3
          goto({ paragraph: '改变物体的质量' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '如何降低摩擦力',
            type: 'BEHAVIOR_ASSUMPTION',
            content: '认为【改变物体的质量】可以降低摩擦力',
            correctContent: '认为【改变物体的质量】可以降低摩擦力',
            isCorrect: '',
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
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
    talk: 'last',
    method: ({ scene, goto, script }) => {
      const test = Dialog.create({
        component: testPage,
        disTestPage: false,
      }).onOk(async () => {
        let judgeResult = judgeOfAssume1.judge(o1)
        changeShape(scene)
        if (judgeResult == '荒地' || judgeResult == '草地' || judgeResult == '木板' || judgeResult == '冰面') {
          if (judgeResult == '荒地') {
            waste = 1
          }
          if (judgeResult == '草地') {
            grass = 1
          }
          if (judgeResult == '木板') {
            wood = 1
          }
          if (judgeResult == '冰面') {
            ice = 1
          }
          goto({ paragraph: judgeResult })
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
        if (judgeResult == '侧躺放置' || judgeResult == '平躺放置' || judgeResult == '竖向放置') {
          cue()
          goto({ paragraph: judgeResult })
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
        if (judgeResult == 25 || judgeResult == 50 || judgeResult == 75 || judgeResult == 100) {
          cue()
          gravity = -1
          goto({ paragraph: '轻松拉货' })
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
        if (judgeResult == 'matCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '嘿，这次改变了两个变量吗？将接触方式改变为了**' + storeData[0].area + '**，质量也变为了**' + storeData[0].mass + '**kg。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是粗糙程度与滑动摩擦力的关系。是不是除了地面粗糙程度外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        if (judgeResult == 'massCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '嘿，这次改变了两个变量吗？将接触方式改变为了**' + storeData[0].area + '**，接触面也变为了**' + storeData[0].mat + '**。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是粗糙程度与滑动摩擦力的关系。是不是除了地面粗糙程度外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        if (judgeResult == 'areaCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '嘿，这次改变了两个变量吗？将接触面改变为了**' + storeData[0].mat + '**，质量也变为了**' + storeData[0].mass + '**kg。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是粗糙程度与滑动摩擦力的关系。是不是除了地面粗糙程度外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        if (judgeResult == 'allCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '变量调整完毕！这次变量全都有所调整呢！我看到地面材质变成了**' + storeData[0].mat + '**，货物翻转为**' + storeData[0].area + '**，货物质量也进行了调整，变成了**' + storeData[0].mass + '**kg。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是接触面积与滑动摩擦力的关系。是不是除了接触面积外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        o1 = true
        scene.backToStart()
      })
      scene.mutate({ testPanel: test })
    },
  },

  {
    paragraph: '荒地',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.iceRun(getRunSpeed())
      setTimeout(() => {
        goto({ paragraph: '荒地后' })
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '失败',
            force: '500',
            coefficient: '0.7',
            square: '5.4',
            mass: '100',
          }]
        })
        scene.mutate({ paramPanel: param })
      }, 3000)
    },
  },

  {
    paragraph: '荒地后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.changeGround(initGround)
      scene.paramPanel.hide()
      if (grass + wood + ice + waste >= 2) {
        goto({ paragraph: '接触面总结' })
        waste = 0
        grass = 0
        wood = 0
        ice = 0
      } else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 'last' })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 'last' })
      }
    },
  },
  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '草地',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.iceRun(getRunSpeed())
      setTimeout(() => {
        goto({ paragraph: '草地后' })
      }, 3000)
    },
  },

  //停止跑步
  {
    paragraph: '草地后',
    talk: 2,
    method: ({ next, scene }) => {
      const param = Dialog.create({
        component: paramPage,
        information: [{
          msg: '失败',
          force: '500',
          coefficient: '0.7',
          square: '5.4',
          mass: '100',
        }]
      })
      scene.mutate({ paramPanel: param })
      next()
    },
  },

  //判断是否所有地面都选择过，如果选择过跳转到接触面总结段落，不然就继续改变接触面段落
  {
    paragraph: '草地后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.changeGround(initGround)
      scene.paramPanel.hide()
      if (grass + wood + ice + waste >= 2) {
        goto({ paragraph: '接触面总结' })
        waste = 0
        grass = 0
        wood = 0
        ice = 0
      } else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 'last' })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 'last' })
      }
    },
  },

  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '木板',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.iceRun(getRunSpeed())
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            force: '294',
            coefficient: '0.3',
            square: '5.4',
            mass: '100',
          }]
        })
        scene.mutate({ paramPanel: param })
        goto({ paragraph: '木板后' })
      }, 6000)
    },
  },

  //判断是否所有地面都选择过，如果选择过跳转到接触面总结段落，不然就继续改变接触面段落
  {
    paragraph: '木板后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.changeGround(initGround)
      scene.paramPanel.hide()
      if (grass + wood + ice + waste >= 2) {
        goto({ paragraph: '接触面总结' })
        waste = 0
        grass = 0
        wood = 0
        ice = 0
      } else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 'last' })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 'last' })
      }
    },
  },

  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '冰面',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.iceRun(getRunSpeed())
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            force: '98',
            coefficient: '0.1',
            square: '5.4',
            mass: '100',
          }]
        })
        scene.mutate({ paramPanel: param })
        goto({ paragraph: '冰面后' })
      }, 6000)
    },
  },

  //判断是否所有地面都选择过，如果选择过跳转到接触面总结段落，不然就继续改变接触面段落
  {
    paragraph: '冰面后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.paramPanel.hide()
      scene.changeGround(initGround)
      if (grass + wood + ice + waste >= 2) {
        goto({ paragraph: '接触面总结' })
        waste = 0
        grass = 0
        wood = 0
        ice = 0
      } else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 'last' })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 'last' })
      }
    },
  },

  //选项判断，进入不同剧情
  {
    paragraph: '接触面总结',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面正确结束' })
      // store.dispatch('user/submitBehavior', {
      //   kexperimentId: kexperimentId,
      //   name: '接触面总结',
      //   type: 'BEHAVIOR_CHOICE',
      //   content: '接触面越光滑，摩擦力越小',
      //   correctContent: '接触面越光滑，摩擦力越小',
      //   isCorrect: true,
      //   success: (res) => {
      //     console.log(res);
      //   },
      //   failure: (res) => {
      //     console.log(res)
      //   },
      // })
    },
  },

  //选项判断，进入不同剧情
  {
    paragraph: '接触面总结',
    reply: { choice: 1, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面回答错误' })
      // store.dispatch('user/submitBehavior', {
      //   kexperimentId: kexperimentId,
      //   name: '接触面总结',
      //   type: 'BEHAVIOR_CHOICE',
      //   content: '接触面越光滑，摩擦力越大',
      //   correctContent: '接触面越光滑，摩擦力越小',
      //   isCorrect: false,
      //   success: (res) => {
      //     console.log(res);
      //   },
      //   failure: (res) => {
      //     console.log(res)
      //   },
      // })
    },
  },

  //选择错误后剧情跳转
  {
    paragraph: '接触面回答错误',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面正确结束' })
    },
  },

  //选择正确剧情跳转，并判断是否所有减少摩擦力方式都尝试过，如果都尝试过就跳转到机器人吐槽段落
  {
    paragraph: '接触面正确结束',
    talk: 'last',
    method: ({ goto, scene }) => {
      if (o1 == true && o2 == true && o3 == true) goto({ paragraph: '机器人的吐槽' })
      else goto({ paragraph: '摩擦力是什么' })
      scene.targetPanel.hide()
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
    talk: 'last',
    method: ({ scene, goto, script }) => {
      const test = Dialog.create({
        component: testPage,
        disTestPage: false,
      }).onOk(async () => {
        let judgeResult = judgeOfAssume2.judge(o2)
        changeShape(scene)
        if (judgeResult == '荒地' || judgeResult == '草地' || judgeResult == '木板' || judgeResult == '冰面') {
          cue()
          goto({ paragraph: judgeResult })
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变与接触面的面积',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将地面改变为' + judgeResult,
          //   correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【侧躺放置】、【平躺放置】或【竖向放置】',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        if (judgeResult == '侧躺放置' || judgeResult == '平躺放置' || judgeResult == '竖向放置') {
          if (judgeResult == '侧躺放置') {
            middle = 1
          }
          if (judgeResult == '平躺放置') {
            large = 1
          }
          if (judgeResult == '竖向放置') {
            small = 1
          }
          goto({ paragraph: judgeResult })
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变与接触面的面积',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '在改变与接触面的面积中选择了【' + judgeResult + '】',
          //   correctContent: '改变与接触面的面积中应选择改变放置方式的选项',
          //   isCorrect: true,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        if (judgeResult == 25 || judgeResult == 50 || judgeResult == 75 || judgeResult == 100) {
          cue()
          gravity = -2
          goto({ paragraph: '轻松拉货' })
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变与接触面的面积',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将物体的质量改变为' + judgeResult + 'kg',
          //   correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【侧躺放置】、【平躺放置】或【竖向放置】',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        if (judgeResult == 'matCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '嘿，这次改变了两个变量吗？将接触方式改变为了**' + storeData[0].area + '**，质量也变为了**' + storeData[0].mass + '**kg。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是物体接触面积与滑动摩擦力的关系。是不是除了物体接触面积外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        if (judgeResult == 'massCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '嘿，这次改变了两个变量吗？将接触方式改变为了**' + storeData[0].area + '**，接触面也变为了**' + storeData[0].mat + '**。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是物体接触面积与滑动摩擦力的关系。是不是除了物体接触面积外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        if (judgeResult == 'areaCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '嘿，这次改变了两个变量吗？将接触面改变为了**' + storeData[0].mat + '**，质量也变为了**' + storeData[0].mass + '**kg。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是物体接触面积与滑动摩擦力的关系。是不是除了物体接触面积外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        if (judgeResult == 'allCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '变量调整完毕！这次变量全都有所调整呢！我看到地面材质变成了**' + storeData[0].mat + '**，货物翻转为**' + storeData[0].area + '**，货物质量也进行了调整，变成了**' + storeData[0].mass + '**kg。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是物体接触面积与滑动摩擦力的关系。是不是除了物体接触面积外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        o2 = true
        scene.backToStart()
      })
      scene.mutate({ testPanel: test })
    },
  },

  //侧躺放置后跑步动画，并设置至少看3秒
  {
    paragraph: '侧躺放置',
    talk: 1,
    method: ({ next, scene }) => {
      scene.iceRun(getRunSpeed())
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '失败',
            force: '500',
            coefficient: '0.6',
            square: '5.4',
            mass: '100',
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
      scene.paramPanel.hide()
      if (large + middle + small >= 2) goto({ paragraph: '接触面积总结' })
      else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 'last' })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 'last' })
      }
    },
  },

  //竖向放置后跑步动画，并设置至少看3秒
  {
    paragraph: '竖向放置',
    talk: 1,
    method: ({ next, scene }) => {
      scene.iceRun(getRunSpeed())
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '失败',
            force: '500',
            coefficient: '0.6',
            square: '2.4',
            mass: '100',
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
      scene.paramPanel.hide()
      if (large + middle + small >= 2) goto({ paragraph: '接触面积总结' })
      else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 'last' })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 'last' })
      }
    },
  },

  //开始跑步并设置至少看3秒
  {
    paragraph: '平躺放置',
    talk: 1,
    method: ({ next, scene }) => {
      scene.iceRun(getRunSpeed())
      setTimeout(() => {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '失败',
            force: '500',
            coefficient: '0.6',
            square: '9',
            mass: '100',
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
      scene.paramPanel.hide()
      if (large + middle + small >= 2) goto({ paragraph: '接触面积总结' })
      else if (experAssume == 1) {
        goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      } else if (experAssume == 2) {
        goto({ paragraph: '改变与接触面的面积', talk: 'last' })
      } else if (experAssume == 3) {
        goto({ paragraph: '改变物体的质量', talk: 'last' })
      }
    },
  },

  //判断是否所有减小摩擦的方式都尝试过，如果都尝试过了就跳转到机器人吐槽段落，否则跳转到摩擦力是什么段落，并选择正确正确选项
  {
    paragraph: '接触面积总结',
    reply: { choice: 0, index: 'last' },
    method: ({ scene, goto }) => {
      if (o1 == true && o2 == true && o3 == true) goto({ paragraph: '机器人的吐槽' })
      else {
        goto({ paragraph: '摩擦力是什么' })
        // store.dispatch('user/submitBehavior', {
        //   kexperimentId: kexperimentId,
        //   name: '接触面积总结',
        //   type: 'BEHAVIOR_CHOICE',
        //   content: '摩擦力与物体接触面的面积无关',
        //   correctContent: '摩擦力与物体接触面的面积无关',
        //   isCorrect: true,
        //   success: (res) => {
        //     console.log(res);
        //   },
        //   failure: (res) => {
        //     console.log(res)
        //   },
        // })
        large = 0
        middle = 0
        small = 0
      }
      scene.targetPanel.hide()
    },
  },

  //判断是否所有减小摩擦的方式都尝试过，如果都尝试过了就跳转到机器人吐槽段落，否则跳转到摩擦力是什么段落，并选择错误选项
  {
    paragraph: '接触面积总结',
    reply: { choice: 1, index: 'last' },
    method: ({ scene, goto }) => {
      if (o1 == true && o2 == true && o3 == true) goto({ paragraph: '机器人的吐槽' })
      else {
        goto({ paragraph: '摩擦力是什么' })
        // store.dispatch('user/submitBehavior', {
        //   kexperimentId: kexperimentId,
        //   name: '接触面积总结',
        //   type: 'BEHAVIOR_CHOICE',
        //   content: '摩擦力与物体接触面的面积有关',
        //   correctContent: '摩擦力与物体接触面的面积无关',
        //   isCorrect: false,
        //   success: (res) => {
        //     console.log(res);
        //   },
        //   failure: (res) => {
        //     console.log(res)
        //   },
        // })
      }
      scene.targetPanel.hide()
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
    talk: 'last',
    method: ({ goto, scene, script }) => {
      const test = Dialog.create({
        component: testPage,
        disTestPage: false,
      }).onOk(async () => {
        let judgeResult = judgeOfAssume3.judge(o3)
        changeShape(scene)
        if (judgeResult == '荒地' || judgeResult == '草地' || judgeResult == '木板' || judgeResult == '冰面') {
          cue()
          goto({ paragraph: judgeResult })
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变物体的质量',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将地面改变为' + judgeResult,
          //   correctContent: '在该选项中，应该选择改变物体的质量的选项，调整质量',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        if (judgeResult == '侧躺放置' || judgeResult == '平躺放置' || judgeResult == '竖向放置') {
          cue()
          goto({ paragraph: judgeResult })
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变物体的质量',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '在改变与接触面的面积中选择了【' + judgeResult + '】',
          //   correctContent: '在该选项中，应该选择改变物体的质量的选项，调整质量',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        if (judgeResult == 25 || judgeResult == 50 || judgeResult == 75 || judgeResult == 100) {
          gravity = 1
          goto({ paragraph: '轻松拉货' })
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '改变物体的质量',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '将物体的质量改变为' + judgeResult + 'kg',
          //   correctContent: '改变物体的质量',
          //   isCorrect: true,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        if (judgeResult == 'matCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '嘿，这次改变了两个变量吗？将接触方式改变为了**' + storeData[0].area + '**，质量也变为了**' + storeData[0].mass + '**kg。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是物体质量与滑动摩擦力的关系。是不是除了物体质量外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        if (judgeResult == 'massCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '嘿，这次改变了两个变量吗？将接触方式改变为了**' + storeData[0].area + '**，接触面也变为了**' + storeData[0].mat + '**。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是物体质量与滑动摩擦力的关系。是不是除了物体质量外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        if (judgeResult == 'areaCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '嘿，这次改变了两个变量吗？将接触面改变为了**' + storeData[0].mat + '**，质量也变为了**' + storeData[0].mass + '**kg。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是物体质量与滑动摩擦力的关系。是不是除了物体质量外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        if (judgeResult == 'allCount') {
          console.log(script);
          script.paragraphs.find(e => e.id == '自由改变部分').talks[0] = '变量调整完毕！这次变量全都有所调整呢！我看到地面材质变成了**' + storeData[0].mat + '**，货物翻转为**' + storeData[0].area + '**，货物质量也进行了调整，变成了**' + storeData[0].mass + '**kg。'
          script.paragraphs.find(e => e.id == '自由改变部分').talks[2] = '虽然我们拉动了货物，可是...实验师，我们这次探究的是物体质量与滑动摩擦力的关系。是不是除了物体质量外，保证其他两个变量和之前一直才正确呢？'
          goto({ paragraph: '自由改变部分' })
        }
        o3 = true
        scene.backToStart()
      })
      scene.mutate({ testPanel: test })
    },
  },

  //根据刚才改变的质量设置跑步速度
  {
    paragraph: '轻松拉货',
    talk: 2,
    method: ({ next, scene }) => {
      let judgeResult = judgeOfAssume3.judge(true)
      if (judgeResult == 25) {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            force: '147',
            coefficient: '0.6',
            square: '5.4',
            mass: '25',
          }]
        })
        scene.mutate({ paramPanel: param })
        scene.iceRun(getRunSpeed())
      }
      else if (judgeResult == 50) {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            force: '294',
            coefficient: '0.6',
            square: '5.4',
            mass: '50',
          }]
        })
        scene.mutate({ paramPanel: param })
        scene.iceRun(getRunSpeed())
      }
      else if (judgeResult == 75) {
        const param = Dialog.create({
          component: paramPage,
          information: [{
            msg: '成功',
            force: '441',
            coefficient: '0.6',
            square: '5.4',
            mass: '75',
          }]
        })
        scene.mutate({ paramPanel: param })
        scene.iceRun(getRunSpeed())
      }
      setTimeout(() => {
        next()
      }, 4000)
    },
  },

  //退出参数页面
  {
    paragraph: '轻松拉货',
    reply: { choice: 'any', index: 0 },
    method: ({ next, scene }) => {
      scene.paramPanel.hide()
      next()
    }
  },

  //选择继续调节质量后跳转到重量调节器部分
  {
    paragraph: '轻松拉货',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      if (gravity == 1) goto({ paragraph: '改变物体的质量', talk: 'last' })
      if (gravity == -1) goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      if (gravity == -2) goto({ paragraph: '改变与接触面的面积', talk: 'last' })
    },
  },

  //跳转到质量总结部分
  {
    paragraph: '轻松拉货',
    reply: { choice: 1, index: 'last' },
    method: ({ goto }) => {
      if (gravity == 1) goto({ paragraph: '质量总结' })
      if (gravity == 0) goto({ paragraph: '改变物体的质量', talk: 'last' })
      if (gravity == -1) goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      if (gravity == -2) goto({ paragraph: '改变与接触面的面积', talk: 'last' })
    },
  },

  //在质量总结部分选择了正确答案
  {
    paragraph: '质量总结',
    reply: { choice: 0, index: 'last' },
    method: ({ next }) => {
      next()
      // store.dispatch('user/submitBehavior', {
      //   kexperimentId: kexperimentId,
      //   name: '质量总结',
      //   type: 'BEHAVIOR_CHOICE',
      //   content: '物体越轻，对地面的压力越小，摩擦力越小',
      //   correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
      //   isCorrect: true,
      //   success: (res) => {
      //     console.log(res);
      //   },
      //   failure: (res) => {
      //     console.log(res)
      //   },
      // })
    },
  },

  //在质量总结部分选择了错误答案
  {
    paragraph: '质量总结',
    reply: { choice: 1, index: 'last' },
    method: ({ next }) => {
      next()
      // store.dispatch('user/submitBehavior', {
      //   kexperimentId: kexperimentId,
      //   name: '质量总结',
      //   type: 'BEHAVIOR_CHOICE',
      //   content: '物体越轻，对地面的压力越小，摩擦力越大',
      //   correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
      //   isCorrect: false,
      //   success: (res) => {
      //     console.log(res);
      //   },
      //   failure: (res) => {
      //     console.log(res)
      //   },
      // })
    },
  },

  //判断是否所有改变摩擦力大小的方法都尝试过，如果都尝试过就跳转到机器人的吐槽段落，否则继续尝试其他方法
  {
    paragraph: '质量结束',
    talk: 'last',
    method: ({ goto, scene }) => {
      if (o1 == true && o2 == true && o3 == true) goto({ paragraph: '机器人的吐槽' })
      else {
        goto({ paragraph: '摩擦力是什么' })
        gravity = 0
      }
      scene.targetPanel.hide()
    },
  },

  //最后的总结题目
  {
    paragraph: '总结任务1',
    talk: 0,
    method: ({ next, scene }) => {
      const question = Dialog.create({
        title: '关于物体之间接触面的粗糙程度与摩擦力大小关系说法正确的是?( )',
        options: {
          type: 'radio',
          model: '',
          items: [
            { label: '接触面粗糙程度与摩擦力大小无关', value: 'rough1' },
            { label: '接触面越光滑，摩擦力越小', value: 'rough2' },
            { label: '接触面越粗糙，摩擦力越小', value: 'rough3' },
          ],
        },
        persistent: true
      }).onOk((value) => {
        if (value == 'rough2') {
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '接触面的粗糙程度与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面越光滑，摩擦力越小',
          //   correctContent: '接触面越光滑，摩擦力越小',
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
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '接触面的粗糙程度与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面粗糙程度与摩擦力大小无关',
          //   correctContent: '接触面越光滑，摩擦力越小',
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
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '接触面的粗糙程度与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面越粗糙，摩擦力越小',
          //   correctContent: '接触面越光滑，摩擦力越小',
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
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '接触面的粗糙程度与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '未选择选项',
          //   correctContent: '接触面越光滑，摩擦力越小',
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
    method: ({ next, scene }) => {
      const question = Dialog.create({
        title: '关于物体之间接触面的面积大小与摩擦力大小关系说法正确的是?( )',
        options: {
          type: 'radio',
          model: '',
          items: [
            { label: '接触面的面积大小与摩擦力大小无关', value: 'area1' },
            { label: '接触面越大，摩擦力越小', value: 'area2' },
            { label: '接触面越小，摩擦力越小', value: 'area3' },
          ],
        },
        persistent: true,
      }).onOk((value) => {
        if (value == 'area1') {
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '物体之间接触面的面积大小与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面的面积大小与摩擦力大小无关',
          //   correctContent: '接触面的面积大小与摩擦力大小无关',
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
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '物体之间接触面的面积大小与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面越大，摩擦力越小',
          //   correctContent: '接触面的面积大小与摩擦力大小无关',
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
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '物体之间接触面的面积大小与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '接触面越小，摩擦力越小',
          //   correctContent: '接触面的面积大小与摩擦力大小无关',
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
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '物体之间接触面的面积大小与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '未选择选项',
          //   correctContent: '接触面的面积大小与摩擦力大小无关',
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
    method: ({ goto, scene }) => {
      const question = Dialog.create({
        title: '关于物体给予接触面的压力大小与摩擦力大小关系说法正确的是?( )',
        options: {
          type: 'radio',
          model: '',
          items: [
            { label: '物体给予接触面的压力大小与摩擦力大小无关', value: 'pressure1' },
            { label: '物体越轻，对地面的压力越小，摩擦力越小', value: 'pressure2' },
            { label: '物体越重，对地面的压力越大，摩擦力越小', value: 'pressure3' },
          ],
        },
        persistent: true,
      }).onOk((value) => {
        if (value == 'pressure2') {
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '物体给予接触面的压力大小与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '物体越轻，对地面的压力越小，摩擦力越小',
          //   correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
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
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '物体给予接触面的压力大小与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '物体给予接触面的压力大小与摩擦力大小无关',
          //   correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
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
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '物体给予接触面的压力大小与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '物体越重，对地面的压力越大，摩擦力越小',
          //   correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
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
          // store.dispatch('user/submitBehavior', {
          //   kexperimentId: kexperimentId,
          //   name: '物体给予接触面的压力大小与摩擦力大小关系',
          //   type: 'BEHAVIOR_CHOICE',
          //   content: '未选择选项',
          //   correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
          //   isCorrect: false,
          //   success: (res) => {
          //     console.log(res);
          //   },
          //   failure: (res) => {
          //     console.log(res)
          //   },
          // })
        }
        goto({ paragraph: '结局' })
      })
      scene.mutate({ questionPanel: question })
    },
  },

  //结束，传一个结束的数据
  {
    paragraph: '结局',
    reply: { choice: 'any', index: 'last' },
    method: ({ next, scene }) => {
      // store.dispatch('user/finishKexperiment', {
      //   kexperimentId: kexperimentId,
      //   success: (res) => {
      //     console.log(res);
      //   },
      //   failure: (res) => {
      //     console.log(res)
      //   },
      // })
      const free = Dialog.create({
        component: FreeInquiry,
        hintInfo: '使用右侧的工具栏自由地进行实验探究吧！',
        kexperimentId: kexperimentId,
      }).onOk(() => {
        console.log(111);
      })
      scene.mutate({ FreeInquiryPanel: free })
      next()
    },
  },

  {
    paragraph: '自由探究',
    talk: 0,
    method: ({ scene, goto }) => {
      const freeTest = Dialog.create({
        component: testPage,
        disTestPage: false,
      }).onOk(() => {
        changeShape(scene)
        scene.iceRun(getRunSpeed())
        setTimeout(() => {
          goto({ paragraph: '自由探究' })
        }, 4000);
        scene.backToStart()
      })
      scene.mutate({ freeTestPanel: freeTest })
    },
  },
  {
    paragraph: '自由改变部分',
    talk: 1,
    method: ({ scene, next }) => {
      changeShape(scene)
      scene.iceRun(getRunSpeed())
      setTimeout(() => {
        next()
      }, 4000);

    }
  },
  {
    paragraph: '自由改变部分',
    talk: 2,
    method: ({ goto, scene }) => {
      Notify.create({
        message: '请使用控制变量法来进行探究',
        position: 'center',
        type: 'negative',
        timeout: 3500,
        actions: [{ label: 'x', color: 'white', handler: () => { } }]
      })
      // if (storeData[0].area == '平躺放置')
      //   scene.reLargeArea()
      // if (storeData[0].area == '竖向放置')
      //   scene.reSmallArea()
      if (experAssume == 1)
        goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
      if (experAssume == 2)
        goto({ paragraph: '改变与接触面的面积', talk: 'last' })
      if (experAssume == 3)
        goto({ paragraph: '改变物体的质量', talk: 'last' })
    }
  },
]
