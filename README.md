# ndvideo_vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run d demo

打开http://localhost:xxxx/p/文件夹名/文件名，
如：http://localhost:8080/p/demo/index.html 
开始开发
```


### Compiles and minifies for production
```
打包demo模块
npm run b demo

打包demo、paike、space模块
npm run b demo,paike,space

打包pages目录下所有模块
npm run b all
```

### 部署多页面的目录结构
```
├── demo
├──├── README.md
├──├── detail.html      # 输出的文件名
├──├── detail.js        # 对应detial.html文件
├──├── detail.vue       # detail.js中引入detail.vue
├──├── index.html      # 输出的文件名
├──├── index.js        # 对应index.html文件
└──└── index.vue       # index.js中引入index.vue

开发时打开http://localhost:xxxx/文件名，如http://localhost:xxxx/detail
```

### 指定部署的文件名
```
// 默认文件结构
├── demo
├──├── README.md
├──├── index.html
├──├── main.js         # main.js会自动匹配输出index.html
└──└── App.vue

// 指定文件名
├── demo
├──├── README.md
├──├── detail.html     # 修改文件名
├──├── detail.js       # 注意原来的main.js需要更改为相同名字
└──└── App.vue

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


###使用插件：
### vue-router
路由管理器
文档地址（https://router.vuejs.org/zh/）

### vue-resource
资源请求插件github地址（https://github.com/pagekit/vue-resource）

### mint-ui
移动端组件库github地址（https://github.com/ElemeFE/mint-ui）
文档地址（http://mint-ui.github.io/docs/#/）

### 打包出来的公共静态文件放在"./dist/common"目录下
### lib-flexible
屏幕自适应插件（https://github.com/amfe/lib-flexible）

### postcss-px2rem-exclude
将px转化为rem，
直接写 px ，编译后会直接转化成rem —— 除开下面两种情况，其他长度用这个
在 px 后面添加 /*no*/ ，不会转化 px，会原样输出。 —— 一般border需用这个
在 px 后面添加 /*px*/ ，会根据 dpr 的不同，生成三套代码。—— 一般字体需用这个
./node_modules/postcss-px2rem-exclude/lib/index.js代码有点问题修改为如下
var postcss = require('postcss');
var Px2rem = require('px2rem');

module.exports = postcss.plugin('postcss-px2rem-exclude', function (options) {
  return function (css, result) {
    try{
      var flag=options.exclude.includes('/')
        if(flag){
            var arr =options.exclude.split('/')
            options.exclude=new RegExp(arr[1],arr[2])
        }
    }catch (e) {

    }
    if (options.exclude && css.source.input.file.match(options.exclude) !== null) {
      result.root = css;
      return
    }
    var oldCssText = css.toString();
    var px2remIns = new Px2rem(options);
    var newCssText = px2remIns.generateRem(oldCssText);
    result.root = postcss.parse(newCssText)
  }
});

###animation.css
动画效果
https://daneden.github.io/animate.css/
https://github.com/daneden/animate.css

https://github.com/julianshapiro/velocity
https://github.com/julianshapiro/velocity/wiki

###mockjs
生成随机数据，拦截 Ajax 请求
文档地址：http://mockjs.com/

###videojs
视频播放器
文档：https://videojs.com/

###vue-cropperjs
图片裁切插件
https://github.com/fengyuanchen/cropperjs#options

###vue-upload-component
文件上传插件
https://github.com/lian-yue/vue-upload-component

###x2js
xml转为json

###京东云图片处理
文档：https://docs.jdcloud.com/cn/object-storage-service/image-access-rules

