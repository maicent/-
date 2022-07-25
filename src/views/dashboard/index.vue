<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24" style="padding:0px 16px 16px">
        <div v-if="systemMsg.length > 0" class="bs-sysMsg">
          <i class="el-alert__icon el-icon-warning" />
          <div class="msg__content">
            <el-carousel height="20px" direction="vertical" indicator-position="none" :autoplay="true">
              <el-carousel-item v-for="item in systemMsg" :key="item.id">
                <button class="item" @click="showMsg(item.notice)">{{ item.notice }}</button>
                <!-- <a href="javascript:void(0)" class="item">{{ item.notice }}</a> -->
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <!-- <el-alert
          title="公告"
          type="warning"
          close-text="知道了"
          :description="notice"
          show-icon
        /> -->
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" style="padding:0px 16px 16px">
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
    <el-row style="background:#fff;padding:16px 0 0;margin-bottom:30px;">
      <el-card class="box-card">
        <gachatable />
      </el-card>
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
      notice: '文字说明文字说明文字说明文字说明文字说明文字说明',
      systemMsg: [
        { id: 1, title: '滚动公告1' },
        { id: 2, title: '滚动公告2' },
        { id: 3, title: '滚动公告3' }
      ]
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
        this.systemMsg = response.data.notice
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    showMsg(msg) { // 展示公告
      this.$alert(msg, '公告', {
        confirmButtonText: '确定'
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

/*轮翻消息*/
.bs-sysMsg {
    position: relative;
    display: flex;
    width: 100%;
    padding: 8px 12px;
    margin-bottom: 10px;
    border-radius: 2px;
    color: #e6a23c;
    background-color: #fdf6ec;
    overflow: hidden;
    opacity: 1;
    align-items: center;
    transition: opacity .2s;
}
.bs-sysMsg .msg__content {
    display: table-cell;
    padding: 0 8px;
    width: 100%;
}
.bs-sysMsg .msg__content .item {
    color: #e6a23c;
    font-size: 14px;
    opacity: 0.75;
}
.bs-sysMsg .msg__content button.item {
    border: none;
    background: #fdf6ec
}
// .bs-sysMsg .msg__content .item:hover{
//   text-decoration: underline;

// }

</style>
