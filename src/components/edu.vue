<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Apple Music" name="first"><apple-music></apple-music></el-tab-pane>
    <el-tab-pane label="Jrebel" name="second"><jrebel></jrebel></el-tab-pane>
    <el-tab-pane label="备用" name="third"><itchat></itchat></el-tab-pane>
  </el-tabs>
</template>
<script>
import AppleMusic from './appleMusic.vue'
import Jrebel from './jrebel.vue'
import Itchat from './itchat.vue'

export default {
  components: {
    AppleMusic,
    Jrebel,
    Itchat
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
    }
  }
}
</script>
