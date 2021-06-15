<template>
  <div class="container q-my-md">
    <div>
      <div class="text-h4 q-my-md">使用说明</div>
      <div class="text-h6 indent-2em" style="text-indent: 2em">
        在我们提供的“使用手册”中查看每一个虚拟实验的介绍与使用说明，点击下方按钮跳转查看
      </div>
      <q-btn color="primary" label="查看说明手册" to="/mamual" />
    </div>
    <div>
      <div class="text-h4 q-my-md">注意事项</div>
      <div class="text-h6 indent-2em" style="text-indent: 2em">{{ matter1 }}</div>
      <div class="text-h6 indent-2em" style="text-indent: 2em">{{ matter2 }}</div>
    </div>
    <div>
      <div class="text-h4 q-my-md">联系我们</div>
      <div class="text-h6 indent-2em">
        在使用本网站过程中，如果你有任何新的想法或发现任何bug，欢迎与我们联系
        <a href="mailto:hznu_xteam@aliyun.com">hznu_xteam@aliyun.com</a>
        ，本项目同时也在GitHub开源，地址：
        <a href="https://github.com/xuzuodong/lab-3d">https://github.com/xuzuodong/lab-3d</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      matter1:
        '如果你遇到内容显示问题，请先检查浏览器，任何版本的IE浏览器我们都不推荐使用，可能会出现各种兼容性问题。我们推荐使用的浏览器包括新版Microsoft Edge、Safari 8+、Chrome 54+ 和 Firefox 63+等。',
      matter2:
        '本网站适合在平板电脑、笔记本、台式机这些大分辨率屏幕上使用，以获得更好的实验体验，故不推荐在手机上查看本网站。',
    }
  },
}
</script>

<style scoped>
.indent-2em {
  text-indent: 2rem;
}
</style>