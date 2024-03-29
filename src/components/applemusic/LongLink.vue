<template>
  <div v-if="isShow">
    <div style="height: 35px;display: flex;justify-content: space-between">
      <el-popover v-model="popVisible" v-if="batchCount >= 1" :title="'是否复制历史' + batchCount + '条？'" confirm-button-text="使用" @show="copyRecent">
        <el-input type="textarea" :row="10" v-model="recentLinks"></el-input>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="popVisible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="doCopy('已复制', recentLinks)">复制</el-button>
        </div>
        <el-button slot="reference" plain round>历史{{ batchCount }}条</el-button>
      </el-popover>
      <el-input-number v-model="batchCount" :max="25" :min="1" label="描述文字" size="mini"></el-input-number>
      <el-popconfirm v-if="batchCount >= 1" :title="'是否使用' + batchCount + '条？'" confirm-button-text="使用"
                     @confirm="clickBatchUse">
        <el-button slot="reference" plain round>使用{{ batchCount }}条</el-button>
      </el-popconfirm>
    </div>
    <el-input
      type="textarea"
      :row="2"
      v-model="input"
      :placeholder="placeholder"
      class="input-with-select"
      @keyup.enter.native="search"
      clearable
    >
    </el-input>
    <div style="display: flex; justify-content: space-between">
      <el-select slot="prepend" v-model="select" placeholder="请选择">
        <el-option
          v-for="(opVal, opIdx) in operator"
          :key="opIdx"
          :label="opVal.chinese_name"
          :value="opVal.oid"
        ></el-option>
      </el-select>
      <span :style="disabledStyle ? '': 'color:red;'"
            class="iconfont icon-weishiyong1 weishiyong"
            @click="use"
      >{{ unUsed.length }}</span>
      <el-button slot="append" round type="primary" @click="search">
        新增/查询
      </el-button>
    </div>
    <br/>
    <el-card
      v-for="(item, idx) in (select === 0 ? all : all.slice(0, 12 + recycle.length))"
      :key="idx"
      :class="item.isItem ? 'highlight': ''"
      shadow="always"
    >
      <span style="position:absolute;left:10px;margin-top:-10px;">{{
          (idx >= recycle.length ? idx - recycle.length : idx) + 1
        }}</span>
      <i class="iconfont icon-copy1 copy" @click="copy(item.short_link)"></i>
      <el-row :gutter="20">
        <tooltip
          :item="item"
          class="tooltip"
          @clickRecycle="clickRecycle(item.id, item.short_link, item.link)"
          @clickShiyong="clickShiyong"
          @clickUsed="clickUsed(item.id, item.short_link, item.link)"
        ></tooltip>
        <div class="mail" @click="doCopy(item.short_link, item.link)">{{ item.short_link || item.id }}</div>
        <div class="time">{{ item.update_time }} | {{ item.create_time.substring(0, 10) }} | {{ item.chinese_name }}
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Tooltip from './Tooltip'
import {syncGetAMs, getAMs} from '../../api/mail'
import {setStore, getStore} from '../../api/storage'

export default {
  components: {Tooltip},
  data () {
    return {
      popVisible: false,
      hasItem: false,
      tabs: [{label: '使用中', name: 'first'},
        {label: '已使用', name: 'second'}],
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
      isShow: true,
      recentCopy: null,
      batchCount: 9,
      recentLinks: ''
    }
  },
  methods: {
    openCenter: function (text = '已复制！') {
      this.$toast.top(text)
    },
    doCopy (shortLink, link) {
      for (let i = 0; i < 3; i++) {
        // setTimeout(() => {
        this.recentCopy = link
        this.$copyText(link).then((e) => {
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
        // }, 20)
      }
    },
    updateAM (params = {}, isAsync = false) {
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
      if (this.select !== '' && this.select !== 0) {
        params['operator_id'] = this.select
      }
      if (isAsync) {
        getAMs(params).then((res) => {
          this.asyncUpdateAM(res, false)
        })
      } else {
        const res = syncGetAMs(params)
        this.asyncUpdateAM(res)
        setTimeout(() => {
          this.$router.go(0)
        }, 2000)
      }
    },
    asyncUpdateAM (res, needCopy = true) {
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
        if (needCopy) {
          this.doCopy(`<div style="color:red;font-size:25px;">${this.items.length}条长链</div>复制成功`, links.join('\r\n'))
        }
      }
      this.operator = res.data.operator
      this.input = ''
      this.placeholder = `今：${res.data.usedLength}；昨：${res.data.yesterdayUsedLength}`
    },
    clickRecycle (id, shortLink, link) {
      this.doCopy(shortLink, link)
      this.updateAM({id, status: 3}, true)
    },
    clickShiyong (id) {
      this.updateAM({id, status: 1})
    },
    clickUsed (id, shortLink, link) {
      this.doCopy(shortLink, link)
      this.updateAM({id, status: 2}, true)
    },
    clickBatchUse () {
      if (this.select > 0) {
        this.updateAM({'operator_id': this.select, 'status': 2, 'count': this.batchCount})
      } else {
        this.openCenter('请选择角色')
      }
    },
    search () {
      if (this.input) {
        let idx = this.input.indexOf('unidays')
        if (idx >= 0) {
          this.input = this.input.trim()
          this.updateAM({link: this.input}, true)
        }
      } else {
        this.updateAM({}, true)
      }
    },
    copyRecent () {
      let recentTen = []
      if (this.used != null && this.used.length > 0) {
        this.used.slice(0, this.batchCount).forEach((item) => {
          recentTen.push(item.link)
        })
        this.recentLinks = recentTen.join('\r\n')
        // this.doCopy('已复制', recentTen.join('\r\n'))
      }
    },
    use () {
      if (this.disabledStyle) { return }
      this.updateAM({status: 2})
      setTimeout(() => {
        this.$router.go(0)
      }, 2000)
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
    this.updateAM({}, true)
    this.select = parseInt(getStore('roleSelect') || '1') || 1
    if (this.select == null || this.select === '' || this.select < 1) {
      this.select = 1
    }
    this.batchCount = getStore('batchCount')
  },
  watch: {
    input: {
      deep: true,
      handler (newVal) {
        if (newVal != null && newVal !== '') {
          let idx = newVal.indexOf('unidays')
          if (idx >= 0) {
            this.input = this.input.trim()
            this.updateAM({link: this.input}, true)
          }
        }
      }
    },
    select: function () {
      this.updateAM({}, true)
      this.disabledStyle = !(this.select !== '' && this.select !== 0)
      setStore('roleSelect', this.select)
    },
    batchCount (newVal) {
      setStore('batchCount', this.batchCount)
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
  cursor: pointer;
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

</style>
