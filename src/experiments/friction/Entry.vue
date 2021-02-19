<template>
  <div id="canvasContainer">
    <canvas id="renderCanvas"></canvas>
    <!-- <div id="gui">
      <Narrative :babylon="babylon" />
    </div> -->
  </div>
</template>

<script>
import BabylonApp from './BabylonApp'
import Narrative from './Narrative.vue'
import script from './script'
import woodjpg from '../../assets/wood.jpg'
import grasspng from '../../assets/grass.png'
import icejpg from '../../assets/ice.jpg'

export default {
  //   components: { Narrative },

  data() {
    return {
      babylon: {},
    }
  },

  mounted() {
    this.babylon = new BabylonApp('renderCanvas')
    this.$talker({
      script: script,
      hooks: [
        {
          paragraph: '摩擦力是什么',
          reply: { choice: '0', index: 'last' },
          method: (tools) => {
            // const p4_0 = script.paragraphs.find((p) => p.id == '改变接触面粗糙程度')
            // const changeGround = this.$talker({ paragraph: p4_0 })
            // p4_0.choices.splice(changeGround, 1)
            tools.goto({ paragraph: '改变接触面粗糙程度' })
          },
        },
        {
          paragraph: '摩擦力是什么',
          reply: { choice: '1', index: 'last' },
          method: (tools) => {
            tools.goto({ paragraph: '改变与接触面的面积' })
          },
        },
        {
          paragraph: '摩擦力是什么',
          reply: { choice: '2', index: 'last' },
          method: (tools) => {
            tools.goto({ paragraph: '改变物体的质量' })
          },
        },
        //接触面选项
        {
          paragraph: '改变接触面粗糙程度',
          reply: { choice: 0, index: 'last' },
          method: (tools) => {
            const paragraph = tools.paragraph
            console.log(paragraph)
            paragraph.choices.splice(paragraph.choices.some(r=>r.name == '**很粗糙**的草地'), 1)
            tools.goto({ paragraph: '草地' })
            this.babylon.changeGround(grasspng)
          },
        },
        {
          paragraph: '草地',
          talk: 'last',
          method: (tools) => {
            this.babylon.runStart()
            tools.goto({ paragraph: '草地后' })
          },
        },
        {
          paragraph: '草地后',
          talk: 2,
          method: (tools) => {
            this.babylon.runStop()
            tools.next()
          },
        },
        {
          paragraph: '草地后',
          talk: 'last',
          method: (tools) => {
            tools.goto({ paragraph: '改变接触面粗糙程度' })
          },
        },
        {
          paragraph: '改变接触面粗糙程度',
          reply: { choice: '1', index: 'last' },
          method: (tools) => {
            const paragraph = tools.paragraph
            console.log(paragraph)
            paragraph.choices.splice(paragraph.choices.some(r=>r.name == '**较为光滑**的木地板'), 1)
            tools.goto({ paragraph: '木板' })
            this.babylon.changeGround(woodjpg)
          },
        },
        {
          paragraph: '木板',
          talk: 'last',
          method: (tools) => {
            this.babylon.woodRun(0.02)
            tools.goto({ paragraph: '木板后' })
          },
        },
        // {
        //   paragraph: '木板后',
        //   talk: 1,
        //   method: (tools) => {
        //     this.babylon.runStop()
        //     tools.next()
        //   },
        // },
        {
          paragraph: '木板后',
          talk: 'last',
          method: (tools) => {
            tools.goto({ paragraph: '改变接触面粗糙程度' })
          },
        },
        {
          paragraph: '改变接触面粗糙程度',
          reply: { choice: '2', index: 'last' },
          method: (tools) => {
            const paragraph = tools.paragraph
            console.log(paragraph)
            paragraph.choices.splice(paragraph.choices.some(r=>r.name == '**非常光滑**的冰面'), 1)
            tools.goto({ paragraph: '冰面' })
            this.babylon.changeGround(icejpg)
          },
        },
        {
          paragraph: '冰面',
          talk: 'last',
          method: (tools) => {
            this.babylon.iceRun(0.1)
            tools.goto({ paragraph: '冰面后' })
          },
        },
        // {
        //   paragraph: '冰面后',
        //   talk: 3,
        //   method: (tools) => {
        //     this.babylon.runStop()
        //     tools.next()
        //   },
        // },
        {
          paragraph: '冰面后',
          talk: 'last',
          method: (tools) => {
            tools.goto({ paragraph: '改变接触面粗糙程度' })
          },
        },
        {
          paragraph: '总结任务1',
          talk: 0,
          method: (tools) => {
            // 使用 Quasar dialog 插件来弹出对话框
            this.$q
              .dialog({
                title: '关于物体之间接触面的**粗糙程度**与摩擦力大小关系说法正确的是?( )',
                options: {
                  type: 'radio',
                  model: '',
                  items: [
                    { label: '接触面粗糙程度与摩擦力大小无关', value: 'rough1' },
                    { label: '接触面越光滑，摩擦力越小', value: 'rough2' },
                    { label: '接触面越粗糙，摩擦力越小', value: 'rough3' },
                  ],
                },
                persistent: true,
              })
              .onOk(() => {
                tools.next()
              })
          },
        },
        {
          paragraph: '总结任务2',
          talk: 0,
          method: (tools) => {
            // 使用 Quasar dialog 插件来弹出对话框
            this.$q
              .dialog({
                title: '关于物体之间接触面的**面积大小**与摩擦力大小关系说法正确的是?( )',
                options: {
                  type: 'radio',
                  model: '',
                  items: [
                    { label: '接触面的面积大小与摩擦力大小无关', value: 'area1' },
                    { label: '接触面越大，摩擦力越小', value: 'area2' },
                    { label: '接触面越小，摩擦力越小', value: 'area3' },
                  ],
                },
                persistent: true,
              })
              .onOk(() => {
                tools.next()
              })
          },
        },
        {
          paragraph: '总结任务3',
          talk: 0,
          method: (tools) => {
            // 使用 Quasar dialog 插件来弹出对话框
            this.$q
              .dialog({
                title: '关于物体给予接触面的**压力大小**与摩擦力大小关系说法正确的是?( )',
                options: {
                  type: 'radio',
                  model: '',
                  items: [
                    { label: '物体给予接触面的压力大小与摩擦力大小无关', value: 'pressure1' },
                    { label: '物体越轻，对地面的压力越小，摩擦力越小', value: 'pressure2' },
                    { label: '物体越重，对地面的压力越大，摩擦力越小', value: 'pressure3' },
                  ],
                },
                persistent: true,
              })
              .onOk(() => {
                tools.next()
              })
          },
        },
      ],
    })
  },
}
</script>

<style>
</style>