<template>
  <div>
    <ControlPanel :babylon="babylon" :controlFlag="controlFlag" @infoDeliver="infoDeliver" />
  </div>
</template>

<script>
import script from './script'
import operation from './babylon/operation'
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
      // this.controlFlag.showButton = value
    },
    proceed([obj, name, value]) {
      // 等待用户点击各种在ControlPanel中的停止、确定、提交等按钮，再resoleve，弹出后续剧情对话框
      this.$set(obj, name, value)
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
    await this.$dialog({ paragraph: p2 })

    await this.babylon.pullInCamera()

    const p3 = script.paragraphs.find(p => p.id == '夸奖')
    await this.$dialog({ paragraph: p3 })

    const p4 = script.paragraphs.find(p => p.id == '滴加酸溶液1')
    await this.$dialog({ paragraph: p4 })

    await this.babylon.firstDropLiqiud()

    const p5 = script.paragraphs.find(p => p.id == '滴加酸溶液2')
    const watchAgain = await this.$dialog({ paragraph: p5 })
    if (watchAgain == 2) {
      await this.babylon.showDropper()
      await this.babylon.firstDropLiqiud()
    }

    const p6 = script.paragraphs.find(p => p.id == '滴管滴加解释')
    await this.$dialog({ paragraph: p6 })

    // 弹出选择框-预留位置
    await this.proceed([this.controlFlag, 'showRadio', true])

    const p7 = script.paragraphs.find(p => p.id == '选择碱溶液1')
    const liquidType = await this.$dialog({ paragraph: p7 })
    await this.babylon.showDropper()
    if (liquidType == 0) {
      const p7_0 = script.paragraphs.find(p => p.id == '碱溶液-氢氧化钠')
      await this.$dialog({ paragraph: p7_0 })
    }
    if (liquidType == 1) {
      const p7_1 = script.paragraphs.find(p => p.id == '碱溶液-氢氧化钡')
      await this.$dialog({ paragraph: p7_1 })
    }

    const p8 = script.paragraphs.find(p => p.id == '滴加碱溶液')
    await this.$dialog({ paragraph: p8 })

    await this.proceed([this.controlFlag, 'showButton', true])
    await this.proceed([this.controlFlag, 'showConPanel', true])

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
  }
}
</script>
