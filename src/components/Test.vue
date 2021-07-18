<template>
  <div>
  <h1>{{ipChaXun}}</h1>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
import { getRequest } from '../api/request'

const list = ['巴彦淖尔', '宁德']
export default {
  data () {
    return {
      ipChaXun: '',
      title: ''
    }
  },
  created () {
    getRequest('https://2021.ipchaxun.com').then(res => {
      if (!res) {
        return
      }
      res = JSON.stringify(res)
      this.ipChaXun = res
      for (let i = 0; i < list.length; i++) {
        if (res.indexOf(list[i]) >= 0) {
          this.title = '白名单'
          return
        } else {
          this.title = '黑名单'
        }
        console.log(this.title)
      }
    })
  }
}
</script>

<style lang="scss">
</style>
