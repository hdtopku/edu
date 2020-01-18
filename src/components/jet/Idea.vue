<template>
<div>
  <el-button type="plain" class="jrebrains" size="small" @click="getJ(1)" round>
    生产1条激活链
    </el-button>
  <el-button type="plain" class="jrebrains" size="small" @click="getJ(50)" round>
    生产50条激活链
    </el-button>
</div>
</template>

<script>
import { getJet } from '../../api/mail'
export default {
  methods: {
    copyLinks: function () {
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    },
    getJ (count = 1) {
      getJet({'g': count}).then(res => {
        if (res.errno === '0' && res.data.length > 0) {
          const links = res.data.join('\r\n')
          setTimeout(() => {
            this.$copyText(links).then((e) => {
            // success
              this.openCenter(`<div style="color:red;font-size:20px;">${count}条激活链</div>coppied!`)
            }, (e) => {
            // fail
              this.openCenter(e + '')
            })
          }, 20)
        }
      })
    }
  },
  openCenter: function (Text = 'copied!') {
    this.$toast.top(Text)
  }
}
</script>

<style scoped>
</style>
