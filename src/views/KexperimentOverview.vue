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
          <div class="text-h5 q-my-md" style="text-align: center">
            恭喜你完成第
            <span style="color: #ec9184">{{ experimentTime }}</span>
            次实验~
          </div>
          <div class="text-h5 text-center q-my-md">
            本次实验的评分是:
            <span class="text-red-14">{{ grade }}</span>
          </div>
          <div style="font-size: 18px; text-align: center" class="q-mt-xl">
            前往
            <q-btn outline rounded color="primary">
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
          <div style="font-size: 18px; text-align: center" class="q-mt-md">
            前往
            <q-btn outline rounded color="primary">
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
                    <q-btn outline rounded color="primary" class="">
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
                <x-chart id="highcharts" :option="option"></x-chart>
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
export default {
  props: {
    experimentTime: Number,
    grade: String,
  },
  data() {
    return {
      splitterModel: 40, // start at 50%
      option: {
        chart: {
          polar: true,
          type: 'line',
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
          pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
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
            data: [1, 5, 4, 4, 3, 2],
            pointPlacement: 'on',
          },
          {
            name: '本次得分',
            data: [5, 2, 4, 4, 5, 2],
            pointPlacement: 'on',
          },
        ],
      },
    }
  },
  components: {
    XChart,
  },
}
</script>
