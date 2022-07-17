<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>发布通知</span>
      </div>
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px">
        <el-form-item
          v-for="(msg, index) in dynamicValidateForm.msg"
          :key="index"
          :label="'公告' + index"
          :prop="'msg.' + index + '.notice'"
          :rules="{
            required: true, message: '公告不能为空', trigger: 'blur'
          }"
        >
          <div class="demo-dynamic">
            <el-input v-model="msg.notice" type="textarea" />
            <el-button @click.prevent="removeDomain(msg)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">发布</el-button>
          <el-button @click="addMsg">新增公告</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import { getNotice, updataNotice, deleteNotice } from '@/api/admin'
export default {
  data() {
    return {
      dynamicValidateForm: {
        msg: [
          { id: 1, notice: '滚动公告1' },
          { id: 2, notice: '滚动公告2' },
          { id: 3, notice: '滚动公告3' }
        ]
      }

    }
  },
  created() {
    this.notice_msg()
  },
  methods: {
    notice_msg() {
      getNotice().then(response => {
        this.dynamicValidateForm.msg = response.data.notice
      }).catch(() => {})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updataNotice(this.dynamicValidateForm).then(response => {
            if (response.code) {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
            } else {
              this.$message.error('发布错误')
            }
          }).catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removeDomain(item) {
      if (item.id) deleteNotice({ 'id': item.id }).then(response => {}).catch(() => {})
      var index = this.dynamicValidateForm.msg.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.msg.splice(index, 1)
      }
    },
    addMsg() {
      this.dynamicValidateForm.msg.push({
        id: '',
        notice: Date.now()
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
.demo-dynamic{
  display: flex;
  width: 460px;
  padding-bottom: 10px;
  margin-right:10px;
  vertical-align:top
}

.demo-dynamic .el-button{
  margin-block: auto;
  margin-left: 10px;
}

</style>

