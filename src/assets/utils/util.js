let Utils = {
    //检测是否在微信小程序环境
    isWeixinMiniProgram() {
        return new Promise((resolve, reject) => {
            if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
                document.addEventListener('WeixinJSBridgeReady', () => {
                    resolve({ 'miniprogram': window.__wxjs_environment === 'miniprogram' });
                }, false)
            } else {
                resolve({ 'miniprogram': window.__wxjs_environment === 'miniprogram' });
            }
        })
    },
    // 检测是否微信环境
    isWeixin() {
        let isWx = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
        if (!isWx) {
            return false
        } else {
            return isWx[0] === 'micromessenger'
        }
    },
    // 检测是否南都App
    isNdapp() {
        return navigator.userAgent.indexOf("nanduApp_ios") != -1 || navigator.userAgent.indexOf("nanduApp_android") != -1 || Utils.getCookieValue('isndapp') || (typeof (ndapp) != 'undefined' && ndapp.installed == 1) || (typeof (ndapp) != 'undefined' && ndapp.isndapp == 1);
    },
    // 检测是否N视频App
    isNvideoapp() {
        return window.navigator.userAgent.toLowerCase().match(/ndVideoApp/i)
    },
    //设置标题
    setPageTitle(title) {
        document.title = title;
    },
    // 设置Cookie
    setCookieValue(_Name, _Value, _Expires, _Type, _Domain) {
        let _LargeExpDate = new Date()
        if (typeof _Expires === 'number' && !isNaN(_Expires)) {
            if (_Expires !== 0) {
                if (typeof _Type === 'number' && !isNaN(_Type) && _Type) {
                    // 如果type为数字且 type不等0 则过期时间_Expires以秒为单位
                    _LargeExpDate.setTime(_LargeExpDate.getTime() + (_Expires * 1000))
                } else {
                    // 否则 过期时间_Expires以天为单位
                    _LargeExpDate.setTime(_LargeExpDate.getTime() + (_Expires * 24 * 3600 * 1000))
                }
            } else {
                _LargeExpDate = null
            }
        } else {
            // 如果没有传过期时间_Expires 则默认365天
            _LargeExpDate.setTime(_LargeExpDate.getTime() + (365 * 24 * 3600 * 1000))
        }
        document.cookie = _Name + '=' + escape(_Value) + (_LargeExpDate != null ? ';expires=' + _LargeExpDate.toGMTString() : '') + ';path=/' + (_Domain ? ';domain=' + _Domain : '')
    },
    // 获取Cookie
    getCookieValue(_Name) {
        let _search = _Name + '='
        if (document.cookie.length > 0) {
            let _offset = document.cookie.indexOf(_search)
            if (_offset !== -1) {
                _offset += _search.length
                let _end = document.cookie.indexOf(';', _offset)
                if (_end === -1) _end = document.cookie.length
                let _cook = document.cookie.substring(_offset, _end)
                return _cook.match(/%u/ig) ? unescape(_cook) : decodeURIComponent(_cook)
            } else return ''
        }
    },
    // 获取链接参数
    getParam(...args) {
        let u = args[1] || window.location.search
        let reg = new RegExp('(^|&)' + args[0] + '=([^&]*)(&|$)')
        let r = u.substr(u.indexOf('?') + 1).match(reg)
        return r != null ? r[2] : ''
    },
    // 过滤链接参数
    delParam(paramKey, _url) {
        let url = _url || window.location.href;    //页面url
        let urlParam = window.location.search.substr(1);   //页面参数
        let beforeUrl = url.substr(0, url.indexOf("?"));   //页面主地址（参数之前地址）
        let nextUrl = "";

        let arr = new Array();
        if (urlParam != "") {
            let urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
            for (let i = 0; i < urlParamArr.length; i++) {
                let paramArr = urlParamArr[i].split("="); //将参数键，值拆开
                //如果键雨要删除的不一致，则加入到参数中
                if (paramArr[0] != paramKey) {
                    arr.push(urlParamArr[i]);
                }
            }
        }
        if (arr.length > 0) {
            nextUrl = "?" + arr.join("&");
        }
        !beforeUrl && (beforeUrl = url);
        url = beforeUrl + nextUrl;
        return url;
    },
    // 加载Script
    loadScript(url, callback) {
        let head = document.getElementsByTagName('head')[0]
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        script.onload = script.onreadystatechange = function () {
            if ((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                callback && callback()
                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null
                if (head && script.parentNode) {
                    head.removeChild(script)
                }
            }
        }
        head.insertBefore(script, head.firstChild)
    },
    loadCss(src, callback) {
        // 带callback参数为兼容旧版本
        return new Promise((resolve, reject) => {
            let link = document.createElement('link');
            let head = document.getElementsByTagName('head')[0];
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = src;
            callback && callback()
            resolve();
            head.appendChild(link);
        })
    },
    //去掉所有的html标记
    delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, "");
    },
    openNvapp(options = {}) {
        if (options.applink) {
            location.href = '/p/download/preindex.html?applink=' + encodeURIComponent(options.applink);
        } else {
            location.href = '/p/download/preindex.html';
        }
    },
    previewImage(options = {}) {

    },
    //是否为开发环境
    isDevEnv() {
        if (process.env.NODE_ENV !== 'production') {
            return true;
        } else {
            return false;
        }
    },
    isIOS() {
        let userAgent = navigator.userAgent;
        return /(iPhone|iPad|iPod|iOS)/i.test(userAgent);
    },
    isAndroid() {
        let userAgent = navigator.userAgent;
        return /(Android)/i.test(userAgent);
    },
    isPc() {
        let userAgentInfo = navigator.userAgent;
        let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    //拼接url 为链接添加参数
    setUrlQuery(options) {
        let { url, query } = options;
        if (!url) return '';
        if (query) {
            let queryArr = [];
            for (const key in query) {
                if (query.hasOwnProperty(key)) {
                    queryArr.push(`${key}=${query[key]}`)
                }
            }
            if (url.indexOf('?') !== -1) {
                url = `${url}&${queryArr.join('&')}`
            } else {
                url = `${url}?${queryArr.join('&')}`
            }
        }
        return url;
    },
    // 获取京东图片处理参数
    // scale:缩放后长宽 如：200/200
    // clip：居中裁剪操作后宽度 如120/160
    getImgcrop(options = {}) {
        let param = '?x-oss-process=img';
        options.scale && (param += `/s/${options.scale}`);
        options.clip && (param += `/cc/${options.clip}`);
        return param;
    }
}

export { Utils }