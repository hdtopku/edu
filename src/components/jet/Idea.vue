<template>
  <div>
    <jet-code style="position:absolute;left:0;"></jet-code>
    <el-button
      v-clipboard:copy="copyText"
      v-clipboard:success="handleSuccess"
      v-clipboard:error="handleError"
      type="plain"
      size="small"
      @click="getJ(1)"
      round
    >生产1条激活链</el-button>
    <el-button
      v-clipboard:copy="copyText"
      v-clipboard:success="handleSuccess"
      v-clipboard:error="handleError"
      type="plain"
      size="small"
      @click="getJ(50)"
      round
    >生产50条激活链</el-button>
    <el-button
    style="position:absolute;right:0;"
      v-clipboard:copy="copyText"
      v-clipboard:success="handleSuccess"
      v-clipboard:error="handleError"
      type="plain"
      size="small"
      @click="register"
      round
    >注册</el-button>
    <jet-account style="margin-top:30px;"></jet-account>
  </div>
</template>

<script>
import { syncGetJet } from '../../api/mail'
import JetCode from './JetCode'
import JetAccount from './JetAccount'
export default {
  components: { JetCode, JetAccount },
  data () {
    return {
      copyText: '',
      count: 0
    }
  },
  methods: {
    handleSuccess (e = null) {
      this.msg = '以復制'
      setTimeout(() => {
        this.msg = '请点击'
      }, 280)
    },
    handleError (e) {
      this.openCenter(this.tryAgain)
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    },
    getJ (count = 1) {
      const res = syncGetJet({ 'g': count })
      if (res.errno === '0' && res.data.length > 0) {
        this.copyText = res.data.join('\r\n')
        this.count = count
      }
      this.$copyText(this.copyText, this.$refs.container).then((e) => {
        // success
        this.openCenter(`<div style="color:red;font-size:20px;">${this.count}条激活链</div>coppied!`)
      }, (e) => {
        // fail
        this.openCenter('复制失败')
      }
      )
    },
    register () {
      window.open('https://account.jetbrains.com/logout', '_blank')
      setTimeout(() => {
        window.open('https://www.jetbrains.com/shop/eform/students', '_blank')
      }, 1000)
    }
  },
  openCenter: function (Text = 'copied!') {
    this.$toast.top(Text)
  }
}
</script>

<style scoped>
</style>
