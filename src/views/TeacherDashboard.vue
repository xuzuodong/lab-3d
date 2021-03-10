<template>
  <div class="row">
    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="300"
      :breakpoint="800"
      bordered
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-1'"
    >
      <q-scroll-area class="fit">
        <div class="q-pt-lg">
          <q-list class="rounded-borders">
            <q-expansion-item default-opened icon="group" label="我的班级">
              <q-list dense padding>
                <TeacherDashboardSideClass />

                <q-item>
                  <q-item-section>
                    <q-btn flat dense color="primary" label="创建新的班级" icon="add" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TeacherDashboardSideClass from './TeacherDashboardSideClass.vue'

export default {
  components: { TeacherDashboardSideClass },

  data() {
    return {
      drawerLeft: true,
    }
  },

  computed: {
    ...mapState('user', ['userInfo', 'classrooms']),
  },

  methods: {
    ...mapActions('user', ['selectMyClasses']),
  },

  created() {
    if (!this.userInfo) {
      this.$router.replace('/')
      return
    }

    this.selectMyClasses({
      success: () => {},
      failure: (res) => {
        this.$q.notify('请求出错')
        console.log(res)
      },
    })
  },
}
</script>

<style>
</style>