<template>
  <div>
    <div class="china-echarts">
      <div id="barChart" ref="barChart"></div>
    </div>
    <div class="btn-group">
      <span @click="handleClickDebounce">去结算</span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import echarts from '../utils/echartsUI'
import utils from '../utils/index'
export default {
  name: 'ChinaEcharts',
  data() {
    return {
      _debounceHandle: null
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      // 初始化echarts
      const bar = echarts.init(this.$refs.barChart)
      // const option = {
      //   title: {
      //     text: 'Echarts5 柱状'
      //   },
      //   tooltip: {
      //     display: 'none',
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'shadow'
      //     }
      //   },
      //   xAxis: {
      //     type: 'category',
      //     data: ['周一', '周二', '周三', '周四', '周五']
      //   },
      //   yAxis: {
      //     type: 'value'
      //   },
      //   legend: {
      //     show: false
      //   },
      //   series: [
      //     {
      //       name: '星期',
      //       type: 'bar',
      //       data: [23, 33, 45, 56, 78]
      //     }
      //   ]
      // }
      const option = {
        // title: {
        //   text: '饼图程序调用高亮示例',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'plain',
          icon: 'circle',
          show: true,
          right: '0%',
          top: 'top',
          zlevel: 99,
          textStyle: {
            fontSize: '12',
            color: '#000'
          },
          selectedMode: 'multiple',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }

      bar.setOption(option)
      // 测试绑定事件
      bar.on('click', function() {
        console.log('123')
      })

      // let currentIndex = -1
      // setInterval(function() {
      //   var dataLen = option.series[0].data.length
      //   // 取消之前高亮的图形
      //   bar.dispatchAction({
      //     type: 'downplay',
      //     seriesIndex: 0,
      //     dataIndex: currentIndex
      //   })
      //   currentIndex = (currentIndex + 1) % dataLen
      //   // 高亮当前图形
      //   bar.dispatchAction({
      //     type: 'highlight',
      //     seriesIndex: 0,
      //     dataIndex: currentIndex
      //   })
      //   // 显示 tooltip
      //   bar.dispatchAction({
      //     type: 'showTip',
      //     seriesIndex: 0,
      //     dataIndex: currentIndex
      //   })
      //   bar.dispatchAction({
      //     type: 'click'
      //   })
      // }, 1000)
    },
    handleClickDebounce() {
      const _handle = () => {
        console.log('handleClickDebounce :>>>>>>>>>>>>>> ', dayjs().format('YYYYMMDDHHmmssSSS'))
      }
      if (!this._debounceHandle) {
        this._debounceHandle = utils.debounce(_handle, 1000)
        this._debounceHandle()
        return
      }
      this._debounceHandle()
    }
  }
}
</script>

<style lang="less" scoped>
.china-echarts {
  display: flex;
  text-align: justify;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 140px;
  > div {
    width: 730px;
    height: 730px;
  }
}
.btn-group {
  display: flex;
  padding: 30px 10px;
  span {
    flex: 1;
    font-size: 30px;
    text-align: center;
    padding: 24px;
    color: #fff;
    background-color: #07c160;
    border: 1px solid #07c160;
  }
}
</style>
