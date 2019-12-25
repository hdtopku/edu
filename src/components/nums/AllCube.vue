<template>
  <div class="cubes" v-if="numbers">
    <div class="container" v-for="(item, index) in numbers.num49" :key="index">
    <div class="one">{{index+1}}</div>
    <div class="two">{{item.num}}</div>
    <div class="three" v-if="numbers.num33[index].num > 0">{{numbers.num33[index].num}}</div>
    <div class="four" v-else>{{numbers.num16[index].num}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    numbers: null
  }
}
</script>

<style scoped>
.cubes {
  margin-top: 15px;
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
.one {
  height: 30px;
}
.two {
  height: 35px;
  background-color: #fbdedb;
}
.three {
  height: 35px;
  background-color: #ccdfe5;
}
.four {
  height: 35px;
  background-color:#c1d8ac;
}
</style>
