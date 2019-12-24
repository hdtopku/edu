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
      </el-tab-pane>-->
      <el-tab-pane label="全部">
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-input type="number" placeholder="请输入" v-model="input1">
                <template slot="prepend">49总和:</template>
              </el-input>
            </div>
            <div>
              <el-input type="number" placeholder="请输入" v-model="input2">
                <template slot="prepend">单元和:</template>
              </el-input>
            </div>
            <div>
              <el-input type="number" placeholder="请输入" v-model="input3">
                <template slot="prepend">最大值:</template>
              </el-input>
            </div>
            <div>
              <el-input type="number" placeholder="请输入" v-model="input4">
                <template slot="prepend">最小值:</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>2</div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="49">
        <p>总：{{numbers.total49}}</p>
        <cube :itemStatus="numbers['num49']"></cube>
      </el-tab-pane>
      <el-tab-pane label="33">
        <p>总：{{numbers.total33}}</p>
        <cube :itemStatus="numbers['num33']"></cube>
      </el-tab-pane>
      <el-tab-pane label="16">
        <p>总：{{numbers.total16}}</p>
        <cube :itemStatus="numbers['num16']"></cube>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { setStore, getStore } from '../../api/storage'
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
      numbers: {
        num49: [],
        total49: 0,
        num33: [],
        total33: 0,
        num16: [],
        total16: 0
      },
      total: 22050,
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  },
  methods: {
    init () {
      var numbers = getStore('numbers') || ''
      if (numbers === '') {
        this.fetchData()
        numbers = getStore('numbers') || ''
      }
      this.numbers = numbers
    },
    fetchData () {
      getRData().then(res => {
        var numbers = {}
        numbers.num49 = []
        numbers.total49 = 0
        res.data.arr.forEach(element => {
          numbers.total49 += element
          numbers['num49'].push({
            num: element,
            status: element > 0 ? 0 : -1
          })
        })
        numbers['num33'] = []
        numbers.total33 = 0
        res.data.maxArr.forEach(element => {
          numbers.total33 += element
          numbers['num33'].push({
            num: element,
            status: element > 0 ? 0 : -1
          })
        })
        numbers['num16'] = []
        numbers.total16 = 0
        res.data.minArr.forEach(element => {
          numbers.total16 += element
          numbers['num16'].push({
            num: element,
            status: element > 0 ? 0 : -1
          })
        })
        setStore('numbers', numbers)
      })
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    numbers: {
      handler () {
        setStore('numbers', this.numbers)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

.handlebox {
  display: flex;
  justify-content: space-around;
}

.left {
  display: flex;
  width: 50%;
}

span {
  line-height: 32px;
  padding: 0 5px 0 0;
}

.right {
  width: 50%;
}

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
