// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import axios from 'axios'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import './assets/iconfont.css'
import ToggleButton from 'vue-js-toggle-button'
import Element from 'element-ui'
import VueTippy, { TippyComponent } from 'vue-tippy'
import LongPress from 'vue-directive-long-press'

Vue.directive('long-press', LongPress)
Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.use(ToggleButton)
Vue.use(Toast, {
  type: 'center',
  duration: 800,
  wordWrap: true,
  width: '150px'
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

Vue.use(VueClipboard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.use(VueClipboards)
Vue.prototype.$http = axios
