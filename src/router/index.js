import Vue from 'vue'
import Router from 'vue-router'
import Edu from '@/components/Edu'
import Jet from '@/components/jet/Jet'
import Test from '@/components/Test'
import Num from '@/components/Num'
import Itchat from '@/components/itchat/Itchat'
import V from '@/components/jet/V'

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
      component: Test
    },
    {
      path: '/num',
      name: 'num',
      component: Num
    },
    {
      path: '/j',
      name: 'j',
      component: Jet
    },
    {
      path: '/v',
      name: 'v',
      component: V
    },
    {
      path: '/itchat',
      name: 'itchat',
      component: Itchat
    }
  ]
})
