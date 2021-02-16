<template>
  <div>
    <ControlPanel
      :babylon="babylon"
      :controlFlag="controlFlag"
      :acidType="acidType"
      :dropType="dropType"
      :clearIndicater = "clearIndicater"
      @infoDeliver="infoDeliver"
    />
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
      },
      dropType: '',
      acidType: '',
      alkaliType: '',
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
    }
  },
  async mounted() {
    const p1 = script.paragraphs.find(p => p.id == '初始画面')
    await this.$talker({ paragraph: p1 })

    const p2 = script.paragraphs.find(p => p.id == '选择酸溶液')
    const p2_dropAcidType = await this.$talker({ paragraph: p2 })
    await this.babylon.pullInCamera()
    if (p2_dropAcidType == 0) {
      const p2_0 = script.paragraphs.find(p => p.id == '酸溶液-盐酸')
      await this.$talker({ paragraph: p2_0 })
      this.acidType = 'acid_hcl'
    }
    if (p2_dropAcidType == 1) {
      const p2_1 = script.paragraphs.find(p => p.id == '酸溶液-醋酸')
      await this.$talker({ paragraph: p2_1 })
      this.acidType = 'acid_ch3cooh'
    }

    const p3 = script.paragraphs.find(p => p.id == '夸奖')
    await this.$talker({ paragraph: p3 })

    const p4 = script.paragraphs.find(p => p.id == '滴加酸溶液1')
    await this.$talker({ paragraph: p4 })

    await this.babylon.firstDropLiqiud()

    const p5 = script.paragraphs.find(p => p.id == '滴加酸溶液2')
    const watchAgain = await this.$talker({ paragraph: p5 })
    if (watchAgain == 2) {
      await generalOperations.showDropper(this.babylon.scene)
      await this.babylon.firstDropLiqiud()
    }

    const p6 = script.paragraphs.find(p => p.id == '滴管滴加解释')
    let explainAgain = await this.$talker({ paragraph: p6 })
    while (explainAgain == 1) {
      explainAgain = await this.$talker({ paragraph: p6 })
    }

    await this.proceed([this.controlFlag, 'showRadio', true])

    await this.babylon.restCamera()

    const p7 = script.paragraphs.find(p => p.id == '选择碱溶液')
    const p7_alkaliType = await this.$talker({ paragraph: p7 })
    await this.babylon.pullInCamera()
    if (p7_alkaliType == 0) {
      const p7_0 = script.paragraphs.find(p => p.id == '碱溶液-氢氧化钠')
      await this.$talker({ paragraph: p7_0 })
      this.alkaliType = 'alkali_naoh'
    }
    if (p7_alkaliType == 1) {
      const p7_1 = script.paragraphs.find(p => p.id == '碱溶液-小苏打')
      await this.$talker({ paragraph: p7_1 })
      this.alkaliType = 'alkali_nahco3'
    }

    await this.babylon.tubeCloseUp()

    const p8 = script.paragraphs.find(p => p.id == '滴加碱溶液')
    await this.$talker({ paragraph: p8 })

    await this.proceed([this.controlFlag, 'showButton', true, this.alkaliType])

    await this.proceed([this.controlFlag, 'showConPanel', true])

    await this.babylon.restCamera()

    const p9 = script.paragraphs.find(p => p.id == '承上启下部分')
    await this.$talker({ paragraph: p9 })

    const p10 = script.paragraphs.find(p => p.id == '阶段二开场1')
    await this.$talker({ paragraph: p10 })

    await this.babylon.resetTube()

    const p11 = script.paragraphs.find(p => p.id == '阶段二开场2')
    await this.$talker({ paragraph: p11 })

    await this.babylon.pullInCameraToBottle()

    const p12 = script.paragraphs.find(p => p.id == '选择酸碱指示剂')
    await this.$talker({ paragraph: p12 })

    const s1_indicatorType = await this.babylon.selectIndicator()

    const p13 = script.paragraphs.find(p => p.id == '滴入酸碱指示剂')
    await this.$talker({ paragraph: p13 })
    await this.proceed([this.controlFlag, 'showButton', true, s1_indicatorType])

    const p14 = script.paragraphs.find(p => p.id == '阶段二-选择碱溶液')
    const p14_alkaliType = await this.$talker({ paragraph: p14 })
    await this.babylon.pullInCamera()
    if (p14_alkaliType == 0) {
      const p14_0 = script.paragraphs.find(p => p.id == '阶段二-碱溶液-氢氧化钠')
      await this.$talker({ paragraph: p14_0 })
      this.alkaliType = 'alkali_naoh'
    }
    if (p14_alkaliType == 1) {
      const p14_1 = script.paragraphs.find(p => p.id == '阶段二-碱溶液-小苏打')
      await this.$talker({ paragraph: p14_1 })
      this.alkaliType = 'alkali_nahco3'
    }

    await this.babylon.tubeCloseUp()

    const p15 = script.paragraphs.find(p => p.id == '阶段二-滴加碱溶液')
    await this.$talker({ paragraph: p15 })
    await this.proceed([this.controlFlag, 'showButton', true, this.alkaliType])

    const p16 = script.paragraphs.find(p => p.id == '阶段二-观察反应现象')
    await this.$talker({ paragraph: p16 })
    await this.proceed([this.controlFlag, 'showConPanel', true])

    await this.babylon.restCamera()

    const p17 = script.paragraphs.find(p => p.id == '阶段二-提交实验结论后')
    await this.$talker({ paragraph: p17 })
    
    //全部重置
    this.dropType = this.acidType = this.alkaliType = ''
    this.clearIndicater = true
    await this.babylon.resetAll()

    const p18 = script.paragraphs.find(p => p.id == '阶段三-选择酸溶液')
    const p18_dropAcidType = await this.$talker({ paragraph: p18 })
    await this.babylon.pullInCamera()
    if (p18_dropAcidType == 0) {
      const p18_0 = script.paragraphs.find(p => p.id == '酸溶液-盐酸')
      await this.$talker({ paragraph: p18_0 })
      this.acidType = 'acid_hcl'
    }
    if (p18_dropAcidType == 1) {
      const p18_1 = script.paragraphs.find(p => p.id == '酸溶液-醋酸')
      await this.$talker({ paragraph: p18_1 })
      this.acidType = 'acid_ch3cooh'
    }

    const p19 = script.paragraphs.find(p => p.id == '阶段三-滴入酸溶液')
    await this.$talker({ paragraph: p19 })
    await this.proceed([this.controlFlag, 'showButton', true, this.acidType])

    await this.babylon.restCamera()

    const p20 = script.paragraphs.find(p => p.id == '阶段三-选择酸碱指示剂')
    await this.$talker({ paragraph: p20 })
    await this.babylon.pullInCameraToBottle()
    const s2_indicatorType = await this.babylon.selectIndicator()
    await this.proceed([this.controlFlag, 'showButton', true, s2_indicatorType])

    const p21 = script.paragraphs.find(p => p.id == '阶段三-选择碱溶液')
    const p21_alkaliType = await this.$talker({ paragraph: p21 })
    await this.babylon.pullInCamera()
    if (p21_alkaliType == 0) {
      const p21_0 = script.paragraphs.find(p => p.id == '碱溶液-氢氧化钠')
      await this.$talker({ paragraph: p21_0 })
      this.alkaliType = 'alkali_naoh'
    }
    if (p21_alkaliType == 1) {
      const p21_1 = script.paragraphs.find(p => p.id == '碱溶液-小苏打')
      await this.$talker({ paragraph: p21_1 })
      this.alkaliType = 'alkali_nahco3'
    }

    await this.babylon.tubeCloseUp()

    const p22 = script.paragraphs.find(p => p.id == '阶段三-滴入碱溶液')
    await this.$talker({ paragraph: p22 })
    await this.proceed([this.controlFlag, 'showButton', true, this.alkaliType])

    const p23 = script.paragraphs.find(p => p.id == '阶段三-观察反应现象')
    await this.$talker({ paragraph: p23 })
    await this.proceed([this.controlFlag, 'showConPanel', true])

    await this.babylon.restCamera()

    const p24 = script.paragraphs.find(p => p.id == '阶段三-提交实验结论后')
    await this.$talker({ paragraph: p24 })

    const p25 = script.paragraphs.find(p => p.id == '实验复盘1')
    await this.$talker({ paragraph: p25 })

    const p26 = script.paragraphs.find(p => p.id == '实验复盘2')
    let repeat = await this.$talker({ paragraph: p26 })
    while (repeat == 1) {
      repeat = await this.$talker({ paragraph: p26 })
    }

    const p27 = script.paragraphs.find(p => p.id == '结束语1')
    await this.$talker({ paragraph: p27 })

    const p28 = script.paragraphs.find(p => p.id == '结束语2')
    await this.$talker({ paragraph: p28 })
  }
}
</script>
