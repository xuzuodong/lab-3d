<template>
  <div class="" style="min-height: calc(100vh - 105px)">
    <div class="row">
      <div class="col-12 text-h4 text-center q-my-lg">学习档案与学习推荐</div>
      <div class="col-12 text-body1 text-center q-my-xs">实验师名字：{{ userInfo.name }}</div>
    </div>

    <div class="container">
      <div>
        <div class="text-h6 q-my-md">
          <q-icon name="description" size="sm" />
          实验历史与记录
        </div>
        <div class="row justify-around">
          <HighchartsColumn style="border: 1px solid" :chartConfig="experimentList" :styles="styles" />
          <HighchartsColumn style="border: 1px solid" :chartConfig="experimentScore" :styles="styles" />
        </div>
        <p class="text-body1 q-my-md">{{ experimentReview }}</p>
      </div>

      <div class="text-h6 q-my-md">
        <q-icon name="description" size="sm" />
        学习分析与学习推荐
      </div>
      <q-table :data="behaviorList" :columns="columns" row-key="behaviorName">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="rbehaviorContent" :props="props">
              {{ props.row.rbehaviorContent }}
            </q-td>
            <q-td key="suggest" :props="props">
              {{ props.row.suggest }}
            </q-td>
            <q-td key="button" :props="props">
              <q-btn
                @click="openVideo(props.row.videoUrl)"
                :disable="props.row.videoUrl == null"
                style="font-size: 14px"
                color="primary"
                label="查看知识点"
                flat
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div>
        <div class="text-h6 q-my-md">
          <q-icon name="description" size="sm" />
          班级学习情况
        </div>
        <div class="row justify-around">
          <HighchartsColumn style="border: 1px solid" :chartConfig="classExperimentList" :styles="styles" />
          <HighchartsColumn style="border: 1px solid" :chartConfig="classExperimentScore" :styles="styles" />
        </div>
        <p class="text-body1 q-my-md">{{ classReview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HighchartsColumn from '../components/HightchartsColumn.vue'
export default {
  components: { HighchartsColumn },

  data() {
    return {
      columns: [
        {
          name: 'rbehaviorContent',
          label: '实验历史行为',
          field: 'rbehaviorContent',
          align: 'center',
          style: 'min-width: 120px',
        },
        {
          name: 'suggest',
          label: '学习建议',
          field: 'suggest',
          align: 'center',
          style: 'min-width: 120px',
        },
        { name: 'button', label: '知识链接', field: 'button', align: 'center', style: 'min-width: 140px' },
      ],
      experimentList: {
        chart: {
          type: 'column',
        },
        title: {
          text: '实验次数记录',
          style: {
            fontSize: '20px',
          },
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          min: 0,
          title: {
            text: '实验次数（次）',
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      experimentScore: {
        chart: {
          type: 'column',
        },
        title: {
          text: '实验历史最高得分',
          style: {
            fontSize: '20px',
          },
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          min: 0,
          title: {
            text: '实验得分',
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      classExperimentList: {
        chart: {
          type: 'column',
        },
        title: {
          text: '班级实验次数记录',
          style: {
            fontSize: '20px',
          },
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          min: 0,
          title: {
            text: '班级完成人数（人）',
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      classExperimentScore: {
        chart: {
          type: 'column',
        },
        title: {
          text: '班级实验平均分',
          style: {
            fontSize: '20px',
          },
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          min: 0,
          title: {
            text: '实验平均得分',
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      styles: {
        width: 0,
        height: 0,
      },
      behaviorList: [],
      classReview: '',
      experimentReview: '',
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
  },

  created() {
    if (this.userInfo.id == 35) {
      this.behaviorList = [
        {
          rbehaviorContent: '您在【盐的溶解】实验中，多次设定了20°C的温度，来测定常温下盐的溶解度。',
          suggest: '对【常温】的定义还需继续复习与巩固。',
        },
        {
          rbehaviorContent: '您在【盐的溶解】实验中，多次在探究温度变量的过程中，改变了溶剂的种类。',
          suggest: '对【控制变量法】的实验方法还需要继续复习与巩固。',
        },
        {
          rbehaviorContent: '您在【中和反应】实验中，多次在后测题中的第3题发生错误。',
          suggest: '对【石蕊溶剂】的使用方法还需要继续复习与巩固。',
        },
      ]
      this.classReview =
        '您所在的班级是【七年一班】，您的班级中在【中和反应】的平均得分在83分，您在【中和反应】实验中的最高分在78分，还未超过实验平均得分，建议再进行巩固与联系。'
      this.experimentReview =
        '您总共完成实验21次，其中您最经常完成的实验是【盐的溶解】，总共完成了6次。您在【盐的溶解】实验中得分最高，得到了最高分90分。'
      this.experimentList.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 11,
            },
            {
              name: '中和反应',
              y: 6,
            },
            {
              name: '摩擦力',
              y: 4,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
      this.experimentScore.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 90,
            },
            {
              name: '中和反应',
              y: 78,
            },
            {
              name: '摩擦力',
              y: 82,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
      this.classExperimentList.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 28,
            },
            {
              name: '中和反应',
              y: 19,
            },
            {
              name: '摩擦力',
              y: 22,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
      this.classExperimentScore.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 83,
            },
            {
              name: '中和反应',
              y: 80,
            },
            {
              name: '摩擦力',
              y: 78,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
    }
    if (this.userInfo.id == 74) {
      this.behaviorList = [
        {
          rbehaviorContent: '您在【摩擦力】实验中，多次选择了“接触面积越大，摩擦力越大”的答案。',
          suggest: '对摩擦力的影响因素相关知识还需继续复习与巩固。',
        },
        {
          rbehaviorContent: '您在【盐的溶解】实验中，多次在探究温度变量的过程中，改变了溶剂的种类。',
          suggest: '对【控制变量法】的实验方法还需要继续复习与巩固。',
        },
        {
          rbehaviorContent: '您在【中和反应】实验中，多次在酸碱溶液混合后才滴加酸碱指示剂',
          suggest: '对【中和反应的实验流程】还需要继续复习与巩固。',
        },
      ]
      this.classReview =
        '您所在的班级是【七年级五班】，您的班级中在【盐的溶解】的平均得分在83分，您在【盐的溶解】实验中的最高分在80分，还未超过实验平均得分，建议再进行巩固与联系。'
      this.experimentReview =
        '您总共完成实验29次，其中您最经常完成的实验是【摩擦力实验】，总共完成了10次。您在【中和反应】实验中得分最高，得到了最高分92分。'
      this.experimentList.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 5,
            },
            {
              name: '中和反应',
              y: 2,
            },
            {
              name: '摩擦力',
              y: 10,
            },
            {
              name: '物质的酸碱性',
              y: 3,
            },
            {
              name: '稀硫酸的化学性质探究',
              y: 3,
            },
            {
              name: '磁场探秘',
              y: 6,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
      this.experimentScore.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 80,
            },
            {
              name: '中和反应',
              y: 92,
            },
            {
              name: '摩擦力',
              y: 90,
            },
            {
              name: '物质的酸碱性',
              y: 78,
            },
            {
              name: '稀硫酸的化学性质探究',
              y: 88,
            },
            {
              name: '磁场探秘',
              y: 82,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
      this.classExperimentList.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 46,
            },
            {
              name: '中和反应',
              y: 35,
            },
            {
              name: '摩擦力',
              y: 68,
            },
            {
              name: '物质的酸碱性',
              y: 18,
            },
            {
              name: '稀硫酸的化学性质探究',
              y: 20,
            },
            {
              name: '磁场探秘',
              y: 28,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
      this.classExperimentScore.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 83,
            },
            {
              name: '中和反应',
              y: 80,
            },
            {
              name: '摩擦力',
              y: 78,
            },
            {
              name: '物质的酸碱性',
              y: 75,
            },
            {
              name: '稀硫酸的化学性质探究',
              y: 81,
            },
            {
              name: '磁场探秘',
              y: 85,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
    }
    if (this.userInfo.id == 95) {
      this.behaviorList = [
        {
          rbehaviorContent: '您在【溶液的酸碱性】实验中，频繁更换溶液进行实验操作',
          suggest: '对实验中【控制变量法】的运用还需继续复习与巩固。',
        },
        {
          rbehaviorContent: '您在【溶液的酸碱性】实验中，多次在后测题中的第2题发生错误。',
          suggest: '对【常用酸碱指示剂】的知识还需要继续复习与巩固。',
        },
        {
          rbehaviorContent: '您在【盐的溶解】实验中，多次错误回答“常温下100ml水能最多溶解多少克食盐？”',
          suggest: '对【盐的溶解】的基础知识还需要继续复习与巩固。',
        },
      ]
      this.classReview =
        '您所在的班级是【七年级二班】，您的班级中在【物质的酸碱性】的平均得分在85分，您在【物质的酸碱性】实验中的最高分在81分，还未超过实验平均得分，建议再进行巩固与联系。'
      this.experimentReview =
        '您总共完成实验4次，其中您最经常完成的实验是【盐的溶解】，总共完成了3次。您在【盐的溶解】实验中得分最高，得到了最高分90分。'
      this.experimentList.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 3,
            },
            {
              name: '物质的酸碱性',
              y: 1,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
      this.experimentScore.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 90,
            },
            {
              name: '物质的酸碱性',
              y: 81,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
      this.classExperimentList.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 25,
            },
            {
              name: '物质的酸碱性',
              y: 22,
            },
            {
              name: '中和反应',
              y: 15,
            },
            {
              name: '摩擦力',
              y: 10,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
      this.classExperimentScore.series = [
        {
          name: '实验名称',
          data: [
            {
              name: '盐的溶解',
              y: 88,
            },
            {
              name: '物质的酸碱性',
              y: 85,
            },
            {
              name: '中和反应',
              y: 82,
            },
            {
              name: '摩擦力',
              y: 83,
            },
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ]
    }
  },

  methods: {},
}
</script>
