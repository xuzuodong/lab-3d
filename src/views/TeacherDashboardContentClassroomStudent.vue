<template>
  <q-table :data="studentsList" :columns="studentsColumns" row-key="name" flat>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="realname" :props="props">
          {{ props.row.realname || '学生' + props.row.id }}
        </q-td>
        <q-td key="sex" :props="props">
          {{ props.row.sex }}
        </q-td>
        <q-td key="jTime" :props="props">
          {{ props.row.jTime }}
        </q-td>
        <q-td key="kexperimentNum" :props="props">
          {{ props.row.kexperimentNum }}
        </q-td>
        <q-td key="button1" :props="props">
          <q-btn flat color="primary" label="实验记录" style="font-size: 14px" />
        </q-td>
        <q-td key="button2" :props="props">
          <q-btn flat color="red" label="踢出班级" style="font-size: 14px" @click="remove(props.row.id)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  data() {
    return {
      studentsColumns: [
        { name: 'realname', required: true, label: '姓名', align: 'left', sortable: true },
        { name: 'sex', align: 'left', label: '性别', field: 'sex', sortable: true },
        { name: 'jTime', label: '加入班级时间', field: 'jTime', align: 'left', sortable: true },
        {
          name: 'kexperimentNum',
          label: '实验次数',
          field: 'experimentFre',
          align: 'center',
          sortable: true,
        },
        { name: 'button1', label: '实验记录', field: 'experimentRec', align: 'center' },
        { name: 'button2', label: '其他', field: 'deleteMember', align: 'center' },
      ],
      students: [],
      loading: true,
      jT: '',
    }
  },
  methods: {
    ...mapActions('user', ['getClassById', 'removeUser']),

    remove(userId) {
      this.removeUser({
        userId: userId,
        classId: this.$route.params.id,
        success: (res) => {
          this.students.splice(
            this.students.findIndex((e) => e.id == res),
            1
          )
        },
        failure: (res) => {
          console.log(res)
        },
      })
      console.log(userId)
    },
  },

  computed: {
    studentsList() {
      const arr = []
      this.students.forEach((e, i) => {
        // 如果没有结束时间则未完成
        let formattedString = date.formatDate(this.jT, 'YYYY-MM-DD')
        if (e.classes) {
          arr.push({
            ...this.students[i],
            jTime: formattedString,
          })
        }
      })
      return arr
    },
  },

  created() {
    this.getClassById({
      classId: this.$route.params.id,
      success: (userinfo) => {
        this.students = userinfo.students
        console.log(this.students)
        this.loading = false
        this.jT = this.students
          .find((e) => e.classes.find((e) => e.classId == this.$route.params.id))
          ?.classes.find((e) => e.classId == this.$route.params.id).joinedTime
      },
      failure: (res) => {
        console.log(res)
      },
    })
  },

  watch: {
    $route() {
      this.getClassById({
        classId: this.$route.params.id,
        success: (userinfo) => {
          this.students = userinfo.students
          this.loading = false
          this.jT = this.students
            .find((e) => e.classes.find((e) => e.classId == this.$route.params.id))
            .classes.find((e) => e.classId == this.$route.params.id).joinedTime
        },
        failure: (res) => {
          console.log(res)
        },
      })
    },
  },
}
</script>

<style>
</style>