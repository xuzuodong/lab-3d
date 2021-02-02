import Vue from 'vue'
import DialogVue from './Dialog.vue'

let newInstance = null
//将 vue 组件变为构造函数
let DialogConstructor = Vue.extend(DialogVue)

let init = options => {
  // 实例化构造函数，然后将 options 注入
  newInstance = new DialogConstructor()
  Object.assign(newInstance, options)

  // 创建 DOM 节点并挂载
  let div = document.createElement('DIV')
  div.setAttribute('id', 'dialog')
  document.body.appendChild(div)
  document.getElementById('dialog').appendChild(newInstance.$mount().$el)
}

let caller = options => {
  if (!newInstance) {
    init(options)
  }
  return newInstance.show(vm => {
    newInstance = null
  })
}

export default {
  install(Vue) {
    Vue.prototype.$dialog = caller
  }
}
