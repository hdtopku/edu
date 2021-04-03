<template>
  <div style="min-height:68vh;">
    <el-tabs v-model="operatePane" @tab-click="handleClick">
      <el-tab-pane label="操作台" name="操作台">
        <sisu-card style="margin-bottom: 30px"></sisu-card>
        <el-button
          class="iconfont icon-rocket jrebel"
          round
          size="mini"
          type="plain"
          @click="copyJrebel"
        ></el-button>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Music" name="first">
            <jrebel></jrebel>
          </el-tab-pane>
          <el-tab-pane label="IDEA" name="second">
            <idea></idea>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="生产链接" name="生产链接">
        <AppleGenerate ref="appleGenerate"/>
      </el-tab-pane>
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
import SisuCard from './jrebel/SisuCard'
import AppleGenerate from './applemusic/AppleGenerate'
import {setStore, getStore} from '../api/storage'

export default {
  components: {
    AppleMusic,
    Jrebel,
    Itchat,
    Card,
    Idea,
    SisuCard,
    AppleGenerate
  },
  data () {
    return {
      activeName: 'first',
      operatePane: '操作台'
    }
  },
  mounted () {
    this.operatePane = getStore('operatePane') || '操作台'
  },
  watch: {
    operatePane: {
      handler (newVal) {
        setStore('operatePane', newVal)
        if (newVal === '生产链接') {
          this.$refs.appleGenerate.initMail()
        }
      }
    }
  },
  methods: {
    copyJrebel: function () {
      this.$copyText(this.getJrebel()).then((e) => {
        // success
        this.openCenter(`<div style="color:red;">Jrebel</div>已复制！`)
      }, (e) => {
        // fail
      })
    },
    getJrebel: function () {
      const uuid = uuidv1()
      const jrebel =
        `1、激活码填入：http://jrebel.taojingling.cn/${uuid}
2、激活邮箱填入：active@jrebel.cn
3、教程：https://cloud.video.taobao.com/play/u/2144650844/p/2/e/6/t/1/293114225328.mp4
小店还提供jet账号激活，质保一年，需要可联系客服
`
      // 3、教程：https://item.taobao.com/item.htm?id=618776356415

      // 【务必参考教程第三步】在jrebel设置里，点击Work offline，显示为Work online即可
      setTimeout(() => {
        location.reload()
      }, 800)
      return jrebel
    },
    openCenter: function (Text = '已复制！') {
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
