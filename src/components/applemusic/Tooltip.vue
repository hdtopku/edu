<template>
  <span>
    <tippy
      theme="light-border"
      @hidden="onHidden"
      @show="onShow"
      interactive="true"
      :to="item.link"
      trigger="click"
    >
      <div>
        <span
          @click="clickRecycle"
          v-if="item.status===1 || item.status===2 || item.status === 0"
          class="iconfont icon-recycle recycle"
        ></span>
        <!-- <span
          @click="clickShiyong"
          v-if="status===2 || status===3 || status === 0"
          class="iconfont icon-shiyongzhong1 shiyong"
        ></span> -->
        <span
          @click="clickUsed"
          v-if="item.status===1 || item.status===3 || item.status === 0"
          class="iconfont icon-yishiyong2 used"
        ></span>
        <span style="color:gray;">{{item.create_time}} 创建</span>
      </div>
    </tippy>
    <button class="tippy01" :name="item.link" ref="btn">
      <span class="iconfont icon-weishiyong used" v-if="item.status===0"></span>
      <span class="iconfont icon-shiyongzhong1 shiyong" v-if="item.status===1"></span>
      <span class="iconfont icon-yishiyong2 used" v-if="item.status===2"></span>
      <span class="iconfont icon-recycle recycle" v-if="item.status===3"></span>
    </button>
    <slot class="toto" name="toto"></slot>
  </span>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    onTippyInit () {
    },
    onHidden () {
    },
    onShow () {
    },
    // clicked (idx) {
    //   // this.$refs.btn[idx]._tippy.hide() //如果不独立出这个组件
    //   this.$refs.btn._tippy.hide() // 如果独立出这个组件
    // },
    clickRecycle () {
      this.$refs.btn._tippy.hide() // 如果不独立出这个组件
      this.$emit('clickRecycle', this.item.id)
    },
    clickShiyong () {
      this.$refs.btn._tippy.hide() // 如果不独立出这个组件
      this.$emit('clickShiyong', this.item.id)
    },
    clickUsed () {
      this.$refs.btn._tippy.hide() // 如果不独立出这个组件
      this.$emit('clickUsed', this.item.id)
    }
  }
}
</script>

<style scoped>
.recycle {
  font-size: 30px;
  color: #47aa64;
  padding: 10px;
}
.tippy01 {
  font-size: 30px;
  border: none;
  outline: none;
  background: none;
}
.shiyong {
  font-size: 50px;
  color: #fb3159;
}
.used {
  font-size: 50px;
  color: red;
}
.recycle {
  font-size: 50px;
  color: #47aa64;
}
</style>
