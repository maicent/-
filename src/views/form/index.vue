<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="16">
        <el-form ref="form" :model="form">
          <el-form-item label="Token">
            <el-input v-model="form.token" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">导入</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
        <div class="board">
          <el-col :xs="24" :sm="24" :lg="8">
            <Kanban :key="3" :list="success" :group="group" class="kanban done" header-text="导入成功" />
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <Kanban :key="2" :list="fail" :group="group" class="kanban working" header-text="导入失败" />
          </el-col>
        </div>

      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <iframe id="iframe" ref="iframe" src="https://as.hypergryph.com/user/info/v1/token_by_cookie" />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Kanban from '@/components/Kanban'
import { importData } from '@/api/gacha'
import { Loading } from 'element-ui'

export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban
  },
  data() {
    return {
      form: {
        token: ''
      },
      success: [],
      fail: [],
      group: 'mission'

    }
  },
  mounted() {
    // console.log(this.$refs.iframe.contentWindow.document)
    // const iframe = document.getElementById('iframe').contentWindow
    // console.log(iframe)

  },
  methods: {
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
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
</style>
<style lang="scss">
// .board {
//   // margin-left: 20px;
//   // display: flex;
//   // justify-content: space-around;
//   // flex-direction: row;
//   // align-items: flex-start;
// }
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
