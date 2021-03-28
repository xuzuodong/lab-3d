<template>
  <q-dialog ref="dialog" @hide="onDialogHide" :persistent="persistent">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <h6 class="q-my-md">{{ isCreate ? '创建班级' : '修改班级信息' }}</h6>
        <q-form @submit="onSubmit">
          <q-input
            v-model="editingClassroom.className"
            :rules="[(val) => val.length > 0 || '请输入班级名称']"
            lazy-rules="ondemand"
            label="班级名称 *"
            dense
            filled
          />
          <q-input
            v-model="editingClassroom.classDescription"
            class="q-mt-xs"
            label="班级介绍"
            hint=""
            dense
            filled
          />
          <q-input
            v-model="editingClassroom.classSchool"
            class="q-mt-xs"
            label="所属学校"
            hint=""
            dense
            filled
          />
          <q-input
            v-model="editingClassroom.classGrade"
            class="q-mt-xs"
            label="所属年级"
            hint=""
            dense
            filled
          />
          <q-input
            v-model="editingClassroom.classNum"
            class="q-mt-xs"
            label="所属班级"
            hint=""
            dense
            filled
          />
          <q-input
            v-model="editingClassroom.classSubject"
            class="q-mt-xs"
            label="所属学科"
            hint=""
            dense
            filled
          />
          <q-input
            v-model="editingClassroom.classTeacher"
            class="q-mt-xs"
            label="教师称呼"
            hint=""
            dense
            filled
          />
          <q-input
            v-model="editingClassroom.classEmail"
            class="q-mt-xs"
            label="教师邮箱"
            hint=""
            dense
            filled
          />
          <div class="text-right">
            <q-btn @click="onCancelClick" flat color="primary" label="取消" />
            <q-btn
              :loading="loading"
              :disable="loading"
              :label="isCreate ? '创建' : '修改'"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    persistent: Boolean,
    isCreate: Boolean,
    classroom: Object,
  },

  data() {
    return {
      editingClassroom: {
        className: this.classroom?.name || '',
        classDescription: this.classroom?.description || '',
        classSubject: this.classroom?.subject || '',
        classTeacher: this.classroom?.teacher || '',
        classEmail: this.classroom?.email || '',
        classSchool: this.classroom?.school || '',
        classGrade: this.classroom?.grade || '',
        classNum: this.classroom?.num || '',
      },

      loading: false,
    }
  },

  methods: {
    ...mapActions('user', ['createClass', 'updateClassInfo']),

    show() {
      this.$refs.dialog.show()
    },

    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      this.$emit('hide')
    },

    onOKClick() {
      this.$emit('ok')
      this.hide()
    },

    onCancelClick() {
      this.hide()
    },

    onSubmit() {
      this.loading = true
      if (this.isCreate) {
        this.createClass({
          classInfo: this.editingClassroom,
          success: ({ classId }) => {
            this.$router.replace('/dashboard/classroom/' + classId)
            window.location.reload()
          },
          failure: (res) => {
            this.loading = false
            this.$q.notify({
              message: '新建班级失败，网络似乎有问题',
              color: 'red',
            })
          },
        })
      } else {
        this.updateClassInfo({
          classInfo: { classId: this.classroom.id, ...this.editingClassroom },
          success: () => {
            this.$router.replace('/dashboard/classroom/' + this.classroom.id)
            window.location.reload()
          },
          failure: (res) => {
            console.log(res);
            this.loading = false
            this.$q.notify({
              message: '修改班级信息失败，网络似乎有问题',
              color: 'red',
            })
          },
        })
      }
    },
  },
}
</script>