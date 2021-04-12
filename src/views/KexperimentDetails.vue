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
          <span><q-btn class="text-h6 q-my-none" color="primary" label="点击前往" flat /></span>
        </q-card-section>
      </q-card>
    </div>
    <q-separator class="q-my-lg" color="grey-6" inset />

    <div class="q-mb-lg">
      <q-list bordered class="rounded-borders container">
        <q-expansion-item default-opened expand-separator label="实验流程">
          <KexperimentDetailsSummaryVue />
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
                <q-tab name="mails" label="Mails" />
                <q-tab name="alarms" label="Alarms" />
                <q-tab name="movies" label="Movies" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="mails">
                  <KexperimentDetailsBehaviorsVue />
                </q-tab-panel>

                <q-tab-panel name="alarms">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
import KexperimentDetailsBehaviorsVue from './KexperimentDetailsBehaviors.vue'
import KexperimentDetailsSummaryVue from './KexperimentDetailsSummary.vue'

export default {
  components: { KexperimentDetailsSummaryVue, KexperimentDetailsBehaviorsVue },

  data() {
    return {
      experimentName: '摩擦力实验',
      grade: 'A',
      userName: '实验师',
      badge: '一般路过的实验师',
      evaluation: '太棒了实验师！您在此次的实验中表现十分出色。',
      frontScore: 'B',
      middleScore: 'A',
      right: true,
      left: true,
      tab: 'mails',
    }
  },
}
</script>