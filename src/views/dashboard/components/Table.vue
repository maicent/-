<template>
  <div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row :row-class-name="tableRowClassName">
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
          {{ parseInt(scope.row.rarity)+1 |toChinese }}
        </template>
      </el-table-column>
      <el-table-column label="NEW" align="center">
        <template slot-scope="scope">
          {{ scope.row.isnew }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="IP" align="center">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ parseInt(scope.row.ts) | formatDate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :hide-on-single-page="hide" :page-size="pageSize" layout="total,prev, pager, next" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { selfGacha } from '@/api/gacha'
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
      selfGacha(data).then(response => {
        this.total = Number(response.data.totalRecords)
        this.list = response.data.data
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
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

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
