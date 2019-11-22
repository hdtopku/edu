<template>
<div>
  <ul class="cards">
    <li class="item" v-for="(item,idx) in mails"
     :key="idx">
      <card :mail="item" :idx="idx" :isEdit="isEdits[idx]"
       @changeEdit="changeEdit" @changeMail="changeMail" :isLoading="isLoading"></card>
    </li>
  </ul>
  <div class="new" v-if="mails.length<3" @click="addEmail">+New</div>
  <hr>
  <div class="jrebels">
    <div class="jrebel" @click="doCopy">
      <i class="iconfont icon-rocket">Jrebel</i>
    </div>
    <div class="jrebel" @click="getQR">
      <i v-if="!qr.qr_code" type="button" class="iconfont icon-icon-">
        QR
      </i>
      <a v-if="qr.qr_code">
        <img class="qr-code" @click="getQR" :src="qr.qr_code"/>
      </a>
    </div>
  </div>
  </div>
</template>

<script>
import Card from './card.vue'
import Swal from 'sweetalert2'
import { getMails, getQr } from '../api/mail'
import uuidv1 from 'uuid/v1'

export default {
  name: 'edu',
  components: {
    Swal,
    Card
  },
  data () {
    return {
      time: '11/02 12:25',
      qr: {},
      copyData: 'copy data',
      mails: ['fsadfafsassq1234', 'b', ''],
      isEdits: [false, false, false],
      isLoading: false
    }
  },
  mounted () {
    getMails().then((res) => {
      this.setMails(res.data)
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
          getMails({'old': oldMail, 'new': 'RANDOM'}).then((res) => {
            this.mails = res.data
          })
        }
      })
    },
    changeEdit (idx, isEdit) {
      this.isEdits = [false, false, false]
      this.isEdits[idx] = isEdit
    },
    addEmail: function () {
      getMails({'new': 'RANDOM'}).then((res) => {
        this.mails = res.data
      })
    },
    getJrebel: function () {
      const uuid = uuidv1()
      const jrebel = '0、Jrebel安装与激活教程：https://www.notion.so/jrebel-0aef5da8e9254903b1130f4ac08837c3 \n' +
       '1、激活邮箱填入：active@jrebel.cn，\n2、激活码填入：http://jrebel.taojingling.cn/' + uuid +
       '\n\n:) 遇到问题，可随时咨询客服'
      return jrebel
    },
    doCopy: function () {
      this.$copyText(this.getJrebel()).then((e) => {
      // success
        this.openCenter()
      }, (e) => {
      // fail
      })
    },
    changeMail: function (oldMail, newMail) {
      this.isLoading = true
      const that = this
      getMails({'old': oldMail, 'new': newMail}).then((res) => {
        this.setMails(res.data)
        that.isLoading = false
      })
    },
    setMails: function (mails) {
      this.mails = mails
      while (this.mails.length < 3) {
        this.mails.push('')
      }
    },
    openCenter: function () {
      this.$toast.top('copied!')
    },
    getQR: function () {
      getQr().then((res) => {
        this.qr = res.data
        this.$toast.top('updated!')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new{
  width: 30%;
  margin: 15px auto;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 15px;

}
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
  justify-content:space-between
}
.jrebel {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border: 1px solid black;
  margin: 50px auto;
  cursor: pointer;
}
</style>
