<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Apple Music" name="first"><apple-music></apple-music></el-tab-pane>
    <el-tab-pane label="Jrebel" name="second"><jrebel></jrebel></el-tab-pane>
    <!-- <el-tab-pane label="Itchat" name="third"><itchat></itchat></el-tab-pane> -->
  </el-tabs>
</template>
<script>
import AppleMusic from './applemusic/AppleMusic.vue'
import Jrebel from './jrebel/Jrebel.vue'
import Itchat from './itchat/Itchat.vue'

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
