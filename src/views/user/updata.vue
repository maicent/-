<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-form ref="form" label-position="top" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="用户名">
            <el-input v-model="form.user" :disabled="true" />
          </el-form-item>
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
import { mapGetters } from 'vuex'
import { upPwd } from '@/api/user'

export default {
  data() {
    return {
      form: {
        user: '',
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
  computed: {
    ...mapGetters([
      'name'
    ])

  },
  mounted: function() {
    if (this.name) {
      this.form.user = this.name
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          upPwd(this.form).then(response => {
            if (response.code === '200') {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
            } else {
              this.$message.error('修改错误')
            }
          }).catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
