<template>
  <div v-if="!isLoading" class="container" onselectstart="return false;">
    <!-- <div>
      <img
          style="width:400px;padding-top:15px;"
          src="http://img.taojingling.cn/QQ20200512-0.jpg"
          onclick="window.open('http://shang.qq.com/wpa/qunwpa?idkey=ae59f469b427c038c95f118ceeefc6f9eba7a9d90ce9aae72bde58d09cc1013b', '_blank');"
        />
      </div> -->
    <div v-if="isShow">
      <div style="margin-top: 210px">
        <div style="height: 90px">
          <transition name="slide-fade">
            <div v-if="showTip">
              <i style="font-weight: bold;font-size: 12px;">若输入账密后，suspended 或 canceled ？</i>
              <div> <span style="font-size: 15px;color: red">重启软件</span>即可</div>
              <div>客服Q：<el-button type="text" style="cursor:pointer;color:#539BD8;font-size: 15px;color: red" @click="doCopyV">1450948930<i class="iconfont">&#xe643;</i></el-button></div>
            </div>
          </transition>
        </div>
        <el-button
          v-clipboard:copy="copyText"
          v-clipboard:success="handleSuccess"
          v-clipboard:error="handleError"
          round
          plain
          size="medium"
          :type="buttonType"
          class="button"
          @click="doCopy"
          :disabled="copyDisable"
          style="font-size: 25px; width: 300px; height: 70px"
          >{{ msg }}</el-button
        >

        <p
          style="
            margin: 5px auto;
            font-style: italic;
            color: gray;
            font-size: 15px;
          "
        >
          <span style="color: red; font-weight: bold; font-size: 20px"
            >今后</span
          >失效👆自行复制
        </p>
        <p
          style="
            margin: 0 auto;
            font-style: italic;
            color: gray;
            font-size: 12px;
          "
        >
          （自行收藏链接，账密每天维护）
        </p>
      </div>
      <!-- <span class="text">前往使用</span> -->
      <!-- <span class="help" v-if="showImg" @click="help">返回</span>
      <span class="help" v-else @click="help">激活失败？</span> -->
      <!-- QQ卡片 -->
      <!-- <div
        style="max-width:500px;border:1px solid #E5E5E4;margin:0 auto;"
      >
        <div style="padding:30px;">
          <div style="font-size:1.2rem;font-weight:bold;">
            <div>推荐群里获取稳定的账号，</div>
            <div>遇到任何问题请进群交流。</div>
          </div>
          <div style="position:relative;">
            <div>
              <img
                style="width:6%;position:relative;top:3px;cursor:pointer;"
                src="https://i.loli.net/2019/11/23/U3qbMEuC9n6YBRA.png"
                onclick="window.open('http://shang.qq.com/wpa/qunwpa?idkey=22ed6bd53a50f9764493ef41746bfb3006123cbe097729a106fee0c46b6e0b9e', '_blank');"
              />
              <a
                style="font-size:1.2rem;text-decoration:underline;color:red;"
                target="_blank"
              >909335010</a>（
              <span @click="doCopyV" style="cursor:pointer;color:#539BD8;">复制群号</span>）
            </div>
            <div style>
              <img
                style="width:6%;position:relative;top:3px;cursor:pointer;margin-left:-100px;"
                src="https://i.loli.net/2019/11/23/U3qbMEuC9n6YBRA.png"
                onclick="window.open('http://shang.qq.com/wpa/qunwpa?idkey=22ed6bd53a50f9764493ef41746bfb3006123cbe097729a106fee0c46b6e0b9e', '_blank');"
              />
              <a
                href="http://shang.qq.com/wpa/qunwpa?idkey=22ed6bd53a50f9764493ef41746bfb3006123cbe097729a106fee0c46b6e0b9e"
                style="font-size:1.2rem;text-decoration:underline;color:red;"
                target="_blank"
              >323784710</a>
            </div>
            <p>所有群里信息同步，多加拒绝入群</p>
          </div>
        <img
          style="width:150px;padding-top:15px;"
          src="http://img.taojingling.cn/WechatIMG60.jpeg"
          onclick="window.open('http://shang.qq.com/wpa/qunwpa?idkey=ae59f469b427c038c95f118ceeefc6f9eba7a9d90ce9aae72bde58d09cc1013b', '_blank');"
        />
        </div> -->
    </div>
    <!-- <div>
        售后问题，微信扫码：
        <span style="cursor:pointer;color:#539BD8;" @click="doCopyV">hotline1024<i class="iconfont">&#xe643;</i></span>
      </div>-->
    <!-- <div v-show="!showImg">
        务必扫码，微信售后：
        <div>
          <img style="width:60%;max-width:300px;" src="https://i.loli.net/2020/02/02/bGUBSPWalwXZ6po.jpg" />
        </div>
      </div>-->
    <!-- <div v-show="showImg">
        <img style="width:90%;" src="https://i.loli.net/2020/01/19/REqDgJmNSCKYT3x.png" />
      </div> -->
    <!-- </div>
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
    </span> -->
  </div>
</template>

<script>
import { getJet, syncGetJet } from '../../api/mail'
export default {
  components: {},
  data () {
    return {
      msg: '👉点我复制账密👈',
      k: '',
      isLoading: true,
      buttonType: 'primary',
      isShow: false,
      showImg: false,
      copyText: '1450948930👈客服q',
      tryAgain: '复制失败',
      res: {},
      isDisplay: false,
      showTip: false,
      copyDisable: false
    }
  },
  methods: {
    handleSuccess (e = null) {
      this.msg = '🚀 账密已复制到剪贴板'
      // this.openCenter('<span style="color:red;">账号已复制</span>')
      this.buttonType = 'danger'
      this.copyDisable = true
      setTimeout(() => {
        this.showTip = true
      }, 300)
      setTimeout(() => {
        this.msg = '👉点我复制账密👈'
        this.buttonType = 'primary'
        this.copyDisable = false
      }, 180000)
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
    openCenter: function (text = '已复制！') {
      this.$toast.top(text)
    },
    getQueryString (name) {
      let reg = `(^|&)${name}=([^&]*)(&|$)`
      let r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    doCopyV () {
      this.$copyText('1450948930').then()
      this.openCenter(`<div style="color:red;font-size:20px;">1450948930</div>Q号已复制`)
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
  position: relative;
  width: 250px;
  height: 50px;
  font-size: 18px;
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
.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
