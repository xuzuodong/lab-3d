<template>
  <div class="container">
    <h6 class="q-my-sm">【{{ experimentName }}】实时实验与评价</h6>
    <vue-plyr v-if="liveBegin">
      <video controls crossorigin playsinline>
        <source size="720" :src="liveUrl" type="video/mp4" />
      </video>
    </vue-plyr>

    <div v-else class="flex flex-center bg-loading">
      <q-circular-progress
        indeterminate
        size="75px"
        :thickness="0.6"
        color="lime"
        center-color="grey-8"
        class="q-ma-md"
      />
    </div>

    <q-table :data="liveList" :columns="liveColumns" row-key="name" class="q-mt-lg">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="time" :props="props">
            {{ props.row.time }}
          </q-td>
          <q-td key="isCorrect" :props="props">
            {{ props.row.isCorrect }}
          </q-td>
          <q-td key="analysis" :props="props">
            {{ props.row.analysis }}
          </q-td>
          <q-td key="suggest" :props="props">
            {{ props.row.suggest }}
          </q-td>
          <q-td key="button" :props="props">
            <q-btn
              to="https://www.baidu.com/"
              style="font-size: 14px"
              color="primary"
              label="查看知识点"
              flat
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import vuePlyr from 'vue-plyr'
export default {
  components: { vuePlyr },
  props: {
    experimentName: String,
  },
  data() {
    return {
      liveUrl: '',
      liveColumns: [
        { name: 'title', required: true, label: '实验行为操作', align: 'center' },
        { name: 'time', align: 'center', label: '动作时间', field: 'time' },
        { name: 'isCorrect', align: 'center', label: '行为判断', field: 'isCorrect' },
        { name: 'analysis', align: 'center', label: '错误解析', field: 'analysis' },
        { name: 'suggest', align: 'left', label: '改进建议', field: 'suggest' },
        { name: 'button', align: 'center', label: '相关知识链接', field: 'button' },
      ],
      liveList: [],
    }
  },
  computed: {
    liveBegin: function () {
      if (this.liveUrl != '') return true
      else return false
    },
  },
}
</script>

<style scoped>
.bg-loading {
  background-color: black;
  padding: 22% 0;
}
</style>
