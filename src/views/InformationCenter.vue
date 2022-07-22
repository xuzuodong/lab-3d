<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card class="row q-dialog q-pa-md">
      <q-card-section class="col-6">
        <div class="text-h6 q-my-md">账号信息</div>
        <div class="text-subtitle2 q-my-md">账号：{{ username }}</div>
        <div class="text-subtitle2 q-my-md">手机：{{ phone }}</div>
        <div class="text-subtitle2 q-my-md">真实姓名：{{ realname }}</div>
        <div class="text-subtitle2 q-my-md">实验宣言：{{ slogan }}</div>

        <q-separator />

        <div class="text-h6 q-my-md">更改密码</div>
        <q-form ref="myForm">
          <q-input
            class="q-my-sm"
            filled
            type="password"
            v-model="oldPassword"
            label="当前密码"
            lazy-rules="ondemand"
            :rules="[checkOldPwd]"
          />

          <q-input
            class="q-my-sm"
            filled
            type="password"
            v-model="password"
            label="新密码"
            lazy-rules="ondemand"
            :rules="[(val) => val !== null || '请输入密码']"
          />

          <q-input
            filled
            type="password"
            v-model="confirmPassword"
            label="确认新密码"
            lazy-rules="ondemand"
            :rules="[
              (val) => val !== null || '请确认密码',
              (val) => val == password || '两次输入的密码不一致',
            ]"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="col-6 row">
        <div class="text-h6">个人资料</div>

        <q-input class="col-12" filled v-model="realname" label="真实姓名" />
        <q-input class="col-12" filled v-model="slogan" label="实验宣言" />

        <div class="row justify-between col-12">
          <q-input class="col-5" filled v-model="school" label="学校" />
          <q-select class="col-5" clearable filled v-model="grade" :options="gradeList" label="年级" />
        </div>

        <q-input filled class="col-12" v-model="phone" label="手机号码" />

        <div class="text-h6 col-12">性别</div>
        <div>
          <q-radio v-model="sex" val="0" label="女" />
          <q-radio v-model="sex" val="1" label="男" />
        </div>
      </q-card-section>

      <q-card-actions align="center" class="col-12">
        <q-btn color="primary" label="保存" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {},

  data() {
    return {
      username: '',
      phone: null,
      realname: null,
      oldPassword: '',
      password: '',
      confirmPassword: '',
      school: null,
      grade: null,
      sex: '',
      slogan: '',

      oldPwdCorrect: false,
      gradeList: ['四年级', '五年级', '六年级', '初一', '初二', '初三'],
    }
  },

  created() {
    this.getUserInfo({
      success: (res) => {
        this.username = res.name
        this.phone = res.phone
        this.realname = res.realname
        this.school = res.school
        this.grade = res.grade
        this.slogan = res.slogan
        this.sex = String(res.sex)
      },
      failure: (err) => {
        console.log(err)
      },
    })
  },

  methods: {
    ...mapActions('user', ['getUserInfo', 'updateUserInfo', 'login']),

    checkOldPwd(val) {
      if (val) {
        return new Promise((resovle, reject) => {
          this.login({
            username: this.username,
            password: val,
            success: () => {
              this.oldPwdCorrect = true
              resovle()
            },
            failure: () => {
              this.oldPwdCorrect = false
              resovle('密码错误')
            },
          })
        })
      } else if (this.password == this.confirmPassword && this.password != '') {
        return '请输入原密码'
      }
    },

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
      this.$refs.myForm.validate().then((success) => {
        if (success) {
          if (
            (this.oldPwdCorrect && this.password == this.confirmPassword) ||
            (!this.oldPwdCorrect && this.password == '' && this.confirmPassword == '')
          ) {
            this.updateUserInfo({
              passWord: this.password || '',
              phoneNumber: this.phone || '',
              realName: this.realname || '',
              sex: this.sex || '',
              grade: this.grade || '',
              school: this.school || '',
              slogan: this.slogan || '',
              success: (res) => {
                console.log(res)
              },
              failure: (err) => {
                console.log(err)
              },
            })
            this.hide()
          }
        } else {
          setTimeout(() => {
            this.$refs.myForm.resetValidation()
          }, 2000)
        }
      })
    },

    onCancelClick() {
      this.hide()
    },
  },
}
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-dialog__inner--minimized {
    padding: 16px;
  }
  .q-dialog__inner--minimized > div {
    max-width: 1000px;
    min-width: 450px;
  }
}
</style>
