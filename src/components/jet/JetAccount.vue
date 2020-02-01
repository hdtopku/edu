<template>
  <div>
    <el-input
      placeholder="请输入内容"
      v-model="username"
      class="input-with-select"
      @keyup.enter.native="add"
    >
      <el-button slot="append" @click="add">新增/查询</el-button>
    </el-input>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane :name="tabsNames[tabIdx]" v-for="(tabData, tabIdx) in allTabs" :key="tabIdx">
          <span slot="label">{{labels[tabIdx]}}</span>
          <el-row :gutter="20">
            <el-col>
              <div>
                <el-card
                  shadow="always"
                  :class="item.isItem ? 'highlight' : ''"
                  v-for="(item,index) in tabData"
                  :key="index"
                >
                  <div class="card">
                    <div class="left">
                      <span @click="shortCopy">短复制</span>
                      <span class="usecount">{{item.use_count}}</span>
                    </div>
                    <span @click="doCopy(item.username)">{{item.username}}</span>
                    <el-button v-if="item.status===0" class="right" @click="delet(item.username)">删除</el-button>
                    <el-button v-if="item.status===1" class="right" @click="recover(item.username)">恢复</el-button>
                    <el-button v-if="item.use_count > 0" class="right" @click="decrease(item.username)">—</el-button>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { syncGetJetAcount } from '../../api/mail'
export default {
  data () {
    return {
      activeName: 'first',
      username: '',
      res: {},
      allTabs: [],
      tabsNames: ['first', 'second', 'third'],
      labels: ['小于3次', '大于3次', '已删除']
    }
  },
  mounted () {
    this.setRes()
  },
  methods: {
    doCopy (username) {
      this.$copyText(
        '账号：' + this.res.username + '\r\n密码：Crack168',
        this.$refs.container
      ).then(
        e => {
          // success
          this.openCenter('复制成功')
        },
        e => {
          // fail
          this.openCenter('复制失败')
        }
      )
      var params = {
        username: username,
        count: 1
      }
      this.setRes(params)
    },
    shortCopy () {
      this.$copyText(this.res.username, this.$refs.container).then(
        e => {
          // success
          this.openCenter('复制成功')
        },
        e => {
          // fail
          this.openCenter('复制失败')
        }
      )
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    },
    add () {
      var params = {
        username: this.username,
        password: 'Crack168'
      }
      this.setRes(params)
      this.username = ''
    },
    delet (username) {
      var params = {
        username: username,
        status: 1
      }
      this.setRes(params)
    },
    recover (username) {
      var params = {
        username: username,
        status: 0
      }
      this.setRes(params)
    },
    decrease (username) {
      var params = {
        username: username,
        count: -1
      }
      this.setRes(params)
    },
    setRes (params = {}) {
      this.res = syncGetJetAcount(params).data
      this.allTabs = [
        this.res.accounts,
        this.res.accountsMore,
        this.res.accountsDel
      ]
      if (this.res.item.username) {
        if (this.activeName === 'first') {
          this.res.accounts.unshift(this.res.item)
        } else if (this.activeName === 'second') {
          this.res.accountsMore.unshift(this.res.item)
        } else if (this.activeName === 'third') {
          this.res.accountsDel.unshift(this.res.item)
        }
      }
    }
  }
}
</script>
<style scoped>
.highlight {
  border: 1px solid black;
  background-color: blanchedalmond;
}
.left {
  float: left;
  color: gray;
  font-size: 12px;
}
.usecount {
  font-size: 15px;
  color: black;
  padding: 0 5px;
}
.right {
  float: right;
}
</style>
