<template>
  <div class="app-container">
    <el-descriptions class="margin-top" title="联系我们" :column="2" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          反馈群
        </template>
        465187269
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone" />
          邮箱
        </template>
        maicent@qq.com
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline" />
          开源仓库
        </template>
        <el-link href="https://gitee.com/maicent1/ark-db" target="_blank">
          https://gitee.com/maicent1/ark-db
        </el-link>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets" />
          当前版本
        </template>
        <el-tag size="small">V 2.0.2</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>在线反馈（暂时不可用）</span>
      </div>
      <el-input
        v-model="feed"
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
      />
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      size: '',
      feed: ''
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  margin-top: 20px
}
</style>

