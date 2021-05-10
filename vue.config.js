module.exports = {
  devServer: {
    proxy: {
      '/resouce': {
        target: 'http://192.168.110.228:3001',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/resouce': '' },
      }
    }
  }
}