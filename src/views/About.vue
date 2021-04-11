<template>
  <div class="about">
    <q-layout view="hHh lpr ffr">
      <q-drawer v-model="left" side="left" :width="120"></q-drawer>
      <q-drawer v-model="right" side="right" :width="420">
        <div class="bg-blue-1" style="max-width: 300px; margin-top: 71px">
          <q-list>
            <q-item>
              <q-item-section style="text-indent: 0.5em" class="text-orange-8 text-h5">
                关于我们
              </q-item-section>
            </q-item>
            <q-separator inset />

            <q-item clickable active-class="bg-blue-2 text-black" :active="active0" @click="change0">
              <q-item-section avatar>
                <q-avatar class="text-orange-8">></q-avatar>
              </q-item-section>
              <q-item-section class="text-h6">Lab 3D</q-item-section>
            </q-item>
            <q-separator inset />

            <q-item clickable active-class="bg-blue-2 text-black" :active="active1" @click="change1">
              <q-item-section avatar>
                <q-avatar class="text-orange-8">></q-avatar>
              </q-item-section>
              <q-item-section class="text-h6">我们团队</q-item-section>
            </q-item>
            <q-separator inset />

            <q-item clickable active-class="bg-blue-2 text-black" :active="active2" @click="change2">
              <q-item-section avatar>
                <q-avatar class="text-orange-8">></q-avatar>
              </q-item-section>
              <q-item-section class="text-h6">联系我们</q-item-section>
            </q-item>
            <div class="q-pb-lg"></div>
          </q-list>
        </div>
      </q-drawer>

      <q-page-container class="incrHigh">
        <q-card flat>
          <q-card-section>
            <font class="text-h4" style="color: #424c52">
              {{ contacts[i].name }}
            </font>
          </q-card-section>
          <q-separator inset />
          <q-card-section class="q-pt-md text-h6 content">
            <div>
              {{ contacts.find((e) => e.id == i).content }}
            </div>
            <div :class="{ active: isActive }">
              {{ contacts.find((e) => e.id == i).content1 }}
            </div>
          </q-card-section>
          <div v-if="showpic">
            <img src="../assets/ScreenShot.png" alt="" height="100%" width="100%" />
          </div>
          <div class="row">
            <div class="q-mx-auto q-my-xl q-pt-xl">
              <img src="../assets/hznuLogo.png" alt="" height="70" width="280" />
            </div>
            <div class="q-mx-auto q-my-xl q-pt-xl">
              <img src="../assets/jyxyLogo.png" alt="" height="70" width="276" />
            </div>
            <div class="q-mx-auto q-my-xl q-pt-xl">
              <img src="../assets/babylonjs.png" alt="" height="70" width="278" />
            </div>
          </div>
        </q-card>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
const contacts = [
  {
    id: 0,
    name: 'Lab 3D',
    content:
      'Lab3d是一个炫酷的线上虚拟仿真科学实验室。在这里，提供了有趣、免费、互动、基于研究的科学仿真实验。3D化的建模与场景为学生带来了更为真实的实验情境，故事化的引导模式与自由探索相结合，让学生在游戏化的实验情境中建构知识，强化情景式记忆，做到寓教于乐。',
    content1:
      '我们使用Vue与BabylonJS进行结合，将虚拟实验搭载至网页端，实验无需下载，在线上即可实时进行模拟，赶紧开启你的实验师之旅吧！',
  },
  {
    id: 1,
    name: '我们团队',
    content:
      'Xteam是由杭州师范大学教育技术系徐光涛副教授牵头带领的团队，团队的主要成员来自于杭州师范大学教育技术学专业的研究生和本科生们。团队的主要研究方向是学习科学与技术，我们致力于研究如何利用学习科学理论融入至教学环境设计中。',
    content1: '',
  },
  {
    id: 2,
    name: '联系我们',
    content: '您可以通过电子邮件或在网站上报告向我们发送有关虚拟实验相关的问题资讯与改进意见。',
    content1: 'Email：hznu_xteam@aliyun.com',
  },
]

export default {
  data() {
    return {
      contacts,
      right: true,
      left: true,
      active0: true,
      active1: false,
      active2: false,
      isActive: false,
      showpic: true,
      i: 0,
    }
  },
  methods: {
    clear() {
      this.active0 = false
      this.active1 = false
      this.active2 = false
      this.showpic = false
      this.isActive = false
    },
    change0() {
      this.clear()
      this.active0 = true
      this.showpic = true
      this.i = 0
    },
    change1() {
      this.clear()
      this.active1 = true
      this.i = 1
    },
    change2() {
      this.clear()
      this.active2 = true
      this.i = 2
      this.isActive = true
    },
  },
}
</script>
<style scoped>
.incrHigh {
  margin: 89px 0 0 0;
}
.content {
  font-size: 24px;
  font-weight: 200;
  line-height: 40px;
  color: #424c52;
}
.active {
  color: #fc8059;
}
</style>