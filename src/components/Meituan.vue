<template>
  <div style="position: relative; width: 7.5rem; height: 600px;">
    <div style="position: absolute;width: 100%">
<!--      <img alt="" class="animate__animated animate__backInDown animate__rubberBand"-->
<!--           src="https://cdn.nlark.com/yuque/0/2021/png/12454360/1637673228459-dd09c91e-69c0-4273-b85e-b95b868a7b12.png"-->
<!--           style="width: 100%"/>-->
    </div>
    <el-button
      class="animate__animated animate__pulse animate__infinite btn3"
      round style="font-size: 20px;font-weight: bold" type="danger"
      @click="doCopy">
      新人领取
    </el-button>
    <el-row>
      <el-col span="6">
        <el-button
          class="animate__animated animate__pulse animate__infinite btn"
          round style="font-size: 20px;font-weight: bold" type="danger"
          @click="doCopy">
          立即领取
        </el-button>
      </el-col>
      <el-col span="6">
        <el-button
          class="animate__animated animate__pulse animate__infinite btn2"
          round style="font-size: 20px;font-weight: bold" type="danger"
          @click="doCopy">
          立即领取
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Meituan',
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
      this.$copyText('666:/＄XEkkUFB＄~.👉').catch((err) => {
        console.log(err)
      })
      setTimeout(() => {
        this.reload()
      }, 3000)
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

.btn {
  background-color: #F6D173;
  position: absolute;
  left: 10vw;
  top: 64vh;
}

.btn2 {
  background-color: #F6D173;
  position: absolute;
  right: 9vw;
  top: 64vh;
}

.btn3 {
  background-color: #F6D173;
  position: absolute;
  right: 9vw;
  top: 39vh;
}
</style>
