<template>
  <div class="card">
    <div v-if="mail" class="edit">
      <i v-if="!isEdit" class="iconfont icon-edit" @click="edit"></i>
      <i v-else class="iconfont icon-rollback" @click="edit"></i>
    </div>
    <div class="top" @click="doCopy">
      <div v-if="mail">
        <div class="mail">
          <textarea v-if="isEdit" type="text"
            @input="handleInput" :placeholder="mail"/>
          <div v-else class="show-mail" :class="isClicked ? 'change-mail': ''">{{mail}}</div>
        </div>
      </div>
      <i v-else class="iconfont icon-icon-test not-found"></i>
    </div>
    <div class="bottom" :class="isLoading ? 'disabled' : ''" @click="randomMail">
      <i v-if="isLoading" class="iconfont icon-loading loading"></i>
      <div v-if="!isEdit && mail" class="button">random</div>
      <div v-if="!isEdit && !mail && !inputMail" class="button">add</div>
      <div v-if="isEdit && inputMail == ''" class="button">delete</div>
      <div v-if="isEdit && mail && inputMail" class="button">replace</div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
  props: {
    mail: {default: ''},
    isEdit: {default: false},
    idx: {default: 0},
    isLoading: {default: false}
  },
  components: {
    Swal
  },
  data () {
    return {
      inputMail: '',
      isClicked: false
    }
  },
  methods: {
    edit () {
      this.$emit('changeEdit', this.idx, !this.isEdit)
      if (!this.isEdit) {
        this.inputMail = ''
      }
    },
    openCenter: function () {
      this.$toast.top('copied!')
      this.$emit('changeEdit', this.idx, false)
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
    doCopy () {
      if (this.mail && !this.isEdit) {
        this.$copyText(this.mail + '@pku.edu.cn').then((e) => {
          // success
          this.openCenter()
        }, (e) => {
          // fail
        })
      }
    },
    randomMail () {
      this.$emit('changeEdit', this.idx, false)
      const title = `<div style="color:red">${this.mail}</div>`
      let text = '随机替换？'
      if (this.isEdit && this.inputMail === '') {
        text = '确认删除？'
      }
      if (this.isEdit && this.inputMail.length > 0) {
        text = '替换为' + this.inputMail + '？'
      }
      if (!this.isEdit && this.mail === '' && this.inputMail === '') {
        text = '确认新增？'
      }
      const isEdit = this.isEdit
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
          this.isClicked = true
          if (!this.isLoading) {
            if (isEdit) {
              this.$emit('changeMail', this.mail, this.inputMail)
            } else {
              this.$emit('changeMail', this.mail, 'RANDOM')
            }
            this.inputMail = ''
          }
        }
      })
    }
  },
  watch: {
    mail () {
      this.isClicked = false
    }
  }
}
</script>
<style scoped>
.card {
  position: relative;
  width: 100%;
  height: 90%;
  color: black;
}
.top, .bottom {
  width: 100%;
  height: 60%;
  border: 1px solid black;
  margin-top: 3%;
  display: flex;
  word-break:break-all;
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
  resize:none;
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
