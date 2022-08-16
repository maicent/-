<template>

  <div id="line" :class="className" :style="{height:height,width:width}" />

</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '@/utils/resize'
import { getPoolbyDay } from '@/api/gacha'

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
    poolName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      chartData: [],
      probability: [0],
      time: ['2022-12-12']

    }
  },
  watch: {
    poolName: {
      deep: true,
      handler(val) {
        this.getData().then(res => {
          this.setOptions(val)
        })
      }
    }
  },
  mounted() {
    this.initChart()
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
      this.chart = echarts.init(document.getElementById('line'), 'macarons')
      this.setOptions(this.poolName)
    },
    async getData() {
      await getPoolbyDay({ 'poolName': this.poolName }).then(res => {
        this.chartData = res.data.data
        this.time = this.chartData.map((item) => {
          return item.time
        })
        this.probability = this.chartData.map((item) => {
          return item.gl ? item.gl : 0
        })
        return 0
      })
    },
    setOptions() {
      this.chart.setOption({
        xAxis: {
          data: this.time,
          boundaryGap: true,
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
          formatter: function(params) {
            var str = params[0].name + '<br>'
            for (const item of params) {
              str += '出金率 : ' + (item.value * 100).toFixed(2) + '%<br>'
            }
            return str
          },
          padding: [5, 10]
        },
        yAxis: [
          {
            type: 'value',
            name: '概率',
            axisLabel: {
              show: true,
              color: '#FF005A',
              showMinLabel: true,
              showMaxLabel: true,
              formatter: function(value, index) {
                return (value * 100).toFixed(0) + '%'
              }
            }
          }
        ],
        legend: {
          data: ['出金概率']
        },
        series: [{
          name: '出金概率',
          itemStyle: {
            color: '#FF005A',
            areaStyle: {
              color: '#f3a8ff'
            }
          },
          label: {
            show: true,
            formatter: function(params) {
              return (params.value * 100).toFixed(2) + '%'
            }
          },
          yAxisIndex: 0,
          smooth: true,
          type: 'line',
          data: this.probability,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }
        ]
      })
    }
  }
}
</script>
