<template>
  <div>
    <card></card>
    <div style="display:flex; float:right;">
      <el-link
        href="http://a.taojingling.cn"
        style="margin-right:20px; z-index:1;"
        type="primary"
        target="_blank"
      >取号</el-link>
      <el-link
        href="http://music.taojingling.cn/1.html"
        style="margin-right:20px; z-index:1;"
        type="primary"
        target="_blank"
      >教程</el-link>
      <el-link
        href="https://www.myunidays.com/CN/zh-CN"
        style="margin-right:20px; z-index:1;"
        type="primary"
        target="_blank"
      >UNIDAYS</el-link>
      <el-link
        href="https://mail.pku.edu.cn/"
        type="primary"
        style="z-index:1;"
        target="_blank"
      >打开邮箱</el-link>
    </div>
    <el-button type="primary" class="iconfont icon-rocket jrebel" @click="copyJrebel">Jrebel</el-button>
    <long-link></long-link>
    <el-divider></el-divider>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
import Card from './Card'
import LongLink from '../applemusic/LongLink'
import AppleMusic from '../applemusic/AppleMusic'
export default {
  components: { LongLink, Card, AppleMusic },
  data () {
    return {
    }
  },
  methods: {
    copyJrebel: function () {
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
        `1、激活邮箱填入：active@jrebel.cn
2、激活码填入：http://jrebel.taojingling.cn/${uuid}
3、务必参考宝贝详情第三步，完成激活：https://m.tb.cn/h.eDj0BTe?sm=119f40`
      setTimeout(() => {
        location.reload()
      }, 800)
      return jrebel
    }
  }
}
</script>

<style scoped>
.jrebel {
  margin-top: -30px;
  z-index: 10;
  left: 0;
  position: absolute;
}
</style>
