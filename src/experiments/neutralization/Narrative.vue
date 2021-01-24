<template>
  <div></div>
</template>

<script>
import script from './script'
import operation from './babylon/operation'

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
    console.log(this.$dialog({ paragraph: p1 }))

    const p2 = script.paragraphs.find(p => p.id == '选择酸溶液')
    await this.$dialog({ paragraph: p2 })

    await this.babylon.pullInCamera()

    const p3 = script.paragraphs.find(p => p.id == '夸奖')
    await this.$dialog({ paragraph: p3 })

    const p4 = script.paragraphs.find(p => p.id == '滴加酸溶液1')
    await this.$dialog({ paragraph: p4 })

    await this.babylon.firstDropLiqiud()

    const p5 = script.paragraphs.find(p => p.id == '滴加酸溶液2')
    await this.$dialog({ paragraph: p5 })

    // 预留选择之后的效果

    const p6 = script.paragraphs.find(p => p.id == '滴管滴加解释')
    await this.$dialog({ paragraph: p6 })
  }
}
</script>
