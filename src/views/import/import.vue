<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="登录官网" />
      <el-step title="复制Token" />
      <el-step title="导入数据" />
    </el-steps>

    <el-form ref="dataForm" :model="form" class="bfrom">

      <div v-show="active == 1">
        <el-card shadow="hover">
          首先进入嘤脚官网<el-link type="primary" href="https://ak.hypergryph.com/user" target="_blank">https://ak.hypergryph.com/user</el-link><br>
          登录自己的账号<br>
          再在本页面点击下一步<br>
        </el-card>
      </div>

      <div v-show="active == 2">
        <el-card shadow="hover">
          <iframe id="iframe" ref="iframe" src="https://as.hypergryph.com/user/info/v1/token_by_cookie" /><br>
          复制上方方框中"token":后面引号中的大串字符如：<br>
          <img src="@/assets/import/import.png" class="rightulliimg"><br>
        </el-card>
      </div>
      <div v-show="active == 3">
        <el-form-item label="刚才复制的token">
          <el-input v-model="form.token" placeholder="请输入刚才复制的内容" />
        </el-form-item>
      </div>

    </el-form>
    <div style="width: 200px;height: 100px;margin: auto">
      <div style="display: flex">
        <div style="flex: 1" />
        <el-button v-if="active > 1" type="primary" style="margin-top: 12px" @click="pre">上一步</el-button>
        <el-button v-if="active < 3" type="primary" style="margin-top: 12px" @click="next">下一步</el-button>
        <el-button v-if="active == 3" type="danger" style="margin-top: 12px" @click="onSubmit">导入</el-button>
        <div style="flex: 1" />
      </div>

    </div>
  </div>
</template>

<script>
import { importData } from '@/api/gacha'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      active: 1,
      form: {
        token: ''
      }
    }
  },
  methods: {
    // 步骤条下一步的方法
    next() {
      if (this.active++ > 2) this.active = 1
    },
    // 步骤条上一步的方法
    pre() {
      if (this.active-- < 1) this.active = 1
    },
    onSubmit() {
      Loading.service({ fullscreen: true })
      importData({ 'arktoken': encodeURIComponent(this.form.token) }).then(response => {
        if (response.code === '200') {
          this.fail = response.data.flist
          this.success = response.data.slist
          this.$message('成功!')
        } else {
          this.$message({
            message: '导入失败!',
            type: 'warning'
          })
        }
        Loading.service({ fullscreen: true }).close()
      })
    }
  }
}
</script>
<style scoped>
.bfrom{
  margin-top: 20px
}
.rightulliimg {
  max-width: 100%;
  max-height: 600px;
}
</style>
