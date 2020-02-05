<template>
  <div v-if="!isLoading" class="container" onselectstart="return false;">
    <div v-if="isShow">
      <div>
      <el-button
        v-clipboard:copy="copyText"
        v-clipboard:success="handleSuccess"
        v-clipboard:error="handleError"
        round
        size="large"
        plain
        class="button"
        @click="doCopy"
      >{{msg}}</el-button>
      </div>
      <!-- <span class="text">前往使用</span> -->
      <span class="help" v-if="showImg" @click="help">返回</span>
      <span class="help" v-else @click="help">遇到问题？</span>
      <!-- <div>
        售后问题，微信扫码：
        <span style="cursor:pointer;color:#539BD8;" @click="doCopyV">hotline1024<i class="iconfont">&#xe643;</i></span>
      </div> -->
      <div v-show="!showImg">
        务必扫码，微信售后：
        <div>
          <img style="width:60%;max-width:300px;" src="https://i.loli.net/2020/02/02/bGUBSPWalwXZ6po.jpg" />
        </div>
      </div>
      <div v-show="showImg">
        <img style="width:90%;" src="https://i.loli.net/2020/01/19/REqDgJmNSCKYT3x.png" />
      </div>
    </div>
    <div class="err" v-show="!isShow">
      <h1>404 Not Found</h1>The requested URL was not found. If you entered the URL manually please check your spelling and try again.
    </div>
    <span
      v-if="res.count > 0"
      onselectstart="return false;"
      style="position:absolute;top:0;left:0;width:100%;height:30px;color:#DEDEDE;"
      v-long-press="3000"
      @long-press-start="onLongPressStart"
      @long-press-stop="onLongPressStop"
    >
      <span v-if="isDisplay">{{res.update_time.substring(5)}},{{res.count}}</span>
      <span v-else>.</span>
    </span>
  </div>
</template>

<script>
import { getJet, syncGetJet } from '../../api/mail'
export default {
  components: {},
  data () {
    return {
      msg: '请点击',
      k: '',
      isLoading: true,
      isShow: false,
      showImg: false,
      copyText: 'Copy failed, try again!',
      tryAgain: '复制失败',
      res: {},
      isDisplay: false
    }
  },
  methods: {
    handleSuccess (e = null) {
      this.msg = '已复制'
      setTimeout(() => {
        this.msg = '请点击'
      }, 500)
    },
    handleError (e) {
      this.openCenter(this.tryAgain)
    },
    onLongPressStart () {
      // triggers after 300ms of mousedown
      this.isDisplay = true
    },
    onLongPressStop () {
      // triggers on mouseup of document
    },
    doCopy () {
      var res = syncGetJet({ k: this.k })
      if (res.errno !== '0') {
        this.isShow = false
        window.document.title = '404 Not Found'
      } else {
        this.isShow = true
        window.document.title = '.'
        if (res.data) {
          this.copyText = res.data
          this.$copyText(this.copyText, this.$refs.container).then((e) => {
            // success
            this.handleSuccess()
          }, (e) => {
            // fail
            this.openCenter(this.tryAgain)
          }
          )
        }
      }
    },
    help () {
      this.showImg = !this.showImg
    },
    getK (params = {}, isCopy = false) {
      const that = this
      getJet(params).then(res => {
        this.isLoading = false
        this.res = res
        if (res.errno !== '0') {
          this.isShow = false
          window.document.title = '404 Not Found'
        } else {
          that.isShow = true
          window.document.title = '.'
        }
      })
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    },
    getQueryString (name) {
      let reg = `(^|&)${name}=([^&]*)(&|$)`
      let r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    doCopyV () {
      this.$copyText('hotline1024').then()
      this.openCenter(`<div style="color:red;font-size:20px;">hotline1024</div>已复制`)
    }
  },
  mounted () {
    this.k = this.getQueryString('k') || ''
    this.getK({ q: this.k })
  }
}
</script>
<style scoped>
.container,
.container *,
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.help {
  font-size: 12px;
  color: #007acc;
  position: relative;
  left: 140px;
  bottom: 18px;
  cursor: pointer;
}
.button {
  margin-top: 150px;
  position: relative;
  width: 200px;
  height: 50px;
  font-size: 25px;
  font-weight: 300;
}

.service {
  margin-top: 20px;
  font-family: PingFangSC-Light, sans-serif;
}

.text {
  color: black;
  font-size: 35px;
  font-family: PingFangSC-Light, sans-serif;
  margin-top: 30px;
}

.err {
  text-align: left;
}
</style>
