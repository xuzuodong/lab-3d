<template>
  <div class="container">
    <div v-for="item in experimentList" :key="item.id">
      <div class="row justify-around q-py-md">
        <q-img :src="item.imgsrc" class="col-2" contain />
        <div class="col-8">
          <div class="text-h5">
            <strong>{{ item.name }}</strong>
          </div>
          <div class="text-body1 q-my-md">{{ item.description }}</div>
        </div>
      </div>
      <q-separator />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      experimentList: [
        {
          id: 1,
          imgsrc: 'https://lab-3d-static.oss-cn-beijing.aliyuncs.com/salt.png',
          name: '盐的溶解',
          description:
            '盐是生活中常见的调味品， 一个烧杯的水能不能无限制的溶解盐呢？ 通过体验“盐的溶解”虚拟实验， 来探索”溶解性“、”饱和“与”不饱和“等特性， 以及影响物质溶解的因素。立即开始你的溶解度探索之旅吧！',
        },
        {
          id: 2,
          imgsrc: 'https://lab-3d-static.oss-cn-beijing.aliyuncs.com/PH.png',
          name: '溶液的pH值',
          description:
            '在生活中有许许多多的溶液，他们的pH值大多各不相同，而pH值反映的是溶液的酸碱性。那么溶液的pH值与哪些因素有关呢？通过体验“溶液的pH值”虚拟实验，来探究溶液pH值的变化过程与影响因素。',
        },
        {
          id: 3,
          imgsrc: 'https://lab-3d-static.oss-cn-beijing.aliyuncs.com/Newton-first.png',
          name: '牛顿第一运动定律',
          description:
            '我们知道，力能改变物体的运动状态。 但是，物体运动状态的改变是否一定受到力的作用？ 力又是怎样改变物体运动状态的？面对这些复杂的问题， 让我们通过体验“牛顿第一定律”虚拟实验，来探究物体不受力的作用时，将做什么运动？',
        },
        {
          id: 4,
          imgsrc: 'https://lab-3d-static.oss-cn-beijing.aliyuncs.com/fe/1.png',
          name: '铁丝与稀盐酸反应',
          description:
            '说起铁，我们一般都会想到它是一种十分坚固的材料，铁作为坚固的代表的同时，也是我们日常生活中最常见的金属元素之一，如果我们将一根铁丝放入作为三大强酸之一的盐酸中，会发生什么样的反应呢？铁是否能承受住盐酸的腐蚀呢？让我们立刻开始实验来探索吧！',
        },
        {
          id: 5,
          imgsrc: 'https://lab-3d-static.oss-cn-beijing.aliyuncs.com/cu/1.png',
          name: '胆矾与氢氧化钠反应',
          description:
            '氢氧化钠与硫酸铜的反应原理是复分解反应。硫酸铜和氢氧化钠交换离子后有氢氧化铜，而氢氧化铜是沉淀，所以能发生反应，最后生成氢氧化铜沉淀和硫酸钠。氢氧化钠与硫酸铜反应的化学方程式为：2NaOH + CuSO₄=Cu(OH)₂↓ +Na₂SO₄。立即开始你的实验吧！',
        },
        {
          id: 8,
          imgsrc: 'https://lab-3d-static.oss-cn-beijing.aliyuncs.com/neutralization.png',
          name: '酸碱中和',
          description:
            '酸和碱，似乎从化学属性上就天生就是两个反面，如果将酸性溶液和碱性溶液放在一起会发生什么呢？在实验精灵的帮助下，完成【酸碱中和反应】实验吧！',
        },
        {
          id: 9,
          imgsrc: 'https://lab-3d-static.oss-cn-beijing.aliyuncs.com/friction.jpg',
          name: '酸碱中和',
          description:
            '纯搬运机器人小甲在某个星球搬运货物的时候，似乎完全拉不动重物，你作为路过的机智聪明的实验师，通过改变设定来帮助小甲来搬运物品吧！在帮助的过程中，根据接触面的粗糙程度、改变重物的接触面大小、重物质量和添加小伙伴增加合力来帮助机器人完成任务。',
        },
      ],
    }
  },
}
</script>

<style scoped>
</style>