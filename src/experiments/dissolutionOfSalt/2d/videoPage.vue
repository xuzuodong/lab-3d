<template>
  <div class="QVideo" @hide="onDialogHide">
    <!-- <video
      src="https://lab-3d-static.oss-cn-beijing.aliyuncs.com/md/ydrjqjdr.mp4"
      class="videoStyle"
      controls
    ></video> -->
    <q-dialog ref="dialog" seamless transition-show="scale" transition-hide="scale">
      <div class="closeBtn"><q-btn label="关闭视频" text-color="white" color="black" @click="hide" /></div>

      <div style="width: auto; height: auto">
        <video
          src="https://lab-3d-static.oss-cn-beijing.aliyuncs.com/md/ydrjqjdr.mp4"
          class="videoStyle"
          controls
        ></video>
      </div>
    </q-dialog>
    <!-- <q-dialog
      ref="dialog"
      seamless
      fullWidth
      transition-show="scale"
      transition-hide="scale"
      class="row dialogClass"
    >
      <div>
        <q-video
          src="https://lab-3d-static.oss-cn-beijing.aliyuncs.com/md/ydrjqjdr.mp4"
          class="videoStyle"
          title="导入视频"
        />
      </div>
    </q-dialog> -->
  </div>
</template>
<script>
export default {
  name: 'videoPage',
  return() {},
  props: {},
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
      this.$emit('ok')
    },
    onDialogHide() {
      this.$emit('ok')
    },
    onOKClick() {
      this.$emit('ok')
      this.hide()
    },
  },
}
</script>
<style scoped>
.closeBtn {
  position: relative;
  margin: 0 0 60% 0;
  padding: 0;
  top: -1%;
  left: 0%;
  z-index: 9999;
}

.videoStyle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
}
</style>