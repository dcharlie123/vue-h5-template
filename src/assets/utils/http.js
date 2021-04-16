/**
 * 参数说明（类型）
 * url（String）必填——发送请求的URL字符串 eg:"m=Webapp&a=getInewsList"
 * data（Object）选填 默认{}——发送到服务器的数据 eg:{key1:value1,key2:value2}
 * type（String）选填 默认post，可选项post|get|file|postFile
 * lock（Boolean）选填 默认false——加锁
 * locktime（String）选填——加锁时间
 * showLoading（Boolean）选填——请求数据成功前显示 loading 提示框
 * host(String)选填——域名
 * baseUrl（string）选填——eg:'/app.php?'
 * wholeUrl(string) 选填——完整的接口地址
 * hideError(Boolean) 选填--默认false 是否显示错误提示信息
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import { Indicator, Toast } from 'mint-ui';
import '../icons/iconfont.css' //字体图标
Vue.use(VueResource)

//资源请求
let Http = {
    host: '',
    baseUrl: '/cache.php?',
    // baseUrl: '/mock/16/cache.php?',

    lock: true,
    post(options = { data: {} }) {
        options.type = 'post';
        return this.request(options);
    },
    get(options = { data: {} }) {
        options.type = 'get';
        return this.request(options);
    },
    // 获取文件 例如json文件
    getFile(options = { data: {} }) {
        options.type = 'file';
        return this.request(options);
    },
    // 上传文件
    postFile(options = { data: {} }) {
        options.type = 'postFile';
        return this.request(options);
    },
    request(options = { data: {} }) {
        return new Promise((resolve, reject) => {
            let host = this.host ? this.host : '',
                baseUrl = this.baseUrl,
                type = options.type ? options.type : "post",
                url = '', data = '',
                postData = {
                    method: type == 'file' ? 'get' : type == 'postFile' ? 'post' : type
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
            Vue.http[postData.method](...httpData).then(function (res) {
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
                if (json.errcode === 0 || options.type == 'file' || (options.type === 'postFile' && (json.errcode === undefined || json.errcode === 0))) {
                    //数据返回成功
                    if (resolve) {
                        resolve(json);
                    }
                } else {
                    if (!options.hideError) {
                        Toast({
                            message: json.errmsg,
                            iconClass: 'iconfont-common icon-error',
                            duration: 2500
                        });
                    }
                    if (reject) {
                        reject(json);
                    }

                }
                // 隐藏加载loading图
                if (options.showLoading) {
                    Indicator.close();
                }
            }, function (res) {
                if (!options.hideError) {
                    Toast({
                        message: res.statusText,
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
                    reject();
                }
            });
        })
    }
};
export { Http }