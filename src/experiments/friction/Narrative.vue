<template>
  <div></div>
</template>

<script>
import script from './script'
import woodjpg from '../../assets/wood.jpg'
import grasspng from '../../assets/grass.png'
import icejpg from '../../assets/ice.jpg'

export default {
  props: {
    babylon: Object,
  },
  data() {
    return {}
  },
  async mounted() {
    setTimeout(() => {
      this.babylon.runStart()
    }, 500)
    const p0 = script.paragraphs.find((p) => p.id == '不远处似乎传来了什么动静')
    await this.$talker({ paragraph: p0 })

    const p1 = script.paragraphs.find((p) => p.id == '初始画面')
    await this.babylon.runStop()
    await this.$talker({ paragraph: p1 })

    const p2 = script.paragraphs.find((p) => p.id == '路过的工程师')
    await this.$talker({ paragraph: p2 })

    const p3 = script.paragraphs.find((p) => p.id == '原因分析')
    await this.$talker({ paragraph: p3 })

    const p4 = script.paragraphs.find((p) => p.id == '摩擦力是什么')
    while (p4.choices.length != 0) {
      const p4 = script.paragraphs.find((p) => p.id == '摩擦力是什么')
      const changePlace = await this.$talker({ paragraph: p4 })
      if (p4.choices[changePlace].name == '地面的**粗糙程度**也许会影响摩擦力，换个地方试试。') {
        const p4_0 = script.paragraphs.find((p) => p.id == '改变接触面粗糙程度')
        while (p4_0.choices.length != 0) {
          const p4_0 = script.paragraphs.find((p) => p.id == '改变接触面粗糙程度')
          const changeGround = await this.$talker({ paragraph: p4_0 })
          if (p4_0.choices[changeGround].name == '**很粗糙**的草地') {
            await this.babylon.changeGround(grasspng)
            const p5 = script.paragraphs.find((p) => p.id == '草地')
            await this.$talker({ paragraph: p5 })
            await this.babylon.runStart()
            const p5_1 = script.paragraphs.find((p) => p.id == '草地后')
            await this.$talker({ paragraph: p5_1 })
            await this.babylon.runStop()
            console.log(changeGround)
          }
          if (p4_0.choices[changeGround].name == '**较为光滑**的木地板') {
            await this.babylon.changeGround(woodjpg)
            const p6 = script.paragraphs.find((p) => p.id == '木板')
            await this.$talker({ paragraph: p6 })
            await this.babylon.woodRun(0.02)
            const p6_1 = script.paragraphs.find((p) => p.id == '木板后')
            await this.$talker({ paragraph: p6_1 })
            console.log(changeGround)
          }
          if (p4_0.choices[changeGround].name == '**非常光滑**的冰面') {
            await this.babylon.changeGround(icejpg)
            const p7 = script.paragraphs.find((p) => p.id == '冰面')
            await this.$talker({ paragraph: p7 })
            await this.babylon.iceRun(0.1)
            const p7_1 = script.paragraphs.find((p) => p.id == '冰面后')
            await this.$talker({ paragraph: p7_1 })
            console.log(changeGround)
          }
          p4_0.choices.splice(changeGround, 1)
        }
        // await this.babylon.changeGround()
        const p4_0_0 = script.paragraphs.find((p) => p.id == '接触面总结')
        const summary = await this.$talker({ paragraph: p4_0_0 })
        if (summary == 0) {
          const p4_0_1 = script.paragraphs.find((p) => p.id == '接触面正确结束')
          await this.$talker({ paragraph: p4_0_1 })
        }
        if (summary == 1) {
          const p4_0_2 = script.paragraphs.find((p) => p.id == '接触面回答错误')
          await this.$talker({ paragraph: p4_0_2 })
          const p4_0_1 = script.paragraphs.find((p) => p.id == '接触面正确结束')
          await this.$talker({ paragraph: p4_0_1 })
        }
      }

      if (p4.choices[changePlace].name == '货物与地面的**接触面积**也许会影响摩擦力，试着翻转下货物。') {
        const p4_1 = script.paragraphs.find((p) => p.id == '改变与接触面的面积')
        const changeArea = await this.$talker({ paragraph: p4_1 })
        if (changeArea == 0) {
          await this.babylon.smallArea()
          const p8 = script.paragraphs.find((p) => p.id == '减小接触面积')
          await this.$talker({ paragraph: p8 })
          await this.babylon.runStart()
          const p10 = script.paragraphs.find((p) => p.id == '减小接触面积后1')
          await this.$talker({ paragraph: p10 })
          await this.babylon.runStop()
          await this.babylon.largeArea()
          const p9 = script.paragraphs.find((p) => p.id == '增大接触面积')
          await this.$talker({ paragraph: p9 })
          await this.babylon.runStart()
          const p11 = script.paragraphs.find((p) => p.id == '增大接触面积后2')
          await this.$talker({ paragraph: p11 })
          await this.babylon.runStop()
        }
        if (changeArea == 1) {
          await this.babylon.largeArea()
          const p9 = script.paragraphs.find((p) => p.id == '增大接触面积')
          await this.$talker({ paragraph: p9 })
          await this.babylon.runStart()
          const p12 = script.paragraphs.find((p) => p.id == '增大接触面积后1')
          await this.$talker({ paragraph: p12 })
          await this.babylon.runStop()
          await this.babylon.changeArea()
          const p8 = script.paragraphs.find((p) => p.id == '减小接触面积')
          await this.$talker({ paragraph: p8 })
          await this.babylon.runStart()
          const p13 = script.paragraphs.find((p) => p.id == '减小接触面积后2')
          await this.$talker({ paragraph: p13 })
          await this.babylon.runStop()
        }
        const p14 = script.paragraphs.find((p) => p.id == '接触面积总结')
        await this.$talker({ paragraph: p14 })
      }
      if (p4.choices[changePlace].name == '货物给地面的**压力**也许会影响摩擦力，试着改变货物的重量。') {
        const p4_2 = script.paragraphs.find((p) => p.id == '改变物体的质量')
        await this.$talker({ paragraph: p4_2 })
        const p15 = script.paragraphs.find((p) => p.id == '重量调节器')
        await this.$talker({ paragraph: p15 })
        const p16 = script.paragraphs.find((p) => p.id == '轻松拉货')
        await this.$talker({ paragraph: p16 })
        const p17 = script.paragraphs.find((p) => p.id == '轻松拉货后')
        await this.$talker({ paragraph: p17 })
        const p18 = script.paragraphs.find((p) => p.id == '质量总结')
        await this.$talker({ paragraph: p18 })
        const p19 = script.paragraphs.find((p) => p.id == '质量结束')
        await this.$talker({ paragraph: p19 })
      }
      p4.choices.splice(changePlace, 1)
    }
    const p20 = script.paragraphs.find((p) => p.id == '机器人的吐槽')
    await this.$talker({ paragraph: p20 })
    const p21 = script.paragraphs.find((p) => p.id == '大总结')
    await this.$talker({ paragraph: p21 })
    const p22 = script.paragraphs.find((p) => p.id == '总结任务1')
    await this.$talker({ paragraph: p22 })
    const p23 = script.paragraphs.find((p) => p.id == '总结任务2')
    await this.$talker({ paragraph: p23 })
    const p24 = script.paragraphs.find((p) => p.id == '总结任务3')
    await this.$talker({ paragraph: p24 })
    const p25 = script.paragraphs.find((p) => p.id == '结局')
    await this.$talker({ paragraph: p25 })
  },
}
</script>