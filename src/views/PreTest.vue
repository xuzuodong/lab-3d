<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card>
      <q-card-section class="row reverse q-pa-none">
        <q-btn icon="close" flat round dense @click="onCancelClick" />
      </q-card-section>

      <q-card-section class="row justify-center items-center q-pb-none">
        <div rounded class="text-h6 bg-primary title">测试挑战-前测</div>
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
          control-color="white"
          ref="carousel"
          padding
          arrows
          height="auto"
          class="text-white blue-border"
        >
          <q-carousel-slide
            v-for="(item, index) in questionList"
            :key="item.id"
            :name="index"
            class=" hide-overflow"
          >
            <div class="q-py-sm">{{ index + 1 }} 、{{ item.content }}</div>
            <q-separator />
            <div class="row">
              <q-radio v-model="answer[index]" val="A" :label="'A 、' + item.A" class="col-12 q-py-sm" />
              <q-radio v-model="answer[index]" val="B" :label="'B 、' + item.B" class="col-12 q-py-sm" />
              <q-radio v-model="answer[index]" val="C" :label="'C、' + item.C" class="col-12 q-py-sm" />
              <q-radio v-model="answer[index]" val="D" :label="'D 、' + item.D" class="col-12 q-py-sm" />
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
          label="提交"
          padding="xs lg"
          color="primary"
          @click="onOKClick"
          :disable="answer.includes(undefined)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    questionList: Array
  },

  data() {
    return {
      min: 10,
      sec: '00',
      timer: null,
      slideIndex: 0, // 定义现在展示的题目，该值和q-carousel-slide的name值一致
      answer: []
    }
  },

  created() {
    this.countDown()
    this.answer.length = this.questionList.length
  },

  methods: {
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
      clearInterval(this.timer)
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
    }
  }
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
