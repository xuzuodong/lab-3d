<template>
  <div class="" style="min-height: calc(100vh - 105px)">
    <div class="row">
      <div class="col-12 text-h5 text-center q-my-md">“{{ experimentName }}”实验回顾</div>
    </div>
    <div class="row q-my-xm">
      <div class="col-10"></div>
      <q-btn label="导出报告" color="primary" class="text-h7" @click="exportReport" />
    </div>
    <div class="row justify-center">
      <q-card flat class="col-5">
        <q-card-section>
          <div class="q-my-xl"></div>
          <div class="text-h6 text-center text-weight-bold">
            实验综合得分：
            <span class="text-red-14">{{ grade }}</span>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center text-body1">
          {{ evaluation }}
        </q-card-section>
      </q-card>

      <q-separator vertical color="grey-6" />

      <q-card flat class="col-5">
        <q-card-section class="text-center text-h6">
          实验前测得分：
          <span class="text-blue-6">
            {{ frontScore }}
            <span v-if="frontScore != '未完成'">
              {{ `(${countPreTest.countTrue} / ${countPreTest.total})` }}
            </span>
          </span>
        </q-card-section>
        <q-card-section class="text-center text-h6">
          实验过程得分：
          <span class="text-red-14">{{ middleScore }}</span>
        </q-card-section>
        <q-card-section class="text-center text-h6">
          实验后测得分：
          <span>
            <q-btn
              class="text-h6 q-my-none"
              color="primary"
              label="点击前往"
              @click="postTest(experimentId, 2)"
              flat
              v-if="showPostTestBtn"
            />
            <span class="text-red-14" v-else>
              {{ backScore }}
              <span v-if="backScore != '未完成'">
                {{ `(${countPostTest.countTrue} / ${countPostTest.total})` }}
              </span>
            </span>
          </span>
        </q-card-section>
      </q-card>
    </div>
    <q-separator class="q-my-lg" color="grey-6" inset />

    <!-- <KexperimentOverview :experimentTime="2" :grade="this.grade"></KexperimentOverview> -->
    <!-- <SelfEvaluationVue></SelfEvaluationVue> -->

    <q-list class="container">
      <q-item class="q-px-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="52">
          <rect width="10" height="52" fill="black" />
        </svg>
        <q-item-section>
          <div class="q-py-none text-h6">科学探究能力</div>
          <div style="font-size: 12px">详细展示各步骤及解析</div>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- 提出问题 -->
    <div class="q-pa-md">
      <q-card class="container">
        <q-card-section>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="vertical-middle q-mr-sm">
            <circle cx="6" cy="6" r="6" fill="black" />
          </svg>
          <span class="q-mr-sm vertical-middle" style="font-size: 18px">提出问题</span>

          <!-- 根据得分自动填入星星数 -->
          <tr style="display: inline">
            <td v-for="index in point1" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="#FFD231"
                />
              </svg>
            </td>
          </tr>
          <tr style="display: inline">
            <td v-for="index in 5 - point1" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="grey"
                />
              </svg>
            </td>
          </tr>

          <div class="q-ma-lg row justify-center">
            <q-card style="width: 90%">
              <q-card-section>
                <div class="row items-center">
                  <div class="col-3 q-ml-md">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                      <path
                        d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"
                      />
                    </svg>
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">用时:3分钟</span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">观看完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="progress" color="primary" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="" style="font-size: 18px; text-align: center">
            通过情境导入，我可以了解到，本次实验的主题是
            <span class="text-primary text-bold">{{ subject }}</span>
            。
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- 提出问题 -->

    <!-- 猜想假设 -->
    <div class="q-pa-md">
      <q-card class="container">
        <q-card-section>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="vertical-middle q-mr-sm">
            <circle cx="6" cy="6" r="6" fill="black" />
          </svg>
          <span class="q-mr-sm vertical-middle" style="font-size: 18px">猜想假设</span>

          <!-- 根据得分自动填入星星数 -->
          <tr style="display: inline">
            <td v-for="index in point2" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="#FFD231"
                />
              </svg>
            </td>
          </tr>
          <tr style="display: inline">
            <td v-for="index in 5 - point2" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="grey"
                />
              </svg>
            </td>
          </tr>

          <div class="q-ma-lg row justify-center">
            <q-card style="width: 90%">
              <q-card-section>
                <div class="row items-center">
                  <div class="col-3 q-ml-md">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                      <path
                        d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"
                      />
                    </svg>
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">用时:3分钟</span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="progress" color="primary" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="q-px-xl q-py-md">
            <q-table :data="guessData" :columns="guessColumns" row-key="name" flat hide-bottom>
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="text-h6 text-bold"
                    style="font: 1.25em sans-serif; font-weight: bolder"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- 猜想假设 -->

    <!-- 计划设计 -->
    <div class="q-pa-md">
      <q-card class="container">
        <q-card-section>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="vertical-middle q-mr-sm">
            <circle cx="6" cy="6" r="6" fill="black" />
          </svg>
          <span class="q-mr-sm vertical-middle" style="font-size: 18px">计划设计</span>

          <!-- 根据得分自动填入星星数 -->
          <tr style="display: inline">
            <td v-for="index in point3" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="#FFD231"
                />
              </svg>
            </td>
          </tr>
          <tr style="display: inline">
            <td v-for="index in 5 - point3" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="grey"
                />
              </svg>
            </td>
          </tr>

          <div class="q-ma-lg row justify-center">
            <q-card style="width: 90%">
              <q-card-section>
                <div class="row items-center">
                  <div class="col-3 q-ml-md">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                      <path
                        d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"
                      />
                    </svg>
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">用时:3分钟</span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="progress" color="primary" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="q-px-xl q-py-md">
            <q-splitter v-model="splitterModel" disable>
              <template v-slot:before>
                <div class="text-h6 text-bold" style="text-align: center">我的方案</div>
                <div class="q-pa-sm">
                  <q-list bordered separator>
                    <q-item v-for="item in datas" :key="item.message" style="text-align: center">
                      <q-item-section>{{ item.message }}</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </template>

              <template v-slot:after>
                <div class="text-h6 text-bold" style="text-align: center">参考方案</div>
                <div class="q-pa-sm">
                  <q-list bordered separator>
                    <q-item v-for="item in datas" :key="item.message" style="text-align: center">
                      <q-item-section>{{ item.message }}</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </template>
            </q-splitter>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- 计划设计 -->

    <!-- 探索假设 -->
    <div class="q-pa-md">
      <q-card class="container">
        <q-card-section>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="vertical-middle q-mr-sm">
            <circle cx="6" cy="6" r="6" fill="black" />
          </svg>
          <span class="q-mr-sm vertical-middle" style="font-size: 18px">探索假设</span>

          <!-- 根据得分自动填入星星数 -->
          <tr style="display: inline">
            <td v-for="index in point4" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="#FFD231"
                />
              </svg>
            </td>
          </tr>
          <tr style="display: inline">
            <td v-for="index in 5 - point4" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="grey"
                />
              </svg>
            </td>
          </tr>

          <div class="q-ma-lg row justify-center">
            <q-card style="width: 90%">
              <q-card-section>
                <div class="row items-center">
                  <div class="col-3 q-ml-md">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                      <path
                        d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"
                      />
                    </svg>
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">用时:3分钟</span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="progress" color="primary" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="q-px-xl q-py-md">
            <q-table :data="exploreData" :columns="exploreColumns" row-key="name" flat hide-bottom>
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="text-h6 text-bold"
                    style="font-size: 1.3em; font-weight: 700"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- 探索假设 -->

    <!-- 结论形成 -->
    <div class="q-pa-md">
      <q-card class="container">
        <q-card-section>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="vertical-middle q-mr-sm">
            <circle cx="6" cy="6" r="6" fill="black" />
          </svg>
          <span class="q-mr-sm vertical-middle" style="font-size: 18px">结论形成</span>

          <!-- 根据得分自动填入星星数 -->
          <tr style="display: inline">
            <td v-for="index in point3" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="#FFD231"
                />
              </svg>
            </td>
          </tr>
          <tr style="display: inline">
            <td v-for="index in 5 - point3" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="grey"
                />
              </svg>
            </td>
          </tr>

          <div class="q-ma-lg row justify-center">
            <q-card style="width: 90%">
              <q-card-section>
                <div class="row items-center">
                  <div class="col-3 q-ml-md">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                      <path
                        d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"
                      />
                    </svg>
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">用时:3分钟</span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="progress" color="primary" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="q-px-xl q-py-md">
            <q-splitter v-model="splitterModel" disable separator-style="background-color: transparent">
              <template v-slot:before>
                <div class="text-h6 text-bold" style="text-align: center">我的结论</div>
                <div class="q-px-xl q-my-sm">
                  <q-card flat class="bg-grey-3">
                    <q-card-section>食盐能溶解在水中，常温下100g水中能溶解37.8g食盐。</q-card-section>
                  </q-card>
                </div>
              </template>

              <template v-slot:after>
                <div class="text-h6 text-bold" style="text-align: center">参考结论</div>
                <div class="q-px-xl q-my-sm">
                  <q-card flat class="bg-blue-2">
                    <q-card-section>
                      {{ conclusion.find((e) => e.refAnswer).refAnswer }}
                    </q-card-section>
                  </q-card>
                </div>
              </template>
            </q-splitter>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- 结论形成 -->

    <!-- 交流评估 -->
    <div class="q-pa-md">
      <q-card class="container">
        <q-card-section>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="vertical-middle q-mr-sm">
            <circle cx="6" cy="6" r="6" fill="black" />
          </svg>
          <span class="q-mr-sm vertical-middle" style="font-size: 18px">交流评估</span>

          <!-- 根据得分自动填入星星数 -->
          <tr style="display: inline">
            <td v-for="index in point3" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="#FFD231"
                />
              </svg>
            </td>
          </tr>
          <tr style="display: inline">
            <td v-for="index in 5 - point3" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="grey"
                />
              </svg>
            </td>
          </tr>

          <div class="q-ma-lg row justify-center">
            <q-card style="width: 90%">
              <q-card-section>
                <div class="row items-center">
                  <div class="col-3 q-ml-md">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                      <path
                        d="m15.3 16.7 1.4-1.4-3.7-3.7V7h-2v5.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"
                      />
                    </svg>
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">用时:3分钟</span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="progress" color="primary" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="row justify-center q-py-md">
            <div class="col-3 q-mx-lg">
              <q-card flat>
                <q-card-section>
                  <div style="text-align: center" class="text-h6 q-my-sm">自我表现评价</div>
                  <!-- 根据得分自动填入星星数 -->
                  <div class="q-my-sm" style="text-align: center">
                    <tr style="display: inline">
                      <td v-for="index in point7" :key="index">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          width="24"
                          class="vertical-middle"
                        >
                          <path
                            d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                            fill="#FFD231"
                          />
                        </svg>
                      </td>
                    </tr>
                    <tr style="display: inline">
                      <td v-for="index in 5 - point7" :key="index">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          width="24"
                          class="vertical-middle"
                        >
                          <path
                            d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                            fill="grey"
                          />
                        </svg>
                      </td>
                    </tr>
                  </div>
                  <div style="text-align: center" class="q-my-sm">{{ myAccess }}</div>
                </q-card-section>
              </q-card>
            </div>
            <q-separator vertical />
            <div class="col-3 q-mx-lg">
              <q-card flat>
                <q-card-section>
                  <div style="text-align: center" class="text-h6 q-my-sm">我的探究体验</div>
                  <div class="row items-center q-mt-md">
                    <svg
                      class="col"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                    >
                      <path
                        d="M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.485316A459.485316 459.485316 0 1 0 971.47871 512 459.485316 459.485316 0 0 0 512 52.514684z m326.490839 403.396542l-210.481549-58.301936 1.45342-5.430503-3.831742 2.180129-16.317936-28.843768 189.671226-107.916387 16.384 28.843768-152.146581 86.544516 184.055742 50.962168z m-126.513549 59.325935l21.404904 21.867355-65.139613 66.520361 1.915871 1.981936-21.603097 22.065548-68.178581-69.605574-44.593548 45.551484 1.981935 1.981935-21.669161 22.065549L447.917419 558.060181l-44.593548 45.551484 1.981935 1.981935-21.603096 22.065548-86.478452-88.262193 21.603097-22.065549 63.091613 64.399691 65.139613-66.513755 3.171096 3.210735 1.057033-1.096671 63.091613 64.399691 65.139612-66.513755 3.171097 3.210735 1.057033-1.096671 63.091612 64.399691zM394.339097 390.249703l1.453419 5.417291-210.349419 58.176412-8.720516-31.889341 183.923613-50.869678L208.631742 284.738065l16.317935-28.78431 189.539097 107.685161-16.317935 28.78431z"
                        fill="#b65bef"
                      ></path>
                    </svg>
                    <div class="col text-h6 text-bold" style="text-align: center; color: #b65bef">
                      难度太大，
                      <br />
                      没有理解！
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <q-separator vertical />
            <div class="col-3 q-mx-lg">
              <q-card flat>
                <q-card-section>
                  <div style="text-align: center" class="text-h6 q-my-sm">我的反思记录</div>
                  <div>{{ reflection }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- 交流评估 -->

    <div>
      <q-list bordered class="rounded-borders container">
        <q-expansion-item default-opened expand-separator label="实验流程">
          <KexperimentDetailsSummaryVue :behaviorInfo="behaviorInfo"></KexperimentDetailsSummaryVue>
        </q-expansion-item>

        <q-expansion-item default-opened expand-separator label="得分解析">
          <q-card>
            <q-card>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="behaviors" label="实验过程解析" />
                <q-tab name="tests" label="前后测试挑战解析" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="behaviors">
                  <KexperimentDetailsBehaviorsVue :behaviorInfo="behaviorInfo" />
                </q-tab-panel>

                <q-tab-panel name="tests">
                  <KexperimentDetailsTestsVue :testTitle="'前测选项解析'" :testInfo="pretestInfo" />
                  <KexperimentDetailsTestsVue :testTitle="'后测选项解析'" :testInfo="posttestInfo" />
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <div class="container">
      <div class="text-h6 q-my-md">- 复习建议 -</div>
      <p class="text-body1">{{ experimentReview }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import KexperimentDetailsBehaviorsVue from './KexperimentDetailsBehaviors.vue'
import KexperimentDetailsSummaryVue from './KexperimentDetailsSummary.vue'
import KexperimentDetailsTestsVue from './KexperimentDetailsTests.vue'
// import KexperimentOverview from './KexperimentOverview.vue'
// import SelfEvaluationVue from './SelfEvaluation.vue'
import TestVue from './Test'

export default {
  components: {
    KexperimentDetailsSummaryVue,
    KexperimentDetailsBehaviorsVue,
    KexperimentDetailsTestsVue,
    // KexperimentOverview,
    // SelfEvaluationVue,
  },

  data() {
    return {
      experimentId: 0,
      experimentName: '',
      grade: '',
      userName: '',
      frontScore: '',
      middleScore: '',
      backScore: '',
      right: true,
      left: true,
      tab: 'behaviors',
      pretestInfo: [],
      posttestInfo: [],
      behaviorInfo: [],
      experimentReview: '',
      progress: 0.3,
      subject: '盐的溶解性',
      guessColumns: [
        { name: 'question', label: '假设问题', field: 'question', align: 'center' },
        { name: 'assumption', label: '我的假设', field: 'assumption', align: 'center' },
      ],
      guessData: [
        {
          question: '食盐能无限的溶解在水中吗？',
          assumption: '能',
        },
        {
          question: '根据你的生活经验判断，常温下（25℃）在100g水中最多能溶解多少食盐呢？',
          assumption: '低于50g',
        },
      ],
      exploreColumns: [
        { name: 'operate', label: '我的操作', field: 'operate', align: 'center' },
        { name: 'judge', label: '操作判断', field: 'judge', align: 'center' },
        { name: 'correct', label: '正确操作', field: 'correct', align: 'center' },
        { name: 'link', label: '知识链接', field: 'link', align: 'center' },
      ],
      exploreData: [
        {
          operate: '选择结论选项【摩擦力与物体接触面的面积有关】',
          judge: '正确',
          correct: '选择结论选项【摩擦力与物体接触面的面积有关】',
          link: '查看知识点',
        },
        {
          operate: '选择结论选项【物体越轻，对地面的压力越小，摩擦力越小】',
          judge: '错误',
          correct: '选择结论选项【物体越轻，对地面的压力越小，摩擦力越大】',
          link: '查看知识点',
        },
      ],
      splitterModel: 50,
      datas: [
        { message: 'A 将温度调整至15℃' },
        { message: 'B 将温度调整至25℃' },
        { message: 'C 向烧杯中加入适量水' },
        { message: 'D 向烧杯中加入100毫升水' },
        { message: 'E 向烧杯中加盐，食盐完全溶解烧杯底部没有剩余' },
        { message: 'F 向烧杯中加盐至烧杯底部有剩余盐不再溶解' },
        { message: 'G 记录实验结果：盐的溶解度' },
        { message: 'H 结束实验' },
      ],
      point1: 4,
      point2: 3,
      point3: 5,
      point4: 1,
      point5: 2,
      point6: 5,
      point7: 5,
      conclusion: [{ refAnswer: '食盐能溶解在水中，常温20℃下100g水中能溶解37.8g食盐。' }],
      myAccess: '非常完美！',
      reflection: '实验过程中经常没有耐心看对话框，而忽略实验师的提醒。',
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
    showPostTestBtn: function () {
      if (this.backScore === '未完成') return true
      else return false
    },
    evaluation: function () {
      switch (this.grade) {
        case 'A':
          return '新大神降临！您在这次的实验中的表现完美无缺！'
        case 'B':
          return '太棒了实验师！您在这次的实验中表现得十分出色！'
        case 'C':
          return '实验进行得不太顺利呢，实验师还要继续加油哦！'
        case 'D':
          return '实验中似乎出现了一些意外，建议查找问题重新实验吧！'
        default:
          return ''
      }
    },
    countPreTest: function () {
      const total = this.pretestInfo.length
      let countTrue = 0
      this.pretestInfo.forEach((e) => {
        if (e.isCorrect == true) countTrue++
      })
      return { total, countTrue }
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

  created() {
    if (this.userInfo != null) this.loadKexperimentEvaluation()
  },

  methods: {
    ...mapActions('user', ['getKexperimentEvaluation']),
    ...mapActions('experiment', ['selectChoiceQuestion']),

    loadKexperimentEvaluation() {
      this.getKexperimentEvaluation({
        kexperimentId: this.$route.params.id,
        success: (evaluation) => {
          console.log(evaluation)
          document.title = evaluation.experimentName + ' | 实验评价'
          this.experimentId = evaluation.experimentId
          this.experimentName = evaluation.experimentName
          this.grade = evaluation.finalScore
          this.middleScore = evaluation.finalScore
          this.userName = evaluation.userName
          this.frontScore = evaluation.pretestInfo.correct
          this.backScore = evaluation.posttestInfo.correct
          this.pretestInfo = evaluation.pretestInfo.errorResolution
          this.posttestInfo = evaluation.posttestInfo.errorResolution
          this.behaviorInfo = evaluation.behaviorInfo
          this.experimentReview = evaluation.experimentReview
        },
        failure: (error) => {
          console.log(error)
        },
      })
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

    exportReport() {
      document.execCommand('print')
    },
  },
}
</script>
