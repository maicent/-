<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="绑定B服" />
      <el-step title="复制Token" />
      <el-step title="导入数据" />
    </el-steps>

    <el-form ref="dataForm" :model="form" class="bfrom">

      <div v-show="active == 1">
        <el-card shadow="hover">
          首先进入嘤脚官网<el-link type="primary" href="https://ak.hypergryph.com/user" target="_blank">点击进入</el-link>登录<br>
          点击左上角，找到“使用bilibili账号”，如图所示<br>
          <img src="@/assets/step/step1.png" class="rightulliimg"><br>
          绑定过后，检查信息是否与自己B服信息一致<br>
          <img src="@/assets/step/step1-1.png" class="rightulliimg"><br>
        </el-card>
      </div>

      <div v-show="active == 2">
        <el-card shadow="hover">
          <iframe id="iframe" ref="iframe" src="https://web-api.hypergryph.com/account/info/ak-b" /><br>
          复制上方方框中"content":后面引号中的大串字符如：<br>
          <img src="@/assets/step/step2.png" class="rightulliimg"><br>
          <el-link type="primary" href="https://web-api.hypergryph.com/account/info/ak-b" target="_blank">如果上方显示“Unauthorized”请点击此处</el-link><br>
          （如果还是登录过期请在嘤脚官网重新登录）
        </el-card>
      </div>
      <div v-show="active == 3">
        <el-form-item label="刚才复制的content">
          <el-input v-model="form.content" placeholder="请输入刚才复制的内容" />
        </el-form-item>
      </div>

    </el-form>
    <div style="width: 200px;height: 100px;margin: auto">
      <div style="display: flex">
        <div style="flex: 1" />
        <el-button v-if="active > 1" type="primary" style="margin-top: 12px" @click="pre">上一步</el-button>
        <el-button v-if="active < 3" type="primary" style="margin-top: 12px" @click="next">下一步</el-button>
        <el-button v-if="active == 3" type="danger" style="margin-top: 12px" @click="importData">导入</el-button>
        <div style="flex: 1" />
      </div>

    </div>
  </div>
</template>

<script>
import { importDatafromB } from '@/api/gacha'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      active: 1,
      form: {
        content: ''
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
    importData() {
      Loading.service({ fullscreen: true })
      if (this.form.content.length < 10) {
        this.$message.error('输入格式不正确')
      } else {
        importDatafromB({ 'arktoken': encodeURIComponent(this.form.content) }).then(response => {
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
