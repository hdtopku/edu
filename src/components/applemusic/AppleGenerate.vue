<template>
  <div style="text-align: center;">
    <div style="height: 100px">
      <div v-if="mails.length > 0">
        <el-popconfirm cancel-button-text='取消' confirm-button-text='清零' title="是否清零？"
                       @confirm="clearMail">
          <span slot="reference" class="mail-count">{{ mails.length }}</span>
        </el-popconfirm>
      </div>
    </div>
    <el-button class="mail-tag" @click="copyMail" v-if="mails.length > 0">{{ mails[0] }}</el-button>
    <div>
      <el-button class="mail-change" round type="primary" @click="changeMail">更换</el-button>
    </div>
  </div>
</template>

<script>
import {changeRangeMail} from '../../api/mail'

export default {
  data () {
    return {
      mails: []
    }
  },
  mounted () {
    let res = changeRangeMail()
    this.mails = JSON.parse(res)
  },
  methods: {
    changeMail () {
      let res = changeRangeMail({change: 1})
      this.mails = JSON.parse(res)
      if (this.mails != null && this.mails.length > 0) {
        this.doCopy()
      }
    },
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
.mail-tag {
  font-size: 25px;
  font-weight: bold;
  word-break: break-all;
  height: 100px;
  position: absolute;
  top: 150px;
  display: block;
  width: 100%;
}

.mail-change {
  font-size: 120px;
  margin-top: 200px;
}

.mail-count {
  font-weight: bolder;
  font-size: 100px;
  cursor: pointer;
  margin: 20px auto;
  padding: 0 20px;
}
</style>
