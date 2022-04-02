<template>
  <div style="position: relative">
    <div class="animate__animated animate__backInDown animate__rubberBand"
         style="width: 100%; height: 42vh">
      <img
        alt=""
        src="https://cdn.nlark.com/yuque/0/2021/jpeg/12454360/1635425274151-6634d749-c199-411a-9590-a6b9a7de1c05.jpeg"
        style="width: 100%;float: left"/>
      <div style="float: right;font-size: 1px;color: darkgray">
        以app领取为准
      </div>
    </div>
    <a style="margin-top: 3vh" href="https://mp.weixin.qq.com/s/WN5JSpFYLQhnSVGydBOEKA">🔗 使用教程（最高3倍，5元变15元）</a>
    <el-button
      class="animate__animated animate__pulse animate__infinite"
      round style="margin-top: 2vh;font-size: 30px;padding: 20px;width:95vw;font-weight: bold" type="danger"
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
      style="display: inline-block;margin-top: 2vh;font-size: 16px;border: 3px dashed #FB2A1C; border-radius: 10px;padding: 1vw;width:85vw">
      <div>✅ 领了翻倍红包①</div>
      <div>❌ 别领外卖红包①</div>
      <div>否则翻倍可能失效</div>
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
      // let num = Math.round(Math.random())
      // let text = '0f/u枝这个 666:/＄2aNmWAi＄~.👉饿了么App👈【快來領外賣紅包，最高20元，人人都有哦~】'
      // if (num === 0) {
      //   text = '0f/u枝这个 1:/＄2aNlY6P＄~.👉饿了么App👈【快來領外賣紅包，最高20元，人人都有哦~】'
      // }
      let text = '0f/u枝这个 666:/＄2h0QpGc＄~.👉饿了么App👈【快來領外賣紅包，最高20元，人人都有哦~】'
      this.$copyText(text).catch((err) => {
        console.log(err)
      })
      // this.$copyText('d:/＄XGEXEys＄').catch((err) => {
      //   console.log(err)
      // })
    },
    goPlay () {
      window.open('https://www.bilibili.com/blackboard/html5mobileplayer.html?aid=763689531', '_blank')
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
