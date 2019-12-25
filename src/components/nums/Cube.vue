<template>
  <div>
    <div class="handlebox">
      <p>总：{{total}}</p>
      <el-popover placement="top" width="160" v-model="visible">
        <p>确定恢复数据吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="cancle">取消</el-button>
          <el-button type="primary" size="mini" @click="recover">确定</el-button>
        </div>
        <el-button slot="reference" class="button">恢复</el-button>
      </el-popover>
      <!-- <el-popconfirm title="确定恢复数据吗？" hideIcon>
        <el-button slot="reference"  @click="recover">恢复</el-button>
      </el-popconfirm> -->
    </div>
    <div class="cubes">
      <div
        class="container"
        v-for="(item, index) in itemStatus"
        :class="{ active: item.status === 1 }"
        :key="index"
        @click="clicked(index)"
      >
        <div class="one" v-if="item.status !== -1">{{index+1}}</div>
        <div class="one-disabled" v-else>{{index+1}}</div>
        <div class="two" v-if="item.status !== -1">{{item.num}}</div>
        <div class="two disabled" v-else></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: 0,
    itemStatus: Array,
    isShow: false
  },
  data () {
    return {
      mynum: 450,
      visible: false
    }
  },
  methods: {
    clicked (index) {
      if (this.itemStatus[index].status !== -1) {
        this.itemStatus[index].status = (this.itemStatus[index].status + 1) % 2
      }
    },
    recover () {
      this.itemStatus.forEach(element => {
        if (element.status !== -1) {
          element.status = 0
          this.visible = false
        }
      })
    },
    cancle () {
      this.visible = false
    }
  },
  mounted () {}
}
</script>
<style scoped>
.handlebox {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  /* margin-bottom: 15px; */
}

.button {
  width: 50px;
  padding: 9px 5px 9px 5px;
  margin-top: 8px;
}

.cubes {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.container {
  width: 18%;
  height: auto;
  border: 1px solid #bbbbbb;
  margin-bottom: 10px;
}

.container div {
  text-align: center;
  line-height: 33px;
}

.active .one {
  color: #bbbbbb;
}

.active .two {
  color: white;
  background-color: #bbbbbb;
}

.active .three {
  color: white;
  background-color: #bbbbbb;
}

.one {
  height: 30px;
}

.one-disabled {
  height: 30px;
  color: #bbbbbb;
}

.two {
  height: 35px;
  background-color: #fbd735;
}

.disabled {
  color: #e1e1e1;
  background-color: #e1e1e1;
}

.three {
  height: 35px;
  background-color: #ccdfe5;
}
</style>
