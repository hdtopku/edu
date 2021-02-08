<template>
  <div>
    <el-button
      v-show="needLogout"
      class="login"
      type="plain"
      size="small"
      @click="register"
      round
    >批量注册</el-button>
    <el-link
      v-show="needLogout"
      class="logout-jet"
      type="primary"
      size="small"
      @click="logout"
      round
    >登出</el-link>
    <el-checkbox class="logout" v-model="needLogout" slot="append" size="mini"></el-checkbox>
    <el-input
      placeholder="账密英文逗号分开"
      v-model="username"
      class="input-with-select"
      @keyup.enter.native="add"
    >
      <el-button slot="append" @click="add">查询/新增</el-button>
    </el-input>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane :name="tabsNames[tabIdx]" v-for="(tabData, tabIdx) in tabsNames" :key="tabIdx">
        <span slot="label">
          {{labels[tabIdx]}}
          <!--          <span-->
          <!--            v-if="tabIdx===0 && res.accounts"-->
          <!--          >{{'(' + res.accounts.length + ')'}}</span>-->
          <span v-if="tabIdx===0 && res.accountsMore">{{'(' + res.accountsMore.length + ')'}}</span>
          <!--          <span v-if="tabIdx===1 && res.accountsEffect">{{'(' + res.accountsEffect.length + ')'}}</span>-->
          <span v-if="tabIdx===1 && res.accountsDel">{{'(' + res.accountsDel.length + ')'}}</span>
        </span>

        <el-row :gutter="20">
          <el-col>
            <div>
              <!-- 选择框 -->
              <div class="selector" v-if="activeName==='second'">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button @click="batchCopy" :disabled="isDisabled" :loading="isLoading">复制10条</el-button>
              </div>
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
                        @click="shortCopy(item.username, item.password, item.status === 0)"
                      ></i>
                      <span class="usecount">{{item.use_count}}</span>
                    </div>
                    <span>{{item.create_time.substr(5,5)}}，{{item.update_time.substr(5,5)}}</span>
                  </div>
                  <span @click="doCopy(item.username, item.password, item.status === 0)">{{item.username}}</span>
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
                    <el-popconfirm title="确定清除？" @confirm="clear(item.username)">
                      <el-button
                        v-if="item.status===1"
                        class="right"
                        slot="reference"
                      >清除</el-button>
                    </el-popconfirm>
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
      activeName: 'second',
      needLogout: false,
      username: '',
      password: '',
      res: {},
      allTabs: [],
      tabsNames: ['second', 'fourth'],
      labels: ['2次+', '已删'],
      accountsCopy: ['1', '2', '3'],
      options: [{
        value: -1,
        label: '请选择'
      }, {
        value: 0,
        label: '已使用0次'
      }, {
        value: 1,
        label: '已使用1次'
      }, {
        value: 2,
        label: '已使用2次'
      }],
      value: -1,
      isLoading: false
    }
  },
  mounted () {
    this.setRes()
  },
  computed: {
    isDisabled () {
      return this.value < 0
    }
  },
  methods: {
    doCopy (username, password, needCopy = true) {
      var accountText = `🚫以下账号仅限本人使用，如因他用导致失效❗️将立即失去售后补新资格
账号：${username}（务必复制）
密码：${password}（复杂易错，务必复制）
在【JB Account】输入账密后，需重启软件即可

👉激活失败？解决办法
【步骤一】把安装包bin目录下jetbrains相关的破解插件删除
【步骤二】在软件菜单点击help，Edit Custom VM Options...（如果存在jetbrains相关行，请删除；如无法打开菜单，请点试用30天）
【步骤三】删除hosts中所有jetbrains的行
1、windows的hosts位于：
c:/Windows/System32/Drivers/etc/hosts
2、linux或mac位于：
/etc/hosts
【步骤四】重启软件，并重新输入后重启软件即可

👉加个好友（扣：1450948930）
方便补新，若后期使用失效：
0、请优先👉重启软件👈看能否解决
1、提供软件激活失败截图
2、提供购买聊天或订单截图

🚀 若身边朋友需要，请尽快推荐购买
🚀 售后维护成本极大上升，未来将涨价
`
      this.$copyText(
        accountText,
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
    shortCopy (username, password, needCopy = true) {
      this.$copyText(username + '，' + password, this.$refs.container).then(
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
    batchCopy () {
      this.isLoading = true
      if (this.value >= 0) {
        var params = {
          use_count: this.value,
          batch_count: 10
        }
        this.setRes(params)
      }
      setTimeout(() => {
        this.isLoading = false
        this.value = -1
      }, 10)
    },
    openCenter: function (text = '已复制！') {
      this.$toast.top(text)
    },
    add () {
      if (this.needLogout) {
        // this.logout()
      }
      let params = {}
      if (this.username.includes(',')) {
        params = {
          username: this.username.split(',')[0],
          password: this.username.split(',')[1]
        }
      } else {
        params = {
          username: this.username,
          password: 'Nobug996'
        }
      }
      this.setRes(params)
      this.username = ''
    },
    logout () {
      // this.$copyText('Crack168', this.$refs.container).then(
      //   e => {
      //     // success
      //     setTimeout(() => {
      //       this.openCenter('<div style="color:red;font-size:20px;">Crack168</div>已复制')
      //     }, 20)
      //     setTimeout(() => {
      //       var win = window.open('https://account.jetbrains.com/logout', '_blank')
      //       setTimeout(() => {
      //         win.close()
      //       }, 120)
      //     }, 7000)
      //   },
      //   e => {
      //     // fail
      //     this.openCenter('复制失败')
      //   })
      setTimeout(() => {
        var win = window.open('https://account.jetbrains.com/logout', '_blank')
        setTimeout(() => {
          win.close()
        }, 120)
      })
    },
    delet (username) {
      var params = {
        username: username,
        status: 1
      }
      this.setRes(params)
    },
    clear (username) {
      var params = {
        username: username,
        status: 2
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
      var params = {
        username: username,
        status: 0
      }
      this.setRes(params)
    },
    setRes (params = {}) {
      this.res = syncGetJetAcount(params).data
      this.res.accountsMore = this.res.accounts.concat(this.res.accountsMore)
      this.allTabs = [
        // this.res.accounts,
        this.res.accountsMore,
        // this.res.accountsEffect,
        this.res.accountsDel
      ]
      if (this.res.item.username) {
        if (this.res.item.status === -1) {
          this.res.accountsDel.unshift(this.res.item)
        } else if (this.res.item.status === 0) {
          this.res.accountsMore.unshift(this.res.item)
          // if (this.res.item.use_count > 1) {
          //   this.res.accountsMore.unshift(this.res.item)
          // } else {
          //   this.res.accounts.unshift(this.res.item)
          // }
        } else if (this.res.item.status === 1) {
          this.res.accountsDel.unshift(this.res.item)
        }
      }
      if (this.res.accountsCopy && this.res.accountsCopy.length > 0) {
        var copyItems = []
        this.res.accountsCopy.forEach(element => {
          copyItems.push(element.username + '，' + element.password)
        })
        var copyText = copyItems.join('\r\n')
        setTimeout(() => {
          this.$copyText(copyText, this.$refs.container).then(
            e => {
              // success
              this.openCenter(`<div style='color:red;font-size:20px;'>${copyItems.length}条</div>卡密已复制`)
            },
            e => {
              // fail
              this.openCenter('批量复制卡密失败')
            }
          )
        }, 50)
      } else if (this.res.accountsCopy && this.res.accountsCopy.length <= 0) {
        this.openCenter('暂无合适的卡密')
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
.logout {
  position: absolute;
  right: 5px;
  top: 5px;
}
.logout-jet {
  position: absolute;
  right: 0px;
  top: 30px;
}
.login {
  position: absolute;
  right: 35px;
  top: 0px;
}
.selector {
  margin: 3px 0 15px 0;
}
</style>
