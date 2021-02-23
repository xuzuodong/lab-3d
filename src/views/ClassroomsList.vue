<template>
  <div v-if="!classrooms" class="absolute-spinner">
    <q-spinner color="primary" size="3rem" :thickness="5" />
  </div>
  <div v-else class="container">
    <div class="q-mb-xl">
      <h6>加入班级</h6>
      <q-input
        v-model="invitationCode"
        class="join-classroom-input"
        label="请输入班级邀请码"
        bottom-slots
        filled
      >
        <template v-slot:hint>
          <div class="row items-center">
            <q-icon name="info" class="q-mr-xs" />
            如果没有班级邀请码，可以询问你的老师
          </div>
        </template>

        <template v-slot:after>
          <q-btn label="加入" icon="group_add" color="primary" outline />
        </template>
      </q-input>
    </div>

    <q-separator />

    <q-card class="q-mt-xl q-pb-sm">
      <q-table
        title="已加入的班级"
        :data="listData"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
        hide-bottom
      >
        <template v-slot:body-cell-actionButtons="props">
          <q-td :props="props">
            <q-btn color="negative" label="退出班级" flat />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      invitationCode: null,
      columns: [
        { name: 'name', label: '班级', align: 'center', field: (row) => row.name },
        { name: 'subject', label: '学科', align: 'center', field: (row) => row.subject },
        { name: 'teacherName', label: '指导老师', align: 'center', field: (row) => row.teacherName },
        { name: 'joinTime', label: '加入时间', align: 'center', field: (row) => row.joinTime },
        { name: 'actionButtons', label: '操作', align: 'center' },
      ],
    }
  },

  computed: {
    ...mapState('user', ['userInfo', 'classrooms']),

    listData() {
      if (!this.classrooms) return
      console.log(this.classrooms)
      const arr = []
      this.classrooms.forEach((classroom) => {
        arr.push({
          name: classroom.name,
          subject: '待数据库字段加入',
          teacherName: classroom.teacher,
          joinTime: '时间待转为时间戳',
        })
      })
      return arr
    },
  },

  methods: {
    ...mapActions('user', ['selectMyClasses']),
  },

  created() {
    if (!this.userInfo) this.$router.replace('/')

    this.selectMyClasses({
      success: () => {},
      failure: (res) => {
        console.log(res)
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.join-classroom-input {
  width: 80%;
}
</style>