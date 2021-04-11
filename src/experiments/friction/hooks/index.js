import { Dialog } from 'quasar'
import storeData from '../2d/storeData'
import woodjpg from '../2d/assets/wood.jpg'
import grasspng from '../2d/assets/grass.png'
import icejpg from '../2d/assets/ice.jpg'
import initGround from '../2d/assets/initGround.png'
import assumePage from '../2d/assumePage'
import targetPage from '../2d/targetPage'
import testPage from '../2d/testPage'
import store from '../../../store'

let o1 = false
let o2 = false
let o3 = false
let grass = 0
let wood = 0
let ice = 0
let large = 0
let small = 0
let gravity = 0
let kexperimentId = 0

export default [
  //开始实验，并获取kexperimentId
  {
    paragraph: '原因分析',
    talk: 0,
    method: ({ next }) => {
      store.dispatch('user/startExperiment', {
        experimentId: 9,
        success: (res) => {
          kexperimentId = res.kexperimentId
          console.log(kexperimentId);
        },
        failure: (res) => {
          console.log(res)
        },
      })
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
        showAssume: true,
      }).onOk(async () => {
        if (storeData[0] == 'op1') {
          o1 = true
          goto({ paragraph: '改变接触面粗糙程度' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '如何降低摩擦力',
            type: 'BEHAVIOR_ASSUMPTION',
            content: '认为【改变接触面粗糙程度】可以降低摩擦力',
            correctContent: '认为【改变接触面粗糙程度】可以降低摩擦力',
            isCorrect: '',
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        } else if (storeData[0] == 'op2') {
          o2 = true
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
          o3 = true
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
        showButton: false,
        showTarget: true,
      })
      scene.mutate({ targetPanel: target })
      next()
    },
  },

  //创建工具箱，并作为跳转的跳板
  {
    paragraph: '改变接触面粗糙程度',
    talk: 'last',
    method: ({ scene, goto }) => {
      const test = Dialog.create({
        component: testPage,
        showTest: true,
        showButton: false,
      }).onOk(async () => {
        if (storeData[0] == 'grass') {
          grass = 1
          scene.changeGround(grasspng)
          goto({ paragraph: '草地' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变接触面粗糙程度',
            type: 'BEHAVIOR_CHOICE',
            content: '草地',
            correctContent: '改变接触面粗糙程度中选择了【草地】',
            isCorrect: true,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'wood') {
          wood = 1
          scene.changeGround(woodjpg)
          goto({ paragraph: '木板' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变接触面粗糙程度',
            type: 'BEHAVIOR_CHOICE',
            content: '木板',
            correctContent: '改变接触面粗糙程度中选择了【木板】',
            isCorrect: true,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'ice') {
          ice = 1
          scene.changeGround(icejpg)
          goto({ paragraph: '冰面' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变接触面粗糙程度',
            type: 'BEHAVIOR_CHOICE',
            correctContent: '改变接触面粗糙程度中选择了【冰面】',
            content: '冰面',
            isCorrect: true,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'large') {
          scene.largeArea()
          goto({ paragraph: '增大接触面积' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变接触面粗糙程度',
            type: 'BEHAVIOR_CHOICE',
            content: '增大接触面积',
            correctContent: '在该选项中，应该选择改变地面粗糙程度的选项',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'small') {
          scene.smallArea()
          goto({ paragraph: '减小接触面积' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变接触面粗糙程度',
            type: 'BEHAVIOR_CHOICE',
            content: '减小接触面积',
            correctContent: '在该选项中，应该选择改变地面粗糙程度的选项',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 1 || storeData[0] == 2 || storeData[0] == 3) {
          gravity = -1
          goto({ paragraph: '轻松拉货' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变接触面粗糙程度',
            type: 'BEHAVIOR_CHOICE',
            content: '改变物体的质量',
            correctContent: '在该选项中，应该选择改变地面粗糙程度的选项',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        scene.backToStart()
      })
      scene.mutate({ testPanel: test })
    },
  },

  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '草地',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.runStart()
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
      scene.runStop()
      next()
    },
  },

  //判断是否所有地面都选择过，如果选择过跳转到接触面总结段落，不然就继续改变接触面段落
  {
    paragraph: '草地后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.changeGround(initGround)
      if (grass == 1 && wood == 1 && ice == 1) {
        goto({ paragraph: '接触面总结' })
        grass = 0
        wood = 0
        ice = 0
      } else goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
    },
  },

  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '木板',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.woodRun(0.02)
      setTimeout(() => {
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
      if (grass == 1 && wood == 1 && ice == 1) {
        goto({ paragraph: '接触面总结' })
        grass = 0
        wood = 0
        ice = 0
      } else goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
    },
  },

  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '冰面',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.iceRun(0.08)
      setTimeout(() => {
        goto({ paragraph: '冰面后' })
      }, 6000)
    },
  },

  //判断是否所有地面都选择过，如果选择过跳转到接触面总结段落，不然就继续改变接触面段落
  {
    paragraph: '冰面后',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.changeGround(initGround)
      if (grass == 1 && wood == 1 && ice == 1) {
        goto({ paragraph: '接触面总结' })
        grass = 0
        wood = 0
        ice = 0
      } else goto({ paragraph: '改变接触面粗糙程度', talk: 'last' })
    },
  },

  //选项判断，进入不同剧情
  {
    paragraph: '接触面总结',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面正确结束' })
      store.dispatch('user/submitBehavior', {
        kexperimentId: kexperimentId,
        name: '接触面总结',
        type: 'BEHAVIOR_CHOICE',
        content: '接触面越光滑，摩擦力越小',
        correctContent: '接触面越光滑，摩擦力越小',
        isCorrect: true,
        success: (res) => {
          console.log(res);
        },
        failure: (res) => {
          console.log(res)
        },
      })
    },
  },

  //选项判断，进入不同剧情
  {
    paragraph: '接触面总结',
    reply: { choice: 1, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面回答错误' })
      store.dispatch('user/submitBehavior', {
        kexperimentId: kexperimentId,
        name: '接触面总结',
        type: 'BEHAVIOR_CHOICE',
        content: '接触面越光滑，摩擦力越大',
        correctContent: '接触面越光滑，摩擦力越小',
        isCorrect: false,
        success: (res) => {
          console.log(res);
        },
        failure: (res) => {
          console.log(res)
        },
      })
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
        showButton: false,
        showTarget: true,
      })
      scene.mutate({ targetPanel: target })
      next()
    },
  },

  //创建工具箱，并作为跳转的跳板
  {
    paragraph: '改变与接触面的面积',
    talk: 'last',
    method: ({ goto, scene }) => {
      const test = Dialog.create({
        component: testPage,
        showTest: true,
      }).onOk(async () => {
        if (storeData[0] == 'grass') {
          scene.changeGround(grasspng)
          goto({ paragraph: '草地' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变与接触面的面积',
            type: 'BEHAVIOR_CHOICE',
            content: '草地',
            correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'wood') {
          scene.changeGround(woodjpg)
          goto({ paragraph: '木板' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变与接触面的面积',
            type: 'BEHAVIOR_CHOICE',
            content: '木板',
            correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'ice') {
          scene.changeGround(icejpg)
          goto({ paragraph: '冰面' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变与接触面的面积',
            type: 'BEHAVIOR_CHOICE',
            content: '冰面',
            correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'large') {
          large = 1
          scene.largeArea()
          goto({ paragraph: '增大接触面积' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变与接触面的面积',
            type: 'BEHAVIOR_CHOICE',
            content: '增大接触面积',
            correctContent: '改变与接触面的面积中选择了【增大接触面积】',
            isCorrect: true,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'small') {
          small = 1
          scene.smallArea()
          goto({ paragraph: '减小接触面积' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变与接触面的面积',
            type: 'BEHAVIOR_CHOICE',
            content: '减小接触面积',
            correctContent: '改变与接触面的面积中选择了【减小接触面积】',
            isCorrect: true,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 1 || storeData[0] == 2 || storeData[0] == 3) {
          gravity = -2
          goto({ paragraph: '轻松拉货' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变与接触面的面积',
            type: 'BEHAVIOR_CHOICE',
            content: '改变物体的质量',
            correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
      })
      scene.mutate({ testPanel: test })
    },
  },

  //减小接触面积后跑步动画，并设置至少看3秒
  {
    paragraph: '减小接触面积',
    talk: 1,
    method: ({ next, scene }) => {
      scene.runStart()
      setTimeout(() => {
        next()
      }, 3000)
    },
  },

  //停止跑步，并作为跳转的跳板
  {
    paragraph: '减小接触面积',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.reSmallArea()
      scene.runStop()
      if (large == 1 && small == 1) goto({ paragraph: '接触面积总结' })
      else {
        const test = Dialog.create({
          component: testPage,
          showTest: true,
        }).onOk(async () => {
          if (storeData[0] == 'grass') {
            scene.changeGround(grasspng)
            goto({ paragraph: '草地' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '草地',
              correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
              isCorrect: false,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 'wood') {
            scene.changeGround(woodjpg)
            goto({ paragraph: '木板' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '木板',
              correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
              isCorrect: false,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 'ice') {
            scene.changeGround(icejpg)
            goto({ paragraph: '冰面' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '冰面',
              correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
              isCorrect: false,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 'large') {
            large = 1
            scene.largeArea()
            goto({ paragraph: '增大接触面积' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '增大接触面积',
              correctContent: '改变与接触面的面积中选择了【增大接触面积】',
              isCorrect: true,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 'small') {
            small = 1
            scene.smallArea()
            goto({ paragraph: '减小接触面积' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '减小接触面积',
              correctContent: '改变与接触面的面积中选择了【减小接触面积】',
              isCorrect: true,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 1 || storeData[0] == 2 || storeData[0] == 3) {
            gravity = -2
            goto({ paragraph: '轻松拉货' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '改变物体的质量',
              correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
              isCorrect: false,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          scene.backToStart()
        })
        scene.mutate({ testPanel: test })
      }
    },
  },

  //开始跑步并设置至少看3秒
  {
    paragraph: '增大接触面积',
    talk: 1,
    method: ({ next, scene }) => {
      scene.runStart()
      setTimeout(() => {
        next()
      }, 3000)
    },
  },

  //停止跑步，并作为跳转的跳板
  {
    paragraph: '增大接触面积',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.runStop()
      scene.reLargeArea()
      if (large == 1 && small == 1) goto({ paragraph: '接触面积总结' })
      else {
        const test = Dialog.create({
          component: testPage,
          showTest: true,
        }).onOk(async () => {
          if (storeData[0] == 'grass') {
            scene.changeGround(grasspng)
            goto({ paragraph: '草地' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '草地',
              correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
              isCorrect: false,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 'wood') {
            scene.changeGround(woodjpg)
            goto({ paragraph: '木板' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '木板',
              correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
              isCorrect: false,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 'ice') {
            scene.changeGround(icejpg)
            goto({ paragraph: '冰面' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '冰面',
              correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
              isCorrect: false,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 'large') {
            large = 1
            scene.largeArea()
            goto({ paragraph: '增大接触面积' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '增大接触面积',
              correctContent: '改变与接触面的面积中选择了【增大接触面积】',
              isCorrect: true,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 'small') {
            small = 1
            scene.smallArea()
            goto({ paragraph: '减小接触面积' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '减小接触面积',
              correctContent: '改变与接触面的面积中选择了【减小接触面积】',
              isCorrect: true,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          if (storeData[0] == 1 || storeData[0] == 2 || storeData[0] == 3) {
            gravity = -2
            goto({ paragraph: '轻松拉货' })
            store.dispatch('user/submitBehavior', {
              kexperimentId: kexperimentId,
              name: '改变与接触面的面积',
              type: 'BEHAVIOR_CHOICE',
              content: '改变物体的质量',
              correctContent: '在该选项中，应该选择改变与接触面的面积的选项，【增大接触面积】或【减小接触面积】',
              isCorrect: false,
              success: (res) => {
                console.log(res);
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          scene.backToStart()
        })
        scene.mutate({ testPanel: test })
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
        store.dispatch('user/submitBehavior', {
          kexperimentId: kexperimentId,
          name: '接触面积总结',
          type: 'BEHAVIOR_CHOICE',
          content: '摩擦力与物体接触面的面积无关',
          correctContent: '摩擦力与物体接触面的面积无关',
          isCorrect: true,
          success: (res) => {
            console.log(res);
          },
          failure: (res) => {
            console.log(res)
          },
        })
        large = 0
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
        store.dispatch('user/submitBehavior', {
          kexperimentId: kexperimentId,
          name: '接触面积总结',
          type: 'BEHAVIOR_CHOICE',
          content: '摩擦力与物体接触面的面积有关',
          correctContent: '摩擦力与物体接触面的面积无关',
          isCorrect: false,
          success: (res) => {
            console.log(res);
          },
          failure: (res) => {
            console.log(res)
          },
        })
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
        showButton: false,
        showTarget: true,
      })
      scene.mutate({ targetPanel: target })
      next()
    },
  },

  //创建工具箱，并作为跳转的跳板
  {
    paragraph: '改变物体的质量',
    talk: 'last',
    method: ({ goto, scene }) => {
      const test = Dialog.create({
        component: testPage,
        showTest: true,
      }).onOk(async () => {
        if (storeData[0] == 'grass') {
          scene.changeGround(grasspng)
          goto({ paragraph: '草地' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变物体的质量',
            type: 'BEHAVIOR_CHOICE',
            content: '草地',
            correctContent: '在该选项中，应该选择改变物体的质量的选项，调整质量',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'wood') {
          scene.changeGround(woodjpg)
          goto({ paragraph: '木板' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变物体的质量',
            type: 'BEHAVIOR_CHOICE',
            content: '草地',
            correctContent: '在该选项中，应该选择改变物体的质量的选项，调整质量',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'ice') {
          scene.changeGround(icejpg)
          goto({ paragraph: '冰面' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变物体的质量',
            type: 'BEHAVIOR_CHOICE',
            content: '草地',
            correctContent: '在该选项中，应该选择改变物体的质量的选项，调整质量',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'large') {
          scene.largeArea()
          goto({ paragraph: '增大接触面积' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变物体的质量',
            type: 'BEHAVIOR_CHOICE',
            content: '草地',
            correctContent: '在该选项中，应该选择改变物体的质量的选项，调整质量',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 'small') {
          scene.smallArea()
          goto({ paragraph: '减小接触面积' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变物体的质量',
            type: 'BEHAVIOR_CHOICE',
            content: '草地',
            correctContent: '在该选项中，应该选择改变物体的质量的选项，调整质量',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        if (storeData[0] == 1 || storeData[0] == 2 || storeData[0] == 3) {
          gravity = 1
          goto({ paragraph: '轻松拉货' })
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '改变物体的质量',
            type: 'BEHAVIOR_CHOICE',
            content: '调整质量',
            correctContent: '在该选项中，应该选择改变物体的质量的选项，调整质量',
            isCorrect: true,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
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
      if (storeData[0] == 1) scene.iceRun(0.08)
      else if (storeData[0] == 2) scene.iceRun(0.06)
      else if (storeData[0] == 3) scene.iceRun(0.04)
      setTimeout(() => {
        next()
      }, 4000)
    },
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
      store.dispatch('user/submitBehavior', {
        kexperimentId: kexperimentId,
        name: '质量总结',
        type: 'BEHAVIOR_CHOICE',
        content: '物体越轻，对地面的压力越小，摩擦力越小',
        correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
        isCorrect: true,
        success: (res) => {
          console.log(res);
        },
        failure: (res) => {
          console.log(res)
        },
      })
    },
  },

  //在质量总结部分选择了错误答案
  {
    paragraph: '质量总结',
    reply: { choice: 1, index: 'last' },
    method: ({ next }) => {
      next()
      store.dispatch('user/submitBehavior', {
        kexperimentId: kexperimentId,
        name: '质量总结',
        type: 'BEHAVIOR_CHOICE',
        content: '物体越轻，对地面的压力越小，摩擦力越大',
        correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
        isCorrect: false,
        success: (res) => {
          console.log(res);
        },
        failure: (res) => {
          console.log(res)
        },
      })
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
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '接触面的粗糙程度与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '接触面越光滑，摩擦力越小',
            correctContent: '接触面越光滑，摩擦力越小',
            isCorrect: true,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        else if (value == 'rough1') {
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '接触面的粗糙程度与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '接触面粗糙程度与摩擦力大小无关',
            correctContent: '接触面越光滑，摩擦力越小',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        else if (value == 'rough3') {
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '接触面的粗糙程度与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '接触面越粗糙，摩擦力越小',
            correctContent: '接触面越光滑，摩擦力越小',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        else {
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '接触面的粗糙程度与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '未选择选项',
            correctContent: '接触面越光滑，摩擦力越小',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
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
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '物体之间接触面的面积大小与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '接触面的面积大小与摩擦力大小无关',
            correctContent: '接触面的面积大小与摩擦力大小无关',
            isCorrect: true,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        else if (value == 'area2') {
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '物体之间接触面的面积大小与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '接触面越大，摩擦力越小',
            correctContent: '接触面的面积大小与摩擦力大小无关',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        else if (value == 'area3') {
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '物体之间接触面的面积大小与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '接触面越小，摩擦力越小',
            correctContent: '接触面的面积大小与摩擦力大小无关',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        else {
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '物体之间接触面的面积大小与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '未选择选项',
            correctContent: '接触面的面积大小与摩擦力大小无关',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
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
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '物体给予接触面的压力大小与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '物体越轻，对地面的压力越小，摩擦力越小',
            correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
            isCorrect: true,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        else if (value == 'pressure1') {
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '物体给予接触面的压力大小与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '物体给予接触面的压力大小与摩擦力大小无关',
            correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        else if (value == 'pressure3') {
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '物体给予接触面的压力大小与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '物体越重，对地面的压力越大，摩擦力越小',
            correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        else {
          store.dispatch('user/submitBehavior', {
            kexperimentId: kexperimentId,
            name: '物体给予接触面的压力大小与摩擦力大小关系',
            type: 'BEHAVIOR_CHOICE',
            content: '未选择选项',
            correctContent: '物体越轻，对地面的压力越小，摩擦力越小',
            isCorrect: false,
            success: (res) => {
              console.log(res);
            },
            failure: (res) => {
              console.log(res)
            },
          })
        }
        goto({ paragraph: '结局' })
      })
      scene.mutate({ questionPanel: question })
    },
  },

  //结束，传一个结束的数据
  {
    paragraph: '结局',
    talk: 0,
    method: ({ next }) => {
      store.dispatch('user/finishKexperiment', {
        kexperimentId: kexperimentId,
        success: (res) => {
          console.log(res);
        },
        failure: (res) => {
          console.log(res)
        },
      })
      next()
    },
  },
]
