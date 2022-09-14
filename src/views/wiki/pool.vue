<template>
  <div class="app-container">
    <div v-if="roles.includes('admin')" class="filter-container">
      <el-button style="margin: 10px 20px 10px 20px;" type="primary" @click="partake()">
        一键导入
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
    >
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.pool }}
        </template>
      </el-table-column>
      <el-table-column label="卡池属性" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.state" placeholder="请选择" @change="stateChange(scope.row.pid,scope.row.state)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- {{ scope.row.state }} -->
        </template>
      </el-table-column>
      <el-table-column label="UP干员" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.up" placeholder="请输入UP干员" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :hide-on-single-page="hide" :page-size="listQuery.pageSize" layout="total,prev, pager, next" :total="total" :current-page="listQuery.pageNo" @current-change="handleCurrentChange" />

  </div>
</template>

<script>
import { poolList, editPool, updataPool } from '@/api/other'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      hide: true,
      total: 10,
      options: [{
        value: 'UP池',
        label: 'UP池'
      }, {
        value: '轮换池',
        label: '轮换池'
      }, {
        value: '限定池',
        label: '限定池'
      }],
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
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      poolList(this.listQuery).then(response => {
        this.total = Number(response.data.totalRecords)
        this.list = response.data.data
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.fetchData()
    },
    stateChange(pid, state) {
      editPool({ 'pid': pid, 'state': state, 'type': 'state' }).then(res => {

      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.fetchData()
    },
    partake() {
      updataPool().then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
      })
    }
    // TODO:UP干员信息编辑
  }
}
</script>

