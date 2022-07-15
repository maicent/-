<template>
  <div>
    <div id="main" :class="className" :style="{height:height,width:width}" />

  </div>

</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../../dashboard/components/mixins/resize'
import { pool } from '@/api/gacha'

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
      default: '600px'
    }
  },
  data() {
    return {
      chart: null,
      xdatra: [],
      ydata: [],
      sixdata: []
    }
  },
  mounted() {
    this.getData().then(res => {
      this.initChart()
    })
    // this.$nextTick(() => {
    //   this.initChart()
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async getData() {
      await pool().then(res => {
        this.sixdata = res.data.data.map(list => list.six)
        this.ydata = res.data.data.map(list => list.pool)
        this.xdata = res.data.data.map(list => list.num)
      })
      return 0
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('main'), 'macarons')
      console.log(this.sixdata)
      console.log(this.ydata)
      this.chart.setOption({
        xAxis: {
          max: 'dataMax'
        },
        yAxis: {
          type: 'category',
          data: this.ydata,
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300
        },
        series: [
          {
            name: '卡池抽取数量',
            type: 'bar',
            data: this.xdata,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          },
          {
            name: '六星数量',
            type: 'bar',
            data: this.sixdata,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          }
        ],
        legend: {
          show: true
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      })
    }
  }
}
</script>
