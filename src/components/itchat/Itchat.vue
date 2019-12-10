<template>
  <div>
    <div>
      <toggle-button
          :width="65"
          class="toggle"
          v-model="on"
          :sync="true"
          :labels="{checked: '已开启', unchecked: '已关闭'}"
          @change="toggle(true)"
        ></toggle-button>
    </div>
    <div class="jrebel" @click="getQR">
      <i v-if="!qr.qr_code" type="button" class="iconfont icon-icon-">
        QR
      </i>
      <img v-else class="qr-code" @click="getQR" :src="qr.qr_code"/>
    </div>

  </div>
</template>

<script>
import { toggleItChat, getQr } from '../../api/mail'
export default {
  name: 'itchat',
  data () {
    return {
      qr: {},
      on: false
    }
  },
  methods: {
    openCenter: function (Text = 'copied!') {
      this.$toast.top(Text)
    },
    getQR: function () {
      getQr().then((res) => {
        this.qr = res.data
        this.openCenter('updated!')
      })
    },
    toggle: function (change = false) {
      if (change) {
        toggleItChat({on: this.on})
      } else {
        toggleItChat().then((res) => {
          if (res.data.on === 'true') {
            this.on = true
          } else {
            this.on = false
          }
        })
      }
    }
  },
  mounted () {
    this.toggle()
    this.getQR()
  }
}
</script>

<style scoped>
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
