import Vue from 'vue'
import App from './App'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider: createProvider(),
  render: h => h(App)
})
