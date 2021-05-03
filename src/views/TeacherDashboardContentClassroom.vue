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
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" keep-alive animated>
          <q-tab-panel name="student"><TeacherDashboardContentClassroomStudentVue /></q-tab-panel>
          <q-tab-panel name="experiment"><TeacherDashboardContentClassroomExperimentVue /></q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TeacherDashboardContentClassroomExperimentVue from './TeacherDashboardContentClassroomExperiment.vue'
import TeacherDashboardContentClassroomStudentVue from './TeacherDashboardContentClassroomStudent.vue'

export default {
  components: { TeacherDashboardContentClassroomStudentVue, TeacherDashboardContentClassroomExperimentVue },
  data() {
    return {
      tab: 'student',
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
