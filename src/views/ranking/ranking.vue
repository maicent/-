<template>
  <el-tabs type="border-card">
    <el-tab-pane label="方舟非酋榜">
      <el-input v-model="name" :disabled="true" style="width:200px;margin: 20px" />
      <el-select v-model="pool" placeholder="请选择卡池" style="width:200px;margin: 20px">
        <el-option
          v-for="item in allPoolName"
          :key="item.value"
          :value="item.value"
        />
      </el-select>
      <el-button style="margin: 10px 20px 10px 20px;" type="primary" icon="el-icon-search" @click="partake()">
        参与排位
      </el-button>

      <el-table :data="tableData" style="width: 100%" :cell-style="{ textAlign: 'center' }">
        <el-table-column type="index" align="center" :resizable="false" label="排名" width="100">
          <template slot-scope="scope" style="position: relative; width: 160px; height: 80px;">
            <span v-if="scope.$index+1 == 1">
              <svg-icon icon-class="排行榜" style="width: 60px; height: 60px" />
              <span class="rank">1</span>
            </span>
            <span v-else-if="scope.$index+1 == 2">
              <svg-icon icon-class="排行榜" style="width: 60px; height: 60px" />
              <span class="rank">2</span>
            </span>
            <span v-else-if="scope.$index+1 == 3">
              <svg-icon icon-class="排行榜" style="width: 60px; height: 60px" />
              <span class="rank">3</span>
            </span>
            <span v-else>
              <svg-icon icon-class="排行榜grey" style="width: 55px; height: 53px" />
              <span class="rank-last">{{ scope.$index+1 }}</span>
            </span>
          </template>
        </el-table-column>

        <el-table-column v-for="(item,key) in pankingPoolName" :key="item" width="180" :prop="item" :label="item" align="left">
          <template slot="header">
            <span style="font-weight: bold">{{ pankingPoolName[key] }}</span>
            <span v-if="columnDateType[key] === '限定池'" style="border-color: #409EFF;color: #409EFF;border-style: solid;border-width: thin">{{ columnDateType[key] }}</span>
            <span v-if="columnDateType[key] === '常驻池'" style="border-color: #13ce66;color: #13ce66;border-style: solid;border-width: thin">{{ columnDateType[key] }}</span>
          </template>
          <template slot-scope="scope">
            <div align="left">
              <span v-if="scope.row[`${item}`] instanceof Array">
                <span style="text-align: justify"><b>{{ scope.row[`${item}`][0] }}</b></span>
                <br>
                <span>本卡池抽取数量：{{ scope.row[`${item}`][1] }}</span>
                <br>
                <span>&#8194;六星概率：</span>
                <span v-if="scope.row[`${item}`][2]>= '3.33%'" style="color: lightgreen">{{ scope.row[`${item}`][2] }}</span>
                <span v-else-if="scope.row[`${item}`][2] == '3.33%'" style="color: #1890ff">{{ scope.row[`${item}`][2] }}</span>
                <span v-else style="color: red">{{ scope.row[`${item}`][2] }}</span>
                <span>&#8194;</span>
                <!-- <span v-if="scope.row[`${item}`][2].includes('-')">
                  <svg-icon icon-class="箭头_向下" />
                </span>
                <span v-else-if="scope.row[`${item}`][2] === '0.00%'">
                  <svg-icon icon-class="横线" />
                </span>
                <span v-else>
                  <svg-icon icon-class="箭头_向上" />
                </span> -->
              </span>
              <span v-else>
                <span>{{ scope.row[`${item}`] }}</span>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters } from 'vuex'
import { getPoolName } from '@/api/gacha'
import { partakeRanking, allRankingPool, rankingDate } from '@/api/other'
export default {
  inject: ['reload'],
  data() {
    return {
      allPoolName: [],
      pool: '',
      pankingPoolName: '', // 表头
      columnDateType: ['限定池'], // TODO:判断限定池
      tableData: [{
        '巨斧与笔尖': ['1', 19222, '-1.27%'],
        '常驻标准寻访': ['1', 19469, '-6.51%']
      }]
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.getAllRankingPool().then(res => {
      this.getRankingDate()
    }) // 获取表头
    this.getItem() // 获取卡池名称
  },
  methods: {
    getItem() { // 获取所有卡池名称
      getPoolName().then(response => {
        this.allPoolName = response.data.name
      })
    },
    partake() { // 参与排位
      partakeRanking({ 'poolName': this.pool }).then(res => {
        if (res.code === '200') {
          this.$message({
            showClose: true,
            message: '恭喜你，参加成功',
            type: 'success'
          })
          this.reload()// 需要刷新页面
        }
      })
    },
    async getAllRankingPool() {
      await allRankingPool().then(res => {
        this.pankingPoolName = res.data.name.map((item) => {
          return item.value
        })
      })
      return 0
    },
    getRankingDate() {
      rankingDate({ 'poolName': this.pankingPoolName }).then(res => {
        const Tdata = [{}, {}, {}, {}]
        for (const item of res.data.data) {
          for (const i in item) {
            const percent = (item[i].percent * 100).toFixed(2) + '%'
            Tdata[i][item[i].pool] = [item[i].user, item[i].num, percent]
          }
        }
        this.tableData = Tdata
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.rank{
  position: relative;
  left: -35px;
  bottom: 25px;
  color: brown;
  size: 60px;
  font-weight: bolder
}
.rank-last{
  position: relative;
  left: -32px;
  bottom: 21px;
  color: brown;
  size: 60px;
  font-weight: bolder
}
</style>
