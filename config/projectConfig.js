const glob = require('glob')
let pageName = require('./project')

let pages = {}

module.exports.pages = function (){
    glob.sync(`src/pages/${pageName.name}/*.js`).forEach(filepath => {
        let fileList = filepath.split('/');
    
        let configFileName = fileList[fileList.length - 1].split('.')[0];
    
        if(configFileName == 'main'){
            configFileName = 'index'
        }
        
        if(configFileName == 'router') return;
        
        pages[configFileName] = {
            entry: filepath,
            // 模板来源
            template: `src/pages/${pageName.name}/${configFileName}.html`,
            // template: 'public/index.html',
            title:'南方都市报',
            // 在 dist/index.html 的输出
            filename: `${configFileName}.html`,
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', configFileName]
        }
    })
    return pages
};
module.exports.assetsDir = pageName.name;

