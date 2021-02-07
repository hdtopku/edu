<template>
  <div>
    <ul class="cards">
      <li class="item" v-for="(mail, idx) in mails" :key="idx">
        <div class="card">
          <div v-if="mail" class="edit">
            <i v-if="!isEdits[idx]" class="iconfont icon-edit" @click="edit(idx)"></i>
            <i v-else class="iconfont icon-rollback" @click="edit(idx)"></i>
          </div>
          <div class="top" @click="doCopy(idx)">
            <div v-if="mail">
              <div class="mail">
                <textarea v-if="isEdits[idx]" type="text" @input="handleInput" :placeholder="mail" />
                <div v-else class="show-mail" :class="isLoading ? 'change-mail': ''">{{mail}}</div>
              </div>
            </div>
            <i v-else class="iconfont icon-icon-test not-found"></i>
          </div>
          <div class="bottom" :class="isLoading ? 'disabled' : ''" @click="randomMail(idx)">
            <i v-if="isLoading" class="iconfont icon-loading loading"></i>
            <div v-if="!isEdits[idx] && mail" class="button">random</div>
            <div v-if="!isEdits[idx] && !mail && !inputMail" class="button">add</div>
            <div v-if="isEdits[idx] && inputMail == ''" class="button">delete</div>
            <div v-if="isEdits[idx] && mail && inputMail" class="button">replace</div>
          </div>
        </div>
      </li>
    </ul>
    <el-link
      v-if="isEdits[0] || isEdits[1] || isEdits[2]"
      :href="repairHref"
      type="primary"
      style="z-index:1;position:absolute;right:20px;margin-top:-25px;"
      target="_blank"
    >修复邮箱</el-link>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import { getMails, syncGetMails } from '../../api/mail'
export default {
  components: {
    Swal
  },
  data () {
    return {
      isEdits: [false, false, false],
      inputMail: '',
      isLoading: false,
      mails: ['fsadfafsassq1234', 'b', '']
    }
  },
  mounted () {
    // this.initMail()
  },
  computed: {
    repairHref: function () {
      return `https://apimail.taojingling.cn/?words=${this.mails[0]},${this.mails[1]},${this.mails[2]}`
    }
  },
  methods: {
    changeMail: function (oldMail, newMail) {
      this.isLoading = true
      getMails({ 'old': oldMail, 'new': newMail }).then((res) => {
        this.setMails(res.data)
        this.isEdits = [false, false, false]
      })
    },
    initMail (idx = -1, isCopy = false) {
      var res = syncGetMails()
      if (res.data) {
        this.setMails(res.data)
      }
      if (idx >= 0) {
        if (isCopy) { // 拷贝
          setTimeout(() => {
            this.$copyText(this.mails[idx] + '@pku.edu.cn').then((e) => {
              // success
              this.openCenter()
            }, (e) => {
              // fail
            })
          }, 20)
        } else { // 弹窗
          const title = `<div style="color:red">${this.mails[idx]}</div>`
          let text = '随机替换？'
          if (this.isEdits[idx] && this.inputMail === '') {
            text = '确认删除？'
          }
          if (this.isEdits[idx] && this.inputMail.length > 0) {
            text = '替换为' + this.inputMail + '？'
          }
          if (!this.isEdits[idx] && this.mail === '' && this.inputMail === '') {
            text = '确认新增？'
          }
          const isEdit = this.isEdits[idx]
          Swal.fire({
            title,
            text,
            showCancelButton: true,
            confirmButtonColor: 'pink',
            cancelButtonColor: '#00CCFF',
            confirmButtonText: '取消',
            cancelButtonText: '确定'
          }).then((result) => {
            if (!result.value) {
              if (isEdit) {
                this.changeMail(this.mails[idx], this.inputMail)
              } else {
                this.changeMail(this.mails[idx], 'RANDOM')
              }
              this.inputMail = ''
            }
          })
        }
      }
    },
    setMails: function (mails) {
      this.mails = mails
      while (this.mails.length < 3) {
        this.mails.push('')
      }
      this.isLoading = false
    },
    edit (idx) {
      this.initMail()
      const isEdit = !this.isEdits[idx]
      if (!isEdit) {
        this.inputMail = ''
      }
      this.isEdits = [false, false, false]
      this.isEdits[idx] = isEdit
    },
    openCenter: function (idx) {
      this.$toast.top('copied!')
      this.$emit('changeEdit', idx, false)
    },
    handleInput (e) { // 校验关联交易号
      let val = event.target.value
      // 只能是正整数或空,可根据需求修改正则
      if (/^[0-9A-Za-z]{0,15}$/.test(val)) {
        this.inputMail = val
      } else {
        event.target.value = this.inputMail
      }
    },
    doCopy (idx) {
      if (this.mails[idx] && !this.isEdits[idx]) {
        this.initMail(idx, true)
      }
    },
    randomMail (idx) {
      if (this.isLoading) {
        return
      }
      this.initMail(idx)
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
.card {
  position: relative;
  width: 100%;
  height: 90%;
  color: black;
}
.top,
.bottom {
  width: 100%;
  height: 60%;
  border: 1px solid black;
  margin-top: 3%;
  display: flex;
  word-break: break-all;
  cursor: pointer;
}
.mail {
  width: 100%;
  position: absolute;
  top: 20%;
}
.edit {
  padding: 3px 4px;
  top: 0;
  position: absolute;
  z-index: 1;
}
textarea {
  width: 80%;
  resize: none;
}
.not-found {
  position: absolute;
  left: 35%;
  top: 40%;
}
.bottom {
  height: 18%;
  border-radius: 5px;
}
.button {
  margin: 2% auto;
}
.loading {
  position: absolute;
  margin-top: 6%;
  margin-left: 6%;
}
.disabled {
  color: #aaaaaa;
}
.change-mail {
  color: tomato;
}
</style>
