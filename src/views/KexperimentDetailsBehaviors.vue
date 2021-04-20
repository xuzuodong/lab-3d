<template>
  <div id="KexperimentDetailsBehaviors">
    <div class="text-h6 q-my-md">—过程复盘—</div>
    <q-table :data="behaviorList" :columns="columns" :loading="loading" row-key="behaviorName" flat>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="behaviorName" :props="props">
            {{ props.row.behaviorName }}
          </q-td>
          <q-td key="userSolution" :props="props">
            {{ props.row.userSolution }}
          </q-td>
          <q-td key="isCorrect" :props="props">
            {{ props.row.isCorrect }}
          </q-td>
          <q-td key="correctContent" :props="props">
            {{ props.row.correctContent }}
          </q-td>
          <!-- <q-td key="button" :props="props">
            <q-btn
              :to="'/dashboard/kexperiment-details/' + props.row.kexperimentId"
              style="font-size: 14px"
              color="primary"
              label="查看知识点"
              flat
            />
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  props: {
    behaviorInfo: Array,
  },
  data() {
    return {
      columns: [
        { name: 'behaviorName', label: '行为', field: 'behaviorName', align: 'left' },
        { name: 'userSolution', label: '您的操作', field: 'userSolution', align: 'left' },
        { name: 'isCorrect', label: '操作判断', field: 'isCorrect', align: 'center' },
        { name: 'correctContent', label: '正确操作', field: 'correctContent', align: 'center' },
        // { name: 'button', label: '知识链接', field: 'button', align: 'center' },
      ],
      behavior: [],
      loading: true,
    }
  },

  computed: {
    behaviorList() {
      const arr = []
      this.behaviorInfo.forEach((e, i) => {
        // 如果没有结束时间则未完成
        if (e.isCorrect == 'true') {
          arr.push({ ...this.behaviorInfo[i], isCorrect: '正确' })
        }
        if (e.isCorrect == 'false') {
          arr.push({ ...this.behaviorInfo[i], isCorrect: '错误' })
        }
      })
      return arr
    },
  },

  mounted() {
    this.loading = false
  },
}
</script>

<style>
</style>