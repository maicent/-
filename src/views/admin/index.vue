<template>
  <div class="dashboard-editor-container">
    <panel-group :group="group" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="chart" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/group'
import LineChart from './components/LineChart'
import { consoleDate } from '@/api/admin'
export default {
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      group: {
        allUser: 0,
        allGacha: 0,
        recentUser: 0,
        recnetGacha: 0
      },
      chart: {
        reg_date: [],
        reg_num: [],
        gacha_num: []
      }
    }
  },
  created() {
    this.getConsoleDate()
  },
  methods: {
    getConsoleDate() {
      consoleDate(this.form).then(response => {
        if (response.code === '200') {
          this.group = response.data.group
          this.chart = response.data.chart
        }
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
