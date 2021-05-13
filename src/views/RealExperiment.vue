<template>
  <div class="container">
    <h6 class="q-my-xs">【{{ experimentName }}】实时实验与评价</h6>

    <video id="videoElement" controls autoplay muted width="600" height="450"></video>

    <q-circular-progress
      indeterminate
      size="75px"
      :thickness="0.6"
      color="lime"
      center-color="grey-8"
      class="q-ma-md"
    />

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
import { mapState } from 'vuex'
export default {
  // components: { flvjs },
  props: {
    experimentName: String,
  },
  data() {
    return {
      // liveUrl: `http://play-stream.lab3d.site/app/stream.flv?auth_key=${this.userInfo.token}`,
      liveColumns: [
        { name: 'title', required: true, label: '实验行为操作', align: 'center' },
        { name: 'time', align: 'center', label: '动作时间', field: 'time' },
        { name: 'isCorrect', align: 'center', label: '行为判断', field: 'isCorrect' },
        { name: 'analysis', align: 'center', label: '错误解析', field: 'analysis' },
        { name: 'suggest', align: 'left', label: '改进建议', field: 'suggest' },
        { name: 'button', align: 'center', label: '相关知识链接', field: 'button' },
      ],
      liveList: [],
    }
  },
  mounted() {
    if (flvjs.isSupported()) {
      let videoElement = document.getElementById('videoElement')
      let flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: false,
        url: 'http://play-stream.lab3d.site/app/stream.flv',
      })
      console.log(flvPlayer, 'flv对象')
      flvPlayer.attachMediaElement(videoElement)
      flvPlayer.load()
      flvPlayer.play()
    }
    console.log(this.userInfo.token)
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
}
</script>

<style scoped></style>
