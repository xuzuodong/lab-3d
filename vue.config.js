module.exports = {
  chainWebpack: (config) => {
    // 规定 .glb 文件使用 url-loader 导入
    config.module
      .rule('glb')
      .test(/\.glb$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 0,
        outputPath: 'assets/'
      })
      .end()
    config.plugin('html').tap((args) => {
      args[0].title = 'Lab 3D - 体验炫酷的科学实验！'
      return args
    })
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: ['quasar'],
}
