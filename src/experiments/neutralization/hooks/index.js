import { Dialog } from 'quasar'
import generalOperations from '../3d/generalOperation'
import DialogQuestionVue from '../2d/DialogQuestion.vue'
import ControlPanelVue from '../2d/ControlPanel.vue'
import TargetPanelVue from '../2d/TargetPanel.vue'

export default [
  // 拉近摄像头，出现滴管
  {
    paragraph: '选择酸溶液',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.progress.push({ step: '1-1', finished: false })
      const dialog = Dialog.create({
        component: TargetPanelVue,
        progress: scene.progress,
        scene
      })
      scene.mutate({ targetPanel: dialog })
      scene.registerClickOnAcid().then((val) => {
        scene.mutate({ acidType: val })
        scene.pullInCamera().then(() => next())
      })
    }
  },

  // 进行滴加酸溶液的错误示范
  {
    paragraph: '滴加酸溶液',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.firstDropAcid(scene.acidType).then(() => {
        scene.existLiquid.push(scene.acidType)
        next()
      })
    }
  },

  // 再次进行错误的滴加行为
  {
    paragraph: '滴加酸溶液提问',
    reply: { choice: 'last', index: 'last' },
    method: async ({ restart, scene }) => {
      await scene.firstDropAcid(scene.acidType).then(() => {
        scene.existLiquid.push(scene.acidType)
      })
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
        await generalOperations.putBackDropper(scene, scene.acidType)
        await scene.resetCamera()
        next()
      })
    }
  },

  // 进入滴加碱溶液环节
  {
    paragraph: '选择碱溶液',
    talk: 'last',
    method: async ({ next, scene }) => {
      scene.progress[0].finished = true
      scene.progress.push({ step: '1-2', finished: false })
      scene.targetPanel.update({ progress: scene.progress })
      scene.registerClickOnAlkali().then((val) => {
        scene.mutate({ alkaliType: val })
        scene.pullInCamera().then(() => next())
      })
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
        dropType: scene.alkaliType
      }).onOk(() => {
        scene.progress[1].finished = true
        scene.targetPanel.update({ progress: scene.progress })
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

  // 
  {
    paragraph: '阶段一-提交实验结论后',
    reply: { choice: 'any', index: 'last' },
    method: ({ next, scene }) => {
      scene.showIndicatorBottle().then(() => next())
    }
  },

  // 所有参数、试管、状态重置
  {
    paragraph: '清空试管',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.mutate({ acidType: '' })
      scene.mutate({ alkaliType: '' })
      scene.mutate({ indicatorType: '' })
      scene.resetAll().then(() => {
        scene.existLiquid.splice(0, scene.existLiquid.length)
        scene.progress.splice(0, scene.progress.length)
        // scene.targetPanel.hide()
        scene.mutate({ targetPanel: null })
        next()
      })
    }
  },

  // 彻底重置后，开始做第一次自由实验
  {
    paragraph: '第一次自由实验导入',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.progress.push(
        { step: '2-1', finished: false },
        { step: '2-2', finished: false },
        { step: '2-3', finished: false }
      )
      const dialog = Dialog.create({
        component: TargetPanelVue,
        progress: scene.progress,
        scene
      })
      scene.mutate({ targetPanel: dialog })
      scene.freeExperiment()
      scene.targetPanel.onOk(() => {
        Dialog.create({
          component: DialogQuestionVue,
          dialogType: 'radioConclusion',
          acid_alkali: []
        }).onOk(() => next())
      })
    }
  },

  // 记录用户所选的酸碱指示剂，本次指示剂必定和第一次不同
  {
    paragraph: '第一次自由实验总结',
    talk: 0,
    method: ({ next, scene, setSlot }) => {
      if (scene.indicatorType == 'pur') {
        setSlot({ 酸碱指示剂: '紫色石蕊试剂' })
      } else {
        setSlot({ 酸碱指示剂: '酚酞试剂' })
      }
      next()
    }
  },

  {
    paragraph: '第一次自由实验总结',
    talk: 'last',
    method: ({ next, scene }) => {
      // 第二次自由实验前重置所有条件
      scene.mutate({ acidType: '' })
      scene.mutate({ alkaliType: '' })
      scene.mutate({ indicatorType: '' })
      scene.resetAll().then(() => {
        scene.existLiquid.splice(0, scene.existLiquid.length)
        scene.progress.splice(0, scene.progress.length)
        scene.targetPanel.hide()
        scene.mutate({ targetPanel: null })
        scene.mutate({ liquidPanel: null })
        next()
      })
    }
  },

  {
    paragraph: '第二次自由实验导入',
    talk: 'last',
    method: ({ next, scene }) => {
      scene.progress.push(
        { step: '3-1', finished: false },
        { step: '3-2', finished: false },
        { step: '3-3', finished: false }
      )
      const dialog = Dialog.create({
        component: TargetPanelVue,
        progress: scene.progress,
        scene
      })

      scene.mutate({ targetPanel: dialog })
      scene.freeExperiment()
      scene.targetPanel.onOk(() => {
        Dialog.create({
          component: DialogQuestionVue,
          dialogType: 'radioConclusion',
          acid_alkali: []
        }).onOk(() => next())
      })
    }
  },

  // 最后一次弹出选择题，提交观察到的颜色变化现象结论
  {
    paragraph: '第二次自由实验完成',
    talk: 0,
    method: ({ next, scene, setSlot }) => {
      if (scene.indicatorType == 'pur') {
        setSlot({ 酸碱指示剂: '紫色石蕊试剂' })
      } else {
        setSlot({ 酸碱指示剂: '酚酞试剂' })
      }
      next()
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
