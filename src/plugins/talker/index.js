import Vue from 'vue'
import TalkerVue from './Talker.vue'

let newInstance = null
//将 vue 组件变为构造函数
let DialogConstructor = Vue.extend(TalkerVue)

let init = (options) => {
  // 实例化构造函数，然后将 options 注入 vm 实例
  newInstance = new DialogConstructor()

  // options 中的 paragraph (若有) 注入 data 中
  Object.assign(newInstance, { paragraph: options.paragraph })

  // options 中的其他字段注入 props 中
  delete options.paragraph
  const props = Vue.observable({
    ...newInstance._props,
    ...options
  })
  newInstance._props = props

  // 创建 DOM 节点并挂载
  let div = document.createElement('DIV')
  div.setAttribute('id', 'talker')
  document.body.appendChild(div)
  document.getElementById('talker').appendChild(newInstance.$mount().$el)
}

let caller = (options) => {
  if (!newInstance) init(options)
  return newInstance.mount((vm) => {
    newInstance = null
  })
}

export default {
  install(Vue) {
    Vue.prototype.$talker = caller
  }
}
