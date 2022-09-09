<template>
  <div class="container">
    <q-splitter v-model="splitterModel" disable separator-style="background-color: transparent">
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="row justify-center">
            <svg
              class="col q-mt-xl"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              height="160"
            >
              <path d="M896 42.666667h-128l-170.666667 213.333333h128z" fill="#FF4C4C"></path>
              <path d="M768 42.666667h-128l-170.666667 213.333333h128z" fill="#3B8CFF"></path>
              <path d="M640 42.666667h-128L341.333333 256h128z" fill="#F1F1F1"></path>
              <path d="M128 42.666667h128l170.666667 213.333333H298.666667z" fill="#FF4C4C"></path>
              <path d="M256 42.666667h128l170.666667 213.333333h-128z" fill="#3B8CFF"></path>
              <path d="M384 42.666667h128l170.666667 213.333333h-128z" fill="#FBFBFB"></path>
              <path d="M298.666667 256h426.666666v213.333333H298.666667z" fill="#E3A815"></path>
              <path d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z" fill="#FDDC3A"></path>
              <path d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z" fill="#E3A815"></path>
              <path
                d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z"
                fill="#F5CF41"
              ></path>
              <path
                d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z"
                fill="#D19A0E"
              ></path>
              <path
                d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z"
                fill="#F9D525"
              ></path>
              <path
                d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z"
                fill="#FFF2A0"
              ></path>
            </svg>
          </div>
          <div class="text-h5 q-my-md text-center">
            恭喜你完成第
            <span style="color: #ec9184">{{ experimentTime }}</span>
            次实验~
          </div>
          <div class="text-h5 text-center q-my-md">
            本次实验的评分是:
            <span class="text-red-14">{{ grade }}</span>
          </div>
          <div>
            <div style="font-size: 18px" class="q-mt-xl text-center" v-if="showPostTestBtn">
              前往
              <q-btn outline rounded color="primary" @click="postTest(experimentId, 2)">
                <div>实验后测</div>
                <q-icon size="2em">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    class="bg-color-primary"
                  >
                    <path
                      d="M11.71,17.99C8.53,17.84,6,15.22,6,12c0-3.31,2.69-6,6-6c3.22,0,5.84,2.53,5.99,5.71l-2.1-0.63C15.48,9.31,13.89,8,12,8 c-2.21,0-4,1.79-4,4c0,1.89,1.31,3.48,3.08,3.89L11.71,17.99z M22,12c0,0.3-0.01,0.6-0.04,0.9l-1.97-0.59C20,12.21,20,12.1,20,12 c0-4.42-3.58-8-8-8s-8,3.58-8,8s3.58,8,8,8c0.1,0,0.21,0,0.31-0.01l0.59,1.97C12.6,21.99,12.3,22,12,22C6.48,22,2,17.52,2,12 C2,6.48,6.48,2,12,2S22,6.48,22,12z M18.23,16.26L22,15l-10-3l3,10l1.26-3.77l4.27,4.27l1.98-1.98L18.23,16.26z"
                    />
                  </svg>
                </q-icon>
              </q-btn>
              进行挑战吧！
            </div>
            <div class="text-center text-h6" v-else>
              实验后测得分：
              <span>
                <!-- <q-btn
                  class="text-h6 q-my-none"
                  color="primary"
                  label="点击前往"
                  @click="postTest(experimentId, 2)"
                  flat
                /> -->
                <span class="text-red-14">
                  {{ backScore }}
                  <span v-if="backScore != '未完成'">
                    {{ `(${countPostTest.countTrue} / ${countPostTest.total})` }}
                  </span>
                </span>
              </span>
            </div>
          </div>
          <div style="font-size: 18px; text-align: center" class="q-mt-md">
            前往
            <q-btn outline rounded color="primary" @click="toUserCenter">
              <div>个人中心</div>
              <q-icon size="2em">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  class="bg-color-primary"
                >
                  <path
                    d="M11.71,17.99C8.53,17.84,6,15.22,6,12c0-3.31,2.69-6,6-6c3.22,0,5.84,2.53,5.99,5.71l-2.1-0.63C15.48,9.31,13.89,8,12,8 c-2.21,0-4,1.79-4,4c0,1.89,1.31,3.48,3.08,3.89L11.71,17.99z M22,12c0,0.3-0.01,0.6-0.04,0.9l-1.97-0.59C20,12.21,20,12.1,20,12 c0-4.42-3.58-8-8-8s-8,3.58-8,8s3.58,8,8,8c0.1,0,0.21,0,0.31-0.01l0.59,1.97C12.6,21.99,12.3,22,12,22C6.48,22,2,17.52,2,12 C2,6.48,6.48,2,12,2S22,6.48,22,12z M18.23,16.26L22,15l-10-3l3,10l1.26-3.77l4.27,4.27l1.98-1.98L18.23,16.26z"
                  />
                </svg>
              </q-icon>
            </q-btn>
            制定新计划！
          </div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <q-card>
            <q-card-section>
              <q-list>
                <q-item class="q-px-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="52" class="q-ml-md">
                    <rect width="10" height="52" fill="black" />
                  </svg>
                  <q-item-section class="q-mx-auto">
                    <div class="q-py-none text-h6">实验得分</div>
                    <div style="font-size: 15px">科学探究能力</div>
                  </q-item-section>
                  <div class="column justify-center q-mr-xl">
                    <q-btn outline rounded color="primary" class="" @click="toDetails">
                      <div>进入解析模式</div>
                      <q-icon size="2em">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enable-background="new 0 0 24 24"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          class="bg-color-primary"
                        >
                          <path
                            d="M11.71,17.99C8.53,17.84,6,15.22,6,12c0-3.31,2.69-6,6-6c3.22,0,5.84,2.53,5.99,5.71l-2.1-0.63C15.48,9.31,13.89,8,12,8 c-2.21,0-4,1.79-4,4c0,1.89,1.31,3.48,3.08,3.89L11.71,17.99z M22,12c0,0.3-0.01,0.6-0.04,0.9l-1.97-0.59C20,12.21,20,12.1,20,12 c0-4.42-3.58-8-8-8s-8,3.58-8,8s3.58,8,8,8c0.1,0,0.21,0,0.31-0.01l0.59,1.97C12.6,21.99,12.3,22,12,22C6.48,22,2,17.52,2,12 C2,6.48,6.48,2,12,2S22,6.48,22,12z M18.23,16.26L22,15l-10-3l3,10l1.26-3.77l4.27,4.27l1.98-1.98L18.23,16.26z"
                          />
                        </svg>
                      </q-icon>
                    </q-btn>
                  </div>
                </q-item>
              </q-list>
              <div>
                <x-chart id="highcharts" :option="option" v-if="optiondata"></x-chart>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import XChart from './KexperimentOverviewChart.vue'
