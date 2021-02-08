<template>
  <div>
    <div style="width: 100%; height: 25px">
      <jet-code style="position: absolute; left: 2px; top: 7px"></jet-code>
      <el-button
        v-clipboard:copy="copyText"
        v-clipboard:success="handleSuccess"
        v-clipboard:error="handleError"
        type="plain"
        size="small"
        @click="getJ(1)"
        round
        style="position: absolute; left: 30px"
        >生产1条🔗</el-button
      >
      <el-button
        v-clipboard:copy="copyText"
        v-clipboard:success="handleSuccess"
        v-clipboard:error="handleError"
        type="plain"
        size="small"
        @click="getJ(50)"
        round
        style="position: absolute; left: 120px"
        >生产50条🔗</el-button
      >
      <div style="position: absolute; left: 240px; top: 5px">
        <el-switch
          v-model="switchOn"
          active-value="1"
          inactive-value="0"
          @change="getOrChangeSwitch"
        ></el-switch>
      </div>
    </div>
    <jet-account style="margin-top: 30px"></jet-account>
  </div>
</template>

<script>
import { syncGetJet, getJet } from '../../api/mail'
import JetCode from './JetCode'
import JetAccount from './JetAccount'
export default {
  components: { JetCode, JetAccount },
  data () {
    return {
      copyText: '',
      count: 0,
      switchOn: '1'
    }
  },
  created () {
    this.getOrChangeSwitch('')
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
    openCenter: function (text = '已复制！') {
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
    getOrChangeSwitch (switchOn) {
      getJet({ switch: switchOn }).then(res => {
        this.switchOn = res.data
        if (switchOn !== '') {
          if (res.data === '0') {
            this.openCenter(`激活码复制<div style='color:red'>已关闭</div>`)
          } else if (res.data === '1') {
            this.openCenter(`激活码复制<div style='color:red'>已开启</div>`)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
