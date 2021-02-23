import './plugins/vue-cookies'
import './plugins/talker'
import './plugins/quasar'
import './plugins/vue-snip'
import './plugins/plyr'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './styles/general.scss'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
