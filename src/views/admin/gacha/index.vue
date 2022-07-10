<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.user" placeholder="用户" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.pool" placeholder="卡池" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.user }}
        </template>
      </el-table-column>
      <el-table-column label="干员名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="池子" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pool }}</span>
        </template>
      </el-table-column>
      <el-table-column label="星级" align="center">
        <template slot-scope="scope">
          {{ parseInt(scope.row.rarity)+1 | toChinese }}
        </template>
      </el-table-column>
      <el-table-column label="NEW" align="center">
        <template slot-scope="scope">
          {{ scope.row.isnew }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ parseInt(scope.row.ts) | formatDate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :hide-on-single-page="hide" :page-size="listQuery.pageSize" layout="total,prev, pager, next" :total="total" :current-page="listQuery.pageNo" @current-change="handleCurrentChange" />

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
import { allGachaList } from '@/api/admin'

export default {
  filters: {
    formatDate: function(value) {
      const date = new Date(value * 1000)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    toChinese(val) {
      const chin = ['一星', '二星', '三星', '四星', '五星', '六星', '七星', '八星', '九星', '十星']
      if (val <= 10) {
        return chin[val - 1]
      } else if (val <= 100) {
        if (val < 20) {
          return '十' + chin[(val % 10) - 1]
        } else if (val % 10 === 0) {
          return chin[Math.floor(val / 10) - 1] + '十'
        } else {
          return chin[Math.floor(val / 10) - 1] + '十' + chin[(val % 10) - 1]
        }
      }
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      hide: true,
      total: 10,

      userInfo: false, // 用户个人信息弹出层
      form: {},
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        user: '',
        pool: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      allGachaList(this.listQuery).then(response => {
        this.total = Number(response.data.totalRecords)
        this.list = response.data.data
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.fetchData()
    },
    handleClick(row) {
      console.log(row)
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.fetchData()
    },
    tableRowClassName({ row }) {
      if (row.rarity === '5') {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>
<style scoped>
.el-table__row .current-row .warning-row {
  background: oldlace;
}

.filter-container{
  padding-bottom: 10px;
}
</style>
