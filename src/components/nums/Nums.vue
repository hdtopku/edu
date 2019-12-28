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
          <el-col :span="14">
            <div>
              <el-input type="number" placeholder="请输入" v-model="params.total">
                <template slot="prepend">49总和:</template>
              </el-input>
            </div>
            <div>
              <el-input type="number" placeholder="请输入" v-model="params.avg">
                <template slot="prepend">单元和:</template>
              </el-input>
            </div>
            <div>
              <el-input type="number" placeholder="请输入" v-model="params.min">
                <template slot="prepend">最小值:</template>
              </el-input>
            </div>
            <div>
              <el-input type="number" placeholder="请输入" v-model="params.max">
                <template slot="prepend">最大值:</template>
              </el-input>
            </div>
            <div>
              <el-input type="number" placeholder="请输入" v-model="params.minTimes">
                <template slot="prepend">最小个数:</template>
              </el-input>
            </div>
            <!-- <el-popconfirm title="确定生成数据吗？" hideIcon>
              <el-button class="button" slot="reference" @click="generate">生成</el-button>
            </el-popconfirm>-->
            <el-popover placement="top" width="160" v-model="visible" hideIcon>
              <p>确定生成数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancle">取消</el-button>
                <el-button type="primary" size="mini" @click="generate">确定</el-button>
              </div>
              <el-button slot="reference" class="button">生成</el-button>
            </el-popover>
          </el-col>
          <el-col :span="10">
            <div class="text">
              <div class="bg49">49: {{numbers.total49}}</div>
              <div class="bg33">{{49-params.minTimes}}: {{numbers.total33}}</div>
              <div class="bg16">{{params.minTimes}}: {{numbers.total16}}</div>
              <div>总计：{{numbers.total49+numbers.total33+numbers.total16}}</div>
            </div>
            <div class="time">{{numbers.time}}</div>
          </el-col>
        </el-row>
        <!-- 首页cube -->
        <all-cube :numbers="numbers"></all-cube>
      </el-tab-pane>
      <el-tab-pane label="49">
        <cube :itemStatus="numbers['num49']" :total="numbers.total49"></cube>
      </el-tab-pane>
      <el-tab-pane :label="49-params.minTimes">
        <cube :itemStatus="numbers['num33']" :total="numbers.total33"></cube>
      </el-tab-pane>
      <el-tab-pane :label="params.minTimes">
        <cube :itemStatus="numbers['num16']" :total="numbers.total16"></cube>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { setStore, getStore } from '../../api/storage'
import Cube from './Cube'
import AllCube from './AllCube'
import { getRData } from '../../api/mail'
export default {
  components: {
    cube: Cube,
    allCube: AllCube
  },
  data () {
    return {
      visible: false,
      isTrue: true,
      num: 450,
      numbers: {
        num49: [],
        total49: 0,
        num33: [],
        total33: 0,
        num16: [],
        total16: 0,
        time: ''
      },
      params: {
        total: 0,
        avg: 0,
        min: 0,
        max: 0,
        minTimes: 0
      }
    }
  },
  methods: {
    init (force = false) {
      this.dealParams()
      this.fetchData(force)
    },
    fetchData (force = false) {
      var numbers = getStore('numbers') || ''
      if (force || numbers === '') {
        this.getNumData()
      } else {
        this.numbers = numbers
      }
    },
    getNumData () {
      getRData(this.params).then(res => {
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
        numbers.time = res.data.time
        // let oldNumbers = getStore('numbers')
        setStore('numbers', numbers)
        this.numbers = numbers
      })
    },
    dealParams () {
      if (this.params.total > 0 && this.params.avg > 0 && this.params.min > 0 && this.params.max > 0) {
        this.params.total = parseInt(this.params.total) > 0 ? parseInt(this.params.total) : 10050
        this.params.avg = parseInt(this.params.avg) > 0 ? parseInt(this.params.avg) : 450
        this.params.min = parseInt(this.params.min) > 0 ? parseInt(this.params.min) : 50
        this.params.max = parseInt(this.params.max) > 0 ? parseInt(this.params.max) : 400
        this.params.minTimes = parseInt(this.params.minTimes) > 0 ? parseInt(this.params.minTimes) : 16
        setStore('numParams', this.params)
      } else {
        var params = getStore('numParams') || {}
        params.total = parseInt(params.total) > 0 ? parseInt(params.total) : 10050
        params.avg = parseInt(params.avg) > 0 ? parseInt(params.avg) : 450
        params.min = parseInt(params.min) > 0 ? parseInt(params.min) : 50
        params.max = parseInt(params.max) > 0 ? parseInt(params.max) : 400
        params.minTimes = parseInt(params.minTimes) > 0 ? parseInt(params.minTimes) : 16
        this.params = params
        setStore('numParams', params)
      }
    },
    generate () {
      this.visible = false
      this.init(true)
    },
    cancle () {
      this.visible = false
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    numbers: {
      handler () {
        this.numbers.total = parseInt(this.numbers.total)
        this.numbers.avg = parseInt(this.numbers.avg)
        this.numbers.min = parseInt(this.numbers.min)
        this.numbers.max = parseInt(this.numbers.max)
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
  width: 40%;
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
  color: #6e7073;
  margin-top: 10px;
}

.time {
  color: #929292;
  text-align: left;
  font-size: 12px;
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

.text {
  padding: 5px;
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 32px;
}

.bg49 {
  padding-left: 10px;
  background-color: #fbdedb;
  margin-bottom: 5px;
}

.bg33 {
  padding-left: 10px;
  background-color: #ccdfe5;
  margin-bottom: 5px;
}

.bg16 {
  padding-left: 10px;
  background-color: #c1d8ac;
}
</style>
