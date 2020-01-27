<template>
  <div v-if="!isLoading" class="container">
    <div v-if="isShow">
      <el-button round size="large" plain class="button" @click="doCopy">{{msg}}</el-button>
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
    <span v-if="res.count > 0" onselectstart="return false;"
      style="position:absolute;top:0;left:0;width:100%;height:30px;color:#DEDEDE;"
      v-long-press="5000"
      @long-press-start="onLongPressStart"
      @long-press-stop="onLongPressStop"
    >.
      <span v-if="isDisplay">{{res.update_time.substring(5)}},{{res.count}}</span>
    </span>
  </div>
</template>

<script>
import { getJet } from '../../api/mail'
export default {
  components: {},
  data () {
    return {
      msg: '请点击',
      k: '',
      isLoading: true,
      isShow: false,
      showImg: false,
      copyText: '',
      toastText: '',
      res: {},
      isDisplay: false,
      clipText: ''
    }
  },
  watch: {
    copyText () {
      setTimeout(() => {
        this.$copyText(this.copyText).then((e) => {
          // success
          this.msg = '以復制'
          setTimeout(() => {
            this.msg = '请点击'
          }, 280)
          if (this.toastText) {
            this.openCenter(this.toastText)
            this.toastText = ''
          }
        }, (e) => {
          // fail
          this.openCenter('复制失败!')
        })
      }, 20)
    }
  },
  methods: {
    onLongPressStart () {
      // triggers after 300ms of mousedown
      this.isDisplay = true
    },
    onLongPressStop () {
      // triggers on mouseup of document
    },
    display () {
      this.isDisplay = !this.isDisplay
    },
    doCopy () {
      this.getK({ k: this.k }, true)
    },
    help () {
      this.showImg = !this.showImg
    },
    getK (params = {}, isCopy = false) {
      getJet(params).then(res => {
        this.isLoading = false
        this.res = res
        if (res.errno !== '0') {
          this.isShow = false
          window.document.title = '404 Not Found'
        } else {
          this.isShow = true
          window.document.title = '.'
          if (res.data && isCopy) {
            this.copyText = res.data
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
    doCopyV () {
      this.$copyText('hotline1024').then((e) => {
        // success
        this.openCenter(`<div style="color:red;font-size:20px;">hotline1024</div>`)
      }, (e) => {
        // fail
        this.openCenter('复制失败')
      })
    }
  },
  mounted () {
    this.k = this.getQueryString('k') || ''
    this.getK({ q: this.k })
  }
}
</script>
<style scoped>
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
