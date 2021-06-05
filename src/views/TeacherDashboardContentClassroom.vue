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

      <q-card class="q-mt-md q-mx-sm">
        <q-tabs v-model="tab" class="text-grey" active-color="primary">
          <q-tab name="student" label="学生" />
          <q-tab name="experiment" label="实验" />
          <q-tab name="class" label="班级详情" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" keep-alive animated>
          <q-tab-panel name="student"><TeacherDashboardContentClassroomStudentVue /></q-tab-panel>
          <q-tab-panel name="experiment"><TeacherDashboardContentClassroomExperimentVue /></q-tab-panel>
          <q-tab-panel name="class">
            <div class="row justify-center">
              <q-select
                v-model="experimentName"
                :options="experimentList"
                label="实验名称"
                style="min-width: 300px"
              />
            </div>
            <div class="row justify-center q-my-md" v-if="experimentName">
              <HighchartsPie :chartConfig="chartConfig1" :styles="styles" />
              <HighchartsColumn :chartConfig="chartConfig2" :styles="styles" />
              <HighchartsColumn :chartConfig="chartConfig3" :styles="styles" />
            </div>

            <div class="q-my-md q-mx-sm" v-if="experimentName">
              <div class="text-h6 q-my-md text-center">分数详情</div>
              <q-table :data="scoreList" :columns="columns" row-key="realName">
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="realName" :props="props">{{ props.row.realName }}</q-td>
                    <q-td key="total" :props="props">{{ props.row.total }}</q-td>
                    <q-td key="duration" :props="props">{{ props.row.duration }}</q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TeacherDashboardContentClassroomExperimentVue from './TeacherDashboardContentClassroomExperiment.vue'
import TeacherDashboardContentClassroomStudentVue from './TeacherDashboardContentClassroomStudent.vue'
import HighchartsPie from './HighchartsPie.vue'
import HighchartsColumn from './HightchartsColumn.vue'

export default {
  components: {
    TeacherDashboardContentClassroomStudentVue,
    TeacherDashboardContentClassroomExperimentVue,
    HighchartsPie,
    HighchartsColumn,
  },
  data() {
    return {
      tab: 'student',
      experimentList: ['稀硫酸的化学性质探究'],
      experimentName: '',
      chartConfig1: {
        chart: {
          spacing: [40, 0, 40, 0],
        },
        title: {
          floating: true,
          text: '成绩统计',
          style: {
            fontSize: '20px',
          },
        },
        series: [
          {
            type: 'pie',
            innerSize: '80%',
            name: '分数分布',
            data: [
              ['90-100', 8],
              ['80-90', 3],
              ['70-80', 6],
              ['60-70', 3],
              ['0-60', 1],
            ],
          },
        ],
      },
      chartConfig2: {
        chart: {
          type: 'column',
        },
        title: {
          text: '后测选项分布',
          style: {
            fontSize: '20px',
          },
        },
        xAxis: {
          categories: ['题一', '题二', '题三'],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: '选择人数（人）',
          },
        },
        series: [
          {
            name: '选项A',
            data: [4, 1, 3],
          },
          {
            name: '选项B',
            data: [8, 1, 10],
          },
          {
            name: '选项C',
            data: [2, 8, 1],
          },
          {
            name: '选项D',
            data: [1, 5, 1],
          },
        ],
      },
      chartConfig3: {
        chart: {
          type: 'bar',
        },
        title: {
          text: '单步操作行为正确率',
          style: {
            fontSize: '20px',
          },
        },
        xAxis: {
          categories: [
            '稀硫酸与酚酞试剂的反应',
            '稀硫酸与紫色石蕊的反应',
            '稀硫酸与碳酸钠的反应',
            '实验现象观察',
            '整理与清洗',
          ],
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: '准确率',
            align: 'high',
          },
          labels: {
            overflow: 'justify',
          },
        },
        tooltip: {
          valueSuffix: '',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              allowOverlap: true, // 允许数据标签重叠
            },
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 100,
          floating: true,
          borderWidth: 1,
          shadow: true,
        },
        series: [
          {
            name: '准确率',
            data: [0.8, 0.7, 0.6, 0.9],
          },
        ],
      },
      styles: {
        width: 0,
        height: 0,
      },
      columns: [
        {
          name: 'realName',
          label: '学生姓名',
          field: 'realName',
          align: 'center',
          style: 'min-width: 120px',
        },
        {
          name: 'total',
          label: '总分',
          field: 'total',
          align: 'center',
          style: 'min-width: 120px',
          sortable: true,
        },
        {
          name: 'duration',
          label: '实验时长',
          field: 'duration',
          align: 'center',
          style: 'min-width: 120px',
        },
      ],
      scoreList: [
        { realName: '李相星', total: 100, duration: '14分28秒' },
        { realName: '王聪', total: 87, duration: '16分25秒' },
        { realName: '马欣旺', total: 79, duration: '5分20秒' },
        { realName: '赵春宇', total: 86, duration: '15分36秒' },
        { realName: '谭子杨', total: 91, duration: '16分29秒' },
        { realName: '高思源', total: 77, duration: '13分10秒' },
        { realName: '王千赫', total: 75, duration: '9分58秒' },
        { realName: '费雨欣', total: 68, duration: '7分6秒' },
        { realName: '王海楠', total: 90, duration: '9分14秒' },
        { realName: '康洪源', total: 56, duration: '8分38秒' },
      ],
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
      navigator.clipboard
        .writeText(text)
        .then(() => this.$q.notify({ message: '复制成功', color: 'positive' }))
        .catch(() => this.$q.notify({ message: '无法复制到剪切板', color: 'red' }))
    },
  },
}
</script>
