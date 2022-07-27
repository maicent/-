<template>
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        导出Excel
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.gid }}
        </template>
      </el-table-column>
      <el-table-column label="干员名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="卡池" align="center">
        <template slot-scope="scope">
          {{ scope.row.pool }}
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
      <el-table-column align="center" label="抽取时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.ts | formatDate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size="pageSize" layout="total,prev, pager, next" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { selfGacha, gachaList } from '@/api/gacha'
import { parseTime } from '@/utils'

import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
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
      list: null,
      all_list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      total: 10,
      currentPage: 1,
      pageSize: 15
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '干员名称', '卡池名称', '星级', 'NEW', '抽取时间']
        const filterVal = ['id', 'name', 'pool', 'rarity', 'isnew', 'ts']

        gachaList().then(response => {
          this.all_list = response.data.data
          const list = this.all_list
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
        this.downloadLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, index) => filterVal.map(j => {
        if (j === 'ts') {
          return parseTime(v[j])
        } else if (j === 'rarity') {
          return this.$options.filters['toChinese'](v[j])
        } else if (j === 'id') {
          return index + 1
        } else {
          return v[j]
        }
      }))
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
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
