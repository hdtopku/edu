<template>
  <div>
    <el-button round style="margin-top: 50vh;font-size: 30px;padding: 20px;width:95vw;font-weight: bold" type="danger"
               @click="doCopy">
      第一步：点我复制口令
    </el-button>
    <div>
      <transition name="ease-out-in">
        <el-button round size="medium" style="animation: breath infinite 2s ease;
margin-top: 5vh;font-size: 25px;padding: 20px;width:95vw;font-weight: bolder" type="primary"
                   @click="clickButton">第二步：打开饿了么app翻倍
        </el-button>
      </transition>
    </div>
    <div
      style="display: inline-block;margin-top: 5vh;font-size: 20px;border: 3px dashed #FB2A1C; border-radius: 10px;padding: 1vw;width:80vw">
      <div>❗❗❗提示：翻倍红包打开较慢</div>
      <div>若打不开，请重复第一、二步</div>
    </div>
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
  methods: {
    clickButton () {
      this.copy()
      setTimeout(() => {
        window.location.href = 'https://h5.ele.me/ant/qrcode3?open_type=miniapp&url_id=675&inviterId=e8da174e14&actId=1&_ltracker_f=hjb_app_grzx&chInfo=ch_app_chsub_Photo'
      }, 300)
    },
    doCopy () {
      this.copy()
      this.$toast.center(`口令已复制！`)
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
.ami {
  animation-name: pulse;
  animation-iteration-count: infinite;
  animation-duration: 0.8s;
  animation-timing-function: ease-in-out;
}
</style>
