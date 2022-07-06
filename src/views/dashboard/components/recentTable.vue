<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>最近六星</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :row-class-name="tableRowClassName" max-height="280">
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
        <el-table-column label="抽取次数" align="center">
          <template slot-scope="scope">
            {{ scope.row.num }}次
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
      <el-pagination :hide-on-single-page="hide" :page-size="pageSize" layout="prev, pager, next" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { gachaList } from '@/api/gacha'
// import { formateDate } from '@/utils/date'
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
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      hide: true,
      list: null,
      listLoading: true,
      total: 10,
      currentPage: 1,
      pageSize: 5
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const data = { pageNo: this.currentPage, pageSize: this.pageSize }
      const recent = []
      let num = 0
      gachaList(data).then(response => {
        this.total = Number(response.data.totalRecords)
        for (const i in response.data.data) {
          if (response.data.data[i].rarity === '5') {
            response.data.data[i].num = i - num
            recent.unshift(response.data.data[i])
            num = parseInt(i)
          }
        }
        this.list = recent.reverse()
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    tableRowClassName({ row }) {
      if (row.isnew === 1) {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
