<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>发布通知</span>
      </div>
      <el-input
        v-model="notice"
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
      />
      <el-button class="release-item" type="primary" icon="el-icon-search" @click="release">发布</el-button>
    </el-card>

  </div>
</template>

<script>
import { getNotice, updataNotice } from '@/api/admin'
export default {
  data() {
    return {
      notice: ''
    }
  },
  created() {
    this.notice_msg()
  },
  methods: {
    release() {
      updataNotice({ 'notice': this.notice }).then(response => {
        if (response.code) {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
        } else {
          this.$message.error('发布错误')
        }
      }).catch(() => {})
    },
    notice_msg() {
      getNotice().then(response => {
        this.notice = response.data.notice
      })
    }
  }
}
</script>

<style scoped>
.release-item{
  margin: 10px 0px 10px 10px;
  float: right;
}
</style>

