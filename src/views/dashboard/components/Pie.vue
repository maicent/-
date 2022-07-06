<template>
  <div>
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>月度挪车</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div> -->
      <div id="main" :class="className" :style="{height:height,width:width}" />
    </el-card>

  </div>

</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getPieData } from '@/api/gacha'

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
      default: '400px'
    }
  },
  data() {
    return {
      chart: null,
      pie: []
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
      await getPieData().then(res => {
        this.pie = res.data.data
      })
      return 0
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('main'), 'macarons')
      this.chart.setOption({
        title: {
          text: '寻访记录统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '寻访',
            type: 'pie',
            radius: '50%',
            data: this.pie,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
