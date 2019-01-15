import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import store from './config/store'
import FastClick from 'fastclick'

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
