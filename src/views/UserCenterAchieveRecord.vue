<template>
  <div>
    <div class="row">
      <div class="col q-mx-md" v-for="item in items" :key="item.num">
        <q-card style="border-radius: 30px">
          <q-card-section>
            <div class="row justify-between q-mb-sm">
              <div class="vertical-middle col-auto" style="display: inline; font-size: 16px">
                {{ item.text1 }}
              </div>
              <div class="col-auto column justify-center">
                <q-avatar size="22px" :color="item.color" style="border-radius: 6px; color: white">
                  {{ item.text2 }}
                </q-avatar>
              </div>
            </div>

            <q-separator />

            <div class="text-h5 q-mt-sm">{{ item.times }}</div>
            <div class="row justify-between">
              <div class="column justify-center">
                {{ item.describe }}
              </div>
              <div class="column justify-center q-my-none">
                <svg
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                >
                  <path :d="item.d1" fill="#000000"></path>
                  <path :d="item.d2" fill="#000000"></path>
                  <path :d="item.d3" fill="#000000"></path>
                </svg>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-mt-lg">
      <q-splitter v-model="splitterModel" style="" disable>
        <template v-slot:before>
          <div class="q-pa-md">
            <div class="text-h5" style="display: inline">实验历史记录</div>
            <q-btn flat color="blue-7" rounded class="float-right" dense to="/kexperiments-list">
              更多数据…
            </q-btn>
            <q-separator />
            <div class="q-pa-md" v-if="hasExperiment == 1">
              <q-carousel
                v-model="slide"
                animated
                padding
                autoplay
                arrows
                infinite
                height="400px"
                style="background-color: rgba(0, 0, 0, 0)"
                class=""
                control-color="black"
              >
                <q-carousel-slide
                  :name="item.slide"
                  class="column no-wrap flex-center"
                  v-for="item in carousel"
                  :key="item.style"
                >
                  <q-img :src="item.src" width="300px" :ratio="3 / 2" />
                  <div class="q-my-md text-center text-h5 text-bold">{{ item.ExperimentName }}</div>
                  <div class="text-center text-h6">
                    共完成
                    <span class="text-blue text-h4">{{ item.CompletionTimes }}</span>
                    次实验
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
            <div v-else class="text-center q-ma-xl text-h4">完成第一个实验解锁实验历史记录！</div>
          </div>
        </template>

        <template v-slot:after>
          <div class="q-pa-md">
            <div class="text-h5 q-mb-md">科学探究能力</div>
            <q-separator />
            <div>
              <x-chart id="highcharts" :option="option" v-if="optiondata"></x-chart>
            </div>
          </div>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
