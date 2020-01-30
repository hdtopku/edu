<template>
  <div style="height: 71vh;">
    <el-button
      v-clipboard:copy="copyText"
      v-clipboard:success="handleSuccess"
      v-clipboard:error="handleError"
      type="plain"
      class="jrebrains"
      size="small"
      @click="getJ(1)"
      round
    >生产1条激活链</el-button>
    <el-button
      v-clipboard:copy="copyText"
      v-clipboard:success="handleSuccess"
      v-clipboard:error="handleError"
      type="plain"
      class="jrebrains"
      size="small"
      @click="getJ(50)"
      round
    >生产50条激活链</el-button>
    <jet-code style="position:absolute;left:0;bottom:0;"></jet-code>
  </div>
</template>

<script>
import { syncGetJet } from '../../api/mail'
import JetCode from './JetCode'
export default {
  components: { JetCode },
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
    }
  },
  openCenter: function (Text = 'copied!') {
    this.$toast.top(Text)
  }
}
</script>

<style scoped>
</style>
