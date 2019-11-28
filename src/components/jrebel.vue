<template>
  <div>
    <div class="jrebel" @click="doCopy">
      <i class="iconfont icon-rocket">Jrebel</i>
    </div>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
export default {
  methods: {
    doCopy: function () {
      this.$copyText(this.getJrebel()).then((e) => {
      // success
        this.openCenter()
      }, (e) => {
      // fail
      })
    },
    openCenter: function (Text = 'copied!') {
      this.$toast.top(Text)
    },
    getJrebel: function () {
      const uuid = uuidv1()
      const jrebel =
       '1、激活邮箱填入：active@jrebel.cn，\n2、激活码填入：http://jrebel.taojingling.cn/' + uuid +
       '\n\n:) 遇到问题，随时联系我'
      return jrebel
    }
  }
}
</script>

<style scoped>
.jrebels {
  display: flex;
  justify-content:space-between
}
.jrebel {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border: 1px solid black;
  margin: 50px auto;
  cursor: pointer;
}
.qr-code {
  width: 100%;
  height: 100%;
}
</style>
