<template>
  <div>
    <h6 class="text-h6 q-my-md"><q-icon :name="fasFlask" size="xs" />- {{ testTitle }} -</h6>
    <q-table :data="TestList" :columns="testColumns" row-key="name">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="userSolution" :props="props">
            {{ props.row.userSolution }}
          </q-td>
          <q-td key="isCorrect" :props="props">
            {{ props.row.isCorrect }}
          </q-td>
          <q-td key="correctSolution" :props="props">
            {{ props.row.correctSolution }}
          </q-td>
          <q-td key="analysis" :props="props">
            {{ props.row.analysis }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { fasFlask } from '@quasar/extras/fontawesome-v5'
export default {
  props: {
    testTitle: String,
    testInfo: Array,
  },
  data() {
    return {
      fasFlask: '',
      testColumns: [
        { name: 'title', required: true, label: '题目', align: 'center' },
        {
          name: 'userSolution',
          align: 'center',
          label: '您的选项',
          field: 'userSolution',
          style: 'min-width: 100px',
        },
        {
          name: 'isCorrect',
          align: 'center',
          label: '选项判断',
          field: 'isCorrect',
          style: 'min-width: 100px',
        },
        {
          name: 'correctSolution',
          align: 'center',
          label: '正确答案',
          field: 'correctSolution',
          style: 'min-width: 100px',
        },
        { name: 'analysis', align: 'center', label: '答案解析', field: 'analysis' },
      ],
    }
  },
  created() {
    this.fasFlask = fasFlask
  },
  computed: {
    TestList: function () {
      let formatArr = []
      if (this.testInfo && this.testInfo.length != 0) {
        this.testInfo.forEach((e) => {
          if (e.isCorrect === true) formatArr.push({ ...e, isCorrect: '正确' })
          else formatArr.push({ ...e, isCorrect: '错误' })
        })
      }
      return formatArr
    },
  },

  methods: {},
}
</script>

<style>
.q-table--no-wrap th,
.q-table--no-wrap td {
  white-space: normal;
}
</style>
