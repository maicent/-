<template>
  <div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
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
          <el-tag :type="tag_type(parseInt(scope.row.rarity))">{{ parseInt(scope.row.rarity) | toChinese }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="NEW" align="center">
        <template slot-scope="scope">
          <el-rate v-model="scope.row.isnew" :max="1" disabled />
        </template>
      </el-table-column>
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
        return chin[val]
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
    tag_type(n) {
      if (n === 5) return 'danger'
      if (n === 4) return 'warning'
      if (n === 3) return ''
      if (n === 2) return 'info'
      return 'info'
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
