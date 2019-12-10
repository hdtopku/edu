<template>
  <span>
    <tippy
      theme="light-border"
      @hidden="onHidden"
      @show="onShow"
      interactive="true"
      :to="'tippy'+idx"
      trigger="click"
    >
      <div>
        <span
          @click="clickRecycle"
          v-if="status===1 || status===2"
          class="iconfont icon-recycle recycle"
        ></span>
        <span
          @click="clickShiyong"
          v-if="status===2 || status===3"
          class="iconfont icon-shiyongzhong1 shiyong"
        ></span>
        <span
          @click="clickUsed"
          v-if="status===1 || status===3"
          class="iconfont icon-yishiyong2 used"
        ></span>
      </div>
    </tippy>
    <button class="tippy01" :name="'tippy'+idx" ref="btn">
      <span class="iconfont icon-shiyongzhong1 shiyong" v-if="status===1"></span>
      <span class="iconfont icon-yishiyong2 used" v-if="status===2"></span>
      <span class="iconfont icon-recycle recycle" v-if="status===3"></span>
    </button>
    <span class="iconfont icon-weishiyong used" v-if="status===0"></span>
    <slot class="toto" name="toto"></slot>
  </span>
</template>

<script>

export default {
  props: {
    idx: {
      default: 0
    },
    status: {
      default: 0
    },
    id: {
      default: 0
    }
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
      this.$emit('clickRecycle', this.id)
    },
    clickShiyong () {
      this.$refs.btn._tippy.hide() // 如果不独立出这个组件
      this.$emit('clickShiyong', this.id)
    },
    clickUsed () {
      this.$refs.btn._tippy.hide() // 如果不独立出这个组件
      this.$emit('clickUsed', this.id)
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
  color: #9fa7c2;
}
.recycle {
  font-size: 50px;
  color: #47aa64;
}
</style>
