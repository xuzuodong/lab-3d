<template>
  <q-layout view="hHh lpR fFf" container style="min-height: calc(100vh - 105px)">
    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="300"
      :breakpoint="100"
      bordered
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-1'"
    >
      <q-scroll-area class="fit">
        <div class="q-pt-lg">
          <q-list>
            <q-expansion-item default-opened icon="group" label="我的班级">
              <q-list v-if="classrooms && classrooms.length" dense padding>
                <q-item
                  clickable
                  :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                  v-for="classroom in classrooms"
                  :key="classroom.id"
                  :to="'/dashboard/classroom/' + classroom.id"
                  replace
                >
                  <q-item-section>{{ classroom.name }}</q-item-section>
                  <q-item-section side>
                    <div class="row">
                      <div
                        @click.prevent.stop="deleteClassConfirm(classroom)"
                        class="text-red q-mr-md cursor-pointer text-weight-regular"
                      >
                        删除
                      </div>
                      <div
                        @click="editClassInDialog({ isCreate: false, classroom })"
                        class="text-primary cursor-pointer text-weight-regular"
                      >
                        编辑
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
              <div v-else class="text-center text-body2 text-grey-6 q-pb-md q-pt-xs">还没有班级</div>
              <div class="text-center">
                <a @click="editClassInDialog({ isCreate: true })" class="text-primary cursor-pointer">
                  创建新的班级...
                </a>
              </div>
            </q-expansion-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TeacherDashboardDialogEditClass from './TeacherDashboardDialogEditClass.vue'

export default {
  data() {
    return {
      drawerLeft: true,
    }
  },

  computed: {
    ...mapState('user', ['userInfo', 'classrooms']),
  },

  methods: {
    ...mapActions('user', ['selectMyClasses', 'deleteClass']),

    editClassInDialog({ isCreate, classroom }) {
      this.$q
        .dialog({
          component: TeacherDashboardDialogEditClass,
          parent: this,
          persistent: true,
          isCreate,
          classroom,
        })
        .onOk((newClassroomId) => {
          this.$router.replace('/dashboard/classroom/' + newClassroomId)
          window.location.reload()
        })
    },

    deleteClassConfirm(classroom) {
      this.$q
        .dialog({
          title: '删除“' + classroom.name + '”',
          message: `您将要删除 <strong>${classroom.subject}</strong> 学科的 <strong>${classroom.name}</strong>，删除后将不可恢复，确定这么做吗？`,
          cancel: true,
          html: true,
          ok: { color: 'red', flat: true },
        })
        .onOk(() => {
          this.deleteClass({
            classId: classroom.id,
            success: () => {
              if (this.$route.params.id == classroom.id) {
                this.$router.replace('/dashboard')
              }
            },
            failure: (res) => {
              this.$q.notify({
                message: '删除班级失败',
                color: 'red',
              })
            },
          })
        })
    },
  },

  created() {
    if (!this.userInfo) {
      this.$router.replace('/')
      return
    }

    this.selectMyClasses({
      success: () => {},
      failure: (res) => {
        this.$q.notify({
          message: '请求出错',
          color: 'red',
        })
        console.log(res)
      },
    })
  },
}
</script>
