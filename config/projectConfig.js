const glob = require('glob')
let pageNameArr = require('./project').pageNameArr
let pages = {}
// 页面中包含的块 (在vue.config.js中配置splitChunks，提出第三方库 )
const pageChunks = require('./pageChunks').pageChunks

module.exports.pages = function () {
    if (pageNameArr.length > 0) {
        pageNameArr.forEach(pageName => {
            let filespath = `src/pages/${pageName.name}/*.js`;
            if (pageName.name === "all") {
                // 打包所有
                filespath = `src/pages/*/*.js`;
            }
            glob.sync(filespath).forEach(filepath => {
                console.log(filepath);

                let fileList = filepath.split('/');

                let configFileName = fileList[fileList.length - 1].split('.')[0];
                let configPageName = fileList[fileList.length - 2].split('.')[0];

                if (configFileName == 'main') {
                    configFileName = 'index'
                }

                if (configFileName == 'router') {
                    return;
                }
                // 'chunk-common',
                let chunks = ['vendors','commons',`${configPageName}-${configFileName}`];

                if (pageChunks[`${configPageName}-${configFileName}`]) {
                    chunks = pageChunks[`${configPageName}-${configFileName}`];
                }
                // let chunks = ['chunk-vendors','chunk-common',`${configPageName}-${configFileName}`];
                console.log(chunks);


                pages[`${configPageName}-${configFileName}`] = {
                    entry: filepath,
                    // 模板来源
                    template: `src/pages/${configPageName}/${configFileName}.html`,
                    // template: 'public/index.html',
                    title: 'N视频',
                    // 在 dist/index.html 的输出
                    filename: `p/${configPageName}/${configFileName}.html`,
                    // 提取出来的通用 chunk 和 vendor chunk。
                    chunks
                }
            })
        })

    }

    return pages
};

