<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24" style="padding:0px 16px 16px">
        <el-alert
          title="公告"
          type="warning"
          close-text="知道了"
          :description="notice"
          show-icon
        />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16" style="padding:0px 16px 16px">
        <el-alert
          title="欧皇鉴定"
          type="success"
          :closable="false"
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
import { getNotice } from '@/api/admin'

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
      description: '',
      notice: '文字说明文字说明文字说明文字说明文字说明文字说明'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.appraisalStatus()
    this.notice_msg()
  },
  methods: {
    appraisalStatus() {
      appraisal().then(response => {
        this.description = '平均' + response.data.num + '发一个六星干员,鉴定为' + response.data.status
      })
    },
    notice_msg() {
      getNotice().then(response => {
        this.notice = response.data.notice
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
