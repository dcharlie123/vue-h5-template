let pageMethod = require('./config/projectConfig.js');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
pages = pageMethod.pages();
module.exports = {
    pages,
    publicPath: process.env.NODE_ENV === 'production' ? '../../' : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
        proxy: {
            
        }
    },
    chainWebpack: config => {

    },
    configureWebpack: config => {
        let splitChunks = {
            chunks: 'all',
            cacheGroups: {
                'commons': {
                    name: 'commons',
                    minChunks: 2,
                    priority: -10,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
        config.optimization.splitChunks = splitChunks;
        /*
        if (process.env.NODE_ENV === 'production') {
            //  配置productionGzip-高级的方式
            // 配置参数详解
            // asset： 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
            // algorithm： 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
            // test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
            // threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
            // minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
        }
        */
    }
}