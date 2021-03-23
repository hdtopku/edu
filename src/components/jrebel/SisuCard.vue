<template>
  <el-card class="mail-card">
    <div class="sisu-operate">
      <el-button class="sisu-change" size="mini" type="primary" @click="changeSisuMail">
        更换
      </el-button>
      <el-select v-model="sisuType" clearable placeholder="请选择" @change="changeType" size="mini">
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
      <el-button :type="item.count === 0 ? 'success' : ''" v-for="(item,idx) in sisuMails"
                 :key="idx" class="mail-button" size="mini" @click="openCenter(item)" plain>
        {{ item.mail.substring(4, item.mail.indexOf('@')) }}
      </el-button>
      <el-popconfirm v-if="useCount > 0" confirm-button-text='清零' cancel-button-text='取消' title="是否清零？" @confirm="clearCount">
        <span slot="reference" class="tag">{{useCount}}</span>
      </el-popconfirm>
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
      useCount: 0,
      eduOptions: [
        {
          value: 20,
          label: '👉 周师大【可用】'
        },
        {
          value: 30,
          label: '👉 老中医【求稳】'
        },
        {
          value: 1,
          label: '1、窗外【雄辉】'
        }, {
          value: 2,
          label: '2、窗外【晓飞】'
        }
      //   {
      //   value: 10,
      //   label: '2、窗外【收费】'
      // },
      ]
    }
  },
  created () {
    this.sisuType = getStore('sisuType')
    this.useCount = getStore('useCount' + this.sisuType) || 0
    this.getSisuMail()
  },
  methods: {
    getSisuMail () {
      changeSisuMail({type: this.sisuType}).then(res => {
        this.sisuMails = []
        this.useCount = getStore('useCount' + this.sisuType) || 0
        res.split(',').forEach(mail => {
          this.sisuMails.push({
            mail,
            count: 0
          })
        })
      })
    },
    changeSisuMail () {
      changeSisuMail({change: 1, type: this.sisuType}).then(res => {
        this.sisuMails = []
        this.useCount = getStore('useCount' + this.sisuType) || 0
        res.split(',').forEach(mail => {
          this.sisuMails.push({
            mail,
            count: 0
          })
        })
        this.$toast.top('已更新！')
      })
    },
    openCenter: function (item) {
      this.$copyText(item.mail).then((e) => {
        this.$toast.top(item.mail + '已复制！')
        if (item.count === 0) {
          item.count += 1
          this.useCount += 1
        }
        setStore('useCount' + this.sisuType, this.useCount)
      })
    },
    changeType () {
      setStore('sisuType', this.sisuType)
      this.getSisuMail()
    },
    clearCount () {
      this.useCount = 0
      this.changeSisuMail()
      setStore('useCount' + this.sisuType, this.useCount)
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
.tag {
  position: absolute;
  right: 12px;
  top: 60px;
  cursor: pointer;
  font-weight: bolder;
  font-size: 40px;
  color: #67C23A;
  padding: 0 5px;
}
</style>
