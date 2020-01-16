<template id="t">
  <div class="container">
    <div class="text">直接点击下方按钮，前往软件粘贴即可。</div>
    <el-row>
      <el-button type="primary" class="button" @click="doCopy">{{msg}}</el-button>
    </el-row>
  </div>
</template>

<script>
import Nums from './nums/Nums'
import Cube from './nums/Cube'
import AllCube from './nums/AllCube'
export default {
  components: {
    nums: Nums,
    cube: Cube,
    allCube: AllCube
  },
  data () {
    return {
      msg: '复制'
    }
  },
  methods: {
    doCopy () {
      this.openCenter('已复制')
    },
    openCenter: function (text = 'copied!') {
      this.$toast.top(text)
    }
  }
}
</script>
<style scoped>
.container {
  background: url('')
}

.text {
  margin-bottom: 20px;
}

.button {
  margin: auto;
}
</style>
