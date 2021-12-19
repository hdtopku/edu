import Vue from 'vue'
import Router from 'vue-router'
// import Edu from '@/components/Edu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/1',
      component: (resolve) => require(['@/components/applemusic/AM'], resolve)
    },
    {
      path: '/crack168crack1688',
      name: 'edu',
      component: (resolve) => require(['@/components/Edu'], resolve)
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
    },
    {
      path: '/test',
      name: 'test',
      component: (resolve) => require(['@/components/Test'], resolve)
    },
    {
      path: '/ele',
      name: 'Eleme',
      meta: {
        title: '饿了么app每日翻倍红包'
      },
      component: (resolve) => require(['@/components/Eleme'], resolve)
    },
    {
      path: '/didi',
      name: 'Didi',
      meta: {
        title: '滴滴出行5折大红包'
      },
      component: (resolve) => require(['@/components/Didi'], resolve)
    },
    {
      path: '/mt',
      name: 'Meituan',
      meta: {
        title: '滴滴出行5折大红包'
      },
      component: (resolve) => require(['@/components/Meituan'], resolve)
    }
    // , {
    //   path: '/itchat',
    //   name: 'itchat',
    //   component: Itchat
    // }
  ]
})
