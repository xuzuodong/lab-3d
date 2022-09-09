<template>
  <div class="gContainer">
    <q-btn-toggle
      v-model="model"
      class="my-custom-toggle q-mt-md"
      no-caps
      rounded
      unelevated
      toggle-color="primary"
      color="white"
      text-color="primary"
      :options="[
        { label: '个人知识图谱', value: 'one' },
        { label: '完整知识图谱', value: 'two' },
      ]"
      @click="changeMap(model)"
    />
    <d3graph :data="data" :names="names" :labels="labels" :linkTypes="linkTypes" />
  </div>
</template>

<script>
import d3graph from '@/components/d3graph.vue'
export default {
  components: {
    d3graph,
  },
  data() {
    return {
      // d3jsonParser()处理 json 后返回的结果
      model: 'one',
      data: {
        nodes: [],
        links: [],
      },
      names: [
        '化学实验',
        '学科大概念',
        '实践活动',
        '探究实验',
        '实验仪器',
        '实验药品',
        '实验知识',
        '实验技能',
        '技能演示',
      ],
      labels: ['start', 'BI', 'act', 'exp', 'appa', 'drug', 'knowledge', 'skill', 'video'],
      linkTypes: [
        '所需实验技能',
        '实验技能演示',
        '所需前置知识',
        '所需实验药品',
        '所需实验仪器',
        '实现于',
        '依托于',
      ],
      jsonData: require('../data/records.json'),
    }
  },
  methods: {
    // 视图更新
    update(json) {
      console.log('update')
      console.log(json)
      this.d3jsonParser(json)
    },
    /*eslint-disable*/
    // 解析json数据，主要负责数据的去重、标准化
    d3jsonParser(json) {
      const nodes = []
      const links = [] // 存放节点和关系
      const nodeSet = [] // 存放去重后nodes的id

      // 使用vue直接通过require获取本地json，不再需要使用d3.json获取数据
      // d3.json('./../data/records.json', function (error, data) {
      //   if (error) throw error
      //   graph = data
      //   console.log(graph[0].p)
      // })

      for (let item of json) {
        for (let segment of item.p.segments) {
          // 重新更改data格式
          if (nodeSet.indexOf(segment.start.identity) == -1) {
            nodeSet.push(segment.start.identity)
            nodes.push({
              id: segment.start.identity,
              label: segment.start.labels[0],
              properties: segment.start.properties,
            })
          }
          if (nodeSet.indexOf(segment.end.identity) == -1) {
            nodeSet.push(segment.end.identity)
            nodes.push({
              id: segment.end.identity,
              label: segment.end.labels[0],
              properties: segment.end.properties,
            })
          }
          links.push({
            source: segment.relationship.start,
            target: segment.relationship.end,
            type: segment.relationship.type,
            properties: segment.relationship.properties,
          })
        }
      }
      console.log(nodes)
      console.log(links)
      // this.links = links
      // this.nodes = nodes
      this.data = { nodes, links }
      // return { nodes, links }
    },
    changeMap(map) {
      if (map == 'one') {
        this.jsonData = require('../data/records.json')
        this.update(this.jsonData)
      }
      if (map == 'two') {
        this.jsonData = require('../data/records11.json')
        this.update(this.jsonData)
      }
    },
  },
  created() {
    this.update(this.jsonData)
  },
}
</script>

<style lang="scss" scoped>
.gContainer {
  margin: 20px 0;
  position: relative;
  border: 2px #000 solid;
  background-color: #9dadc1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  zoom: 0.85;
}
</style>
