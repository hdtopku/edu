import Vue from 'vue'
import Router from 'vue-router'
import Edu from '@/components/Edu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/kfc',
      name: 'edu',
      component: Edu
    },
    {
      path: '/test',
      name: 'test',
      component: (resolve) => require(['@/components/Test'], resolve)
    },
    {
      path: '/num',
      name: 'num',
      component: (resolve) => require(['@/components/Num'], resolve)
    },
    {
      path: '/j',
      name: 'j',
      component: (resolve) => require(['@/components/jet/Jet'], resolve)
    },
    {
      path: '/v',
      name: 'v',
      component: (resolve) => require(['@/components/jet/V'], resolve)
    }
    // , {
    //   path: '/itchat',
    //   name: 'itchat',
    //   component: Itchat
    // }
  ]
})
