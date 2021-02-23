# 介绍

欢迎来到 Lab 3D 开发文档！

## 项目启动

首次将项目下载到本地时，需先进行安装（确保电脑上装了 node.js 和 npm）：

```
npm install
```

通过以下命令进行开发环境编译与热重载：

```
npm run serve
```

通过以下命令构建可部署于生产环境的代码：

```
npm run build
```

## 项目部署

### 生产环境

将 `/dist` 中的文件存放至服务器 `/home/html` 目录，然后通过 [www.lab3d.site](http://www.lab3d.site) 访问。

### 测试环境

将 `/dist` 中的文件存放至服务器 `/home/beta` 目录，然后通过 [beta.lab3d.site](http://beta.lab3d.site) 访问。

## 重要依赖

### 框架

项目使用了 [Vue 2.x](https://cn.vuejs.org/v2/guide/) 作为框架，并使用 Vue CLI 提供标准化目录结构。

### UI

使用了 [Quasar](https://quasar.dev/) 作为 UI 框架。可以参看第三方维护的[中文文档](http://quasarchs.com/)，但版本略为落后。

### 路由

使用了 [Vue Router](https://router.vuejs.org/zh/) 来控制路由。

### 网络请求 API

Lab 3D 包含于后端的数据交换，使用了 [Axios](http://www.axios-js.com/zh-cn/docs/) 来处理网络请求，并使用 [Vuex](https://vuex.vuejs.org/zh/) 作为数据交换中间层。

### 3D 引擎

虚拟实验均采用 [Babylon.js](https://www.babylonjs.com) 作为 3D 引擎。

## 理解项目结构

项目结构及其作用如下所示：

```
├── node_modules/        # npm 包及其依赖
│   └── ...
├── public/              # 打包时会把该文件夹下的资源原封不动地复制到 dist 文件夹下
│   └── ...
├── src/                 # 所有源代码都写在这个文件夹里面
│   ├── api/                 # 存放调用后端接口的代码
│   ├── assets/              # 存放源码中引用的静态资源，如平台 logo 图片等
│   ├── components/          # 存放所有会被复用的 Vue 组件，如通用样式的按钮等
│   ├── experiments/         # 按文件夹存放虚拟实验的源码
│   │   ├── example-xxx/         # 虚拟实验的教程
│   │   ├── neutralization/      # 《中和反应》虚拟实验的源码
│   │   ├── ...
│   │   └── BabylonApp.js        # 公共组件，帮助在 Vue 组件中快速初始化一个 Babylon 场景
│   ├── plugins/             # 存放插件，包括自己写的插件和第三方插件
│   │   ├── talker/              # 对话树插件，用于在虚拟实验中和玩家对话
│   │   ├── talker.js            # Vue 全局注册该插件
│   │   ├── vue-cookies.js       # Vue 全局注册该插件
│   │   └── ...
│   ├── router/              # 存放路由信息
│   ├── store/               # 存放 Vuex 公共状态管理的代码
│   ├── styles/              # 存放公共样式
│   ├── views/               # 存放非复用的 Vue 组件
│   ├── App.vue          # Vue 根组件
│   └── main.js          # 源码入口
└── ...                  # 根目录下其他的文件暂时不需要关心
```
