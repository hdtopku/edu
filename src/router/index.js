import Vue from 'vue'
import Router from 'vue-router'
import edu from '@/components/edu'
import test from '@/components/test'
import itchat from '@/components/itchat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'edu',
      component: edu
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/itchat',
      name: 'itchat',
      component: itchat
    }
  ]
})
