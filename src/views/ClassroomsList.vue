<template>
  <div v-if="!classrooms" class="absolute-spinner">
    <q-spinner color="primary" size="3rem" :thickness="5" />
  </div>
  <div v-else class="container">
    <div class="q-mb-xl">
      <h6>加入班级</h6>
      <q-input
        v-model="invitationCode"
        :rules="[(v) => (v && v.length > 0) || '请输入邀请码', joinClassroom]"
        ref="invitationCode"
        @input="resetValidation"
        debounce="200"
        lazy-rules="ondemand"
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
          <q-btn @click="validateInvitationCode" label="加入" icon="group_add" color="primary" outline />
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
        :hide-bottom="listData.length > 0"
      >
        <template v-slot:body-cell-actionButtons="props">
          <q-td :props="props">
            <q-btn @click="quitConfirm(props.rowIndex)" color="red" label="退出班级" flat />
          </q-td>
        </template>

        <template v-slot:no-data>
          <div
            class="full-width row flex-center q-gutter-sm q-my-lg"
            :class="$q.dark.isActive ? 'text-grey-6' : 'text-grey'"
          >
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>还没有加入任何班级</span>
          </div>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { date } from 'quasar'

export default {
  data() {
    return {
      invitationCode: null,
      columns: [
        { name: 'name', label: '班级', align: 'center', field: (row) => row.name },
        { name: 'subject', label: '学科', align: 'center', field: (row) => row.subject },
        { name: 'teacherName', label: '指导老师', align: 'center', field: (row) => row.teacherName },
        { name: 'joinedTime', label: '加入时间', align: 'center', field: (row) => row.joinedTime },
        { name: 'actionButtons', label: '操作', align: 'center' },
      ],
    }
  },

  computed: {
    ...mapState('user', ['userInfo', 'classrooms']),

    listData() {
      if (!this.classrooms) return
      const arr = []
      this.classrooms.forEach((classroom) => {
        arr.push({
          name: classroom.name,
          subject: classroom.subject,
          teacherName: classroom.teacher,
          joinedTime: date.formatDate(classroom.joinedTime, 'YYYY-MM-DD'),
        })
      })
      return arr
    },
  },

  methods: {
    ...mapActions('user', ['selectMyClasses', 'joinClass', 'quitClass']),

    validateInvitationCode() {
      this.$refs.invitationCode.validate()
    },

    joinClassroom() {
      return new Promise((resolve) => {
        this.joinClass({
          classCode: this.invitationCode,
          success: () => {
            this.$q.notify({ type: 'positive', message: '加入班级成功！' })
            this.invitationCode = null
            resolve(true)
          },
          failure: (res) => {
            console.log(res)
            resolve(res.data.info)
          },
        })
      })
    },

    quitConfirm(rowIndex) {
      this.$q
        .dialog({
          title: '退出班级',
          message: `确认退出班级${this.classrooms[rowIndex].name}吗？`,
          cancel: true,
          ok: { color: 'red', flat: true },
        })
        .onOk(() => {
          this.quitClass({
            classId: this.classrooms[rowIndex].id,
            success: () => {
              this.$q.notify({ type: 'positive', message: '已退出该班级' })
            },
            failure: (res) => {
              console.log(res)
            },
          })
        })
    },

    resetValidation() {
      this.$refs.invitationCode.resetValidation()
    },
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