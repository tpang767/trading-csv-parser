import Vue from 'vue'
import App from './App.vue'

require('./assets/css/skeleton.css')
require('./assets/css/normalize.css')

new Vue({
  el: '#app',
  render: h => h(App)
})
