import Vue from 'vue'
import Router from 'vue-router'
import Edu from '@/components/Edu'
import Test from '@/components/Test'
import Itchat from '@/components/itchat/Itchat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'edu',
      component: Edu
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/itchat',
      name: 'itchat',
      component: Itchat
    }
  ]
})
