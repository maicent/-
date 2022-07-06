<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->

    <el-row :gutter="32">

      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16" style="padding:0px 16px 16px">
        <el-alert
          title="欧皇鉴定"
          type="success"
          :description="description"
        />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <recent />
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-card class="box-card"><gachatable /></el-card>
    </el-row>
  </div>
</template>

<script>
import gachatable from './components/Table'
import pie from './components/Pie'
import recent from './components/recentTable'
import { mapGetters } from 'vuex'
import { appraisal } from '@/api/gacha'

export default {
  name: 'Dashboard',
  components: {
    gachatable,
    pie,
    recent
  },
  data() {
    return {
      num: '',
      status: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.appraisalStatus()
  },
  methods: {
    appraisalStatus() {
      appraisal().then(response => {
        this.description = '平均' + response.data.num + '发一个六星干员,鉴定为' + response.data.status
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
