let pageMethod = require('./config/projectConfig.js'),
    dirArr = pageMethod.assetsDir.split('/');
pages = pageMethod.pages();
const CompressionWebpackPlugin=require('compression-webpack-plugin');
assetsDir=dirArr[dirArr.length-1];

const path = require("path");
console.log(`${assetsDir}.html`)
module.exports = {
    pages,
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist',
    assetsDir:'static',
    //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: true,
    devServer: {
        //和filename一样，默认打开启动的文件名，不用再去手动输入
        index: `${assetsDir}.html`,
        //host: '127.0.0.1', // 指定使用一个 host。默认是 localhost
        proxy: {
            '/index.php': {
                target: 'http://h5.oeeee.com/index.php',
                changeOrigin: true
            }
        }
    },
    chainWebpack: config => {

    },
    configureWebpack: config => {
        const myConfig = {};
        
        if (process.env.NODE_ENV === 'production') {
        myConfig.plugins = []
          // 为生产环境修改配置...
          myConfig.plugins.push(
            new CompressionWebpackPlugin({
              test: /\.(js|css|json|txt|html|ico|svg|less)(\?.*)?$/i,
              threshold: 8192,
              minRatio: 0.8
            })
          )

        }
        return myConfig
      }
}