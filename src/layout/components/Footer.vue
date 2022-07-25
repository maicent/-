<template>
  <div class="footer">
    <span style="margin-right: 8px;">明日方舟抽卡数据库 ©2022 麦创软件设计工作室</span>
    <div class="other">
      <el-link type="primary" href="https://gitee.com/maicent1/ark-db" target="_blank">开源仓库</el-link>|
      <el-popover placement="top-start" width="100" trigger="hover">
        <img src="@/assets/qrcode.jpg" class="rightulliimg">
        <el-link slot="reference" type="primary">微信公众号</el-link>
      </el-popover>|
      <el-link type="primary" href="https://space.bilibili.com/278121744" target="_blank">BiliBili</el-link>|
      <el-link type="primary" href="https://blog.csdn.net/qq_37439115" target="_blank">作者博客</el-link>|

    </div>
    <el-link type="primary" href="https://jq.qq.com/?_wv=1027&k=IWgaduE8" target="_blank">反馈QQ群：465187269</el-link>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped >
.footer {
  text-align: center;
  font-size: 12px;
  line-height: 50px;
  bottom: 0;
  right: 0;
  background-color: white;

}
.el-link{
  font-size: 12px;
  margin: 0 8px
}

.rightulliimg {
  margin-left: 13px;
  max-width: 100%;
  max-height: 100px;
}

.other {
  display: inline-block
}

@media (max-width:1024px) {
  .other {
    display: none;
  }
}
</style>
