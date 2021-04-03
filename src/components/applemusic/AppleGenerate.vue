<template>
  <div style="text-align: center">
    <div style="height: 80px">
      <div v-if="mails.length > 0">
        <el-popconfirm cancel-button-text='取消' confirm-button-text='清零' title="是否清零？"
                       @confirm="clearMail">
          <span slot="reference" class="mail-count">{{ mails.length }}</span>
        </el-popconfirm>
      </div>
    </div>
    <el-button class="mail-tag" @click="copyMail" type="danger" plain v-if="mails.length > 0">
      <div class="mail-school">{{school}}</div>
      {{ mails[0] }}</el-button>
    <div>
      <el-button class="mail-change" type="primary" @click="throttleChangeMail" :disabled="changeDisabled">{{changeText}}</el-button>
    </div>
    <el-link class="mail-link" type="success" href="https://applemusic-spotlight.myunidays.com/CN/zh-CN?urlset=null" target="_blank">再来一条</el-link>
  </div>
</template>

<script>
import {changeRangeMail} from '../../api/mail'
import _ from 'lodash'
export default {
  data () {
    return {
      mails: [],
      school: '',
      changeText: '更换',
      leftSeconds: 0,
      changeDisabled: false
    }
  },
  mounted () {
    let res = changeRangeMail()
    this.mails = JSON.parse(res)
  },
  watch: {
    mails: {
      deep: true,
      immediate: true,
      handler (newVal) {
        if (newVal != null && newVal.length > 0) {
          if (newVal[0].indexOf('sisu') > 0) {
            this.school = '四川外国语大学'
          } else if (newVal[0].indexOf('zknu') > 0) {
            this.school = '周口师范学院'
          } else if (newVal[0].indexOf('hnucm') > 0) {
            this.school = '湖南中医药大学'
          }
        }
      }
    }
  },
  methods: {
    changeMail () {
      this.changeDisabled = true
      let res = changeRangeMail({change: 1})
      this.mails = JSON.parse(res)
      if (this.mails != null && this.mails.length > 0) {
        this.doCopy()
      }
      this.changeDisabled = false
      // this.countDown()
    },
    throttleChangeMail: _.throttle(function () {
      this.changeMail()
    }, 3000),
    // countDown () {
    //   this.leftSeconds = Math.floor(Math.random() * 10) + 10
    //   this.changeDisabled = true
    //   this.changeText = this.leftSeconds + '秒后，更换'
    //   let timer = setInterval(() => {
    //     this.leftSeconds--
    //     this.changeText = this.leftSeconds + '秒后，更换'
    //     if (this.leftSeconds <= 0) {
    //       this.changeDisabled = false
    //       this.changeText = '更换'
    //       clearInterval(timer)
    //     }
    //   }, 1000)
    // },
    clearMail () {
      this.mails = []
      changeRangeMail({change: 1, clear: 1})
      this.openCenter('已清空！')
    },
    copyMail () {
      this.doCopy()
    },
    doCopy () {
      this.$copyText(this.mails[0]).then((e) => {
        // success
        this.openCenter(this.mails[0] + '已复制！')
      }, (e) => {
        // fail
      })
    },
    openCenter: function (Text = '已复制！') {
      this.$toast.top(Text)
    }
  }
}
</script>

<style scoped>
.mail-count {
  font-weight: bolder;
  font-size: 60px;
  cursor: pointer;
  margin: 16px auto;
  padding: 0 16px;
}
.mail-school {
  font-size: 30px;
  margin: 6px;
  font-weight: bolder;
}
.mail-tag {
  font-size: 16px;
  font-weight: bold;
  word-break: break-all;
//height: 50px;
  position: absolute;
  top: 80px;
  display: block;
  width: 100%;
}
.mail-change {
  font-size: 50px;
  width: 100%;
  margin-top: 120px;
}
.mail-link{
  margin-top: 30px;
  font-size: 30px;
}
</style>
