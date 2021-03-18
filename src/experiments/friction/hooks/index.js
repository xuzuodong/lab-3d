import { Dialog } from 'quasar'
import storeData from '../2d/storeData'
import woodjpg from '../2d/assets/wood.jpg'
import grasspng from '../2d/assets/grass.png'
import icejpg from '../2d/assets/ice.jpg'
import gravitySlider from '../2d/gravitySlider'

let howToDecrease = 0
let roughCount = 0

export default [
  //开始跑步
  {
    paragraph: '初始画面',
    talk: 0,
    method: ({ next, scene }) => {
      scene.runStart().then(() => next())
    },
  },

  //结束跑步
  {
    paragraph: '初始画面',
    choice: 'any',
    method: ({ next, scene }) => {
      scene.runStop().then(() => next())
    },
  },

  //隐藏地面粗糙的选项
  {
    paragraph: '摩擦力是什么',
    choice: 0,
    method: ({ next, hideChoice }) => {
      howToDecrease++
      hideChoice()
      next()
    },
  },

  //在选择地面粗糙程度的选项后，跳转到改变接触面粗糙程度段落
  {
    paragraph: '摩擦力是什么',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '改变接触面粗糙程度' })
    },
  },

  //隐藏接触面积的选项
  {
    paragraph: '摩擦力是什么',
    choice: 1,
    method: ({ next, hideChoice }) => {
      howToDecrease++
      hideChoice()
      next()
    },
  },

  //在选择接触面积的选项后，跳转到改变接触面积程度段落
  {
    paragraph: '摩擦力是什么',
    reply: { choice: 1, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '改变与接触面的面积' })
    },
  },

  //隐藏改变质量的选项
  {
    paragraph: '摩擦力是什么',
    choice: 2,
    method: ({ next, hideChoice }) => {
      howToDecrease++
      hideChoice()
      next()
    },
  },

  //在选择质量的选项后，跳转到改变质量段落
  {
    paragraph: '摩擦力是什么',
    reply: { choice: 2, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '改变物体的质量' })
    },
  },

  //选择草地选项并跳转到草地段落
  {
    paragraph: '改变接触面粗糙程度',
    choice: 0,
    method: ({ goto, scene, hideChoice }) => {
      roughCount++
      scene.changeGround(grasspng)
      hideChoice()
      goto({ paragraph: '草地' })
    },
  },

  //使机器人跑起来并跳转到跑步后的段落
  {
    paragraph: '草地',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.runStart()
      goto({ paragraph: '草地后' })
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
    method: ({ goto }) => {
      if (roughCount == 3) goto({ paragraph: '接触面总结' })
      else goto({ paragraph: '改变接触面粗糙程度' })
    },
  },

  //选择木板选项并跳转到木板段落
  {
    paragraph: '改变接触面粗糙程度',
    choice: 1,
    method: ({ scene, hideChoice, goto }) => {
      roughCount++
      scene.changeGround(woodjpg)
      hideChoice()
      goto({ paragraph: '木板' })
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
    method: ({ goto }) => {
      if (roughCount == 3) goto({ paragraph: '接触面总结' })
      else goto({ paragraph: '改变接触面粗糙程度' })
    },
  },

  //选择冰面选项并跳转到冰面段落
  {
    paragraph: '改变接触面粗糙程度',
    choice: 2,
    method: ({ scene, goto, hideChoice }) => {
      roughCount++
      scene.changeGround(icejpg)
      hideChoice()
      goto({ paragraph: '冰面' })
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
    method: ({ goto }) => {
      if (roughCount == 3) goto({ paragraph: '接触面总结' })
      else goto({ paragraph: '改变接触面粗糙程度' })
    },
  },

  //选项判断，进入不同剧情
  {
    paragraph: '接触面总结',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面正确结束' })
    },
  },

  //选项判断，进入不同剧情
  {
    paragraph: '接触面总结',
    reply: { choice: 1, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面回答错误' })
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
    method: ({ goto }) => {
      if (howToDecrease == 3) goto({ paragraph: '机器人的吐槽' })
      else goto({ paragraph: '摩擦力是什么' })
    },
  },

  //减小接触面积并跳转到相应段落
  {
    paragraph: '改变与接触面的面积',
    reply: { choice: 0, index: 'last' },
    method: ({ goto, scene }) => {
      scene.smallArea()
      goto({ paragraph: '减小接触面积' })
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

  //停止跑步
  {
    paragraph: '减小接触面积',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.runStop()
      next()
    },
  },

  //增大接触面积并跳转到相应段落
  {
    paragraph: '减小接触面积',
    reply: { choice: 0, index: 0 },
    method: ({ goto, scene }) => {
      scene.largeArea()
      goto({ paragraph: '增大接触面积1' })
    },
  },

  //开始跑步并设置至少看3秒
  {
    paragraph: '增大接触面积1',
    talk: 1,
    method: ({ next, scene }) => {
      scene.runStart()
      setTimeout(() => {
        next()
      }, 3000)
    },
  },

  //停止跑步
  {
    paragraph: '增大接触面积1',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.runStop()
      next()
    },
  },

  //跳转到相应段落
  {
    paragraph: '增大接触面积1',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面积总结' })
    },
  },

  //增大接触面积，并跳转到相应段落
  {
    paragraph: '改变与接触面的面积',
    reply: { choice: 1, index: 'last' },
    method: ({ goto, scene }) => {
      scene.largeArea()
      goto({ paragraph: '增大接触面积' })
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

  //停止跑步
  {
    paragraph: '增大接触面积',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.runStop()
      next()
    },
  },

  //减小接触面积并跳转到相应段落
  {
    paragraph: '增大接触面积',
    reply: { choice: 0, index: 'last' },
    method: ({ goto, scene }) => {
      scene.changeArea()
      goto({ paragraph: '减小接触面积1' })
    },
  },

  //开始跑步并设置至少看3秒
  {
    paragraph: '减小接触面积1',
    talk: 1,
    method: ({ next, scene }) => {
      scene.runStart()
      setTimeout(() => {
        next()
      }, 3000)
    },
  },

  //停止跑步
  {
    paragraph: '减小接触面积1',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.runStop()
      next()
    },
  },

  //跳转到相应段落
  {
    paragraph: '减小接触面积1',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面积总结' })
    },
  },

  //判断是否所有减小摩擦的方式都尝试过，如果都尝试过了就跳转到机器人吐槽段落，否则跳转到摩擦力是什么段落
  {
    paragraph: '接触面积总结',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      if (howToDecrease == 3) goto({ paragraph: '机器人的吐槽' })
      else goto({ paragraph: '摩擦力是什么' })
    },
  },

  //调用质量调节器，改变质量
  {
    paragraph: '重量调节器',
    talk: 'last',
    method: ({ goto }) => {
      Dialog.create({
        component: gravitySlider,
        showSlider: true,
      }).onOk(async () => {
        await goto({ paragraph: '轻松拉货' })
      })
    }
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
      }, 4000);
    },
  },

  //选择继续调节质量后跳转到重量调节器部分
  {
    paragraph: '轻松拉货',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '重量调节器' })
    },
  },

  //跳转到质量总结部分
  {
    paragraph: '轻松拉货',
    reply: { choice: 1, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '质量总结' })
    },
  },

  //判断是否所有改变摩擦力大小的方法都尝试过，如果都尝试过就跳转到机器人的吐槽段落，否则继续尝试其他方法
  {
    paragraph: '质量结束',
    talk: 'last',
    method: ({ goto }) => {
      if (howToDecrease == 3) goto({ paragraph: '机器人的吐槽' })
      else goto({ paragraph: '摩擦力是什么' })
    },
  },

  //最后的总结题目
  {
    paragraph: '总结任务1',
    talk: 0,
    method: ({ next }) => {
      Dialog.create({
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
        persistent: true,
      })
        .onOk(() => {
          next()
        })
    },
  },

  //最后的总结题目
  {
    paragraph: '总结任务2',
    talk: 0,
    method: ({ next }) => {
      Dialog.create({
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
      })
        .onOk(() => {
          next()
        })
    },
  },

  //最后的总结题目
  {
    paragraph: '总结任务3',
    talk: 0,
    method: ({ goto }) => {
      Dialog.create({
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
      })
        .onOk(() => {
          goto({ paragraph: '结局' })
        })
    },
  },
]