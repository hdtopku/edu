<template>
<div>
<el-button round style="margin-top: 450px;font-size: 30px;padding: 25px" type="primary" @click="clickButton" size="medium">打开饿了么app翻倍</el-button>
</div>
</template>

<script>
export default {
  name: 'Eleme',
  data () {
    return {}
  },
  mounted () {
    this.$copyText('d:/＄XGEXEys＄').catch((err) => {
      console.log(err)
    })
  },
  methods: {
    clickButton () {
      this.$copyText('d:/＄XGEXEys＄').catch((err) => {
        console.log(err)
      })
      this.$nextTick(() => {
        window.location.href = 'https://h5.ele.me/ant/qrcode3?open_type=miniapp&url_id=675&inviterId=e8da174e14&actId=1&_ltracker_f=hjb_app_grzx&chInfo=ch_app_chsub_Photo'
      })
    }
  }
}
</script>

<style scoped>

</style>
