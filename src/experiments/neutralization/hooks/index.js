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
        scene.mutate({ acidType: ['acid_hcl', true] })
      } else {
        setSlot({ 酸溶液: '醋酸溶液' })
        scene.mutate({ acidType: ['acid_ch3cooh', true] })
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
        scene.mutate({ alkaliType: ['alkali_naoh', false] })
      } else {
        setSlot({ 碱溶液: '小苏打' })
        scene.mutate({ alkaliType: ['alkali_nahco3', false] })
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
        dropType: scene.alkaliType[0]
      }).onOk(() => {
        Dialog.create({
          component: DialogQuestionVue,
          dialogType: 'textConclusion',
          acid_alkali: [scene.acidType, scene.alkaliType]
        }).onOk(async () => {
          await scene.resetCamera()
          next()
        })
      })
    }
  },

  // 重置试管中的溶液，只留下酸溶液
  {
    paragraph: '阶段二开场',
    talk: 2,
    method: ({ next, scene }) => {
      scene.mutate({ alkaliType: ['', false] })
      scene.mutate({ indicatorType: ['', false] })
      scene.resetTube().then(() => next())
    }
  },

  // 移动相机，观察试管中的反应
  {
    paragraph: '阶段二开场',
    reply: { choice: 'any', index: 'last' },
    method: ({ next, scene }) => {
      scene.pullInCameraToBottle().then(() => next())
    }
  },

  // 选择酸碱指示剂
  {
    paragraph: '选择酸碱指示剂',
    talk: 'last',
    method: async ({ next, scene, setSlot }) => {
      let indicatorType = await scene.selectIndicator()
      scene.mutate({ indicatorType: [indicatorType, false] })
      if (scene.indicatorType[0] == 'pur') {
        setSlot({ 酸碱指示剂: '紫色石蕊试剂' })
      } else {
        setSlot({ 酸碱指示剂: '酚酞试剂' })
      }
      next()
    }
  },

  // 滴入酸碱指示剂
  {
    paragraph: '滴入酸碱指示剂',
    talk: 'last',
    method: async ({ next, scene }) => {
      Dialog.create({
        component: ControlPanelVue,
        scene,
        dropType: scene.indicatorType[0]
      }).onOk(() => {
        next()
      })
    }
  },

  // 选择碱溶液（滴入刚才加了酸碱指示剂的试管）
  {
    paragraph: '阶段二-选择碱溶液',
    reply: { choice: 'any', index: 0 },
    method: ({ next, scene }) => {
      scene.pullInCamera().then(() => next())
    }
  },

  // 记录用户选择的碱溶液
  {
    paragraph: '阶段二-选择碱溶液',
    choice: 'any',
    method: ({ next, scene, chosen, setSlot }) => {
      if (chosen == 0) {
        setSlot({ 碱溶液: '氢氧化钠' })
        scene.mutate({ alkaliType: ['alkali_naoh', false] })
      } else {
        setSlot({ 碱溶液: '小苏打' })
        scene.mutate({ alkaliType: ['alkali_nahco3', false] })
      }
      next()
    }
  },

  // 向刚才加了酸碱指示剂的试管中滴加碱溶液
  {
    paragraph: '阶段二-滴加碱溶液',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.tubeCloseUp().then(() => {
        Dialog.create({
          component: ControlPanelVue,
          scene,
          dropType: scene.alkaliType[0]
        }).onOk(() => next())
      })
    }
  },

  // 弹出选择题，提交观察到的颜色变化现象结论
  {
    paragraph: '阶段二-观察反应现象',
    talk: 'last',
    method: ({ next, scene }) => {
      Dialog.create({
        component: DialogQuestionVue,
        dialogType: 'radioConclusion',
        acid_alkali: []
      }).onOk(() => {
        scene.resetCamera().then(() => next())
      })
    }
  },

  // 所有参数、试管、状态重置
  {
    paragraph: '阶段二-提交实验结论后',
    reply: { choice: 'any', index: 'last' },
    method: ({ next, scene }) => {
      scene.mutate({ acidType: ['', false] })
      scene.mutate({ alkaliType: ['', false] })
      scene.mutate({ indicatorType: ['', false] })
      scene.resetAll().then(() => next())
    }
  },

  // 彻底重置后，重新开始做一次完整实验
  // 先选择酸溶液
  {
    paragraph: '阶段三-选择酸溶液',
    reply: { choice: 'any', index: 0 },
    method: ({ next, scene }) => {
      scene.pullInCamera().then(() => next())
    }
  },

  // 向空试管中滴加酸溶液
  {
    paragraph: '阶段三-选择酸溶液',
    reply: { choice: 'any', index: 'last' },
    method: ({ next, scene }) => {
      Dialog.create({
        component: ControlPanelVue,
        scene,
        dropType: scene.acidType[0]
      }).onOk(() => {
        scene.resetCamera().then(() => next())
      })
    }
  },

  // 记录用户所选择的酸溶液
  {
    paragraph: '阶段三-选择酸溶液',
    choice: 'any',
    method: ({ next, scene, chosen, setSlot }) => {
      if (chosen == 0) {
        setSlot({ 酸溶液: '稀盐酸' })
        scene.mutate({ acidType: ['acid_hcl', false] })
      } else {
        setSlot({ 酸溶液: '醋酸溶液' })
        scene.mutate({ acidType: ['acid_ch3cooh', false] })
      }
      next()
    }
  },

  // 记录用户所选的酸碱指示剂，本次指示剂必定和第一次不同
  {
    paragraph: '阶段三-选择酸碱指示剂',
    talk: 'last',
    method: async ({ next, scene, setSlot }) => {
      await scene.pullInCameraToBottle()
      let indicatorType = await scene.selectIndicator()
      scene.mutate({ indicatorType: [indicatorType, false] })
      if (scene.indicatorType[0] == 'pur') {
        setSlot({ 酸碱指示剂: '紫色石蕊试剂' })
      } else {
        setSlot({ 酸碱指示剂: '酚酞试剂' })
      }
      Dialog.create({
        component: ControlPanelVue,
        scene,
        dropType: scene.indicatorType[0]
      }).onOk(() => next())
    }
  },

  // 选择碱溶液,拉近镜头
  {
    paragraph: '阶段三-选择碱溶液',
    reply: { choice: 'any', index: 0 },
    method: ({ next, scene }) => {
      scene.pullInCamera().then(() => next())
    }
  },

  // 记录用户选择的碱溶液
  {
    paragraph: '阶段三-选择碱溶液',
    choice: 'any',
    method: ({ next, scene, chosen, setSlot }) => {
      if (chosen == 0) {
        setSlot({ 碱溶液: '氢氧化钠' })
        scene.mutate({ alkaliType: ['alkali_naoh', false] })
      } else {
        setSlot({ 碱溶液: '小苏打' })
        scene.mutate({ alkaliType: ['alkali_nahco3', false] })
      }
      next()
    }
  },

  // 用户滴加碱溶液，镜头对试管内反应的特写
  {
    paragraph: '阶段三-选择碱溶液',
    reply: { choice: 'any', index: 'last' },
    method: ({ next, scene }) => {
      scene.tubeCloseUp().then(() => {
        Dialog.create({
          component: ControlPanelVue,
          scene,
          dropType: scene.alkaliType[0]
        }).onOk(() => next())
      })
    }
  },

  // 最后一次弹出选择题，提交观察到的颜色变化现象结论
  {
    paragraph: '阶段三-观察反应现象',
    talk: 'last',
    method: ({ next, scene }) => {
      Dialog.create({
        component: DialogQuestionVue,
        dialogType: 'radioConclusion',
        acid_alkali: []
      }).onOk(() => {
        scene.resetCamera().then(() => next())
      })
    }
  },

  // 实验复盘里可重复片段
  {
    paragraph: '实验复盘2',
    reply: { choice: 1, index: 'last' },
    method: ({ restart }) => {
      restart()
    }
  }
]
