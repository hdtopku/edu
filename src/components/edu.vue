<template>
<div>
  <div class="container" v-for="(mail,index) of mails" :key=index>
    <div class="email-box">
      <div class="email" v-clipboard="mail+'@pku.edu.cn'" :style='mailsStyles[mail] || ""'>{{mail}}</div>
      <div class="time">{{time}}<span> 已复制</span></div>
    </div>
    <div class="button" @click="onClick(mail,index)">替换</div>
  </div>
  <div class="new" v-if="mails.length<3" @click="addEmail">+New</div>
  <div class="button" v-clipboard="jrebelData">jrebel</div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { getMails } from '../api/mail'
import uuidv1 from 'uuid/v1'

export default {
  name: 'edu',
  components: {
    Swal
  },
  data () {
    return {
      time: '11/02 12:25',
      mails: [],
      mailsStyles: [],
      jrebelData: ''
    }
  },
  mounted () {
    getMails().then((res) => {
      this.mails = res.data
    })
    const uuid = uuidv1()
    this.jrebelData =
     'Team URL：http://jrebel.taojingling.cn/' + uuid + '， Email：' + uuid.substring(0, 3) + '@taojingling.cn'
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
          console.log(oldMail)
          getMails({'old': oldMail, 'new': 'RANDOM'}).then((res) => {
            this.mails = res.data
          })
        }
      })
    },
    addEmail: function () {
      getMails({'new': 'RANDOM'}).then((res) => {
        this.mails = res.data
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
.container{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items:center;
}
.email-box{
  width: 70%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.email{
  padding: 5px 0;
  font-size: 20px;
}
.time{
  font-size: 12px;
  color: gray;
}
.button{
  width: 30%;
  margin-right: 20px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 3px 15px;
}
</style>
