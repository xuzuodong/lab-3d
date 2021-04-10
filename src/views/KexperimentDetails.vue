<template>
  <q-layout view="hHh LpR fFf">
    <q-drawer v-model="left" side="left" :width="120"></q-drawer>

    <q-drawer v-model="right" side="right" :width="120"></q-drawer>

    <q-page-container>
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
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
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
    }
  },
}
</script>