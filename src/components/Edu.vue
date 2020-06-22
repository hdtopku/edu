<template>
  <div style="min-height:68vh;">
    <card></card>
    <el-button
      type="plain"
      class="iconfont icon-rocket jrebel"
      size="mini"
      @click="copyJrebel"
      round
    ></el-button>
    <el-link href="https://mail.pku.edu.cn/" type="primary" style="z-index:1;position:absolute;right:20px;" target="_blank">打开邮箱</el-link>
    <!-- <jet-brains class="jetbrain"></jet-brains> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Music" name="first">
        <jrebel></jrebel>
      </el-tab-pane>
      <el-tab-pane label="IDEA" name="second">
        <idea></idea>
      </el-tab-pane>
      <!-- <el-tab-pane label="Itchat" name="third"><itchat></itchat></el-tab-pane> -->
    </el-tabs>
    </div>
</template>
<script>
import uuidv1 from 'uuid/v1'

import AppleMusic from './applemusic/AppleMusic.vue'
import Jrebel from './jrebel/Jrebel.vue'
import Itchat from './itchat/Itchat.vue'
import Card from './jrebel/Card'
import Idea from './jet/Idea'

export default {
  components: {
    AppleMusic,
    Jrebel,
    Itchat,
    Card,
    Idea
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    copyJrebel: function () {
      this.$copyText(this.getJrebel()).then((e) => {
        // success
        this.openCenter(`<div style="color:red;">Jrebel</div>copied!`)
      }, (e) => {
        // fail
      })
    },
    getJrebel: function () {
      const uuid = uuidv1()
      const jrebel =
        `1、激活码填入：http://jrebel.taojingling.cn/${uuid}
2、激活邮箱填入：active@jrebel.cn
3、教程：https://item.taobao.com/item.htm?id=618776356415

【务必参考教程第三步】在jrebel设置里，点击Work offline，显示为Work online即可`
      setTimeout(() => {
        location.reload()
      }, 800)
      return jrebel
    },
    openCenter: function (Text = 'copied!') {
      this.$toast.top(Text)
    },
    handleClick (tab, event) {
    }
  }
}
</script>

<style scoped>
.jrebel {
  margin-top: -25px;
  z-index: 10;
  left: 10px;
  position: absolute;
}
.jetbrain {
  margin-top: -30px;
  z-index: 10;
  left: 50px;
  position: absolute;
}
</style>
