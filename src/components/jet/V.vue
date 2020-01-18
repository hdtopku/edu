<template>
  <div>
    <div>
      <div class="service" >
        售后V：<span style="cursor:pointer;color:#539BD8;" @click="doCopyV">hotline1024<i class="iconfont">&#xe643;</i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      msg: 'CPY',
      k: '',
      isLoading: true,
      isShow: false,
      showImg: false
    }
  },
  methods: {
    doCopyV () {
      this.$copyText('hotline1024').then()
      this.openCenter(`<div style="color:red;font-size:20px;">hotline1024</div>`)
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    }
  }
}
</script>
<style scoped>
.service {
  margin-top: 200px;
  font-family: PingFangSC-Light, sans-serif;
}

</style>
