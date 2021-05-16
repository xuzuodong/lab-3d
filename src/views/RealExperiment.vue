<template>
  <div class="container">
    <h6 class="q-my-lg" @click="sendmsg">【{{ experimentName }}】实时实验与评价</h6>

    <div v-if="liveBegin">
      <video
        id="videoElement"
        controls
        autoplay
        muted
        style="width: 100%; height: 100%; object-fit: fill; margin: auto"
      ></video>
    </div>

    <div v-else class="flex flex-center bg-loading">
      <q-circular-progress
        indeterminate
        size="75px"
        :thickness="0.6"
        color="lime"
        center-color="grey-8"
        class="q-ma-md"
      />
    </div>

    <q-table :data="liveList" :columns="liveColumns" row-key="name" class="q-mt-lg">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="time" :props="props">
            {{ props.row.time }}
          </q-td>
          <q-td key="isCorrect" :props="props">
            {{ props.row.isCorrect }}
          </q-td>
          <q-td key="analysis" :props="props">
            {{ props.row.analysis }}
          </q-td>
          <q-td key="suggest" :props="props">
            {{ props.row.suggest }}
          </q-td>
          <q-td key="button" :props="props">
            <q-btn
              to="https://www.baidu.com/"
              style="font-size: 14px"
              color="primary"
              label="查看知识点"
              flat
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import flvjs from 'flv.js/dist/flv.min.js'
import { mapActions } from 'vuex'
import TestVue from './Test'
export default {
  props: {
    experimentName: String,
  },
  data() {
    return {
      liveColumns: [
        { name: 'title', required: true, label: '实验行为操作', align: 'center' },
        { name: 'time', align: 'center', label: '动作时间', field: 'time' },
        { name: 'isCorrect', align: 'center', label: '行为判断', field: 'isCorrect' },
        { name: 'analysis', align: 'center', label: '错误解析', field: 'analysis' },
        { name: 'suggest', align: 'left', label: '改进建议', field: 'suggest' },
        { name: 'button', align: 'center', label: '相关知识链接', field: 'button' },
      ],
      liveList: [],
      kexperimentId: '',
      // liveUrl: '',
      path: 'ws://47.98.192.17:8002',
      socket: '',
      videoElement: '',
      flvPlayer: '',
      playUrl: '',
      experimentId: '',
    }
  },
  computed: {
    liveBegin: function () {
      if (this.liveUrl != '') return true
      else return false
    },
  },
  created() {
    console.log(this.experimentName)
    this.selectAllExperiments({
      success: (experiments) => {
        console.log(experiments)
        this.experimentId = experiments.find((e) => e.name == this.experimentName).id
        this.startExperiment({
          experimentId: experiments.find((e) => e.name == this.experimentName).id,
          success: (res) => {
            this.kexperimentId = res.kexperimentId
            console.log(this.kexperimentId)
            this.getStreamingDomainName({
              kexperimentId: res.kexperimentId,
              success: (res) => {
                console.log(res)
                this.playUrl = res.url
                this.send()
                if (flvjs.isSupported()) {
                  this.videoElement = document.getElementById('videoElement')
                  this.flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    hasAudio: false,
                    url: res.playUrl,
                  })
                  console.log(this.flvPlayer, 'flv对象')
                  // this.flvPlayer.attachMediaElement(this.videoElement)
                  // this.flvPlayer.load()
                  // this.flvPlayer.play()
                }
              },
              failure: (res) => {
                console.log(res)
              },
            })
          },
          failure: (res) => {
            console.log(res)
          },
        })
      },
      failure: (res) => {
        this.failure = true
        console.log(res)
      },
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('user', ['startExperiment', 'getEquipment', 'getStreamingDomainName']),
    ...mapActions('experiment', ['selectAllExperiments', 'selectChoiceQuestion']),
    init: function () {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    postTest(experimentId, choiceType) {
      this.selectChoiceQuestion({
        experimentId,
        choiceType: choiceType,
        success: (res) => {
          this.$q
            .dialog({
              component: TestVue,
              parent: this,
              questionList: res,
              experimentId: experimentId,
              type: choiceType,
            })
            .onOk(() => {
              // this.loadKexperimentEvaluation()
              console.log('ok')
            })
        },
        failure: (error) => {
          console.log(error)
        },
      })
    },
    open: function () {
      console.log('socket连接成功')
    },
    error: function () {
      console.log('连接错误')
    },
    getMessage: function (msg) {
      console.log(msg.data)
    },
    send: function () {
      this.socket.send(this.kexperimentId)
    },
    close: function () {
      console.log('socket已经关闭')
    },
    sendmsg() {
      this.flvPlayer.attachMediaElement(this.videoElement)
      this.flvPlayer.load()
      this.flvPlayer.play()
    },
  },
  destroyed() {
    this.socket.onclose = this.close
  },
}
</script>

<style scoped>
.bg-loading {
  background-color: black;
  padding: 22% 0;
}
</style>
