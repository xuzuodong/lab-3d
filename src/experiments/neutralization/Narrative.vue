<template>
  <div></div>
</template>

<script>
import script from "./script";
import operation from "./babylon/operation";

export default {
  props: {
    babylon: Object
  },
  data() {
    return {}
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
    await this.$dialog({ paragraph : p8 })
  }
}
</script>
