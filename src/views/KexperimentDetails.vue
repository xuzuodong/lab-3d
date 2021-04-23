<template>
  <div class="" style="min-height: calc(100vh - 105px)">
    <div class="row">
      <div class="col-12 text-h5 text-center">“{{ experimentName }}”实验结果</div>
    </div>
    <div class="row q-my-xl">
      <div class="col-12 col-sm"></div>
      <div class="col-12 col-sm"></div>
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
          <span class="text-blue-6">{{ frontScore }}</span>
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
            <span class="text-red-14" v-else>{{ backScore }}</span>
          </span>
        </q-card-section>
      </q-card>
    </div>
    <q-separator class="q-my-lg" color="grey-6" inset />

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
                  <KexperimentDetailsBehaviorsVue
                    :behaviorInfo="behaviorInfo"
                  ></KexperimentDetailsBehaviorsVue>
                </q-tab-panel>

                <q-tab-panel name="tests">
                  <KexperimentDetailsTestsVue :pretestInfo="pretestInfo" :posttestInfo="posttestInfo" />
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import KexperimentDetailsBehaviorsVue from './KexperimentDetailsBehaviors.vue'
import KexperimentDetailsSummaryVue from './KexperimentDetailsSummary.vue'
import KexperimentDetailsTestsVue from './KexperimentDetailsTests.vue'
import TestVue from './Test'

export default {
  components: { KexperimentDetailsSummaryVue, KexperimentDetailsBehaviorsVue, KexperimentDetailsTestsVue },

  data() {
    return {
      experimentId: 0,
      experimentName: '',
      grade: '',
      userName: '',
      badge: '一般路过的实验师',
      frontScore: '',
      middleScore: '',
      backScore: '',
      right: true,
      left: true,
      tab: 'behaviors',
      pretestInfo: [],
      posttestInfo: [],
      behaviorInfo: [],
    }
  },

  computed: {
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
  },

  created() {
    this.loadKexperimentEvaluation()
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
              console.log('ok')
            })
        },
        failure: (error) => {
          console.log(error)
        },
      })
    },
  },
}
</script>
