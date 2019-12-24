<template>
  <div class="cubes">
    <div
      class="container"
      v-for="(item, index) in itemStatus"
      :class="{ active: item.status === 1 }"
      :key="index"
      @click="clicked(index)"
    >
      <div class="one" v-if="item.status !== -1">{{index+1}}</div>
      <div class="one-disabled" v-else>{{index+1}}</div>
      <div class="two" v-if="item.status !== -1">{{item.num}}</div>
      <div class="two disabled" v-else></div>
      <div class="three" v-if="isShow">{{mynum-item.num}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemStatus: Array,
    isShow: false
  },
  data () {
    return {
      mynum: 450
    }
  },
  methods: {
    clicked (index) {
      if (this.itemStatus[index].status !== -1) {
        this.itemStatus[index].status = (this.itemStatus[index].status + 1) % 2
      }
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.cubes {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.container {
  width: 18%;
  height: auto;
  border: 1px solid #bbbbbb;
  margin-bottom: 10px;
}

.container div {
  text-align: center;
  line-height: 33px;
}

.active .one {
  color: #bbbbbb;
}

.active .two {
  color: #bbbbbb;
  background-color: #e1e1e1;
}

.active .three {
  color: #bbbbbb;
  background-color: #e1e1e1;
}

.one {
  height: 30px;
}

.one-disabled {
  height: 30px;
  color: #bbbbbb;
}

.two {
  height: 35px;
  background-color: #fbd735;
}

.disabled {
  color:#e1e1e1;
  background-color: #e1e1e1;
}

.three {
  height: 35px;
  background-color: #ccdfe5;
}
</style>
