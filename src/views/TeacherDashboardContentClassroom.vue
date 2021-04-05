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

      <!-- 这是学生表格，因为两个表格的列数不一样，所以必须分开 -->
      <div class="q-pa-md" v-if="!show">
        <q-table :data="stuData" :columns="stuColumns" row-key="name">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="sex" :props="props">
                {{ props.row.sex }}
              </q-td>
              <q-td key="jTime" :props="props">
                {{ props.row.jTime }}
              </q-td>
              <q-td key="experimentFre" :props="props">
                {{ props.row.experimentFre }}
              </q-td>
              <q-td key="experimentRec" :props="props">
                {{ props.row.experimentRec }}
              </q-td>
              <q-td key="deleteMember" :props="props">
                <q-btn flat color="primary" label="踢出班级" style="font-size: 14px" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <!-- 这是实验表格 -->
      <div class="q-pa-md" v-if="show">
        <q-table :data="experData" :columns="experColumns" row-key="name">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="experiment" :props="props">
                {{ props.row.experiment }}
              </q-td>
              <q-td key="eTime" :props="props">
                {{ props.row.eTime }}
              </q-td>
              <q-td key="score" :props="props">
                {{ props.row.score }}
              </q-td>
              <q-td key="other" :props="props">
                <q-btn flat color="primary" label="查看详情" style="font-size: 14px" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      //v-if决定谁出现
      show: false,
      //切换按钮的值
      model: 'one',
      // 用来存后端传过来的值
      allData: [],
      // 定义实验列表的行
      experColumns: [
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
          name: 'eTime',
          label: '实验时间',
          field: 'eTime',
          align: 'left',
          format: (val) => `${Math.floor(val / 60000)}分${val % 60}秒`,
          sortable: true,
        },
        {
          name: 'score',
          label: '成绩',
          field: 'score',
          align: 'center',
          // format: (val) => this.grade(val),
          sortable: true,
        },
        { name: 'other', label: '详情', field: 'other', align: 'center' },
      ],
      // 实验列表的内容
      experData: [],
      // 定义学生列表
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
        { name: 'sex', align: 'left', label: '性别', field: 'sex', sortable: true },
        {
          name: 'jTime',
          label: '加入班级时间',
          field: 'jTime',
          align: 'left',
          // format: (val) => `${Math.floor(val / 60)}分${val % 60}秒`,
          sortable: true,
        },
        {
          name: 'experimentFre',
          label: '实验次数',
          field: 'experimentFre',
          align: 'center',
          format: (val) => this.grade(val),
          sortable: true,
        },
        { name: 'experimentRec', label: '实验记录', field: 'experimentRec', align: 'center' },
        { name: 'deleteMember', label: '其他', field: 'deleteMember', align: 'center' },
      ],
      //学生列表的值
      stuData: [
        {
          name: '111',
          sex: 'nan',
          jTime: '22',
          experimentFre: '333',
          experimentRec: '444',
          deleteMember: '22',
        },
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
    ...mapActions('user', ['selectMyClasses', 'selectKexperimentByClass']),

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
    changeTable() {
      if (this.model == 'one') {
        this.show = false
      }
      if (this.model == 'two') {
        this.experData.splice(0, this.experData.length)
        this.selectKexperimentByClass({
          classId: this.classroom.id,
          success: (data) => {
            // console.log(data)
            this.allData = data.data.body
          },
          failure: (res) => {
            console.log(res)
          },
        })
        this.show = true
      }
    },
  },
  watch: {
    allData: function (val) {
      for (let i = 0; i < val.length; i++) {
        this.experData.push({
          name: '',
          experiment: '',
          eTime: '',
          score: '',
          other: '',
        })
        this.experData[i].name = val[i].userName
        this.experData[i].experiment = val[i].experimentName
        this.experData[i].eTime = `${Math.floor(
          (val[i].kexperimentKtime - val[i].kexperimentCtime) / 60000
        )}分${(val[i].kexperimentKtime - val[i].kexperimentCtime) % 60}秒`
        this.experData[i].score = val[i].finalScore
      }
    },
  },
}
</script>