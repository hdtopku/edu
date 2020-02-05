<template>
  <div>
    <el-checkbox
      v-model="needLogout"
      style="position:absolute;left:0;top:35px;"
      slot="append"
      size="mini"
    >登出</el-checkbox>
      <el-button
      v-show="needLogout"
        style="position:absolute;right:0;top:0px;"
        v-clipboard:copy="copyText"
        v-clipboard:success="handleSuccess"
        v-clipboard:error="handleError"
        type="plain"
        size="small"
        @click="register"
        round
      >批量注册</el-button>
    <el-input
      placeholder="请输入内容"
      v-model="username"
      class="input-with-select"
      @keyup.enter.native="add"
    >
      <el-button slot="append" @click="add">新增/查询</el-button>
    </el-input>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane :name="tabsNames[tabIdx]" v-for="(tabData, tabIdx) in tabsNames" :key="tabIdx">
        <span slot="label">
          {{labels[tabIdx]}}
          <span
            v-if="tabIdx===0 && res.accounts"
          >{{'(' + res.accounts.length + ')'}}</span>
          <span v-if="tabIdx===1 && res.accountsMore">{{'(' + res.accountsMore.length + ')'}}</span>
          <span v-if="tabIdx===2 && res.accountsEffect">{{'(' + res.accountsEffect.length + ')'}}</span>
          <span v-if="tabIdx===3 && res.accountsDel">{{'(' + res.accountsDel.length + ')'}}</span>
        </span>

        <el-row :gutter="20">
          <el-col>
            <div>
              <el-card
                shadow="always"
                :class="item.isItem ? 'highlight' : ''"
                v-for="(item,index) in allTabs[tabIdx]"
                :key="index"
              >
                <div class="card">
                  <div class="left">
                    <div>
                      <i
                        class="iconfont icon-copy1"
                        @click="shortCopy(item.username, item.status === 0)"
                      ></i>
                      <span class="usecount">{{item.use_count}}</span>
                    </div>
                    <span>{{item.update_time.substr(5)}}</span>
                  </div>
                  <span @click="doCopy(item.username, item.status === 0)">{{item.username}}</span>
                  <div class="right">
                    <el-button
                      v-if="item.status===0 || item.status===-1"
                      class="right"
                      @click="delet(item.username)"
                    >删除</el-button>
                    <el-button
                      v-if="item.status===1"
                      class="right"
                      @click="recover(item.username)"
                    >恢复</el-button>
                    <el-button
                      v-if="item.status===-1"
                      class="right"
                      @click="effect(item.username)"
                    >生效</el-button>
                    <el-button
                      v-if="item.use_count > 0 && item.status != -1"
                      @click="decrease(item.username)"
                    >—</el-button>
                  </div>
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
import { syncGetJetAcount, batchJetReg } from '../../api/mail'
export default {
  data () {
    return {
      activeName: 'first',
      needLogout: false,
      username: '',
      res: {},
      allTabs: [],
      tabsNames: ['first', 'second', 'third', 'fourth'],
      labels: ['2次', '2次+', '仓库', '已删']
    }
  },
  mounted () {
    this.setRes()
  },
  methods: {
    doCopy (username, needCopy = true) {
      this.$copyText(
        '帐号：' + username + '\r\n蜜码：Crack168',
        this.$refs.container
      ).then(
        e => {
          // success
          this.openCenter('帐号+蜜码已复制')
        },
        e => {
          // fail
          this.openCenter('帐号蜜码复制失败')
        }
      )
      if (needCopy) {
        var params = {
          username: username,
          count: 1
        }
        this.setRes(params)
      }
    },
    register () {
      batchJetReg()
      this.openCenter(`<div style="color:red;font-size:20px;">约1分钟内</div>完成`)
    },
    shortCopy (username, needCopy = true) {
      this.$copyText(username + '，Crack168', this.$refs.container).then(
        e => {
          // success
          this.openCenter(`<div style='color:red;font-size:20px;'>${username}</div>卡密已复制`)
          if (needCopy) {
            var params = {
              username: username,
              count: 1
            }
            this.setRes(params)
          }
        },
        e => {
          // fail
          this.openCenter('卡密复制失败')
        }
      )
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    },
    add () {
      if (this.needLogout) {
        this.logout()
      }
      var params = {
        username: this.username,
        password: 'Crack168'
      }
      this.setRes(params)
      this.username = ''
    },
    logout () {
      this.$copyText('Crack168', this.$refs.container).then(
        e => {
          // success
          var win = window.open('https://account.jetbrains.com/logout', '_blank')
          setTimeout(() => {
            win.close()
          }, 120)
          setTimeout(() => {
            this.openCenter('<div style="color:red;font-size:20px;">Crack168</div>已复制')
          }, 20)
        },
        e => {
          // fail
          this.openCenter('复制失败')
        })
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
    effect (username) {
      if (this.needLogout) {
        this.logout()
      }
      var params = {
        username: username,
        status: 0
      }
      this.setRes(params)
    },
    setRes (params = {}) {
      this.res = syncGetJetAcount(params).data
      this.allTabs = [
        this.res.accounts,
        this.res.accountsMore,
        this.res.accountsEffect,
        this.res.accountsDel
      ]
      if (this.res.item.username) {
        if (this.res.item.status === -1) {
          this.res.accountsDel.unshift(this.res.item)
        } else if (this.res.item.status === 0) {
          if (this.res.item.use_count > 1) {
            this.res.accountsMore.unshift(this.res.item)
          } else {
            this.res.accounts.unshift(this.res.item)
          }
        } else if (this.res.item.status === 1) {
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
.icon-copy1 {
  font-size: 25px;
}
</style>
