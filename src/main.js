import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './styles/general.scss'

Vue.config.productionTip = false

// 全局对话框组件
import dialog from './plugins/dialog'
Vue.use(dialog)

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