import TestVue from './Test'
import { mapActions } from 'vuex'
import SelfEvaluationVue from './SelfEvaluation.vue'

export default {
  data() {
    return {
      optiondata: false,
      splitterModel: 40,
      experimentTime: 0,
      grade: 'A',
      posttestInfo: [],
      backScore: '',
      experimentId: 0,
      leadInTime: '',
      assumeTime: '',
      chosenTime: '',
      concludedTime: '',
      inquiryTime: '',
      reflectedTime: '',
      point1: 0,
      point2: 1,
      point3: 1,
      point4: 0,
      point5: 0,
      point6: 0,
      reflection: '',
      //雷达图的数据
      option: {
        chart: {
          polar: true,
          type: 'line',
          backgroundColor: 'rgba(0,0,0,0)',
        },
        accessibility: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        title: {
          text: null,
          x: -61,
        },
        pane: {
          size: '80%',
        },
        xAxis: {
          categories: ['提出问题', '猜想假设', '计划设计', '探索假设', '结论形成', '交流评估'],
          tickmarkPlacement: 'on',
          lineWidth: 0,
          labels: {
            style: {
              color: '#000000',
              fontSize: '20px',
            },
          },
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
          tickPixelInterval: 35,
        },
        tooltip: {
          snap: 0,
          shared: true,
          pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>',
        },
        //右边的那些点的象征和名字的样式
        legend: {
          align: 'right',
          verticalAlign: 'bottom',
          y: -20,
          x: -30,
          layout: 'vertical',
        },
        series: [
          {
            name: '本次实验得分',
            data: [],
            pointPlacement: 'on',
            showInLegend: false,
          },
          {
            name: '历史平均得分',
            data: [],
            pointPlacement: 'on',
            showInLegend: false,
          },
        ],
      },
    }
  },
  components: {
    XChart,
  },
  methods: {
    ...mapActions('user', [
      'getKexperimentNumOfExperimentName',
      'getKexperimentEvaluation',
      'getSubScoreByTitle',
      'getStepInfo',
      'submitSubScoreByTitle',
      'getAvgSubScoreByTitle',
    ]),
    ...mapActions('experiment', ['selectChoiceQuestion']),

    loadKexperimentEvaluation() {
      this.getKexperimentEvaluation({
        kexperimentId: this.$route.params.id,
        success: (evaluation) => {
          console.log(evaluation)
          document.title = evaluation.experimentName + ' | 实验评价'
          this.grade = evaluation.finalScore
          this.backScore = evaluation.posttestInfo.correct
          this.posttestInfo = evaluation.posttestInfo.errorResolution
          this.experimentId = evaluation.experimentId
          this.getKexperimentNumOfExperimentName({
            success: (res) => {
              this.experimentTime = res.find((e) => e.experiment_id == evaluation.experimentId).nums
              console.log(res)
            },
            failure: (err) => {
              console.log(err)
            },
          })
        },
        failure: (error) => {
          console.log(error)
        },
      })
    },

    toDetails() {
      this.$router.push({ path: '/kexperiment-details/' + this.$route.params.id })
    },

    toUserCenter() {
      this.$router.push({ path: '/user-center' })
    },

    postTest(experimentId, choiceType) {
      this.selectChoiceQuestion({
        experimentId,
        choiceType: choiceType,
        success: (res) => {
          this.$q
            .dialog({
              component: TestVue,
              parent: this,
              questionList: res,
              experimentId: experimentId,
              type: choiceType,
            })
            .onOk(() => {
              this.loadKexperimentEvaluation()
              console.log('ok')
            })
        },
        failure: (error) => {
          console.log(error)
        },
      })
    },

    judgeInquiryAndCoucluded() {
      this.getSubScoreByTitle({
        title: 'inquiry',
        kexperiment_id: this.$route.params.id,
        success: (res) => {
          if (res[0] == 0) {
            this.submitSubScoreByTitle({
              title: 'inquiry',
              kexperiment_id: this.$route.params.id,
              score: this.inquiry(),
              success: (res) => {
                console.log(res)
              },
              failure: (error) => {
                console.log(error)
              },
            })
            this.submitSubScoreByTitle({
              title: 'concluded',
              kexperiment_id: this.$route.params.id,
              score: this.concluded(),
              success: (res) => {
                console.log(res)
              },
              failure: (error) => {
                console.log(error)
              },
            })
          }
        },
        failure: (err) => {
          console.log(err)
        },
      })
    },

    getScore() {
      this.judgeInquiryAndCoucluded()
      this.getSubScoreByTitle({
        title: 'leadIn',
        kexperiment_id: this.$route.params.id,
        success: (res) => {
          this.point1 = res[0]
          this.getSubScoreByTitle({
            title: 'assumed',
            kexperiment_id: this.$route.params.id,
            success: (res) => {
              this.point2 = res[0]
              this.getSubScoreByTitle({
                title: 'chosen',
                kexperiment_id: this.$route.params.id,
                success: (res) => {
                  this.point3 = res[0]
                  this.inquiry()
                  this.concluded()
                  this.reflected()
                  this.pushData()
                },
                failure: (err) => {
                  console.log(err)
                },
              })
            },
            failure: (err) => {
              console.log(err)
            },
          })
        },
        failure: (err) => {
          console.log(err)
        },
      })
    },

    getAvgScore() {
      this.getAvgSubScoreByTitle({
        title: 'leadIn',
        success: (res) => {
          // console.log(res[0].avg(leadIn_score))
          console.log(res[0])
          this.option.series[1].data.push(res[0].avgScore)
          this.getAvgSubScoreByTitle({
            title: 'assumed',
            success: (res) => {
              this.option.series[1].data.push(res[0].avgScore)
              this.getAvgSubScoreByTitle({
                title: 'chosen',
                success: (res) => {
                  this.option.series[1].data.push(res[0].avgScore)
                  this.getAvgSubScoreByTitle({
                    title: 'inquiry',
                    success: (res) => {
                      this.option.series[1].data.push(res[0].avgScore)
                      this.getAvgSubScoreByTitle({
                        title: 'concluded',
                        success: (res) => {
                          this.option.series[1].data.push(res[0].avgScore)
                          this.getAvgSubScoreByTitle({
                            title: 'reflected',
                            success: (res) => {
                              this.option.series[1].data.push(res[0].avgScore)
                              this.optiondata = true
                              console.log(res)
                            },
                            failure: (error) => {
                              console.log(error)
                            },
                          })
                          console.log(res)
                        },
                        failure: (error) => {
                          console.log(error)
                        },
                      })
                      console.log(res)
                    },
                    failure: (error) => {
                      console.log(error)
                    },
                  })
                  console.log(res)
                },
                failure: (error) => {
                  console.log(error)
                },
              })
              console.log(res)
            },
            failure: (error) => {
              console.log(error)
            },
          })
          console.log(res)
        },
        failure: (error) => {
          console.log(error)
        },
      })
    },

    pushData() {
      console.log(this.point1, this.point2, this.point3, this.point4, this.point5, this.point6)
      this.option.series[0].data.push(this.point1)
      this.option.series[0].data.push(this.point2)
      this.option.series[0].data.push(this.point3)
      this.option.series[0].data.push(this.point4)
      this.option.series[0].data.push(this.point5)
      this.option.series[0].data.push(this.point6)
      this.getAvgScore()
    },

    inquiry() {
      if (this.grade == 'A') this.point4 = 5
      else if (this.grade == 'B') this.point4 = 4
      else if (this.grade == 'C') this.point4 = 3
      else if (this.grade == 'D') this.point4 = 2
      else this.point4 = 1
      return this.point4
    },

    concluded() {
      if (this.grade == 'A') this.point5 = 5
      else if (this.grade == 'B') this.point5 = 4
      else if (this.grade == 'C') this.point5 = 3
      else if (this.grade == 'D') this.point5 = 2
      else this.point5 = 1
      return this.point5
    },

    reflected() {
      if (this.reflection.length > 5) this.point6 = 3
      else if (this.reflection.length > 10) this.point6 = 4
      else if (this.reflection.length > 20) this.point6 = 5
      else this.point6 = 2
      return this.point6
    },
  },
  created() {
    this.loadKexperimentEvaluation()
    this.getStepInfo({
      stepName: 'reflected',
      kexperiment_id: this.$route.params.id,
      success: (res) => {
        if (res[0].reflected == null) {
          this.$q
            .dialog({
              component: SelfEvaluationVue,
              parent: this,
            })
            .onOk((reflection) => {
              this.reflection = reflection
              this.submitSubScoreByTitle({
                title: 'reflected',
                kexperiment_id: this.$route.params.id,
                score: this.reflected(),
                success: (res) => {
                  console.log(res)
                },
                failure: (error) => {
                  console.log(error)
                },
              })
              this.$router.go(0)
            })
        } else {
          this.getSubScoreByTitle({
            title: 'reflected',
            kexperiment_id: this.$route.params.id,
            success: (res) => {
              console.log(res)
              this.point6 = res[0]
              this.getScore()
            },
            failure: (error) => {
              console.log(error)
            },
          })
        }
        console.log(res)
      },
      failure: (error) => {
        console.log(error)
      },
    })
  },
  computed: {
    showPostTestBtn: function () {
      if (this.backScore === '未完成') return true
      else return false
    },
    countPostTest: function () {
      const total = this.posttestInfo.length
      let countTrue = 0
      this.posttestInfo.forEach((e) => {
        if (e.isCorrect == true) countTrue++
      })
      return { total, countTrue }
    },
  },
}
</script>
