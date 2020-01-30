<template id="t">
  <jet-code></jet-code>
</template>

<script>
import JetCode from './jet/JetCode'
export default {
  components: {
    JetCode
  },
  data () {
    return {
      msg: '复制'
    }
  },
  methods: {
    doCopy () {
      this.openCenter('已复制')
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    }
  }
}
</script>
<style scoped>
.container {
  position:fixed;
  width: 100%;
  height: 100%;
  background: url("https://i.loli.net/2020/01/16/7pgfsOyPvw6nWru.png") no-repeat;
  background-size: cover;
  background-position: right center ;
}

.text {
  color: black;
  font-size: 35px;
  font-family: PingFangSC-Light, sans-serif;
  margin-bottom: 20px;
  padding-top: 200px;
}

.button {
  margin: 100px auto;
}
</style>
