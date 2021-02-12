<template>
  <el-card>
    <el-button @click="changeSisuMail">
      更换
    </el-button>
    <el-button v-for="(item,idx) in sisuMails" :key="idx" class="sisu-button" @click="openCenter(item)">
      {{ item.substring(4, 12) }}
    </el-button>
  </el-card>
</template>

<script>
import {changeSisuMail} from '../../api/mail'
export default {
  data () {
    return {
      sisuMails: []
    }
  },
  created () {
    this.getSisuMail()
  },
  methods: {
    getSisuMail () {
      changeSisuMail({}).then(res => {
        this.sisuMails = res.split(',')
      })
    },
    changeSisuMail () {
      changeSisuMail({change: 1}).then(res => {
        this.sisuMails = res.split(',')
      })
    },
    openCenter: function (item) {
      this.$copyText(item).then((e) => {
        this.$toast.top(item + '已复制！')
      })
    }
  }
}
</script>

<style>
.sisu-button{
  text-align: center;
  margin: 5px;
}
</style>
