<template>
  <div>
    <ControlPanel
      :babylon="babylon"
      :controlFlag="controlFlag"
      :acidType="acidType"
      :dropType="dropType"
      :clearIndicater="clearIndicater"
      @infoDeliver="infoDeliver"
    />
  </div>
</template>

<script>
import script from './script'
import generalOperations from './babylon/generalOperation'
import ControlPanel from './ControlPanel'
import DialogQuestion from './DialogQuestion'

export default {
  props: {
    babylon: Object
  },
  data() {
    return {
      controlFlag: {
        showButton: false,
        showRadio: false,
        showConPanel: false
      },
      dropType: '',
      acidType: '',
      alkaliType: '',
      indicatorType: '',
      clearIndicater: false
    }
  },
  components: { ControlPanel },
  methods: {
    // 子组件向父组件传值
    infoDeliver(name, value) {
      this.controlFlag[name] = value
    },
    proceed([obj, name, value, dropType = '']) {
      // 等待用户点击各种在ControlPanel中的停止、确定、提交等按钮，再resoleve，弹出后续剧情对话框
      this.$set(obj, name, value)
      this.dropType = dropType
      return new Promise((resolve, reject) => {
        let timer = setInterval(() => {
          if (!obj[name]) {
            resolve()
            clearInterval(timer)
          }
        }, 1000)
      })
    },
    conclusionSubmit(dialogType) {
      return new Promise((resolve, reject) => {
        this.$q
          .dialog({
            component: DialogQuestion,
            parent: this,
            // 传递给组件的属性
            dialogType: dialogType
          })
          .onOk((data) => {
            resolve(data)
          })
      })
    }
  },
  async mounted() {
    this.$talker({
      script: script,
      hooks: [
        {
          paragraph: '选择酸溶液',
          reply: { choice: 'any', index: 1 },
          method: async (tools) => {
            await this.babylon.pullInCamera()
            await tools.next()
          }
        },
        {
          paragraph: '选择酸溶液',
          choice: 0,
          method: (tools) => {
            this.acidType = 'acid_hcl'
            tools.next()
          }
        },
        {
          paragraph: '选择酸溶液',
          choice: 1,
          method: (tools) => {
            this.acidType = 'acid_ch3cooh'
            tools.next()
          }
        },
        {
          paragraph: '滴加酸溶液',
          talk: 'last',
          method: async (tools) => {
            await this.babylon.firstDropLiqiud()
            await tools.next()
          }
        },
        {
          paragraph: '滴加酸溶液提问',
          reply: { choice: 2, index: 'last' },
          method: async (tools) => {
            await generalOperations.showDropper(this.babylon.scene)
            await this.babylon.firstDropLiqiud()
            await tools.next()
          }
        },
        {
          paragraph: '滴管滴加解释',
          reply: { choice: 0, index: 'last' },
          method: async (tools) => {
            await this.conclusionSubmit('con1')
            // 后面then发数据请求，或用变量去接用户选择的答案
            await this.babylon.restCamera()
            await tools.next()
          }
        },
        {
          paragraph: '滴管滴加解释',
          reply: { choice: 'last', index: 'last' },
          method: (tools) => {
            tools.restart()
          }
        },
        {
          paragraph: '选择碱溶液',
          reply: { choice: 'any', index: 1 },
          method: async (tools) => {
            await this.babylon.pullInCamera()
            await tools.next()
          }
        },
        {
          paragraph: '选择碱溶液',
          choice: 0,
          method: (tools) => {
            this.alkaliType = 'alkali_naoh'
            tools.next()
          }
        },
        {
          paragraph: '选择碱溶液',
          choice: 1,
          method: (tools) => {
            this.alkaliType = 'alkali_nahco3'
            tools.next()
          }
        },
        {
          paragraph: '滴加碱溶液',
          talk: 'last',
          method: async (tools) => {
            await this.babylon.tubeCloseUp()
            await this.proceed([this.controlFlag, 'showButton', true, this.alkaliType])
            await this.conclusionSubmit('con1')
            await this.babylon.restCamera()
            await tools.next()
          }
        },
        {
          paragraph: '阶段二开场',
          talk: 2,
          method: async (tools) => {
            await this.babylon.resetTube()
            await tools.next()
          }
        },
        {
          paragraph: '阶段二开场',
          reply: { choice: 'any', index: 'last' },
          method: async (tools) => {
            await this.babylon.pullInCameraToBottle()
            await tools.next()
          }
        },
        {
          paragraph: '选择酸碱指示剂',
          talk: 'last',
          method: async (tools) => {
            this.indicatorType = await this.babylon.selectIndicator()
            await tools.next()
          }
        },
        {
          paragraph: '滴入酸碱指示剂',
          talk: 'last',
          method: async (tools) => {
            await this.proceed([this.controlFlag, 'showButton', true, this.indicatorType])
            await tools.next()
          }
        },
        {
          paragraph: '阶段二-选择碱溶液',
          reply: { choice: 'any', index: 0 },
          method: async (tools) => {
            await this.babylon.pullInCamera()
            await tools.next()
          }
        },
        {
          paragraph: '阶段二-选择碱溶液',
          choice: 0,
          method: (tools) => {
            this.alkaliType = 'alkali_naoh'
            tools.next()
          }
        },
        {
          paragraph: '阶段二-选择碱溶液',
          choice: 1,
          method: (tools) => {
            this.alkaliType = 'alkali_nahco3'
            tools.next()
          }
        },
        {
          paragraph: '阶段二-滴加碱溶液',
          talk: 'last',
          method: async (tools) => {
            await this.babylon.tubeCloseUp()
            await this.proceed([this.controlFlag, 'showButton', true, this.alkaliType])
            await tools.next()
          }
        },
        {
          paragraph: '阶段二-观察反应现象',
          talk: 'last',
          method: async (tools) => {
            await this.conclusionSubmit('con1')
            await this.babylon.restCamera()
            await tools.next()
          }
        },
        {
          paragraph: '阶段二-提交实验结论后',
          reply: { choice: 'any', index: 'last' },
          method: async (tools) => {
            this.dropType = this.acidType = this.alkaliType = this.indicatorType = ''
            this.clearIndicater = true
            await this.babylon.resetAll()
            await tools.next()
          }
        },
        {
          paragraph: '阶段三-选择酸溶液',
          reply: { choice: 'any', index: 0 },
          method: async (tools) => {
            await this.babylon.pullInCamera()
            await tools.next()
          }
        },
        {
          paragraph: '阶段三-选择酸溶液',
          choice: 0,
          method: (tools) => {
            this.acidType = 'acid_hcl'
            tools.next()
          }
        },
        {
          paragraph: '阶段三-选择酸溶液',
          choice: 1,
          method: (tools) => {
            this.acidType = 'acid_ch3cooh'
            tools.next()
          }
        },
        {
          paragraph: '阶段三-选择酸溶液',
          reply: { choice: 'any', index: 'last' },
          method: async (tools) => {
            await this.proceed([this.controlFlag, 'showButton', true, this.acidType])
            await this.babylon.restCamera()
            await tools.next()
          }
        },
        {
          paragraph: '阶段三-选择酸碱指示剂',
          talk: 'last',
          method: async (tools) => {
            await this.babylon.pullInCameraToBottle()
            this.indicatorType = await this.babylon.selectIndicator()
            await this.proceed([this.controlFlag, 'showButton', true, this.indicatorType])
            await tools.next()
          }
        },
        {
          paragraph: '阶段三-选择碱溶液',
          reply: { choice: 'any', index: 0 },
          method: async (tools) => {
            await this.babylon.pullInCamera()
            await tools.next()
          }
        },
        {
          paragraph: '阶段三-选择碱溶液',
          choice: 0,
          method: (tools) => {
            this.alkaliType = 'alkali_naoh'
            tools.next()
          }
        },
        {
          paragraph: '阶段三-选择碱溶液',
          choice: 1,
          method: (tools) => {
            this.alkaliType = 'alkali_nahco3'
            tools.next()
          }
        },
        {
          paragraph: '阶段三-选择碱溶液',
          reply: { choice: 'any', index: 'last' },
          method: async (tools) => {
            await this.babylon.tubeCloseUp()
            await this.proceed([this.controlFlag, 'showButton', true, this.alkaliType])
            await tools.next()
          }
        },
        {
          paragraph: '阶段三-观察反应现象',
          talk: 'last',
          method: async (tools) => {
            await this.conclusionSubmit('con1')
            await this.babylon.restCamera()
            await tools.next()
          }
        },
        {
          paragraph: '实验复盘2',
          reply: { choice: 1, index: 'last' },
          method: (tools) => {
            tools.restart()
          }
        }
      ]
    })
  }
}
</script>
