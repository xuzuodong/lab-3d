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

    <q-separator class="q-my-lg" color="grey-6" inset />

    <div class="container">
      <div class="text-h6 q-my-md">- 实验过程解析 -</div>
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
        <div class="text-h6 q-my-md">- 复习建议 -</div>
        <p class="text-body1">{{ experimentReview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapActions, mapState } from 'vuex'
import KexperimentDetailsTestsVue from './KexperimentDetailsTests.vue'
export default {
  components: { KexperimentDetailsTestsVue },

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

    evaluation: function () {
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

    behaviorList: function () {
      const returnArr = []
      this.realBehaviorInfo.forEach((e, i) => {
        if (e.isCorrect === true) returnArr.push({ ...e, isCorrect: '正确' })
        else returnArr.push({ ...e, isCorrect: '错误' })
      })
      return returnArr
    },

    presentScore: function () {
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
