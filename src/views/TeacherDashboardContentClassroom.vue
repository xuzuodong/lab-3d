<template>
  <q-page padding>
    <div v-if="!classroom" class="absolute-center">
      <q-spinner color="primary" size="3rem" :thickness="5" />
    </div>
    <div v-else>
      <h4 class="q-mt-none q-mb-sm text-weight-medium">{{ classroom.name }}</h4>
      <div class="text-body1">
        班级邀请码：{{ classroom.code }}
        <q-btn @click="setClipboard(classroom.code)" color="primary" label="复制" flat />
      </div>
      <div class="row">
        <div class="text-body1 q-mb-sm col-6">班级介绍：{{ classroom.description }}</div>
        <div class="text-body1 q-mb-sm col-6">所属学校：{{ classroom.school }}</div>
        <div class="text-body1 q-mb-sm col-6">所属年级：{{ classroom.grade }}</div>
        <div class="text-body1 q-mb-sm col-6">所属班级：{{ classroom.num }}</div>
        <div class="text-body1 q-mb-sm col-6">所属学科：{{ classroom.subject }}</div>
        <div class="text-body1 q-mb-sm col-6">教师：{{ classroom.teacher }}</div>
      </div>
      <div class="row">
        <div class="text-body1 q-mb-sm col-5"></div>
        <div class="text-body1 q-mb-sm col-2">
          <div class="q-gutter-y-md">
            <q-btn-toggle
              v-model="model"
              spread
              no-caps
              toggle-color="primary"
              color="white"
              text-color="black"
              @click="changeTable"
              :options="[
                { label: '学生', value: 'one' },
                { label: '实验', value: 'two' },
              ]"
            />
          </div>
        </div>
        <div class="text-body1 q-mb-sm col-5"></div>
      </div>
      <div class="q-pa-md">
        <q-table :data="tableData" :columns="tableColumns" row-key="name" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      model: 'one',
      stuColumns: [
        {
          name: 'name',
          // required: true,
          label: '姓名',
          align: 'left',
          field: (row) => row.name,
          // format: (val) => `${val}`,
          sortable: true,
        },
        { name: 'experiment', align: 'left', label: '实验名称', field: 'experiment', sortable: true },
        {
          name: 'time',
          label: '时间',
          field: 'time',
          align: 'left',
          format: (val) => `${Math.floor(val / 60)}分${val % 60}秒`,
          sortable: true,
        },
        {
          name: 'score',
          label: '成绩',
          field: 'score',
          align: 'center',
          format: (val) => this.grade(val),
          sortable: true,
        },
        { name: 'other', label: '详情', field: 'other', align: 'center' },
      ],
      stuData: [
        {
          name: '张三',
          experiment: '酸碱中和',
          time: 1050,
          score: 60,
          other: '查看详情',
        },
        {
          name: '李四',
          experiment: '摩擦力',
          time: 1650,
          score: 70,
          other: '查看详情',
        },
        {
          name: '王五',
          experiment: '摩擦力',
          time: 1660,
          score: 88,
          other: '查看详情',
        },
        {
          name: '小二',
          experiment: '食盐的溶解',
          time: 2060,
          score: 90,
          other: '查看详情',
        },
        {
          name: '六子',
          experiment: 'pH值的测定',
          time: 2080,
          score: 95,
          other: '查看详情',
        },
        {
          name: '七爷',
          experiment: '酸碱中和',
          time: 980,
          score: 65,
          other: '查看详情',
        },
      ],
      experData: [],
      experColumns: [],
    }
  },
  computed: {
    ...mapState('user', ['classrooms']),

    classroom() {
      return this.classrooms && this.classrooms.find((c) => c.id == this.$route.params.id)
    },
  },

  methods: {
    ...mapActions('user', ['selectMyClasses']),

    setClipboard(text) {
      navigator.clipboard.writeText(text).then(
        () => {
          this.$q.notify({
            message: '复制成功',
            color: 'positive',
          })
        },
        () => {
          this.$q.notify({
            message: '无法复制到剪切板',
            color: 'red',
          })
        }
      )
    },
    grade(value) {
      if (value >= 90) {
        return 'A'
      } else if (value >= 80) {
        return 'B'
      } else if (value >= 70) {
        return 'C'
      } else if (value >= 60) {
        return 'D'
      } else {
        return 'E'
      }
    },
    changeTable() {
      if (this.model == 'one') {
        this.tableData = this.stuData
        this.tableColumns = this.stuColumns
      }
      if (this.model == 'two') {
        this.tableData = this.experData
        this.tableColumns = this.experColumns
      }
    },
  },
  created: function () {
    if (this.model == 'one') {
      this.tableData = this.stuData
      this.tableColumns = this.stuColumns
    }
    if (this.model == 'two') {
      this.tableData = this.experData
      this.tableColumns = this.experColumns
    }
  },
}
</script>