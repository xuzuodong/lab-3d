<template>
  <q-table :data="studentsList" :columns="studentsColumns" row-key="name" flat>
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
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      studentsColumns: [
        {
          name: 'name',
          required: true,
          label: '姓名',
          align: 'left',
          field: (row) => row.name,
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
      studentsList: [
        {
          name: '111',
          sex: 'nan',
          jTime: '22',
          experimentFre: '333',
          experimentRec: '444',
          deleteMember: '22',
        },
      ],
      students: [],
      loading: true,
    }
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
  },

  // computed: {
  //   studentsList() {
  //     const arr = []
  //     this.students.forEach((e, i) => {
  //       // 如果没有结束时间则未完成
  //       if (e.classes) {
  //         let duration = date.getDateDiff(e.kexperimentKtime, e.kexperimentCtime, 'seconds')
  //         arr.push({ ...this.experiments[i], duration: `${(duration / 60).toFixed(0)}分${duration % 60}秒` })
  //       } else {
  //         arr.push({ ...this.experiments[i], duration: '未完成' })
  //       }
  //     })
  //     return arr
  //   },
  // },

  created() {
    this.getUserInfo({
      success: (userinfo) => {
        this.students = userinfo
        console.log(userinfo)
        this.loading = false
      },
      failure: (res) => {
        console.log(res)
      },
    })
  },
}
</script>

<style>
</style>