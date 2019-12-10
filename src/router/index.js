import Vue from 'vue'
import Router from 'vue-router'
import edu from '@/components/Edu'
import test from '@/components/Test'
import itchat from '@/components/itchat/Itchat'

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
