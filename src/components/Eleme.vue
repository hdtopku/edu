<template>
  <div>
    <el-button round style="margin-top: 350px;font-size: 30px;padding: 20px" type="danger" @click="copy">第一步：点我复制口令</el-button>
    <div></div>
    <el-button round size="medium" style="margin-top: 50px;font-size: 25px;padding: 20px" type="primary"
               @click="clickButton">第二步：打开饿了么app翻倍
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Eleme',
  data () {
    return {}
  },
  created () {
    this.copy()
  },
  updated () {
    this.copy()
  },
  beforeMount () {
    this.copy()
  },
  beforeUpdate () {
    this.copy()
  },
  methods: {
    clickButton () {
      this.copy()
      this.$nextTick(() => {
        window.location.href = 'https://h5.ele.me/ant/qrcode3?open_type=miniapp&url_id=675&inviterId=e8da174e14&actId=1&_ltracker_f=hjb_app_grzx&chInfo=ch_app_chsub_Photo'
      })
    },
    copy () {
      this.$copyText('d:/＄XGEXEys＄').catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
