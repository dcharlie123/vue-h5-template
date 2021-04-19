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
    //设置标题
    setPageTitle(title) {
        document.title = title;
    },
    // 设置Cookie
    setCookieValue(_Name, _Value, _Expires, _Type) {
        let _LargeExpDate = new Date()
        if (typeof _Expires === 'number' && !isNaN(_Expires)) {
            if (_Expires !== 0) {
                if (typeof _Type === 'number' && !isNaN(_Type) && _Type) {
                    _LargeExpDate.setTime(_LargeExpDate.getTime() + (_Expires * 1000))
                } else {
                    _LargeExpDate.setTime(_LargeExpDate.getTime() + (_Expires * 24 * 3600 * 1000))
                }
            } else {
                _LargeExpDate = null
            }
        } else {
            _LargeExpDate.setTime(_LargeExpDate.getTime() + (365 * 24 * 3600 * 1000))
        }
        document.cookie = _Name + '=' + escape(_Value) + (_LargeExpDate != null ? ';expires=' + _LargeExpDate.toGMTString() : '') + ';path=/'
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
    // 获取浏览器参数
    getParam(...args) {
        let u = args[1] || window.location.search
        let reg = new RegExp('(^|&)' + args[0] + '=([^&]*)(&|$)')
        let r = u.substr(u.indexOf('?') + 1).match(reg)
        return r != null ? r[2] : ''
    },
    // 加载Script
    loadScript(url, callback) {
        return new Promise((resolve, reject) => {
            let head = document.getElementsByTagName('head')[0]
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = url
            script.onload = script.onreadystatechange = function () {
                if ((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                    callback && callback()
                    resolve();
                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null
                    if (head && script.parentNode) {
                        head.removeChild(script)
                    }
                }
            }
            script.onError=function(err){
                callback && callback(err)
                reject(err)
            }
            head.insertBefore(script, head.firstChild)
        })
    },
    //去掉所有的html标记
    delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, "");
    },
    openNdapp(options = {}) {
        if (options.applink) {
            location.href = 'http://m.mp.oeeee.com/h5/pages/v19/applink?ext_link_jsonpack=' + encodeURIComponent(options.applink);
        } else {
            location.href = 'http://m.mp.oeeee.com/h5/pages/v19/applink/';
        }
    },
    previewImage(options = {}) {

    },
    //是否为开发环境
    isDevEnv() {
        if (process.env.NODE_ENV === 'development') {
            return true;
        } else {
            return false;
        }
    },
    isPc() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    isIOS() {
        let userAgent = navigator.userAgent;
        return /(iPhone|iPad|iPod|iOS)/i.test(userAgent);
    },
    isAndroid() {
        let userAgent = navigator.userAgent;
        return /(Android)/i.test(userAgent);
    },
    timeFormat(ptime) {
        //ptime 2019-08-27 16:09:02
        let ptimeArr = ptime.split(' '),
            time = ptimeArr[0];
        if (ptimeArr[1]) {
            let timeArr = ptimeArr[1].split(':'),
                h = timeArr[0],
                m = timeArr[1],
                s = timeArr[2];
            if (s === '00') {
                if (m === '00') {
                    if (h !== '00') {
                        time += ' ' + h + '时';
                    }
                } else {
                    time += ' ' + h + ':' + m;
                }
            } else {
                time += ' ' + h + ':' + m + ':' + s;
            }
        }
        return time;
    },
    removeBodyTouchMove() {
        document.body.addEventListener(
            "touchmove",
            function (e) {
                e.preventDefault();
            },
            { passive: false }
        );
    },
   
}

export { Utils }