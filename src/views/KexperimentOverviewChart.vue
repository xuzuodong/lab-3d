<template>
  <div class="x-bar">
    <div :id="id" :option="option" style="zoom: 0.85; height: 500px; margin: 0 auto"></div>
  </div>
</template>
<script>
import HighCharts from 'highcharts'
//下面这个就是为了搞雷达图，如果不加下面这个就会变成折线图
import HighchartsMore from 'highcharts/highcharts-more'
HighchartsMore(HighCharts)
// import exporting from 'highcharts/modules/exporting'
// exporting(HighCharts)
export default {
  // 验证类型
  props: {
    id: {
      type: String,
    },
    option: {
      type: Object,
    },
  },
  watch: {
    option() {
      HighCharts.chart(this.id, this.option)
    },
  },
  mounted() {
    HighCharts.chart(this.id, this.option)
  },
}
</script>