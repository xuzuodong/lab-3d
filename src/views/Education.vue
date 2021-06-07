<template>
  <div class="container">
    <div class="text-h4 q-my-md">课堂教学应用</div>
    <q-separator />
    <div class="text-h6 q-my-md">{{ classApply }}</div>
    <div class="row justify-around">
      <div class="col-4 text-center">
        <q-img :src="wuchang" />
        <p class="text-h6 q-mt-sm">五常中学</p>
      </div>
      <div class="col-4 text-center">
        <q-img :src="huixing" />
        <p class="text-h6 q-mt-sm">惠兴中学</p>
      </div>
    </div>
    <div class="text-h4 q-my-md">线下推广活动</div>
    <q-separator />
    <div class="text-h6 q-my-md">{{ expand }}</div>
    <div class="row justify-around">
      <div class="col-3 text-center">
        <q-img :src="ha" />
        <p class="text-h6 q-mt-sm">江苏淮安</p>
      </div>
      <div class="col-3 text-center">
        <q-img :src="hz" />
        <p class="text-h6 q-mt-sm">浙江杭州</p>
      </div>
      <div class="col-3 text-center">
        <q-img :src="fs" />
        <p class="text-h6 q-mt-sm">广东佛山</p>
      </div>
    </div>
    <div class="text-h4 q-my-md">科学研究成果</div>
    <q-separator />
    <div v-for="item in achievements" :key="item.id">
      <div class="row justify-around q-py-md">
        <q-img :src="require('../assets/competitionAssets/' + item.imgSrc)" class="col-2" contain />
        <div class="col-8">
          <div class="text-h5">
            <strong>{{ item.name }}</strong>
          </div>
          <div class="text-body1 q-my-md" v-html="item.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wuchang from '../assets/competitionAssets/wuchang.jpg'
import huixing from '../assets/competitionAssets/huixing.jpg'
import ha from '../assets/competitionAssets/tg-ha.jpg'
import hz from '../assets/competitionAssets/tg-hz.jpg'
import fs from '../assets/competitionAssets/tg-fs.jpg'
export default {
  data() {
    return {
      classApply:
        '我们使用本虚拟实验平台，已经在杭州五常中学、杭州惠兴中学的科学课堂中进行了实际教学使用，受到了老师和同学们的普遍好评，也给我们提出了一些非常宝贵的意见。',
      wuchang,
      huixing,
      expand:
        '团队还通过参加各地举办的虚拟现实研讨论坛，对我们的虚拟实验平台进行推广。推广现场，有非常多的虚拟现实领域的专家与中小学教师了解体验了本平台。',
      ha,
      hz,
      fs,
      achievements: [
        {
          id: 1,
          name: '学术论文',
          imgSrc: 'Paper.png',
          description:
            '依托本虚拟实验平台，我们进行各种科学研究，目前已产出了多篇学术论文：<br/>- 许作栋. 面向探究式学习的Web3D虚拟实验交互设计研究[D].杭州师范大学,2020. <br/> - Li Yingqian,Yang Yang, Yao Zhengwei,Xu Guangtao. Virtual 3D environment for exploring the spatial ability of students. Virtual Reality & Intelligent Hardware, 2020, 2(6): 556—568 DOI: 10.1016/j.vrih.2020.08.001 <br/> - 范文翔,赵瑞斌.数字学习环境新进展:混合现实学习环境的兴起与应用[J].电化教育研究,2019,40(10):40-46+60 <br/> - 徐光涛,许作栋,李英明,黄剑兰,李垚.近二十年学习科学领域的研究脉络与发展趋势——对《人是如何学习的》系列报告的文本分析[J].华东师范大学学报(教育科学版),2020,38(03):80-92.',
        },
        {
          id: 2,
          name: '软件测评报告',
          imgSrc: 'copyright.jpg',
          description: '为了找出本平台中潜在的各种错误和缺陷，通过修正各种错误和缺陷以提高平台质量，回避平台发布后由潜在的开发漏洞造成的隐患所带来的各种风险。本团队提请浙江省电子信息产品检验研究院进行了鉴定测试。<br/>测试结果表明，本项目功能完整、界面友好、系统鲁棒性强。',
        },
        {
          id: 3,
          name: '软件著作权',
          imgSrc: 'testReport.png',
          description: '整个虚拟实验平台及各个虚拟实验，我们都申请了软件著作权。<br/>- Web3D探究式虚拟实验平台  著作权人：徐光涛，许作栋，李英倩，史涛，朱洲洋 <br/> - “盐的溶解”虚拟实验    著作权人：徐光涛，许作栋，邹超，李英明，叶海云 <br/> - “溶液的PH值”虚拟实验     著作权人：徐光涛，邹超，李英倩，叶海云，胡艺慧 <br/> - “牛顿第一定律”虚拟实验           著作权人：徐光涛，邹超，李英倩，叶海云，胡艺慧',
        },
      ],
    }
  },
}
</script>

<style scoped>
</style>