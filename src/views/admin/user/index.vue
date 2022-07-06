<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.uid }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.user }}
        </template>
      </el-table-column>
      <el-table-column label="IP" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户组" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateFilter">{{ scope.row.state }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleClick(scope.row)">查看</el-button>
          <el-button size="mini" @click="userInfo = true;form = scope.row">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :hide-on-single-page="hide" :page-size="pageSize" layout="total,prev, pager, next" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" />

    <el-dialog title="用户信息" :visible.sync="userInfo">
      <el-form :model="form">
        <el-form-item label="ID" label-width="120px">
          <el-input v-model="form.uid" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.user" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.pwd" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userInfo = false">取 消</el-button>
        <el-button type="primary" @click="userInfo = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userList } from '@/api/admin'

export default {
  filters: {
    stateFilter(status) {
      const statusMap = {
        admin: 'success',
        user: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      hide: true,
      total: 10,
      currentPage: 1,
      pageSize: 5,
      userInfo: false, // 用户个人信息弹出层
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const data = { pageNo: this.currentPage, pageSize: this.pageSize }
      this.listLoading = true
      userList(data).then(response => {
        this.total = Number(response.data.totalRecords)
        this.list = response.data.data
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    handleClick(row) {
      console.log(row)
    },
    isFalse(d) {
      if (d) return true
      return false
    }
  }
}
</script>
