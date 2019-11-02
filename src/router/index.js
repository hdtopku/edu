import Vue from 'vue'
import Router from 'vue-router'
import edu from '@/components/edu'
import test from '@/components/test'

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
    }
  ]
})