import XChart from './KexperimentOverviewChart.vue'
import { mapActions } from 'vuex'
export default {
  components: { XChart },
  data() {
    return {
      optiondata: false,
      hasExperiment: 1,
      splitterModel: 50,
      items: [
        {
          num: 1,
          text1: '实验数量',
          color: 'yellow-14',
          text2: '个',
          times: 0,
          describe: '已完成实验的数量',
          d1: 'M959.700094 1024h-255.920025V895.720087h63.980006v63.980007h127.960012V63.980006h-127.960012v319.900031h-63.980006V0h255.920025v1024z',
          d2: 'M639.800062 0h383.880038v63.980006H639.800062zM831.740081 383.880037h95.97001v63.980007h-95.97001zM831.740081 511.84005h95.97001v63.980006h-95.97001zM831.740081 639.800062h95.97001v63.980007h-95.97001zM831.740081 767.760075h95.97001v63.980006h-95.97001zM831.740081 255.920025h95.97001v63.980006h-95.97001zM831.740081 127.960012h95.97001v63.980007h-95.97001zM191.940019 0.3199h383.880037v63.980006H191.940019zM30.454483 603.779319l0.38388-63.980006 673.389566 3.99875-0.38388 63.980006z',
          d3: 'M383.880037 1023.6801A383.880037 383.880037 0 0 1 255.920025 278.313027V0h255.920025v277.993127A383.880037 383.880037 0 0 1 383.880037 1023.6801zM319.900031 63.980006v261.678226l-23.352702 6.7179a319.900031 319.900031 0 1 0 174.665417 0l-23.352702-6.7179V63.980006z',
        },
        {
          num: 2,
          text1: '实验平均得分',
          color: 'light-green-12',
          text2: '分',
          times: 0,
          describe: '平均每个实验的得分',
          d1: 'M512 74.89C270.59 74.89 74.89 270.59 74.89 512S270.59 949.11 512 949.11 949.11 753.41 949.11 512 753.41 74.89 512 74.89z m255.34 692.45c-33.19 33.19-71.82 59.24-114.81 77.42-44.47 18.81-91.75 28.35-140.54 28.35s-96.07-9.54-140.54-28.35c-42.99-18.18-81.62-44.23-114.81-77.42-33.19-33.19-59.24-71.82-77.42-114.81-18.81-44.47-28.35-91.75-28.35-140.54 0-48.78 9.54-96.07 28.35-140.54 18.18-42.99 44.23-81.62 77.42-114.81 33.19-33.19 71.82-59.24 114.81-77.42 44.47-18.81 91.75-28.35 140.54-28.35s96.07 9.54 140.54 28.35c42.99 18.18 81.62 44.23 114.81 77.42 33.19 33.19 59.24 71.82 77.42 114.81 18.81 44.47 28.35 91.75 28.35 140.54 0 48.78-9.54 96.07-28.35 140.54-18.18 43-44.23 81.63-77.42 114.81z',
          d2: 'M733.32 636.9H714.4V348.63c0-20.99-17.01-38-38-38s-38 17.01-38 38V636.9h-85.47V292.5c0-20.99-17.01-38-38-38s-38 17.01-38 38v344.4H387V464.4c0-20.99-17.01-38-38-38s-38 17.01-38 38v172.5h-14.46c-20.99 0-38 17.01-38 38s17.01 38 38 38h436.78c20.99 0 38-17.01 38-38s-17.01-38-38-38z',
          d3: '',
        },
        {
          num: 3,
          text1: '实验时长',
          color: 'light-blue-12',
          text2: 'min',
          times: 0,
          describe: '平均每个实验用时',
          d1: 'M878.08 731.274667a32 32 0 0 1-54.88-32.938667A360.789333 360.789333 0 0 0 874.666667 512c0-200.298667-162.368-362.666667-362.666667-362.666667S149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667a360.789333 360.789333 0 0 0 186.314667-51.445334 32 32 0 0 1 32.928 54.88A424.778667 424.778667 0 0 1 512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667c0 78.293333-21.152 153.568-60.586667 219.274667z m-548.704-81.898667L480 498.741333V320a32 32 0 0 1 64 0v192a32 32 0 0 1-9.376 22.624l-160 160a32 32 0 1 1-45.248-45.248z',
          d2: '',
          d3: '',
        },
        {
          num: 4,
          text1: '发帖次数',
          color: 'purple-12',
          text2: '次',
          times: 0,
          describe: '答疑区提问及回复次数',
          d1: 'M808.35715 213.332736c-164.707272-164.709319-432.683537-164.709319-597.333504 0-164.709319 164.649967-164.709319 432.624185 0 597.333504 164.649967 164.709319 432.626231 164.709319 597.333504 0C973.067492 645.956921 973.067492 377.982704 808.35715 213.332736zM765.48983 767.767198c-141.075039 141.077086-370.609783 141.077086-511.627517 0-141.078109-141.017734-141.078109-370.520755 0-511.596817 141.017734-141.017734 370.552477-141.077086 511.627517 0C906.506541 397.188114 906.506541 626.750487 765.48983 767.767198z',
          d2: 'M500.686838 686.040848c-20.432355 0.061398-37.063127 16.692171-37.063127 37.095873 0 20.458961 16.630772 37.090756 37.092803 37.090756 20.432355 0 37.066197-16.631796 37.066197-37.151132C537.781688 702.672644 521.147846 686.040848 500.686838 686.040848z',
          d3: 'M505.832022 265.144776c-72.362075 0-136.290059 41.640376-158.933779 103.683431-5.26491 14.508435-9.813506 38.620599-5.26491 58.753125 3.048429 13.81975 17.709337 22.974247 31.320333 19.863397 14.117532-3.171226 23.0029-17.23043 19.832697-31.290657-1.556449-7.210215-0.060375-20.132526 3.350304-29.435403 12.533454-34.342156 51.27378-69.043493 109.60735-69.043493 68.681242 0 116.635417 35.091216 116.635417 85.375459 0 37.572734-23.302729 51.1561-64.525596 72.034617-37.303604 18.847254-83.761706 42.241057-83.761706 101.289917L474.092134 629.981065c0 14.478759 11.784394 26.2652 26.204825 26.2652 14.449084 0 26.235524-11.786441 26.235524-26.2652l0-53.606919c0.060375-25.605168 18.936281-36.317137 55.042617-54.504358 41.6107-20.968567 93.421716-47.025013 93.421716-118.820176C674.997839 321.862545 605.418135 265.144776 505.832022 265.144776z',
        },
      ],
      slide: 1,
      carousel: [],

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
            name: '历史平均得分',
            data: [],
            pointPlacement: 'on',
            showInLegend: false,
          },
        ],
      },

      getScoreList: ['leadIn', 'inquiry', 'assumed', 'chosen', 'concluded', 'reflected'],
      returnScoreList: [],
    }
  },
  methods: {
    ...mapActions('user', [
      'getKexperimentNumOfExperimentName',
      'getSubScoreByTitle',
      'getAvgTotalTime',
      'getPostNumOfUser',
      'getAvgSubScoreByTitle',
    ]),
    ...mapActions('experiment', ['selectAllExperiments']),

    addCarousel() {
      this.selectAllExperiments({
        success: (experiments) => {
          this.getKexperimentNumOfExperimentName({
            success: (res) => {
              for (let i = 0; i < res.length; i++) {
                this.carousel.push({
                  slide: res[i].experiment_id,
                  src: experiments.find((e) => e.id == res[i].experiment_id).image,
                  ExperimentName: experiments.find((e) => e.id == res[i].experiment_id).name,
                  CompletionTimes: res[i].nums,
                })
                this.items.find((e) => e.num == 1).times += res[i].nums
              }
              console.log(res)
            },
            failure: (err) => {
              console.log(err)
            },
          })
        },
        failure: (res) => {
          this.failure = true
          console.log(res)
        },
      })

      this.getAvgTotalTime({
        success: (res) => {
          this.items.find((e) => e.num == 3).times = (res[0].total_time / 60).toFixed(2) || 0
          console.log(res)
        },
        failure: (err) => {
          console.log(err)
        },
      })
      this.getPostNumOfUser({
        success: (res) => {
          this.items.find((e) => e.num == 4).times = res[0].num || 0
          console.log(res)
        },
        failure: (err) => {
          console.log(err)
        },
      })
    },

    pushAvgData(res) {
      this.option.series[0].data.push(res)
      this.items.find((e) => e.num == 2).times += res || 1
    },

    getAvgScore() {
      this.getAvgSubScoreByTitle({
        title: 'leadIn',
        success: (res) => {
          // console.log(res[0].avg(leadIn_score))
          console.log(res[0])
          this.pushAvgData(res[0].avgScore)

          this.getAvgSubScoreByTitle({
            title: 'assumed',
            success: (res) => {
              this.pushAvgData(res[0].avgScore)
              this.getAvgSubScoreByTitle({
                title: 'chosen',
                success: (res) => {
                  this.pushAvgData(res[0].avgScore)
                  this.getAvgSubScoreByTitle({
                    title: 'inquiry',
                    success: (res) => {
                      this.pushAvgData(res[0].avgScore)
                      this.getAvgSubScoreByTitle({
                        title: 'concluded',
                        success: (res) => {
                          this.pushAvgData(res[0].avgScore)
                          this.getAvgSubScoreByTitle({
                            title: 'reflected',
                            success: (res) => {
                              this.pushAvgData(res[0].avgScore)
                              this.items.find((e) => e.num == 2).times.toFixed(2)
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
      // for (let i = 0; i < this.getScoreList.length; i++) {
      //   this.getSubScoreByTitle({
      //     title: this.getScoreList[i],
      //     success: (res) => {
      //       // this.option.series[0].data[i] = res[0].num
      //       // this.items.find((e) => e.num == 2).times += res[0].num || 1
      //       console.log(res.length)
      //       this.option.series[0].data.push(
      //         res.reduce(function (a, b) {
      //           return parseInt(a) + parseInt(b)
      //         }, 0) / res.length
      //       )
      //       this.items.find((e) => e.num == 2).times =
      //         this.option.series[0].data.reduce(function (a, b) {
      //           return parseInt(a) + parseInt(b)
      //         }, 0) || 0
      //       if (this.option.series[0].data.length == 6) {
      //         this.optiondata = true
      //       }
      //     },
      //     failure: (err) => {
      //       console.log(err)
      //     },
      //   })
      // }
    },
  },

  created() {
    this.addCarousel()
    this.getAvgScore()
  },

  mounted() {},
}
</script>
