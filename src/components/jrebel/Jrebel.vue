<template>
  <div>
    <ul class="cards">
      <li class="item" v-for="(item, idx) in mails" :key="idx">
        <card
          :mail="item"
          :idx="idx"
          :isEdit="isEdits[idx]"
          @changeEdit="changeEdit"
          @changeMail="changeMail"
          @initMail="initMail"
          :isLoading="isLoading"
        ></card>
      </li>
    </ul>
    <div style="display:flex; float:right;">
      <el-link
        href="http://music.taojingling.cn/1.html"
        style="margin-right:20px; z-index:1;"
        type="primary"
        target="_blank"
      >教程</el-link>
      <el-link
        href="https://www.myunidays.com/CN/zh-CN"
        style="margin-right:20px; z-index:1;"
        type="primary"
        target="_blank"
      >UNIDAYS</el-link>
      <el-link
        href="https://mail.pku.edu.cn/"
        type="primary"
        style="z-index:1;"
        target="_blank"
      >打开邮箱</el-link>
    </div>
    <el-button type="primary" class="iconfont icon-rocket jrebel" @click="copyJrebel">Jrebel</el-button>
    <long-link></long-link>
    <el-divider></el-divider>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
import Card from './Card'
import { getMails } from '../../api/mail'
import Swal from 'sweetalert2'
import LongLink from '../applemusic/LongLink'
import AppleMusic from '../applemusic/AppleMusic'
export default {
  components: { LongLink, Card, AppleMusic },
  data () {
    return {
      isLoading: false,
      isEdits: [false, false, false],
      mails: ['fsadfafsassq1234', 'b', '']
    }
  },
  mounted () {
    this.initMail()
  },
  methods: {
    initMail () {
      console.log('ok')
      getMails().then((res) => {
        if (res.data) {
          this.setMails(res.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    onClick: function (oldMail, index) {
      const title = `<div style="color:red">${oldMail}</div>`
      Swal.fire({
        title,
        text: '确认替换？',
        showCancelButton: true,
        confirmButtonColor: 'pink',
        cancelButtonColor: '#00CCFF',
        confirmButtonText: '取消',
        cancelButtonText: '确定'
      }).then((result) => {
        if (!result.value) {
          getMails({ 'old': oldMail, 'new': 'RANDOM' }).then((res) => {
            this.mails = res.data
          })
        }
      })
    },
    changeEdit (idx, isEdit) {
      this.isEdits = [false, false, false]
      this.isEdits[idx] = isEdit
    },
    setMails: function (mails) {
      this.mails = mails
      while (this.mails.length < 3) {
        this.mails.push('')
      }
    },
    changeMail: function (oldMail, newMail) {
      this.isLoading = true
      const that = this
      getMails({ 'old': oldMail, 'new': newMail }).then((res) => {
        this.setMails(res.data)
        that.isLoading = false
      })
    },
    copyJrebel: function () {
      this.$copyText(this.getJrebel()).then((e) => {
        // success
        this.openCenter()
      }, (e) => {
        // fail
      })
    },
    openCenter: function (Text = 'copied!') {
      this.$toast.top(Text)
    },
    getJrebel: function () {
      const uuid = uuidv1()
      console.log(uuid)
      const jrebel =
        `1、激活邮箱填入：active@jrebel.cn
2、激活码填入：http://jrebel.taojingling.cn/${uuid}
3、务必参考宝贝详情第三步，完成激活：https://m.tb.cn/h.eDj0BTe?sm=119f40`
      return jrebel
    }
  }
}
</script>

<style scoped>
.cards {
  padding: 0;
  margin: 0;
  list-style: none;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
.item {
  width: 100px;
  height: 150px;
  color: white;
  text-align: center;
}
.jrebel {
  margin-top: -30px;
  z-index: 10;
  left: 0;
  position: absolute;
}
</style>
