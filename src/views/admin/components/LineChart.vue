<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '@/utils/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ reg_date, reg_num, gacha_num } = {}) {
      const maxY1 = parseInt((Math.max(...reg_num) + 10) / 10) * 10
      const maxY2 = parseInt((Math.max(...gacha_num) + 10) / 10) * 10
      this.chart.setOption({
        xAxis: {
          data: reg_date,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: [
          {
            type: 'value',
            name: '用户数',
            min: 0,
            max: maxY1, // 左侧y轴最大值
            // 两个y轴的刻度必须整除一个相同的数才能重合
            interval: Math.ceil(maxY1 / 10), // 间距等分为10等分
            axisLabel: {
              show: true,
              color: '#FF005A',
              showMinLabel: true,
              showMaxLabel: true
            }
          },
          {
            type: 'value',
            name: '寻访数',
            min: 0,
            max: maxY2, // 左侧y轴最大值
            // 两个y轴的刻度必须整除一个相同的数才能重合
            interval: Math.ceil(maxY2 / 10), // 间距等分为10等分
            axisLabel: {
              show: true,
              color: '#3888fa',
              showMinLabel: true,
              showMaxLabel: true
            }
          }
        ],
        legend: {
          data: ['注册用户数', '寻访数']
        },
        series: [{
          name: '注册用户数', itemStyle: {
            color: '#FF005A',
            areaStyle: {
              color: '#f3a8ff'
            }
          },
          yAxisIndex: 0,
          smooth: true,
          type: 'line',
          data: reg_num,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '寻访数', itemStyle: {
            color: '#3888fa',
            areaStyle: {
              color: '#f3f8ff'
            }
          },
          yAxisIndex: 1,
          smooth: true,
          type: 'line',
          data: gacha_num,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
