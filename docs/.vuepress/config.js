module.exports = {
  title: 'Lab 3D 前端开发文档',
  themeConfig: {
    nav: [
      { text: '前端开发文档', link: '/' },
      { text: 'Github', link: 'https://github.com/xuzuodong/lab-3d' },
      { text: '后端接口文档', link: 'http://api.lab3d.site:3001/swagger' }
    ],

    sidebar: [
      {
        title: '概述',
        collapsable: false,
        path: '/'
      },
      {
        title: '虚拟实验',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          'experiments/introduction',
          'experiments/get-started',
          'experiments/talker',
          'experiments/api',
        ]
      }
    ],

    lastUpdated: '上次更新'
  }
}
