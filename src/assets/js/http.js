/**
 * 参数说明（类型）
 * url（String）必填——发送请求的URL字符串 eg:"m=Webapp&a=getInewsList"
 * data（Object）选填 默认{}——发送到服务器的数据 eg:{key1:value1,key2:value2}
 * type（String）选填 默认post，可选项post|get|file
 * lock（Boolean）选填 默认false——加锁
 * locktime（Boolean）选填——加锁时间
 * showLoading（Boolean）选填——请求数据成功前显示 loading 提示框
 * host(String)选填——域名
 * baseUrl（string）选填——
 * wholeUrl(string) 选填——完整的接口地址
 * hideError(Boolean) 选填--默认false 是否显示错误提示信息
 * headers (Object) 选填--头部信息自定义
 */

 import '../icons/common.css' //字体图标

 import { Indicator, MessageBox, Toast } from 'mint-ui';
 
 import { Utils } from '@/assets/js/utils'
 
 var host = '';
 location.href.indexOf('http://h5.t.oeeee.com') !== -1 && (host = 'http://h5.oeeee.com');
 
 //资源请求
 let Http = {
     host,
     baseUrl: '/index.php?',
     lock: true,
     post(that, options = { data: {} }) {
         console.log(options)
         return new Promise((resolve, reject) => {
             let host = this.host ? this.host : '',
                 baseUrl = this.baseUrl,
                 type = options.type ? options.type : "post",
                 url = '', data = '',
                 postData = {
                     method: type == 'file' ? 'get' : (type == 'postFile') ? 'post' : type
                 };
             if (options.lock) {
                 if (!this.lock) return;
                 this.lock = false;
             }
             if (options.showLoading) {
                 Indicator.open('加载中...');
             }
             if (options.host) {
                 host = options.host;
             }
             if (options.baseUrl) {
                 baseUrl = options.baseUrl;
             }
             if (options.wholeUrl) {
                 url = options.wholeUrl
             } else {
                 url = host + baseUrl + options.url
             }
 
             postData.url = url;
 
             if (type == 'get') {
                 if (options.data) {
                     for (let key in options.data) {
                         data += '&' + key + '=' + options.data[key];
                     }
                     postData.url = url + data;
                 }
             } else if (type == 'postFile') {
                 let formdata = new FormData();
                 for (let key in options.data) {
                     if (key == "file") {
                         formdata.append(key, options.data[key], options.data["filename"]);
                     } else {
                         formdata.append(key, options.data[key]);
                     }
                 }
                 postData.params = formdata;
             } else {
                 postData.params = options.data ? options.data : "";
             }
             let _this = this;
             let httpData = [postData.url, postData.params];
             
             type == 'post' && httpData.push({ emulateJSON: true });
             type == 'postFile' && httpData.push({
                 headers: { 'Content-Type': 'multipart/form-data' }
             })
 
             if(options.headers){
                 httpData.push({ headers:{...options.headers} });
             }
 
             that.$http[postData.method](...httpData).then(function (res) {
                 let json = res.body;
                 //解锁
                 if (options.lock) {
                     if (options.locktime) {
                         setTimeout(() => {
                             _this.lock = true;
                         }, options.locktime);
                     } else {
                         _this.lock = true;
                     }
                 }
 
                 if (json.errcode === 0 || json.code === 1 || options.type == 'file' || options.type == 'jsonp' || (options.type === 'postFile' && (json.errcode === undefined || json.errcode === 0))) {
                     //数据返回成功
                     if (resolve) {
                         resolve(json);
                     }
                 } else {
                     if (!options.hideError) {
                         MessageBox.alert(json.errmsg || json.message).then(action => {
                             if (reject) {
                                 reject(json);
                             }
                         });
                     } else {
                         if (reject) {
                             reject(json);
                         }
                     }
                 }
                 // 隐藏加载loading图
                 if (options.showLoading) {
                     Indicator.close();
                 }
             }, function (res) {
                 if (!options.hideError) {
                     Toast({
                         message: "网络出错",
                         iconClass: 'iconfont-common icon-error',
                         duration: 2500
                     });
                 }
                 //解锁
                 if (options.lock) {
                     setTimeout(() => {
                         _this.lock = true;
                     }, options.locktime ? options.locktime : 0);
                 }
                 // 隐藏加载loading图
                 if (options.showLoading) {
                     Indicator.close();
                 }
                 if (reject) {
                     reject(json);
                 }
             });
         })
     },
     // 上传文件
     postFile(that, options = { data: {} }) {
         options.type = 'postFile';
         return this.post(that, options);
     },
     get(that, options = { data: {} }) {
         options.type = 'get';
         return this.post(that, options);
     },
     getFile(that, options = { data: {} }) {
         options.type = 'file';
         return this.post(that, options);
     },
 };
 export { Http }