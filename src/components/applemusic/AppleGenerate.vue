<template>
  <div style="text-align: center">
    <div v-if="used_mails != null && used_mails.hist_mails != null" style="position: absolute; width: 100%">
    <div class="badge-mails">
      <el-badge v-if="school !== 'zknu'" :type="school === 'zknu' ? 'danger' : 'info'" :value="used_mails.zknu.length"
                class="item">
        <el-button :size="school === 'zknu' ? 'medium' : 'mini'" :type="school === 'zknu' ? 'danger' : ''"
                   @click="doCopy(used_mails.zknu[0])">
          {{ school === 'zknu' ? '周口师范学院' : '周' }}
        </el-button>
      </el-badge>
      <el-badge v-if="school !== 'hnucm'" :type="school === 'hnucm' ? 'danger' : 'info'"
                :value="used_mails.hnucm.length" class="item">
        <el-button :size="school === 'hnucm' ? 'medium' : 'mini'" :type="school === 'hnucm' ? 'danger' : ''"
                   @click="doCopy(used_mails.hnucm[0])">
          {{ school === 'hnucm' ? '湖南中医药大学' : '湖' }}
        </el-button>
      </el-badge>
      <el-badge v-if="school !== 'sisu'" :type="school === 'sisu' ? 'danger' : 'info'" :value="used_mails.sisu.length"
                class="item">
        <el-button :size="school === 'sisu' ? 'medium' : 'mini'" :type="school === 'sisu' ? 'danger' : ''"
                   @click="doCopy(used_mails.sisu[0])">
          {{ school === 'sisu' ? '四川外国语大学' : '川' }}
        </el-button>
      </el-badge>
    </div>
    <div class="school-container">
      <el-divider>
        <div v-if="used_mails != null && used_mails.hist_mails != null && used_mails.hist_mails.length > 1">
          <el-popconfirm :loading="clearLoading" cancel-button-text='取消' confirm-button-text='清零' title="是否清零？"
                         @confirm="clearMail">
            <span slot="reference" class="mail-count">{{ used_mails.hist_mails.length - 1}}</span>
          </el-popconfirm>
        </div>
      </el-divider>
    </div>
    <el-badge v-if="school !== ''" class="selected" :value="used_mails[school].length">
      <el-button type="danger" @click="doCopy(used_mails[school][0])">{{schoolName}}</el-button>
    </el-badge>
    </div>
    <div>
      <el-button :loading="isLoading" class="mail-change" type="primary" @click="throttleChangeMail">
        {{ changeText = (used_mails == null || used_mails.hist_mails == null || used_mails.hist_mails.length === 0) ? '开始' : '更换' }}
      </el-button>
    </div>
    <!--        <el-link class="mail-link" type="success" href="https://applemusic-spotlight.myunidays.com/CN/zh-CN?urlset=null" target="_blank">再来一条</el-link>-->
  </div>
</template>

<script>
import {changeRandomMail, clearRandomMail} from '../../api/mail'
import _ from 'lodash'

export default {
  data () {
    return {
      mails: [],
      school: '',
      schoolName: '',
      changeText: '更换',
      leftSeconds: 0,
      isLoading: false,
      clearLoading: false,
      used_mails: {}
    }
  },
  mounted () {
    this.initMail()
  },
  methods: {
    initMail () {
      changeRandomMail().then(res => {
        this.used_mails = JSON.parse(res)
        this.changeSchool()
      })
    },
    changeMail () {
      if (this.used_mails != null && this.used_mails.hist_mails != null && this.used_mails.hist_mails.length > 0) {
        this.doCopy(this.used_mails.hist_mails[0])
        this.changeSchool()
      }
      this.isLoading = true
      changeRandomMail({change: 1}).then(res => {
        this.used_mails = JSON.parse(res)
        this.isLoading = false
      })
    },
    changeSchool () {
      let histMails = this.used_mails.hist_mails
      if (histMails != null && histMails.length > 0) {
        if (histMails[0].indexOf('sisu') > 0) {
          this.school = 'sisu'
          this.schoolName = '四川外国语大学'
        } else if (histMails[0].indexOf('zknu') > 0) {
          this.school = 'zknu'
          this.schoolName = '周口师范学院'
        } else if (histMails[0].indexOf('hnucm') > 0) {
          this.school = 'hnucm'
          this.schoolName = '湖南中医药大学'
        }
      }
    },
    throttleChangeMail: _.throttle(function () {
      this.changeMail()
    }, 3000, {'leading': true, 'trailing': false}),
    clearMail () {
      this.clearLoading = true
      this.used_mails = {}
      this.openCenter('已清空！')
      this.clearLoading = false
      clearRandomMail({clear: 1})
      changeRandomMail()
      this.changeSchool()
    },
    copyMail () {
      this.doCopy(this.used_mails.hist_mails[0])
    },
    doCopy (text) {
      if (text != null && text.trim().length > 0) {
        this.$copyText(text).then((e) => {
          // success
          this.openCenter(`<p style="font-size: 35px;color: red; margin: 10px">邮箱已更换</p>`)
        }, (e) => {
          // fail
        })
      }
    },
    openCenter: function (Text = '已复制！') {
      this.$toast.center(Text)
    }
    // countDown () {
    //   this.leftSeconds = Math.floor(Math.random() * 10) + 10
    //   this.isLoading = true
    //   this.changeText = this.leftSeconds + '秒后，更换'
    //   let timer = setInterval(() => {
    //     this.leftSeconds--
    //     this.changeText = this.leftSeconds + '秒后，更换'
    //     if (this.leftSeconds <= 0) {
    //       this.isLoading = false
    //       this.changeText = '更换'
    //       clearInterval(timer)
    //     }
    //   }, 1000)
    // },
  }
}
</script>

<style scoped>
.mail-count {
  font-weight: bolder;
  font-size: 100px;
  cursor: pointer;
  margin: 20px auto;
}

.school-container {
  height: 80px;
  position: absolute;
  width: 100%;
  margin-top: 40px;
}

.badge-mails {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 96%;
}

.mail-change {
  font-size: 50px;
  width: 100%;
  margin-top: 280px;
}

.item {
  margin: 10px;
}

.selected {
  width: 90%;
  margin-top: 120px;
}
.selected button {
  width: 100%;
  font-size: 36px;
}

.mail-link {
  float: left;
  margin-left: 20px;
  margin-top: 100px;
}
</style>
