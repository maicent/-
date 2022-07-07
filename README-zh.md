# 明日方舟抽卡数据库

> 这是一个可以[永久]储存明日方舟抽卡记录的项目（官网只能储存最近1月内的100抽）并且附带些简单的分析工具

[线上地址](http://arkdb.maicent.top)

<p align="center">
  <b>项目预览</b>
</p>
<p align="center">
   <a href="http://arkdb.maicent.top" title="明日方舟抽卡数据库" target="_blank">
      <img height="200px" src="https://gitee.com/maicent1/ark-db/raw/master/src/assets/prv.png" title="明日方舟抽卡数据库">
   </a>
</p>


## 功能一览

- [x] 抽卡数据导入和储存

- [x] B服寻访数据导入

- [x] 饼图星级分析

- [x] 最近六星

- [x] 所有寻访列表

- [x] 卡池分析

- [x] 抽卡计算器

- [x] 管理员相关功能（用户管理等）

- [ ] 模拟寻访

## Features

- [x] B服寻访数据导入（2022/7/6/已完成）

- [ ] 模拟寻访
  
- 还没想好，期待建议

## Build Setup

```bash
# 克隆项目
git clone https://gitee.com/maicent1/ark-db.git

# 进入项目目录
cd ark-db

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

在vue.config.js中的proxy中把本地后端接口改为线上后端接口 http://arkdb.maicent.top/api (后端会在后面再开源)
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 开发团队

-麦创软件设计工作室

## 开源组件

[vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/)
