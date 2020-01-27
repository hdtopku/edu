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
  data () {
    return {
      clipText: '',
      count: 0
    }
  },
  watch: {
    clipText () {
      setTimeout(() => {
        this.$copyText(this.clipText).then((e) => {
          // success
          this.openCenter(`<div style="color:red;font-size:20px;">${this.count}条激活链</div>coppied!`)
        }, (e) => {
          // fail
          this.openCenter('复制失败!')
        })
      }, 20)
    }
  },
  methods: {
    copyLinks: function () {
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    },
    getJ (count = 1) {
      getJet({'g': count}).then(res => {
        if (res.errno === '0' && res.data.length > 0) {
          this.clipText = res.data.join('\r\n')
          this.count = count
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
