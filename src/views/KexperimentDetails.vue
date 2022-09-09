<template>
  <div class="" style="min-height: calc(100vh - 105px)">
    <div class="row">
      <div class="col-12 text-h5 text-center q-my-md">“{{ experimentName }}”实验回顾</div>
    </div>
    <div class="row q-my-md">
      <div class="col-1"></div>
      <div>
        <q-btn
          fab-mini
          icon="arrow_back"
          :color="$q.dark.isActive ? 'dark' : 'white'"
          :text-color="$q.dark.isActive ? 'white' : 'dark'"
          @click="toSimple"
        />
      </div>
      <div class="col-9"></div>
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
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">
                      用时:{{ leadInTime }}分钟
                    </span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">观看完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="leadInProgress" color="primary" />
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
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">
                      用时:{{ assumeTime }}分钟
                    </span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="assumeProgress" color="primary" />
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
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">
                      用时:{{ chosenTime }}分钟
                    </span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="chosenProgress" color="primary" />
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
                    <q-item v-for="i in userDatas" :key="i.userMes" style="text-align: center">
                      <q-item-section>{{ i.userMes }}</q-item-section>
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
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">
                      用时:{{ inquiryTime }}分钟
                    </span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="inquiryProgress" color="primary" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="q-px-xl q-py-md">
            <!-- <q-table :data="exploreData" :columns="exploreColumns" row-key="name" flat hide-bottom>
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
            </q-table> -->
            <div style="font-size: 18px; text-align: center">
              探究假设过程与计划设计结果一致是有效探究的基础，请回顾并对照是否需要再一次进行探究！
            </div>
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
            <td v-for="index in point5" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="#FFD231"
                />
              </svg>
            </td>
          </tr>
          <tr style="display: inline">
            <td v-for="index in 5 - point5" :key="index">
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
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">
                      用时:{{ concludedTime }}分钟
                    </span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="concludedProgress" color="primary" />
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
                    <q-card-section>
                      食盐能溶解在水中，常温下100g水中能溶解{{ userAnswer }}g食盐。
                    </q-card-section>
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
    <div class="q-pa-md" :key="forceUpdateComponent">
      <q-card class="container">
        <q-card-section>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="vertical-middle q-mr-sm">
            <circle cx="6" cy="6" r="6" fill="black" />
          </svg>
          <span class="q-mr-sm vertical-middle" style="font-size: 18px">交流评估</span>

          <!-- 根据得分自动填入星星数 -->
          <tr style="display: inline">
            <td v-for="index in point6" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="vertical-middle">
                <path
                  d="m5.825 22 2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4 2.325 7.6L12 17.3Z"
                  fill="#FFD231"
                />
              </svg>
            </td>
          </tr>
          <tr style="display: inline">
            <td v-for="index in 5 - point6" :key="index">
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
                    <span style="font-size: 18px" class="vertical-middle q-ml-md q-mr-xl">
                      用时:{{ reflectedTime }}分钟
                    </span>
                  </div>
                  <div class="col-2" style="font-size: 18px; text-align: center">任务完整度</div>
                  <div class="col-6">
                    <q-linear-progress rounded size="xl" :value="reflectedProgress" color="primary" />
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
                      <path :d="emotion[0].d" :fill="emotion[0].color"></path>
                    </svg>
                    <font class="col text-h6 text-bold" :color="emotion[0].color" style="text-align: center">
                      {{ emotion[0].text1 }}
                      <br />
                      {{ emotion[0].text2 }}
                    </font>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <q-separator vertical />
            <div class="col-3 q-mx-lg">
              <q-card flat>
                <q-card-section>
                  <div style="text-align: center" class="text-h6 q-my-sm">我的反思记录</div>
                  <div style="font-size: 16px; text-align: center">{{ reflection }}</div>
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
import SelfEvaluationVue from './SelfEvaluation.vue'
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
      reflectedTips: false,
      subject: '',
      leadInTime: '',
      leadInProgress: 0,
      assumeTime: '',
      assumeProgress: 0,
      chosenCount: 0,
      chosenTime: '',
      chosenProgress: 0,
      concludedTime: '',
      concludedProgress: 0,
      inquiryTime: '',
      inquiryProgress: 0,
      reflectedTime: '',
      reflectedProgress: 0,
      userAnswer: 0,
      forceUpdateComponent: 0,
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
      userDatas: [{ userMes: 'B' }, { userMes: 'D' }, { userMes: 'E' }, { userMes: 'G' }],
      datas: [
        { message: '在第1步应将温度调整至25℃' },
        { message: '在第2步应向烧杯中加入100毫升水' },
        { message: '在第3步应向烧杯中加盐，食盐完全溶解烧杯底部没有剩余' },
        { message: '在第4步应记录实验结果：盐的溶解度' },
      ],
      point1: 0,
      point2: 1,
      point3: 1,
      point4: 0,
      point5: 0,
      point6: 0,
      point7: 0,
      conclusion: [{ refAnswer: '食盐能溶解在水中，常温25℃下100g水中能溶解36.1g食盐。' }],
      myAccess: '',
      planDesignData: [
        { A: '将温度调整至15℃' },
        { B: '将温度调整至25℃' },
        { C: '向烧杯中加入适量水' },
        { D: '向烧杯中加入100毫升水' },
        { E: '向烧杯中加盐，食盐完全溶解烧杯底部没有剩余' },
        { F: '向烧杯中加盐至烧杯底部有剩余盐不再溶解' },
        { G: '记录实验结果：盐的溶解度' },
      ],
      experDiff: [
        {
          color: '#e16531',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.485316A459.485316 459.485316 0 1 0 971.47871 512 459.491923 459.491923 0 0 0 512 52.514684z m301.584516 381.192258L769.651613 515.303226l-43.932903-81.589678L644.129032 389.780645l81.589678-43.932903L769.651613 264.258065l43.932903 81.589677L895.174194 389.780645z m-13.873548-74.031897l-30.059355-55.831122-30.059355 55.831122-55.758452 30.059355 55.758452 30.059355 30.059355 55.824516 30.059355-55.824516 55.758451-30.059355zM822.503226 528.516129h19.621161c0.066065 2.206555 0.198194 4.39329 0.198194 6.606452a330.322581 330.322581 0 0 1-660.645162 0c0-2.213161 0.132129-4.399897 0.198194-6.606452h640.627613z m-310.503226 300.593548a293.167897 293.167897 0 0 0 206.517677-84.780593 265.090477 265.090477 0 0 0-416.668903-3.719432A293.002735 293.002735 0 0 0 512 829.109677zM219.268129 561.548387a291.734297 291.734297 0 0 0 60.382968 153.580181 298.050065 298.050065 0 0 1 461.460645 4.122426A292.665806 292.665806 0 0 0 804.797935 561.548387H219.268129z m35.080258-52.851613l-43.932903-81.589677L128.825806 383.174194l81.589678-43.926297L254.348387 257.651613l43.932903 81.589677L379.870968 383.174194l-81.589678 43.939509z m30.059355-155.62818l-30.059355-55.831123-30.059355 55.831123-55.758451 30.059354 55.758451 30.059355 30.059355 55.824516 30.059355-55.824516 55.758452-30.059355z',
          text1: '太简单了，',
          text2: '没有难度！',
        },
        {
          color: '#ffd231',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.485316A459.485316 459.485316 0 1 0 971.485316 512 459.485316 459.485316 0 0 0 512 52.514684z m355.764026 413.563871a110.902503 110.902503 0 0 0-214.247226 0H617.042581a143.36 143.36 0 0 1 282.207793 0h-31.492955z m-238.743949 49.204851h31.710968a144.27169 144.27169 0 0 1-284.077419 0h36.712051a0.125523 0.125523 0 0 1 0 0.046246h215.634581zM568.154839 587.373006V541.729032h-39.63871v56.049136a108.880929 108.880929 0 0 0 39.63871-10.405162z m-46.965265 10.656207c1.407174 0 2.794529-0.09249 4.188491-0.145342h-8.370375c1.393961 0.052852 2.77471 0.145342 4.181884 0.145342zM508.696774 541.729032h-39.638709v43.014607a108.874323 108.874323 0 0 0 39.638709 12.512619V541.729032z m-59.458064 29.332645V541.729032h-24.443871a116.273548 116.273548 0 0 0 24.443871 29.332645zM587.974194 541.729032v33.540955A115.797884 115.797884 0 0 0 617.58431 541.729032H587.974194zM274.894452 383.834839A112.448413 112.448413 0 0 0 167.803871 466.052129h-36.474219a143.36 143.36 0 0 1 282.2144 0h-31.499562A112.461626 112.461626 0 0 0 274.894452 383.834839z',
          text1: '有点难度，',
          text2: '轻松掌握！',
        },
        {
          color: '#2aa515',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.485316A459.485316 459.485316 0 1 0 971.47871 512 459.491923 459.491923 0 0 0 512 52.514684zM792.774194 469.058065v-52.851613H654.03871v-46.245162h251.045161v99.096775h-112.309677zM515.303226 636.716594a139.78591 139.78591 0 0 1-39.63871-5.774039v-38.733626a108.345806 108.345806 0 0 0 42.083097 8.548748 112.448413 112.448413 0 0 0 107.156645-82.197471h31.512774A145.566555 145.566555 0 0 1 515.303226 636.716594zM270.864516 416.206452H132.129032v-46.245162h251.045162v99.096775H270.864516v-52.851613z',
          text1: '小有挑战，',
          text2: '能够掌握！',
        },
        {
          color: '#31a7d2',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.491923A459.491923 459.491923 0 1 0 971.47871 512 459.491923 459.491923 0 0 0 512 52.508077zM766.348387 587.974194a145.341935 145.341935 0 1 1 145.341936-145.341936 145.341935 145.341935 0 0 1-145.341936 145.341936z m0-277.517213A132.175277 132.175277 0 1 0 898.543484 442.632258 132.18849 132.18849 0 0 0 766.348387 310.456981zM512 792.774194a52.851613 52.851613 0 1 1 52.851613-52.851613 52.851613 52.851613 0 0 1-52.851613 52.851613zM257.651613 587.974194a145.341935 145.341935 0 1 1 145.341935-145.341936 145.341935 145.341935 0 0 1-145.341935 145.341936z m0-277.517213A132.175277 132.175277 0 1 0 389.84671 442.632258 132.18849 132.18849 0 0 0 257.651613 310.456981z',
          text1: '难度较高，',
          text2: '还有疑问！',
        },
        {
          color: '#b65bef',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.485316A459.485316 459.485316 0 1 0 971.47871 512 459.485316 459.485316 0 0 0 512 52.514684z m326.490839 403.396542l-210.481549-58.301936 1.45342-5.430503-3.831742 2.180129-16.317936-28.843768 189.671226-107.916387 16.384 28.843768-152.146581 86.544516 184.055742 50.962168z m-126.513549 59.325935l21.404904 21.867355-65.139613 66.520361 1.915871 1.981936-21.603097 22.065548-68.178581-69.605574-44.593548 45.551484 1.981935 1.981935-21.669161 22.065549L447.917419 558.060181l-44.593548 45.551484 1.981935 1.981935-21.603096 22.065548-86.478452-88.262193 21.603097-22.065549 63.091613 64.399691 65.139613-66.513755 3.171096 3.210735 1.057033-1.096671 63.091613 64.399691 65.139612-66.513755 3.171097 3.210735 1.057033-1.096671 63.091612 64.399691zM394.339097 390.249703l1.453419 5.417291-210.349419 58.176412-8.720516-31.889341 183.923613-50.869678L208.631742 284.738065l16.317935-28.78431 189.539097 107.685161-16.317935 28.78431z',
          text1: '难度太大，',
          text2: '没有理解！',
        },
      ],
      reflection: '',
      m: [],
      emotion: [
        {
          color: '',
          d: '',
          text1: '',
          text2: '',
        },
      ],
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
    this.getStepInfo({
      stepName: 'leadIn',
      kexperiment_id: this.$route.params.id,
      success: (res) => {
        this.leadIn(res)
        console.log(res)
      },
      failure: (error) => {
        console.log(error)
      },
    })
    this.getStepInfo({
      stepName: 'assumed',
      kexperiment_id: this.$route.params.id,
      success: (res) => {
        this.assumed(res)
        console.log(res)
      },
      failure: (error) => {
        console.log(error)
      },
    })
    this.getStepInfo({
      stepName: 'chosen',
      kexperiment_id: this.$route.params.id,
      success: (res) => {
        this.chosen(res)
        console.log(res)
      },
      failure: (error) => {
        console.log(error)
      },
    })
    this.getStepInfo({
      stepName: 'reflected',
      kexperiment_id: this.$route.params.id,
      success: (res) => {
        this.reflected(res)
        console.log(res)
      },
      failure: (error) => {
        this.$q
          .dialog({
            component: SelfEvaluationVue,
            parent: this,
          })
          .onOk(() => {
            this.$router.go(0)
          })
        console.log(error)
      },
    })
  },

  methods: {
    ...mapActions('user', ['getKexperimentEvaluation', 'getStepInfo']),
    ...mapActions('experiment', ['selectChoiceQuestion']),

    assumed(res) {
      this.assumeTime = (res[0].assumed_time / 60000).toFixed(2)
      if (res[0].assumed_time > 15000) this.point2 += 1
      else if (res[0].assumed_time > 30000) this.point2 += 2
      let m = res[0].assumed.split(',')
      if (m[0] == '不能') this.point2 += 1
      if (m[1] == '低于50g') this.point2 += 1

      this.assumeProgress = res[0].assumed_time / 30000
    },
    chosen(res) {
      this.chosenTime = (res[0].chosen_time / 60000).toFixed(2)
      if (res[0].chosen_time > 30000) this.point3 += 1
      else if (res[0].chosen_time > 60000) this.point3 += 2

      this.chosenProgress = res[0].chosen_time / 60000
    },
    concluded(res) {
      this.concludedTime = (res.concluded_time / 60000).toFixed(2)
      if (res.finalScore == 'A') this.point4 = 5
      else if (res.finalScore == 'B') this.point4 = 4
      else if (res.finalScore == 'C') this.point4 = 3
      else if (res.finalScore == 'D') this.point4 = 2
      else this.point4 = 1

      this.concludedProgress = res.concluded_time / 10000
    },
    inquiry(res) {
      this.inquiryTime = (res.inquiry_time / 60000).toFixed(2)
      if (res.finalScore == 'A') this.point5 = 5
      else if (res.finalScore == 'B') this.point5 = 4
      else if (res.finalScore == 'C') this.point5 = 3
      else if (res.finalScore == 'D') this.point5 = 2
      else this.point5 = 1

      this.inquiryProgress = res.inquiry_time / 60000
    },

    reflected(res) {
      this.m = res[0].reflected.split(',')
      this.point7 = parseInt(this.m[0])
      switch (this.point7) {
        case 1:
          this.myAccess = '期待下次！'
          break
        case 2:
          this.myAccess = '还需努力！'
          break
        case 3:
          this.myAccess = '正常发挥~'
          break
        case 4:
          this.myAccess = '表现不错！'
          break
        case 5:
          this.myAccess = '非常完美！'
          break
      }
      this.reflection = this.m[2]
      if (this.reflection.length > 5) this.point6 = 3
      else if (this.reflection.length > 10) this.point6 = 4
      else if (this.reflection.length > 20) this.point6 = 5
      else this.point6 = 2
      this.emotion[0].d = this.experDiff.find((e) => e.color == this.m[1]).d
      this.emotion[0].color = this.experDiff.find((e) => e.color == this.m[1]).color
      this.emotion[0].text1 = this.experDiff.find((e) => e.color == this.m[1]).text1
      this.emotion[0].text2 = this.experDiff.find((e) => e.color == this.m[1]).text2

      this.reflectedTime = (res[0].reflected_time / 60000).toFixed(2)
      this.reflectedProgress = res[0].reflected_time / 30000
    },

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
          this.concluded(evaluation)
          this.inquiry(evaluation)
          this.userAnswer = evaluation.behaviorInfo.find(
            (e) => e.behaviorName == '实验过程：任务一——提交实验结论'
          ).userSolution
          for (let i = 1; i < 5; i++) {
            // console.log(evaluation.behaviorInfo.find((e) => e.behaviorName == '实验方案第' + i + '步'))
            this.userDatas[i - 1].userMes = evaluation.behaviorInfo.find(
              (e) => e.behaviorName == '实验方案第' + i + '步'
            ).userSolution
            console.log(evaluation.behaviorInfo.find((e) => e.behaviorName == '实验方案第' + i + '步'))
            if (
              this.userDatas[i - 1].userMes == '在第1步选择了B将温度调整至25℃' ||
              this.userDatas[i - 1].userMes == '在第2步选择了D向烧杯中加入100毫升水' ||
              this.userDatas[i - 1].userMes == '在第3步选择了E向烧杯中加盐，食盐完全溶解烧杯底部没有剩余' ||
              this.userDatas[i - 1].userMes == '在第4步选择了G记录实验结果：盐的溶解度'
            )
              this.chosenCount += 1
          }
          if (this.chosenCount > 0) this.point3 += 1
          else if (this.chosenCount == 4) this.point3 += 2
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

    leadIn(res) {
      switch (res[0].experiment_id) {
        case 1:
          this.subject = '盐的溶解性'
          break
        case 2:
          this.subject = '溶液的酸碱性'
          break
        case 3:
          this.subject = '牛顿第一运动定律'
          break
        case 4:
          this.subject = '铁与稀盐酸反应'
          break
        case 5:
          this.subject = '胆矾与氢氧化钠反应'
          break
        case 6:
          this.subject = '对蜡烛燃烧的探究'
          break
        case 7:
          this.subject = '固体样品的取用'
          break
        case 8:
          this.subject = '酸碱中和'
          break
        case 9:
          this.subject = '摩擦力'
          break
        case 10:
          this.subject = '钠和水反应'
          break
        case 11:
          this.subject = '稀硫酸的化学性质'
          break
        case 12:
          this.subject = '磁场探秘'
          break
        case 13:
          this.subject = '磁场探秘实验一'
          break
        case 14:
          this.subject = '磁场探秘实验二'
          break
      }
      this.leadInTime = (res[0].leadIn_time / 60000).toFixed(2)
      if (res[0].leadIn_time < 10000) this.point1 = 1
      else if (res[0].leadIn_time < 26250) this.point1 = 2
      else if (res[0].leadIn_time < 52500) this.point1 = 3
      else if (res[0].leadIn_time < 78750) this.point1 = 4
      else this.point1 = 5
      this.leadInProgress = res[0].leadIn_time / 105000
    },

    toSimple() {
      this.$router.push({ path: '/kexperiment-overview/' + this.$route.params.id })
    },
  },
}
</script>
