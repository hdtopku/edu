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
      <el-select v-model="sisuType" placeholder="请选择" @change="changeType" clearable>
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
        label: '1、川外免费'
      }, {
        value: 2,
        label: '2、川外收费'
      }, {
        value: 3,
        label: '3、湖中医求稳'
      }]
    }
  },
  created () {
    this.sisuType = getStore('sisuType')
    console.log(this.sisuType)
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
        this.$toast.top('已更换！')
      })
    },
    openCenter: function (item) {
      this.$copyText(item).then((e) => {
        this.$toast.top(item + '已复制！')
      })
    },
    changeType () {
      console.log(this.sisuType)
      setStore('sisuType', this.sisuType)
      this.getSisuMail()
    }
  }
}
</script>

<style>
.mail-card {
  min-height: 100px;
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
