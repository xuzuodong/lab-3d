module.exports = {
  title: 'Lab 3D 开发文档',
  themeConfig: {
    nav: [
      { text: '文档', link: '/' },
      { text: '后端接口', link: 'http://api.lab3d.site:3001/swagger' },
    ],
    sidebar: [
      {
        title: '起步',
        collapsable: false,
        sidebarDepth: 2,
        children: ['/', '/experiments/']
      }
    ], 
    lastUpdated: '上次更新', 
  }
}
