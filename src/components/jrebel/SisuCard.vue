<template>
  <el-card class="mail-card">
    <div class="sisu-operate">
      <el-button class="sisu-change" size="mini" type="primary" @click="changeSisuMail">
        更换
      </el-button>
      <!--      <el-switch-->
      <!--        v-model="sisuType"-->
      <!--        :active-value="2015"-->
      <!--        :inactive-value="2020"-->
      <!--        active-text="收费"-->
      <!--        class="sisu-type"-->
      <!--        inactive-color="#D8D8D8"-->
      <!--        inactive-text="免费"-->
      <!--        @change="changeType"-->
      <!--      ></el-switch>-->
      <el-select v-model="sisuType" clearable placeholder="请选择" @change="changeType">
        <el-option
          v-for="item in eduOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="mails-button">
      <el-button v-for="(item,idx) in sisuMails" :key="idx" class="mail-button" size="mini" @click="openCenter(item)">
        {{ item.substring(4, item.indexOf('@')) }}
      </el-button>
    </div>
  </el-card>
</template>

<script>
import {changeSisuMail} from '../../api/mail'
import {setStore, getStore} from '../../api/storage'

export default {
  data () {
    return {
      sisuMails: [],
      sisuType: 0,
      eduOptions: [{
        value: 1,
        label: '1、窗外【免费】'
      }, {
        value: 2,
        label: '2、窗外【晓飞】'
      },
      //   {
      //   value: 10,
      //   label: '2、窗外【收费】'
      // },
      {
        value: 30,
        label: '3、老中医【求稳】'
      }]
    }
  },
  created () {
    this.sisuType = getStore('sisuType')
    this.getSisuMail()
  },
  methods: {
    getSisuMail () {
      changeSisuMail({type: this.sisuType}).then(res => {
        this.sisuMails = res.split(',')
      })
    },
    changeSisuMail () {
      changeSisuMail({change: 1, type: this.sisuType}).then(res => {
        this.sisuMails = res.split(',')
        this.$toast.top('已更新！')
      })
    },
    openCenter: function (item) {
      this.$copyText(item).then((e) => {
        this.$toast.top(item + '已复制！')
      })
    },
    changeType () {
      setStore('sisuType', this.sisuType)
      this.getSisuMail()
    }
  }
}
</script>

<style>
.mail-card {
  min-height: 110px;
  height: auto;
}

.sisu-operate {
  display: flex;
  justify-content: space-between;
}

.mails-button {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: space-between;
}

.mail-button {
  margin-top: 10px;
}
</style>
