<template>
  <div>
    <el-tabs type="border-card" :stretch="isTrue">
      <!-- <el-tab-pane label="全部">
        <div class="handle">
          <div class="count" @click="changeNUm">总额：{{num}}</div>
          <div class="button add">生成</div>
          <div class="button recover">恢复上一个</div>
        </div>
        <div class="time">{{time}}</div>
        <div class="cubes">
          <cube></cube>
        </div>
        <div class="total">
          <div class="total-text num49">49注：{{num49}}</div>
          <div class="total-text num33">33注：{{num33}}</div>
          <div class="total-text num16">16注：{{num16}}</div>
          <div class="total-text">总计：{{total}}</div>
        </div>
      </el-tab-pane> -->
      <el-tab-pane label="a">
        <cube :itemStatus="num49"></cube>
      </el-tab-pane>
      <el-tab-pane label="b">
        <cube :itemStatus="num33"></cube>
      </el-tab-pane>
      <el-tab-pane label="c">
        <cube :itemStatus="num16"></cube>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Cube from './Cube'
import { getRData } from '../../api/mail'
export default {
  components: {
    cube: Cube
  },
  data () {
    return {
      isTrue: true,
      num: 450,
      time: '当前版本生成时间：2019/12/20 13:45',
      num49: [],
      num33: [],
      num16: [],
      total: 22050
    }
  },
  methods: {
    changeNUm () {}
  },
  mounted () {
    getRData().then(res => {
      this.num49 = []
      res.data.arr.forEach(element => {
        this.num49.push({
          num: element,
          status: element > 0 ? 0 : -1
        })
      })
      this.num33 = []
      res.data.maxArr.forEach(element => {
        this.num33.push({
          num: element,
          status: element > 0 ? 0 : -1
        })
      })
      this.num16 = []
      res.data.minArr.forEach(element => {
        this.num16.push({
          num: element,
          status: element > 0 ? 0 : -1
        })
      })
    })
  }
}
</script>

<style scoped>
.handle {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.count {
  width: 30%;
  padding: 5px;
  text-align: left;
  border-bottom: 1px solid #bbbbbb;
}

.button {
  padding: 5px 15px;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
}

.time {
  padding: 10px 0;
  color: #929292;
  text-align: left;
  font-size: 14px;
}

.total {
  text-align: center;
  margin: auto;
  width: 120px;
}

.total-text {
  padding: 0 5px;
  text-align: left;
  margin: 5px;
}

.num49 {
  background-color: #fbdedb;
}

.num33 {
  background-color: #ccdfe5;
}

.num16 {
  background-color: #c1d8ac;
}
</style>
