<template>
  <div>
    <div>
      <el-input
        v-model="input"
        :placeholder="placeholder"
        @keyup.enter.native="search"
        class="input-with-select"
        clearable
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option
            v-for="(opVal, opIdx) in operator"
            :key="opIdx"
            :label="opVal.chinese_name"
            :value="opVal.oid"
          ></el-option>
        </el-select>
        <el-button slot="prepend" @click="use" :disabled="disabledStyle">
          <span
            class="iconfont icon-weishiyong1 weishiyong"
            :style="disabledStyle ? '': 'color:red;'"
          >{{unUsed.length}}</span>
        </el-button>
        <el-button slot="append" @click="search">新增</el-button>
      </el-input>
    </div>
    <el-card
      v-for="(item, idx) in all"
      :key="idx"
      shadow="always"
      :class="item.isItem ? 'highlight': ''"
    >
      <span style="position:absolute;left:10px;margin-top:-10px;">{{idx+1}}</span>
      <i class="iconfont icon-copy1 copy" @click="copy(item.short_link)"></i>
      <el-row :gutter="20">
        <tooltip
          @clickRecycle="clickRecycle"
          @clickShiyong="clickShiyong"
          @clickUsed="clickUsed"
          :item="item"
          class="tooltip"
        ></tooltip>
        <div class="mail" @click="doCopy(item.short_link, item.link)">{{item.short_link || item.id}}</div>
        <div class="time">{{item.update_time}} | {{item.create_time.substring(0, 10)}} | {{item.chinese_name}}</div>
      </el-row>
    </el-card>
    <el-button :loading="isLoading" plain round class="batch-use" @click="clickBatchUse">使用10条</el-button>
  </div>
</template>

<script>
import Tooltip from './Tooltip'
import { syncGetAMs } from '../../api/mail'
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
      items: [],
      all: [],
      allUse: [],
      unUsed: [],
      using: [],
      used: [],
      recycle: [],
      operator: [],
      placeholder: '',
      input: '',
      isLoading: false
    }
  },
  methods: {
    handleClick (tab, event) {
    },
    openCenter: function (text = '已复制！') {
      this.$toast.top(text)
    },
    doCopy (shortLink, link) {
      setTimeout(() => {
        this.$copyText(link + '\n').then((e) => {
          // success
          if (shortLink.length > 20) {
            this.openCenter(shortLink)
          } else {
            this.openCenter(`<div style='color:red;font-size:30px;'>${shortLink}</div>已复制！`)
          }
        }, (e) => {
          // fail
          this.doCopy(shortLink, link)
        })
      }, 20)
    },
    updateAM (params = {}) {
      this.isLoading = true
      if (this.select !== '' && this.select !== 0) {
        params['operator_id'] = this.select
      }
      this.isLoading = true
      const res = syncGetAMs(params)
      this.unUsed = res.data.unUsed
      this.using = res.data.using
      this.used = res.data.used
      this.recycle = res.data.recycle
      this.allUse = this.recycle.concat(this.using)
      this.items = res.data.item
      // this.tabs[0].label = '已使用(' + res.data.usedLength + ')'
      this.all = this.allUse.concat(this.used)
      if (this.items.length > 0) {
        this.all = this.items.concat(this.all)
        let links = []
        this.items.forEach(element => {
          links.push(element['link'])
          if (element.status === 0) {
            this.unUsed.push(element)
          }
        })
        this.doCopy(`<div style="color:red;font-size:25px;">${this.items.length}条长链</div>复制成功`, links.join('\r\n'))
      }
      this.operator = res.data.operator
      this.input = ''
      this.placeholder = `今：${res.data.usedLength}；昨：${res.data.yesterdayUsedLength}`
      this.isLoading = false
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
    clickBatchUse () {
      if (this.select > 0) {
        this.updateAM({ 'operator_id': this.select, 'status': 2, 'count': 10 })
      } else {
        this.openCenter('请选择角色')
      }
      setTimeout(() => {
        this.$router.go(0)
      }, 3500)
    },
    search () {
      if (this.input) {
        let idx = this.input.indexOf('https://email.myunidays.com/system/clicked-ul')
        if (idx >= 0) {
          this.input = this.input.substring(idx)
          this.updateAM({ link: this.input })
          setTimeout(() => {
            this.$router.go(0)
          }, 5000)
        }
      } else {
        this.updateAM()
      }
    },
    use () {
      this.updateAM({ status: 2 })
    },
    copy (shortLink) {
      this.$copyText(shortLink).then((e) => {
        // success
        this.openCenter(`<div style='color:#9fa7c2;font-size:30px;'>${shortLink}</div>已复制！`)
      }, (e) => {
        // fail
      })
    }
  },
  mounted () {
    this.updateAM()
    this.select = getStore('roleSelect') || ''
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
  width: 85px;
  margin-right: 25px;
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
  color: #9fa7c2;
  font-size: 25px;
  top: 2px;
  right: 0;
  position: absolute;
}
.enabled {
  color: red;
}
.highlight {
  border: 3px solid cornflowerblue;
}
.highlight div {
  color: darkmagenta;
  font-weight: bolder;
}
.batch-use {
  margin: 20px;
}
</style>
