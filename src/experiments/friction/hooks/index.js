import { Dialog } from 'quasar'
import woodjpg from '../2d/assets/wood.jpg'
import grasspng from '../2d/assets/grass.png'
import icejpg from '../2d/assets/ice.jpg'
import actions from '../3d/actions'
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

  //隐藏选择的选项，并跳转到对应的地方

  // {
  //   paragraph: '摩擦力是什么',
  //   reply: { choice: 'any', index: 'last' },
  //   method: ({ hideChoice, goto, chosen }) => {
  //     howToDecrease++
  //     hideChoice()
  //     if (chosen == 0)
  //       goto({ paragraph: '改变接触面粗糙程度' })
  //     else if (chosen == 1)
  //       goto({ paragraph: '改变与接触面的面积' })
  //     else if (chosen == 2)
  //       goto({ paragraph: '改变物体的质量' })
  //   },
  // },

  {
    paragraph: '摩擦力是什么',
    choice: 0,
    method: ({ next, hideChoice }) => {
      howToDecrease++
      hideChoice()
      next()
    },
  },
  {
    paragraph: '摩擦力是什么',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '改变接触面粗糙程度' })
    },
  },
  {
    paragraph: '摩擦力是什么',
    choice: 1,
    method: ({ next, hideChoice }) => {
      howToDecrease++
      hideChoice()
      next()
    },
  },
  {
    paragraph: '摩擦力是什么',
    reply: { choice: 1, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '改变与接触面的面积' })
    },
  },
  {
    paragraph: '摩擦力是什么',
    choice: 2,
    method: ({ next, hideChoice }) => {
      howToDecrease++
      hideChoice()
      next()
    },
  },
  {
    paragraph: '摩擦力是什么',
    reply: { choice: 2, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '改变物体的质量' })
    },
  },

  //接触面选项

  // {
  //   paragraph: '改变接触面粗糙程度',
  //   choice: 'any',
  //   method: ({ next, chosen, scene }) => {
  //     roughCount++
  //     next.hideChoice()
  //     if (chosen == 0) {
  //       scene.changeGround(grasspng)
  //       next.goto({ paragraph: '草地' })
  //     }
  //     else if (chosen == 1) {
  //       scene.changeGround(woodjpg)
  //       next.goto({ paragraph: '木板' })
  //     }
  //     else if (chosen == 2) {
  //       scene.changeGround(icejpg)
  //       next.goto({ paragraph: '冰面' })
  //     }
  //   },
  // },

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
  {
    paragraph: '草地',
    talk: 'last',
    method: ({ goto, scene }) => {
      scene.runStart()
      goto({ paragraph: '草地后' })
    },
  },
  {
    paragraph: '草地后',
    talk: 2,
    method: ({ next, scene }) => {
      scene.runStop()
      next()
    },
  },
  {
    paragraph: '草地后',
    talk: 'last',
    method: ({ goto }) => {
      if (roughCount == 3) goto({ paragraph: '接触面总结' })
      else goto({ paragraph: '改变接触面粗糙程度' })
    },
  },
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
  {
    paragraph: '木板后',
    talk: 'last',
    method: ({ goto }) => {
      if (roughCount == 3) goto({ paragraph: '接触面总结' })
      else goto({ paragraph: '改变接触面粗糙程度' })
    },
  },
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
  {
    paragraph: '冰面后',
    talk: 'last',
    method: ({ goto }) => {
      if (roughCount == 3) goto({ paragraph: '接触面总结' })
      else goto({ paragraph: '改变接触面粗糙程度' })
    },
  },
  {
    paragraph: '接触面总结',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面正确结束' })
    },
  },
  {
    paragraph: '接触面总结',
    reply: { choice: 1, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面回答错误' })
    },
  },
  {
    paragraph: '接触面回答错误',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面正确结束' })
    },
  },
  {
    paragraph: '接触面正确结束',
    talk: 'last',
    method: ({ goto }) => {
      if (howToDecrease == 3) goto({ paragraph: '机器人的吐槽' })
      else goto({ paragraph: '摩擦力是什么' })
    },
  },
  //接触面积
  {
    paragraph: '改变与接触面的面积',
    reply: { choice: 0, index: 'last' },
    method: ({ goto, scene }) => {
      scene.smallArea()
      goto({ paragraph: '减小接触面积' })
    },
  },
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
  {
    paragraph: '减小接触面积',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.runStop()
      next()
    },
  },
  {
    paragraph: '减小接触面积',
    reply: { choice: 0, index: 0 },
    method: ({ goto, scene }) => {
      scene.largeArea()
      goto({ paragraph: '增大接触面积1' })
    },
  },
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
  {
    paragraph: '增大接触面积1',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.runStop()
      next()
    },
  },
  {
    paragraph: '增大接触面积1',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面积总结' })
    },
  },

  {
    paragraph: '改变与接触面的面积',
    reply: { choice: 1, index: 'last' },
    method: ({ goto, scene }) => {
      scene.largeArea()
      goto({ paragraph: '增大接触面积' })
    },
  },
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
  {
    paragraph: '增大接触面积',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.runStop()
      next()
    },
  },
  {
    paragraph: '增大接触面积',
    reply: { choice: 0, index: 'last' },
    method: ({ goto, scene }) => {
      scene.changeArea()
      goto({ paragraph: '减小接触面积1' })
    },
  },
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
  {
    paragraph: '减小接触面积1',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.runStop()
      next()
    },
  },
  {
    paragraph: '减小接触面积1',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '接触面积总结' })
    },
  },
  {
    paragraph: '接触面积总结',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      if (howToDecrease == 3) goto({ paragraph: '机器人的吐槽' })
      else goto({ paragraph: '摩擦力是什么' })
    },
  },
  {
    paragraph: '重量调节器',
    talk: 'last',
    method: ({ goto, scene }) => {
      Dialog.create({
        component: gravitySlider,
        scene,
        showSlider: true,
      }).onOk(async () => {
        await goto({ paragraph: '轻松拉货' })
      })
      // this['this.tools'] = tools
      // this.showSlider = true
      // if (this.confirm == true) {
      //   tools.goto({ paragraph: '轻松拉货' })
      //   this.showSlider = false
      //   this.confirm = false
      // }
    }
  },
  {
    paragraph: '轻松拉货',
    talk: 2,
    method: ({ next, scene }) => {
      console.log(this.gravity)
      if (this.gravity == 1) scene.iceRun(0.08)
      else if (this.gravity == 2) scene.iceRun(0.06)
      else if (this.gravity == 3) scene.iceRun(0.04)
      setTimeout(() => {
        next()
      }, 6500)
    },
  },
  {
    paragraph: '轻松拉货',
    reply: { choice: 0, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '重量调节器' })
    },
  },
  {
    paragraph: '轻松拉货',
    reply: { choice: 1, index: 'last' },
    method: ({ goto }) => {
      goto({ paragraph: '质量总结' })
    },
  },
  {
    paragraph: '质量结束',
    talk: 'last',
    method: ({ goto }) => {
      if (howToDecrease == 3) goto({ paragraph: '机器人的吐槽' })
      else goto({ paragraph: '摩擦力是什么' })
    },
  },

  {
    paragraph: '总结任务1',
    talk: 0,
    method: ({ next }) => {
      // 使用 Quasar dialog 插件来弹出对话框
      this.$q
        .dialog({
          title: '关于物体之间接触面的**粗糙程度**与摩擦力大小关系说法正确的是?( )',
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
  {
    paragraph: '总结任务2',
    talk: 0,
    method: ({ next }) => {
      // 使用 Quasar dialog 插件来弹出对话框
      this.$q
        .dialog({
          title: '关于物体之间接触面的**面积大小**与摩擦力大小关系说法正确的是?( )',
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
  {
    paragraph: '总结任务3',
    talk: 0,
    method: ({ goto }) => {
      // 使用 Quasar dialog 插件来弹出对话框
      this.$q
        .dialog({
          title: '关于物体给予接触面的**压力大小**与摩擦力大小关系说法正确的是?( )',
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