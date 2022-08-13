<template>
  <div>
    <div id="main" :class="className" :style="{height:height,width:width}" />
    <el-dialog
      title="6星历史记录"
      :visible.sync="hiddenDialogCommon"
      :width="dialogWidth"
      @close="handleClose()"
    >
      <div v-for="(item, index) in poolDate" :key="index">
        <span><font color="orange">{{ item.agent+' ' }}</font></span>
        <sup><font color="blue">{{ item.isnew===1?'NEW':'' }}</font></sup>
        {{ ' ('+item.poolName+')' }}
      </div>
    </el-dialog>
  </div>

</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/utils/resize'
import { pool, getSelfPool } from '@/api/gacha'
import { parseTime } from '@/utils'

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
    },
    dialogWidth: {
      type: String,
      default: '94%'
    }
  },
  data() {
    return {
      chart: null,
      xdatra: [],
      ydata: [],
      sixdata: [],
      hiddenDialogCommon: false,
      poolDate: []
    }
  },
  mounted() {
    this.getData().then(res => {
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
    async getData() {
      await pool().then(res => {
        this.sixdata = res.data.data.map(list => list.six)
        this.ydata = res.data.data.map(list => list.pool)
        this.xdata = res.data.data.map(list => list.num)
      })
      return 0
    },
    initChart() {
      const _this = this
      this.chart = echarts.init(document.getElementById('main'), 'macarons')
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

      this.chart.on('click', function(obj) {
        _this.clickChart(obj)
      })
    },
    // 图表点击事件
    clickChart(obj) {
      getSelfPool({ 'poolName': obj.name }).then(res => {
        const recent = []
        let num = 0
        for (const i in res.data.data.reverse()) {
          if (res.data.data[i].rarity === '5') {
            res.data.data[i].num = i - num
            recent.unshift({ 'agent': parseTime(res.data.data[i].ts) + '  [' + res.data.data[i].num + '] ' + res.data.data[i].name, 'isnew': res.data.data[i].isnew, 'poolName': res.data.data[i].pool })
            num = parseInt(i)
          }
        }
        this.poolDate = recent
      }).then(this.hiddenDialogCommon = true)
    },
    // 弹窗关闭
    handleClose(done) {

    }
  }
}
</script>
<style lang="scss" scoped>
span {
  line-height:30px
}
</style>
