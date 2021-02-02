<template>
  <div>
    <ControlPanel :babylon="babylon" :controlFlag="controlFlag" @infoDeliver="infoDeliver" />
  </div>
</template>

<script>
import script from './script'
import generalOperations from './babylon/generalOperation'
import ControlPanel from './ControlPanel'

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
      }
    }
  },
  components: { ControlPanel },
  methods: {
    // 子组件向父组件传值
    infoDeliver(name, value) {
      this.controlFlag[name] = value
    },
    proceed([obj, name, value, liquidType = '']) {
      // 等待用户点击各种在ControlPanel中的停止、确定、提交等按钮，再resoleve，弹出后续剧情对话框
      this.$set(obj, name, value)
      this.$store.commit('changeLiquid', liquidType)
      return new Promise((resolve, reject) => {
        let timer = setInterval(() => {
          if (!obj[name]) {
            resolve()
            clearInterval(timer)
          }
        }, 1000)
      })
    }
  },
  async mounted() {
    const p1 = script.paragraphs.find(p => p.id == '初始画面')
    await this.$dialog({ paragraph: p1 })

    const p2 = script.paragraphs.find(p => p.id == '选择酸溶液')
    const acidType = await this.$dialog({ paragraph: p2 })
    await this.babylon.pullInCamera()
    if (acidType == 0) {
      const p2_0 = script.paragraphs.find(p => p.id == '酸溶液-盐酸')
      await this.$dialog({ paragraph: p2_0 })
    }
    if (acidType == 1) {
      const p2_1 = script.paragraphs.find(p => p.id == '酸溶液-醋酸')
      await this.$dialog({ paragraph: p2_1 })
    }

    const p3 = script.paragraphs.find(p => p.id == '夸奖')
    await this.$dialog({ paragraph: p3 })

    const p4 = script.paragraphs.find(p => p.id == '滴加酸溶液1')
    await this.$dialog({ paragraph: p4 })

    await this.babylon.firstDropLiqiud()

    const p5 = script.paragraphs.find(p => p.id == '滴加酸溶液2')
    const watchAgain = await this.$dialog({ paragraph: p5 })
    if (watchAgain == 2) {
      await generalOperations.showDropper(this.babylon.scene)
      await this.babylon.firstDropLiqiud()
    }

    const p6 = script.paragraphs.find(p => p.id == '滴管滴加解释')
    const explainAgain = await this.$dialog({ paragraph: p6 })
    if (explainAgain == 1) {
      await this.$dialog({ paragraph: p6 })
    }

    // 弹出选择框-预留位置
    await this.proceed([this.controlFlag, 'showRadio', true])

    await this.babylon.restCamera()

    const p7 = script.paragraphs.find(p => p.id == '选择碱溶液')
    const alkaliType = await this.$dialog({ paragraph: p7 })
    await this.babylon.pullInCamera()
    if (alkaliType == 0) {
      const p7_0 = script.paragraphs.find(p => p.id == '碱溶液-氢氧化钠')
      await this.$dialog({ paragraph: p7_0 })
    }
    if (alkaliType == 1) {
      const p7_1 = script.paragraphs.find(p => p.id == '碱溶液-小苏打')
      await this.$dialog({ paragraph: p7_1 })
    }

    await this.babylon.tubeCloseUp()

    const p8 = script.paragraphs.find(p => p.id == '滴加碱溶液')
    await this.$dialog({ paragraph: p8 })

    await this.proceed([this.controlFlag, 'showButton', true, 'alkali'])
    
    await this.proceed([this.controlFlag, 'showConPanel', true])

    await this.babylon.restCamera()

    // 滴加完成后，弹出文本输入的结论框-预留位置

    const p9 = script.paragraphs.find(p => p.id == '承上启下部分')
    await this.$dialog({ paragraph: p9 })

    const p10 = script.paragraphs.find(p => p.id == '阶段二开场1')
    await this.$dialog({ paragraph: p10 })

    await this.babylon.resetTube()

    const p11 = script.paragraphs.find(p => p.id == '阶段二开场2')
    await this.$dialog({ paragraph: p11 })

    const p12 = script.paragraphs.find(p => p.id == '选择酸碱指示剂')
    await this.$dialog({ paragraph: p12 })

    const indicatorType =  await this.babylon.selectIndicator()

    const p13 = script.paragraphs.find(p => p.id == '滴入酸碱指示剂')
    await this.$dialog({ paragraph: p13 })
    await this.proceed([this.controlFlag, 'showButton', true, indicatorType])
  }
}
</script>
