// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import './assets/iconfont.css'
import ToggleButton from 'vue-js-toggle-button'

import VueTippy, { TippyComponent } from 'vue-tippy'
import LongPress from 'vue-directive-long-press'
// import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'

import { Badge, Button, Select, TabPane, Link, Tabs, Timeline, TimelineItem, Input, Option, Row, Col, Popover, Card, Switch, Checkbox, Popconfirm, Tag, Divider, RadioGroup, RadioButton, InputNumber } from 'element-ui'
Vue.use(Button).use(Select).use(TabPane).use(Link).use(Tabs).use(Timeline).use(TimelineItem).use(Input)
  .use(Option).use(Row).use(Col).use(Popover).use(Card).use(Switch).use(Checkbox).use(Popconfirm).use(Tag).use(Divider)
  .use(RadioButton).use(RadioGroup).use(Badge).use(InputNumber)
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

// Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.use(VueClipboard)
Vue.directive('long-press', LongPress)
Vue.use(ToggleButton)
Vue.use(Toast, {
  type: 'center',
  duration: 3000,
  wordWrap: true,
  width: '350px',
  height: '300px'
})

Vue.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      // preventOverflow: {
      //   enabled: false
      // },
      // hide: { // 去除console.log警告
      //   enabled: false
      // }
    }
  }
})

Vue.component('tippy', TippyComponent)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.prototype.$http = axios
