import { Dialog } from 'quasar'
import generalOperations from '../3d/generalOperation'
import DialogQuestionVue from '../2d/DialogQuestion.vue'
import ControlPanelVue from '../2d/ControlPanel.vue'

export default [
  // 拉近摄像头，出现滴管
  {
    paragraph: '选择酸溶液',
    reply: { choice: 'any', index: 1 },
    method: ({ next, scene }) => {
      scene.pullInCamera().then(() => next())
    }
  },

  // 记录用户选择的酸溶液
  {
    paragraph: '选择酸溶液',
    choice: 'any',
    method: ({ next, scene, chosen, setSlot }) => {
      if (chosen == 0) {
        setSlot({ 酸溶液: '稀盐酸' })
        scene.mutate({ acidType: 'acid_hcl' })
      } else {
        setSlot({ 酸溶液: '醋酸溶液' })
        scene.mutate({ acidType: 'acid_ch3cooh' })
      }
      next()
    }
  },

  // 进行滴加酸溶液的错误示范
  {
    paragraph: '滴加酸溶液',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.firstDropLiqiud().then(() => {
        next()
      })
    }
  },

  // 再次进行错误的滴加行为
  {
    paragraph: '滴加酸溶液提问',
    reply: { choice: 'last', index: 'last' },
    method: async ({ restart, scene }) => {
      await generalOperations.showDropper(scene)
      await scene.firstDropLiqiud()
      restart() // 回到段落最开头
    }
  },

  // 再次解释为什么示范的那样子是错误的
  {
    paragraph: '滴管滴加解释',
    reply: { choice: 'last', index: 'last' },
    method: (tools) => tools.restart()
  },

  // 小测试：使用胶头滴管的正确方式
  {
    paragraph: '滴管滴加解释',
    reply: { choice: 0, index: 'last' },
    method: ({ next, scene }) => {
      Dialog.create({
        component: DialogQuestionVue,
        dialogType: 'useDropperRadio',
        acid_alkali: []
      }).onOk(async () => {
        await scene.resetCamera()
        next()
      })
    }
  },

  // 进入滴加碱溶液环节
  {
    paragraph: '选择碱溶液',
    reply: { choice: 'any', index: 1 },
    method: async ({ next, scene }) => {
      await scene.pullInCamera()
      next()
    }
  },

  // 记录用户选择的碱溶液
  {
    paragraph: '选择碱溶液',
    choice: 'any',
    method: ({ chosen, scene, next, setSlot }) => {
      if (chosen == 0) {
        setSlot({ 碱溶液: '氢氧化钠' })
        scene.mutate({ alkaliType: 'alkali_naoh' })
      } else {
        setSlot({ 碱溶液: '小苏打' })
        scene.mutate({ alkaliType: 'alkali_nahco3' })
      }
      next()
    }
  },

  // 用户进行滴加碱溶液操作
  {
    paragraph: '滴加碱溶液',
    talk: 'last',
    method: ({ next, scene }) => {
      Dialog.create({
        component: ControlPanelVue,
        scene,
        showButton: true,
        acidType: scene.acidType,
        dropType: scene.alkaliType
      }).onOk(async () => {
        await scene.resetCamera()
        next()
      })
    }
  }
]
