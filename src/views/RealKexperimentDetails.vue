<template>
  <div class="" style="min-height: calc(100vh - 105px)">
    <div class="row">
      <div class="col-12 text-h5 text-center q-my-lg">“{{ experimentName }}”实验结果</div>
    </div>
    <div class="row q-my-xm">
      <div class="col-10"></div>
      <q-btn label="导出报告" color="primary" class="text-h7" @click="exportReport" />
    </div>
    <div class="row justify-center items-center">
      <div class="col-1">
        <q-img :src="require('../assets/guide.png')" width="100%" />
      </div>
      <q-card flat class="col-5">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bold">
            实验综合得分（百分制）：
            <span class="text-red-14">{{ presentScore }}</span>
          </div>
        </q-card-section>

        <q-card-section class="text-center text-h6">
          原始得分/总分：
          <span>{{ finalScore }} / {{ allScore }}</span>
        </q-card-section>

        <q-card-section class="q-pt-none text-center text-body1">
          {{ evaluation }}
        </q-card-section>
      </q-card>
    </div>
    <div class="row justify-around" v-if="experimentId == 11">
      <HighchartsPie style="border: 1px solid" :chartConfig="chartConfig" :styles="styles" />
      <HighchartsPie style="border: 1px solid" :chartConfig="wrongChartConf" :styles="styles" />
    </div>

    <q-separator class="q-my-lg" color="grey-6" inset />

    <div class="container">
      <div class="text-h6 q-my-md">
        <q-icon name="import_contacts" size="sm" />
        - 实验操作总评 -
      </div>
      <div class="text-body1" v-if="experimentId == 11">{{ operationJudge }}</div>
      <div class="text-body1" v-if="experimentId == 12">
        在实验操作的规范性上，表现良好；在步骤顺序上表现良好；正确性上表现良好
      </div>
      <q-separator class="q-my-lg" color="grey-6" inset />

      <div class="text-h6 q-my-md" v-if="experimentId == 11">
        <q-icon name="lightbulb" size="sm" />
        - 知识学习总评 -
      </div>
      <div class="text-body1" v-if="experimentId == 11">{{ knowledgeJudge }}</div>
      <q-separator class="q-my-lg" color="grey-6" inset v-if="experimentId == 11" />

      <div class="text-h6 q-my-md" v-if="experimentId == 11">
        <q-icon name="mood" size="sm" />
        - 情感态度总评 -
      </div>
      <div class="text-body1" v-if="experimentId == 11">{{ emotionJudge }}</div>
      <q-separator class="q-my-lg" color="grey-6" inset v-if="experimentId == 11" />

      <div class="text-h6 q-my-md">
        <q-icon name="rotate_right" size="sm" />
        - 实验过程解析 -
      </div>
      <q-table :data="behaviorList" :columns="columns" :loading="loading" row-key="behaviorName">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="rbehaviorName" :props="props">
              {{ props.row.rbehaviorName }}
            </q-td>
            <q-td key="duration" :props="props">
              {{ diffData(props.row.stime, props.row.ktime) }}
            </q-td>
            <q-td key="isCorrect" :props="props">{{ props.row.isCorrect }}（{{ props.row.score }}分）</q-td>
            <q-td key="wrong" :props="props">
              {{ props.row.wrong }}
            </q-td>
            <q-td key="analysis" :props="props">
              {{ props.row.analysis }}
            </q-td>
            <q-td key="sensor" :props="props">
              {{ props.row.sensor }}
            </q-td>
            <q-td key="emotion" :props="props">
              {{ props.row.emotion }}
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
        <KexperimentDetailsTestsVue :testTitle="'实验现象判断'" :testInfo="posttestInfo" />
      </div>
      <div>
        <div class="text-h6 q-my-md">
          <q-icon name="notifications" size="sm" />
          - 复习建议 -
        </div>
        <p class="text-body1">{{ experimentReview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapActions, mapState } from 'vuex'
import KexperimentDetailsTestsVue from './KexperimentDetailsTests.vue'
import HighchartsPie from '../components/HighchartsPie.vue'
export default {
  components: { KexperimentDetailsTestsVue, HighchartsPie },

  data() {
    return {
      columns: [
        {
          name: 'rbehaviorName',
          label: '实验行为操作',
          field: 'rbehaviorName',
          align: 'left',
          style: 'min-width: 120px',
        },
        {
          name: 'duration',
          label: '操作持续时间',
          field: 'duration',
          align: 'left',
          style: 'min-width: 120px',
        },
        {
          name: 'isCorrect',
          label: '行为判断',
          field: 'isCorrect',
          align: 'center',
          style: 'min-width: 120px',
        },
        { name: 'wrong', label: '错误解析', field: 'wrong', align: 'center', style: 'min-width: 120px' },
        { name: 'analysis', label: '改进建议', field: 'analysis', align: 'center' },
        { name: 'sensor', label: '感应媒介', field: 'sensor', align: 'center', style: 'min-width: 100px' },
        { name: 'emotion', label: '情绪', field: 'emotion', align: 'center', style: 'min-width: 100px' },
        { name: 'button', label: '知识点分析', field: 'button', align: 'center', style: 'min-width: 140px' },
      ],
      chartConfig: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: {
          text: '评分模块',
          style: {
            color: '#707171',
            fontSize: '24px',
          },
        },
        series: [
          {
            name: '比例',
            colorByPoint: true,
            data: [
              {
                name: '稀硫酸与酚酞试剂的反应',
                y: 25,
                sliced: true,
                selected: true,
              },
              {
                name: '稀硫酸与紫色石蕊的反应',
                y: 25,
              },
              {
                name: '稀硫酸与碳酸钠的反应',
                y: 35.7,
              },
              {
                name: '实验现象观察',
                y: 10.7,
              },
              {
                name: '整理与清洗',
                y: 3.6,
              },
            ],
          },
        ],
      },
      wrongChartConf: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: {
          text: '错误占比',
          style: {
            color: '#707171',
            fontSize: '24px',
          },
        },
        series: [
          {
            name: '比例',
            colorByPoint: true,
            data: [
              {
                name: '正确',
                y: 69,
                sliced: true,
                selected: true,
              },
              {
                name: '错误',
                y: 31,
              },
            ],
          },
        ],
      },
      styles: {
        width: 0,
        height: 0,
      },
      operationJudge:
        '在实验步骤上，您基本上能达成正确的实验要求，不过部分的流程步骤上还有一些生疏，比如您在结束实验时，未对实验器材进行清洗和整理。建议对实验的详细步骤在做进一步复习与巩固。规范操作是实验成功的根本保证，在实验的操作规范性上，您对实验的细节把握的较为不错，但是部分实验细节还需注意，如取稀硫酸试剂瓶，稀硫酸试剂瓶瓶盖未倒放。建议对实验的规范操作做一个细致的整理。',
      emotionJudge:
        '您在进行该实验操作时能够保持较高的专注度，对实验的整个流程都能较为专心地对待。且在危险实验操作时能保持冷静，规范地完成实验步骤。',
      knowledgeJudge: '对于实验现象与原理的认识上，您的掌握程度较好，能完全理解稀硫酸的化学性质。',
      experimentId: 0,
      experimentName: '',
      percentageScore: '',
      allScore: '',
      finalScore: '',
      posttestInfo: [],
      badge: '一般路过的实验师',
      loading: true,
      realBehaviorInfo: [],
      experimentReview: '',
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),

    evaluation: function() {
      switch (true) {
        case this.presentScore >= 90:
          return '新大神降临！您在这次的实验中的表现完美无缺！'
        case this.presentScore >= 80 && this.presentScore < 90:
          return '太棒了实验师！您在这次的实验中表现得十分出色！'
        case this.presentScore >= 60 && this.presentScore < 80:
          return '实验进行得不太顺利呢，实验师还要继续加油哦！'
        case this.presentScore < 60:
          return '实验中似乎出现了一些意外，建议查找问题重新实验吧！'
        default:
          return ''
      }
    },

    behaviorList: function() {
      const returnArr = []
      this.realBehaviorInfo.forEach((e, i) => {
        if (e.isCorrect === true) returnArr.push({ ...e, isCorrect: '正确' })
        else returnArr.push({ ...e, isCorrect: '错误' })
      })
      return returnArr
    },

    presentScore: function() {
      return Math.round(this.percentageScore * 100)
    },
  },

  created() {
    if (this.userInfo != null) this.loadKexperimentEvaluation()
  },

  methods: {
    ...mapActions('user', ['getRealExperimentEvaluation']),

    loadKexperimentEvaluation() {
      this.getRealExperimentEvaluation({
        kexperimentId: this.$route.params.id,
        success: (evaluation) => {
          console.log(evaluation)
          document.title = evaluation.experimentName + ' | 实验评价'
          this.experimentId = evaluation.experimentId
          this.experimentName = evaluation.experimentName
          this.percentageScore = evaluation.score.percentageScore
          this.allScore = evaluation.score.allScore
          this.finalScore = evaluation.score.finalScore
          this.posttestInfo = evaluation.posttestInfo?.errorResolution || []
          this.realBehaviorInfo = evaluation.realBehaviorInfo
          this.experimentReview = evaluation.experimentReview
          this.loading = false
        },
        failure: (error) => {
          console.log(error)
        },
      })
    },

    diffData(startStamp, endStamp) {
      let diff = date.getDateDiff(endStamp, startStamp, 'seconds')
      return `${parseInt(diff / 60)} 分 ${(diff % 60).toFixed(0)} 秒`
    },

    openVideo(url) {
      window.open(url, '_blank')
    },

    exportReport() {
      document.execCommand('print')
    },
  },
}
</script>
