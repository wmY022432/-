const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api': {
        target: 'http://192.168.136.129:8000/',
         pathRewrite: {
         '^/api': ''
         },
         changeOrigin: true,
         ws: true,
      },
      '/aps': {
        target: 'http://192.168.136.129:8888/',
         pathRewrite: {
         '^/aps': ''
         },
         changeOrigin: true,
         ws: true,
      },
    }
  }
})



