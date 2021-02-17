import Vue from 'vue'
import '../styles/quasar.scss'
import lang from 'quasar/lang/zh-hans.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v4/mdi-v4.css'
import { Quasar, Dialog, Notify } from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: { Dialog, Notify },
  lang
})