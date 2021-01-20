# lab-3d
这是 Lab 3D 虚拟实验平台的前端项目，用户可以在平台上体验使用 Web 3D 技术开发的虚拟实验，学习科学知识。

## 简介

### 技术栈
平台使用了 Vue 2.x + Vue CLI + Vue Router + Vuex 技术栈；虚拟实验均采用 Babylon.js 作为 3D 引擎。

### 项目运行
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

## 项目结构
项目结构及其作用如下所示，因为是 Vue CLI 生成的，遵循了 [Vuex 官方的项目结构示例](https://vuex.vuejs.org/zh/guide/structure.html)，因此较为规范：

├── node_modules/        # npm 包及其依赖
│   └── ... 
├── public/              # 打包时会把该文件夹下的资源原封不动地复制到 dist 文件夹下
│   └── ... 
├── src/                 # 所有源代码都写在这个文件夹里面
│   ├── api/                 # 存放调用后端接口的代码
│   ├── assets/              # 存放源码中引用的静态资源，如平台 logo 图片等
│   ├── components/          # 存放所有会被复用的 Vue 组件，如通用样式的按钮等
│   ├── experiments/         # 按文件夹存放虚拟实验的源码
│   │   ├── neutralization/      # 《中和反应》虚拟实验的源码
│   │   └── ... 
│   ├── plugins/             # 存放插件，包括自己写的插件和第三方插件
│   │   ├── dialog/              # 对话树插件，用于在虚拟实验中和玩家对话
│   │   └── ... 
│   ├── router/              # 存放路由信息
│   ├── store/               # 存放 Vuex 公共状态管理的代码
│   ├── styles/              # 存放公共样式
│   ├── views/               # 存放非复用的 Vue 组件
│   ├── App.vue          # Vue 根组件
│   └── main.js          # 源码入口 
└── ...                  # 根目录下其他的文件暂时不需要关心
