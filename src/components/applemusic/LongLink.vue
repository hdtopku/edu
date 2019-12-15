<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="(tab, i) in tabs" :key="i" :label="tab.label" :name="tab.name">
      <div v-if="i === 0">
        <el-input v-model="input" @keyup.enter.native="search" class="input-with-select" clearable>
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option v-for="(opVal, opIdx) in operator" :key="opIdx" :label="opVal.chinese_name" :value="opVal.oid"></el-option>
          </el-select>
          <el-button slot="prepend" @click="use" :disabled="disabledStyle">
            <span class="iconfont icon-weishiyong1 weishiyong" :style="disabledStyle ? '': 'color:red;'">{{unUsed.length}}</span>
          </el-button>
          <el-button slot="append" @click="search">新增/查询</el-button>
        </el-input>
      </div>
      <el-card v-for="(item, idx) in all[i]" :key="idx" shadow="always">
        <i class="iconfont icon-copy1 copy" @click="copy(item.short_link)"></i>
        <el-row :gutter="20">
          <tooltip
            @clickRecycle="clickRecycle"
            @clickShiyong="clickShiyong"
            @clickUsed="clickUsed"
            :idx="tab.name+idx"
            :id="item.id"
            :status="item.status"
            :createTime="item.create_time"
            class="tooltip"
          ></tooltip>
          <div
            class="mail"
            @click="doCopy(item.short_link, item.link)"
          >{{item.short_link || item.id}}</div>
          <div class="time">{{item.update_time}} {{item.chinese_name}}</div>
        </el-row>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Tooltip from './Tooltip'
import { getAMs } from '../../api/mail'
import { setStore, getStore } from '../../api/storage'
export default {
  components: { Tooltip },
  data () {
    return {
      hasItem: false,
      tabs: [{ label: '使用中', name: 'first' },
        { label: '已使用', name: 'second' }],
      disabledStyle: true,
      activeName: 'first',
      select: '',
      item: {},
      all: [],
      allUse: [],
      unUsed: [],
      using: [],
      used: [],
      recycle: [],
      operator: [],
      input: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    },
    doCopy (shortLink, link) {
      this.$copyText(link).then((e) => {
        // success
        this.openCenter(`<div style='color:red;font-size:30px;'>${shortLink}</div>copied!`)
      }, (e) => {
        // fail
      })
    },
    updateAM (params = {}) {
      if (this.select !== '' && this.select !== 0) {
        params['operator_id'] = this.select
      }
      getAMs(params).then((res) => {
        this.unUsed = res.data.unUsed
        this.using = res.data.using
        this.used = res.data.used
        this.recycle = res.data.recycle
        this.allUse = this.using.concat(this.recycle)
        this.item = res.data.item
        this.tabs[1].label = '已使用(' + res.data.usedLength + ')'
        if (this.item.id && this.item.id > 0) {
          this.allUse = this.allUse.filter((item, index, arr) => { return item.id !== this.item.id })
          this.allUse = [res.data.item].concat(this.allUse)
        }
        this.all = [this.allUse].concat([this.used])
        this.all = this.all.concat([this.item])
        this.operator = res.data.operator
      })
    },
    clickRecycle (id) {
      this.updateAM({ id, status: 3 })
    },
    clickShiyong (id) {
      this.updateAM({ id, status: 1 })
    },
    clickUsed (id) {
      this.updateAM({ id, status: 2 })
    },
    search () {
      if (this.input && this.input.startsWith('https://email.myunidays.com/system/clicked-ul')) {
        this.updateAM({ link: this.input })
      } else {
        this.updateAM()
      }
    },
    use () {
      this.updateAM({ status: 1 })
    },
    copy (shortLink) {
      this.$copyText(shortLink).then((e) => {
        // success
        this.openCenter(`<div style='color:#9fa7c2;font-size:30px;'>${shortLink}</div>copied!`)
      }, (e) => {
        // fail
      })
    }
  },
  mounted () {
    this.select = getStore('roleSelect') || ''
    this.updateAM()
  },
  watch: {
    select: function () {
      this.updateAM()
      if (this.select !== '' && this.select !== 0) {
        this.disabledStyle = false
      } else {
        this.disabledStyle = true
      }
      setStore('roleSelect', this.select)
    }
  }
}
</script>

<style scoped>
.copy {
  font-size: 20px;
  position: absolute;
  left: 6px;
  margin-top: 30px;
  padding: 2px;
  z-index: 10;
}
.mail {
  color: #fb3159;
  font-size: 40px;
}
.el-select {
  width: 100px;
  margin-right: 20px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.time {
  font-size: 12px;
  position: absolute;
  bottom: -20px;
}
.tooltip {
  position: absolute;
  margin-left: 2%;
  left: 0;
  top: 0;
}
.weishiyong {
  color:#9fa7c2;
  font-size: 25px;
  top: 2px;
  right: 0;
  position: absolute;
}
.enabled {
  color:red;
}
</style>
