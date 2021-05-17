<template>
    <div class="china-echarts">
        <div id="barChart" ref="barChart" ></div>
    </div>
</template>

<script>
import echarts from '../utils/echartsUI'
export default {
  name: 'ChinaEcharts',
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
    // 初始化echarts
      const bar = echarts.init(this.$refs.barChart)
      const option = {
        title: {
          text: 'Echarts5 柱状'
        },
        tooltip: {
          display: 'none',
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五']
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          show: false
        },
        series: [
          {
            name: '星期',
            type: 'bar',
            data: [23, 33, 45, 56, 78]
          }
        ]
      }
      bar.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.china-echarts{
    display: flex;
    text-align: justify;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 60px;
    > div{
      width: 730px;
      height: 730px;
    }
}
</style>
