<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-form ref="form" label-position="top" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="原密码" prop="pwd">
            <el-input v-model="form.pwd" placeholder="留空则为不修改" />
          </el-form-item>
          <el-form-item label="新密码" prop="pwd">
            <el-input v-model="form.npwd" placeholder="留空则为不修改" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">修改密码</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" />
    </el-row>
  </div>
</template>
<script>

export default {
  data() {
    return {
      form: {
        pwd: '',
        npwd: ''
      },
      rules: {
        pwd: [
          { required: true, message: '密码不能为空！', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
