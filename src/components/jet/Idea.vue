<template>
  <div>
    <div style="width:100%;height:25px;">
      <jet-code style="position:absolute;left:0px;"></jet-code>
      <el-button
        v-clipboard:copy="copyText"
        v-clipboard:success="handleSuccess"
        v-clipboard:error="handleError"
        type="plain"
        size="small"
        @click="getJ(1)"
        round
        style="position:absolute;left:30px;"
      >生产1条🔗</el-button>
      <el-button
        v-clipboard:copy="copyText"
        v-clipboard:success="handleSuccess"
        v-clipboard:error="handleError"
        type="plain"
        size="small"
        @click="getJ(50)"
        round
        style="position:absolute;left:120px;"
      >生产50条🔗</el-button>
      <el-button
        style="position:absolute;right:0;"
        v-clipboard:copy="copyText"
        v-clipboard:success="handleSuccess"
        v-clipboard:error="handleError"
        type="plain"
        size="small"
        @click="register"
        round
      >批量注册</el-button>
    </div>
    <jet-account style="margin-top:30px;"></jet-account>
  </div>
</template>

<script>
import { syncGetJet, batchJetReg } from '../../api/mail'
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
      this.msg = '已复制'
      setTimeout(() => {
        this.msg = '请点击'
      }, 500)
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
      // var features = 'height=50,width=80,top=10,left=10,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no'
      // var win = window.open('https://account.jetbrains.com/logout', 'newW', features)
      // this.$copyText('Crack168', this.$refs.container).then((e) => {
      //   // success
      //   this.openCenter('Crack168')
      // }, (e) => {
      //   // fail
      //   this.openCenter('复制失败')
      // }
      // )
      // window.open('https://account.jetbrains.com/logout', '_blank')
      // setTimeout(() => {
      //   window.open('https://www.jetbrains.com/shop/eform/students', '_blank')
      // }, 1000)
      batchJetReg()
      this.openCenter(`<div style="color:red;font-size:20px;">预计45s内</div>完成`)
    }
  },
  openCenter: function (Text = 'copied!') {
    this.$toast.top(Text)
  }
}
</script>

<style scoped>
</style>
