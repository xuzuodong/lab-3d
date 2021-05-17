<template>
  <div>
    <h6 class="q-my-sm">- 前测选项解析 -</h6>
    <q-table :data="preTestList" :columns="testColumns" :rows-per-page-options="[0]" row-key="name">
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
    <h6 class="q-my-sm">- 后测选项解析 -</h6>
    <q-table :data="postTestList" :columns="testColumns" row-key="name">
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
export default {
  props: {
    pretestInfo: Array,
    posttestInfo: Array,
  },
  data() {
    return {
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
  computed: {
    preTestList: function () {
      let formatArr = []
      if (this.pretestInfo && this.pretestInfo.length != 0) {
        this.pretestInfo.forEach((e) => {
          if (e.isCorrect === true) e.isCorrect = '正确'
          else e.isCorrect = '错误'
          formatArr.push(e)
        })
        return formatArr
      } else return []
    },
    postTestList: function () {
      let formatArr = []
      if (this.posttestInfo && this.posttestInfo.length != 0) {
        this.posttestInfo.forEach((e) => {
          if (e.isCorrect === true) e.isCorrect = '正确'
          else e.isCorrect = '错误'
          formatArr.push(e)
        })
        return formatArr
      } else return []
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
