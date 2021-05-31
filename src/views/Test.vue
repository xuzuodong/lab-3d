<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card>
      <q-card-section class="row reverse q-pa-none">
        <q-btn icon="close" flat round dense @click="onCancelClick" />
      </q-card-section>

      <q-card-section class="row justify-center items-center q-pb-none">
        <div rounded class="text-h6 bg-primary title" v-if="type == 1">测试挑战-前测</div>
        <div rounded class="text-h6 bg-primary title" v-if="type == 2">测试挑战-后测</div>
      </q-card-section>

      <q-card-section class="row justify-center items-center q-pb-none">
        <q-icon name="alarm" style="font-size: 24px" />
        <span>{{ min }} : {{ sec }}</span>
      </q-card-section>

      <q-card-section>
        <q-carousel
          v-model="slideIndex"
          transition-prev="jump-right"
          transition-next="jump-left"
          animated
          :control-color="$q.dark.isActive ? 'white' : 'dark'"
          ref="carousel"
          padding
          arrows
          height="auto"
          class="blue-border"
        >
          <q-carousel-slide
            v-for="(item, index) in questionList"
            :key="item.id"
            :name="index"
            class="hide-overflow"
          >
            <div class="q-py-sm">{{ index + 1 }} 、{{ item.content }}</div>
            <q-separator />
            <div class="row">
              <q-radio
                v-model="answer[index]"
                val="A"
                :label="'A 、' + item.A"
                @input="chooseRadio({ id: item.id, solution: 'A' })"
                class="col-12 q-py-sm"
              />
              <q-radio
                v-model="answer[index]"
                val="B"
                :label="'B 、' + item.B"
                @input="chooseRadio({ id: item.id, solution: 'B' })"
                class="col-12 q-py-sm"
              />
              <q-radio
                v-model="answer[index]"
                val="C"
                :label="'C 、' + item.C"
                @input="chooseRadio({ id: item.id, solution: 'C' })"
                class="col-12 q-py-sm"
              />
              <q-radio
                v-model="answer[index]"
                val="D"
                :label="'D 、' + item.D"
                @input="chooseRadio({ id: item.id, solution: 'D' })"
                class="col-12 q-py-sm"
              />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>

      <q-card-section class="q-py-none row reverse">
        <div>问题 {{ slideIndex + 1 }} / {{ questionList.length }}</div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          rounded
          :label="submitBtnLabel"
          padding="xs lg"
          color="primary"
          @click="onOKClick(submitBtnLabel)"
          :disable="submitBtnDisable"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    questionList: Array,
    experimentId: Number,
    type: Number,
  },

  data() {
    return {
      min: 10,
      sec: '00',
      timer: null,
      slideIndex: 0, // 定义现在展示的题目，该值和q-carousel-slide的name值一致
      answer: [], // 选择题答案数组，与radio的v-model绑定
      choiceArray: [], // 对象数组，最后传给后端的数据{id, solution, type}
    }
  },

  computed: {
    testName: function () {
      if (this.type == 1) return 'Pretest'
      if (this.type == 2) return 'Posttest'
      else return ''
    },
    submitBtnLabel: function () {
      if (this.slideIndex + 1 != this.questionList.length) return '下一题'
      else return '提交'
    },
    submitBtnDisable: function () {
      if (this.submitBtnLabel === '下一题') {
        if (this.answer[this.slideIndex] == undefined) return true
        else return false
      } else if (this.submitBtnLabel === '提交') {
        if (this.answer.includes(undefined)) return true
        else return false
      }
      return false
    },
  },

  created() {
    this.countDown()
    this.answer.length = this.questionList.length
  },

  methods: {
    ...mapActions('experiment', ['submitTest']),
    ...mapActions('user', ['recordTestTime']),

    show() {
      this.$refs.dialog.show()
    },

    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      this.$emit('hide')
    },

    onOKClick(label) {
      if (label === '下一题') {
        this.slideIndex++
      } else {
        this.$emit('ok',this.choiceArray)
        this.hide()
        clearInterval(this.timer)
        for (let i = 0; i < this.questionList.length; i++) {
          this.choiceArray[i] = { id: this.questionList[i].id, solution: this.answer[i], type: this.type }
        }
        this.submitTest({
          choiceArray: this.choiceArray,
          experimentId: this.experimentId,
          success: (res) => {
            console.log(res)
          },
          failure: (error) => {
            console.log(error)
          },
        })
        this.recordTestTime({
          experimentId: this.experimentId,
          testName: this.testName,
          time: `${9 - this.min}分${60 - this.sec}秒`,
          success: (res) => {
            console.log(res)
          },
          failure: (error) => {
            console.log(error)
          },
        })
      }
    },

    onCancelClick() {
      this.hide()
    },

    countDown() {
      this.timer = setInterval(() => {
        if (this.sec == 0) {
          this.min = this.min - 1
          this.sec = 60
        }
        this.sec--
        this.min = parseInt(this.min)
        this.sec = parseInt(this.sec)
        this.min = this.min > 9 ? this.min : '0' + this.min
        this.sec = this.sec > 9 ? this.sec : '0' + this.sec
      }, 1000)
    },

    chooseRadio(val, evt) {
      val.type = this.type
      // this.choiceArray.push(val)
    },
  },
}
</script>

<style scoped>
.title {
  padding: 2px 16px;
  border-radius: 10px;
}

.blue-border {
  border: 1px solid lightblue;
  border-radius: 20px;
}

.hide-overflow {
  overflow: hidden;
}
</style>
