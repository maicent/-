<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <!-- <VueTerminal
          :intro="intro"
          console-sign="方舟自动签到 $"
          allow-arbitrary
          height="500px"
          @command="onCliCommand"
        /> -->
        <div id="terminal" ref="terminal" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <h2>注意事项</h2>
        此为测试功能，风险未知，请勿频繁使用<br>
        目前还在内测，采用积分制，使用一次扣1积分（无论成功与否），获取积分请加入反馈群：465187269，向群主索取<br>
        <br>
        <h3>注意格式：</h3>
        服务器：国服（CN）,日服（JP），美服（US）<br>
        平台：安卓（Android）,苹果（IOS）<br>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { signin } from '@/api/user'

import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

export default {
  data() {
    return {
      term: '', // 保存terminal实例
      rows: 40,
      cols: 50,
      form: {
        server: '',
        platform: '',
        user: '',
        pwd: ''
      }
    }
  },
  mounted() {
    this.initXterm()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    initXterm() {
      const _this = this
      const term = new Terminal({
        rendererType: 'canvas', // 渲染类型
        rows: _this.rows, // 行数
        cols: _this.cols, // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, // 启用时，光标将设置为下一行的开头
        // scrollback: 50, //终端中的回滚量
        disableStdin: false, // 是否应禁用输入
        // cursorStyle: "underline", //光标样式
        cursorBlink: true, // 光标闪烁
        theme: {
          foreground: '#ECECEC', // 字体
          background: '#000000', // 背景色
          cursor: 'help', // 设置光标
          lineHeight: 20
        }
      })
      // 创建terminal实例
      term.open(this.$refs['terminal'])
      // 换行并输入起始符 $
      term.prompt = _ => {
        term.write(' \r\n\x1b[33m方舟终端 $\x1b[0m ')
      }
      term.prompt()
      // canvas背景全屏
      const fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      fitAddon.fit()

      window.addEventListener('resize', resizeScreen)
      function resizeScreen() {
        try { // 窗口大小改变时，触发xterm的resize方法使自适应
          fitAddon.fit()
        } catch (e) {
          console.log('e', e.message)
        }
      }
      _this.term = term
      _this.runFakeTerminal()
    },
    runFakeTerminal() {
      const _this = this
      const term = _this.term
      if (term._initialized) return
      // 初始化
      term._initialized = true
      term.writeln('欢迎使用 \x1b[1;32m方舟自动签到\x1b[0m.')
      term.writeln('使用时请注意：请依次输入“服务器 平台 手机号 密码”如“CN Android 12345678900 12345678”')
      term.prompt()
      // 添加事件监听器，支持输入方法
      let content = ''
      term.onKey(e => {
        const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey
        content = content + e.key

        if (e.domEvent.keyCode === 13) { // 输入回车
          // term.write('\r\n' + content)
          // 将输入的参数按照空格拆分再放入对象中
          const newData = [{ ...content.trim().split(/\s+/) }].map((item) => {
            return {
              server: item[0],
              platform: item[1],
              account: item[2],
              password: item[3]
            }
          })
          term.write(' \r\n 请耐心等待')
          signin(newData[0]).then(response => {
            if (response.code === '200') {
              for (const s of response.data.success) {
                term.write(' \r\n \x1b[32m' + s + '\x1b[0m')
              }
              for (const f of response.data.fail) {
                term.write(' \r\n \x1b[31m' + f + '\x1b[0m')
              }
              term.prompt()
            } else if (response.code === '400') {
              term.write(' \r\n \x1b[31m积分不足\x1b[0m')
              term.prompt()
            } else {
              term.write(' \r\n \x1b[31m发生未知错误，请检查用户名密码或联系管理员\x1b[0m')
              term.prompt()
            }
          })

          content = ''
        } else if (e.domEvent.keyCode === 8) { // back 删除的情况
          if (term._core.buffer.x > 11) {
            term.write('\b \b')
            content = content.substring(0, content.length - 2)
          } else {
            content = ''
          }
        } else if (printable) {
          term.write(e.key)
        }
        // if (e.length > 1) {
        //   term.write(e)
        // }
        // console.log(1, 'print', e.key)
      })
      term.onData(key => { // 粘贴的情况
        if (key.length > 1) {
          term.write(key)
          content = content + key
        }
      })
    }
  }
}
</script>
