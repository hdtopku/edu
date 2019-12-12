<template>
  <div>
    <ul class="cards">
      <li class="item" v-for="(item, idx) in mails" :key="idx">
        <card
          :mail="item"
          :idx="idx+10000"
          :isEdit="isEdits[idx]"
          @changeEdit="changeEdit"
          @changeMail="changeMail"
          :isLoading="isLoading"
        ></card>
      </li>
    </ul>
    <long-link></long-link>
    <el-divider></el-divider>
    <div class="jrebel" @click="copyJrebel">
      <i class="iconfont icon-rocket">Jrebel</i>
    </div>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
import Card from './Card'
import { getMails } from '../../api/mail'
import Swal from 'sweetalert2'
import LongLink from '../applemusic/LongLink'
export default {
  components: { LongLink, Card },
  data () {
    return {
      isLoading: false,
      isEdits: [false, false, false],
      mails: ['fsadfafsassq1234', 'b', '']
    }
  },
  mounted () {
    getMails().then((res) => {
      if (res.data) {
        this.setMails(res.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
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
  padding: 5px;
  width: 100px;
  height: 150px;
  margin-top: 10px;
  color: white;
  text-align: center;
}
.jrebels {
  display: flex;
  justify-content: space-between;
}
.jrebel {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border: 1px solid black;
  margin: 50px auto;
  cursor: pointer;
}
.qr-code {
  width: 100%;
  height: 100%;
}
</style>
