<template>
  <div class="components-container">
    <count-to
      ref="example"
      :start-val="_startVal"
      :end-val="_endVal"
      :duration="_duration"
      :decimals="_decimals"
      :separator="_separator"
      :prefix="_prefix"
      :suffix="_suffix"
      :autoplay="false"
      class="example"
    />
    <div style="margin-left: 25%;margin-top: 40px;">
      <label class="label" for="startValInput">总共原石:
        <input v-model.number="stone" type="number" name="stone">
      </label>
      <label class="label" for="endValInput">总共合成玉:
        <input v-model.number="jade" type="number" name="jade">
      </label>
      <br>
      <div class="startBtn example-btn" @click="start">
        开始计算
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'

export default {
  name: 'CountToDemo',
  components: { countTo },
  data() {
    return {
      stone: 0,
      jade: 0,
      all: 0,
      setStartVal: 0,
      setEndVal: 2017,
      setDuration: 2000,
      setDecimals: 0,
      setSeparator: ',',
      setSuffix: ' 发',
      setPrefix: '总共 '
    }
  },
  computed: {
    _startVal() {
      if (this.setStartVal) {
        return this.setStartVal
      } else {
        return 0
      }
    },
    _endVal() {
      if (this.setEndVal) {
        return this.setEndVal
      } else {
        return 0
      }
    },
    _duration() {
      if (this.setDuration) {
        return this.setDuration
      } else {
        return 100
      }
    },
    _decimals() {
      if (this.setDecimals) {
        if (this.setDecimals < 0 || this.setDecimals > 20) {
          alert('digits argument must be between 0 and 20')
          return 0
        }
        return this.setDecimals
      } else {
        return 0
      }
    },
    _separator() {
      return this.setSeparator
    },
    _suffix() {
      return this.setSuffix
    },
    _prefix() {
      return this.setPrefix
    }
  },
  methods: {
    start() {
      this.all = this.jade + this.stone * 180
      this.setEndVal = Math.floor(this.all / 600)
      this.$refs.example.start()
      console.error('test')
    }
  }
}
</script>

<style scoped>
.example-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 500;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  padding: 4px 15px;
  font-size: 12px;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  position: relative;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  border-color: #d9d9d9;
}

.example-btn:hover {
  color: #4AB7BD;
  background-color: #fff;
  border-color: #4AB7BD;
}
.example {
  font-size: 50px;
  color: #F6416C;
  display: block;
  margin: 10px 0;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
}

.label {
  color: #2f4f4f;
  font-size: 16px;
  display: inline-block;
  margin: 15px 30px 15px 0;
}

input {
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  width: 70px;
  height: 28px;
  cursor: text;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all .3s;
  transition: all .3s;
}

.startBtn {
  margin-left: 20px;
  font-size: 20px;
  color: #30B08F;
  background-color: #fff;
}

.startBtn:hover {
  background-color: #30B08F;
  color: #fff;
  border-color: #30B08F;
}

.pause-resume-btn {
  font-size: 20px;
  color: #E65D6E;
  background-color: #fff;
}

.pause-resume-btn:hover {
  background-color: #E65D6E;
  color: #fff;
  border-color: #E65D6E;
}
</style>

