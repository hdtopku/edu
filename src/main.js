// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboards from 'vue-clipboard2'
import axios from 'axios'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import './assets/iconfont.css'
import ToggleButton from 'vue-js-toggle-button'
import Element from 'element-ui'

Vue.use(Element, { size: 'small', zIndex: 3000 })

Vue.use(ToggleButton)
Vue.use(Toast, {
  type: 'center',
  duration: 800,
  wordWrap: true,
  width: '150px'
})

Vue.use(VueClipboards)

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
