<template>
  <div v-if="!isLoading" class="container" onselectstart="return false;">
    <div v-if="isShow">
      <el-button
        round
        size="large"
        plain
        class="button"
        @click="doCopy"
      >{{msg}}</el-button>
      <!-- <span class="text">前往使用</span> -->
      <span class="help" @click="help">遇到问题？</span>
      <!-- <div class="service" >
        售后V：<span style="cursor:pointer;color:#539BD8;" @click="doCopyV">hotline1024<i class="iconfont">&#xe643;</i></span>
      </div>-->
      <div v-show="showImg">
        <img style="width:90%;" src="https://i.loli.net/2020/01/19/REqDgJmNSCKYT3x.png" />
      </div>
    </div>
    <div class="err" v-if="!isShow">
      <h1>404 Not Found</h1>The requested URL was not found. If you entered the URL manually please check your spelling and try again.
    </div>
    <span
      v-if="res.count > 0"
      onselectstart="return false;"
      style="position:absolute;top:0;left:0;width:100%;height:30px;color:#DEDEDE;"
      v-long-press="5000"
      @long-press-start="onLongPressStart"
      @long-press-stop="onLongPressStop"
    >
      <span v-if="isDisplay">{{res.update_time.substring(5)}},{{res.count}}</span>
      <span v-else>.</span>
    </span>
  </div>
</template>

<script>
import $ from 'jquery'
import { getJet } from '../../api/mail'
import baseUrl from '../../api/baseURL'
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
  watch: {
  },
  methods: {
    handleSuccess (e = null) {
      setTimeout(() => {
        this.msg = '以復制'
        setTimeout(() => {
          this.msg = '请点击'
        }, 280)
      }, 20)
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
      this.syncReq('/am/j', { k: this.k })
      // this.getK({ k: this.k }, true)
    },
    help () {
      this.showImg = !this.showImg
    },
    getK (params = {}, isCopy = false) {
      this.syncReq(params)
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
          if (res.data && isCopy) {
            that.copyText = res.data
            that.$copyText(that.copyText, that.$refs.container)
          }
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
    syncReq (url, params = {}) {
      let that = this
      $.ajax({
        url: baseUrl + url,
        type: 'get',
        async: false,
        data: params,
        success: function (res) {
          res = JSON.parse(res)
          that.isLoading = false
          that.res = res
          if (res.errno !== '0') {
            that.isShow = false
            window.document.title = '404 Not Found'
          } else {
            that.isShow = true
            window.document.title = '.'
            if (res.data) {
              that.copyText = res.data
              that.$copyText(that.copyText, that.$refs.container)
            }
          }
        }
      })
    }
  },
  mounted () {
    this.k = this.getQueryString('k') || ''
    this.syncReq('/am/j', { q: this.k })
    // this.getK({ q: this.k })
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
  top: 12px;
  position: relative;
  left: 25px;
  cursor: pointer;
}
.button {
  margin-top: 150px;
  position: relative;
  left: 27px;
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
