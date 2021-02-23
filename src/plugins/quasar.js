import Vue from 'vue'
import '../styles/quasar.scss'
import lang from 'quasar/lang/zh-hans.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v4/mdi-v4.css'
import { Quasar, Dialog, Notify, Ripple } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2000
})

Vue.use(Quasar, {
  directives: { Ripple },
  config: {},
  plugins: { Dialog, Notify },
  lang
})
