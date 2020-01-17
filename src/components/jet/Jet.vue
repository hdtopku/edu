<template>
  <div v-if="!isLoading" class="container">
    <div v-if="isShow">
      <el-button type="primary" round size="large" plain class="button" @click="doCopy">{{msg}}</el-button>
      <el-link class="help" @click="help">遇到问题？</el-link>
      <div class="text">打开软件，直接粘贴</div>
    </div>
    <div class="err" v-else>
      <h1>Not Found</h1>The requested URL was not found. If you entered the URL manually please check your spelling and try again.
    </div>
  </div>
</template>

<script>
import { getJet } from '../../api/mail'
export default {
  components: {

  },
  data () {
    return {
      msg: '点击复制',
      k: '',
      isLoading: true,
      isShow: false
    }
  },
  methods: {
    doCopy () {
      this.getK(true)
    },
    help () {
      window.open('https://i.loli.net/2020/01/16/7pgfsOyPvw6nWru.png', '_blank')
    },
    getK (isCopy = false) {
      this.k = this.getQueryString('k') || ''
      getJet({ 'k': this.k }).then((res) => {
        this.isLoading = false
        if (res.data + '' === 'undefined') {
          this.isShow = false
          window.document.title = '404 Not Found'
        } else {
          this.isShow = true
          window.document.title = ''
          if (res.data && isCopy) {
            setTimeout(() => {
              this.msg = '点击复制'
              this.$copyText(res.data).then((e) => {
                this.msg = '完成'
                setTimeout(() => {
                  this.msg = '点击复制'
                }, 200)
              }, (e) => {
              // fail
              })
            }, 20)
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
      if (r != null) return unescape(r[2]); return null
    }
  },
  mounted () {
    this.getK()
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
