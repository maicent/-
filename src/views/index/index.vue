<template>
  <div>
    <div class="header">
      <div class="img" />
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="flex:1" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <div class="right-btn">
          <div v-show="name">
            {{ name }}
            <el-button type="primary" @click="dashboard()">个人数据库</el-button>
          </div>
          <div v-show="!name">
            <el-button @click="login()">登录</el-button>
            <el-button type="primary" @click="reg()">注册</el-button>
          </div>
        </div>
      </el-menu>
    </div>

    <div class="site-banner" :style="background">
      <div class="site-banner-main">
        <div class="site-zfj">
          <i style="color: #fff; color: rgba(255,255,255,.6);font-style: normal;">♜</i>
        </div>
        <div class="site-desc">
          <p class="web-font-desc">明日方舟抽卡数据库</p>
          <cite>永久储存抽卡数据并进行简单的分析</cite>
        </div>
        <div class="site-download">
          <a href="/dashboard" class="site-down">
            <i class="el-icon-s-promotion" />
            立即体验
          </a>
        </div>
        <div class="site-version">
          <span>当前版本：v<cite id="v" class="site-showv">2.0.2</cite></span>
          <span><a href="https://gitee.com/maicent1/ark-db/commits/master" rel="nofollow" target="_blank">更新日志</a></span>
          <span>下载量：<em class="site-showdowns">…</em></span>
        </div>
      </div>
    </div>

    <div class="introduction mt_100 disflex flex_lmr flex_center wap_disblock">
      <div class="introduction_txt wap_w100">
        <h1 class="title">界面简洁清晰的控制台</h1>
        <i class="line" />
        <div class="txt text color666">
          控制台展示干员结构，最近抽取的六星干员以及所有抽取记录
          <el-link type="primary" href="/dashboard" target="_blank">&gt;&gt;查看</el-link>
        </div>
      </div>
      <div class="introduction_img wap_w100 wap_mt15"><img class="disblock w100" src="@/assets/img/preview1.png"></div>
    </div>
    <!--网站底部-->
    <div class="footer">
      <span style="margin-right: 8px;">明日方舟抽卡数据库 ©2022 麦创软件设计工作室</span>
      <div class="other">
        <el-link type="primary" href="https://gitee.com/maicent1/ark-db" target="_blank">开源仓库</el-link>|
        <el-link type="primary" href="https://space.bilibili.com/278121744" target="_blank">BiliBili</el-link>|
        <el-link type="primary" href="https://blog.csdn.net/qq_37439115" target="_blank">作者博客</el-link>|
      </div>
      <el-link type="primary" href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2022000478号-1</el-link>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '@/styles/home.scss'

export default {
  data() {
    return {
      activeIndex: '1',
      background: {
        backgroundImage: 'url(' + require('@/assets/bg.png') + ')',
        // 背景图片是否重复
        backgroundRepeat: 'no-repeat',
        // 背景图片大小
        backgroundSize: 'cover',
        // 背景颜色
        backgroundColor: '#000',
        // 背景图片位置
        backgroundPosition: 'center top'
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSelect(key, keyPath) {
    },
    login() {
      this.$router.push({ path: '/login' })
    },
    reg() {
      this.$router.push({ path: '/reg' })
    },
    dashboard() {
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-item{
  font-size: 18px !important;
}
.el-menu-item.is-active {
  color: #409EFF !important;
  font-size: 18px !important;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid #409EFF !important;
}

.header {
  display: flex;
  width: 100%;
  .img {
    background: #ffffff;
    border-bottom: solid 1px #e6e6e6;
    img {
      height:50px;
      padding:10px;
    }
  }
}
.right-btn {
  float: right;    // 靠右
  height: 100%;
  margin: 10px 10px 10px 10px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.footer {
  text-align: center;
  font-size: 12px;
  line-height: 50px;
  bottom: 0;
  right: 0;
  background-color: white;
}
.other {
  display: inline-block
}
.el-link{
  font-size: 12px;
  margin: 0 8px
}
@media (max-width:1024px) {
  .other {
    display: none;
  }
}
</style>
