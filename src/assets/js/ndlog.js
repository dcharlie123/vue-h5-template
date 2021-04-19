//资源请求
import {Utils} from '@/assets/js/utils'
import {Http} from '@/assets/js/http'

let Ndlog = {
    kclog: 'https://m.mp.oeeee.com/Public/logs/log.gif?',
    eventlog: 'https://m.mp.oeeee.com/Public/logs/read.gif?',
    log: '',
    /**
     * ndUid 南都号id
     * pv 阅读数
     * timeStartLoad网页打开时的时间
     */
    sendKclog(options = {}) {
        if (this.log) {
            this.postKclog();
        } else {
            this.initLog(options);
            this.postKclog();
        }
    },
    sendEventlog(options = {}) {
        if (this.log) {
            this.postEventlog(options);
        } else {
            this.initLog(options);
            this.postEventlog(options);
        }
    },
    postKclog() {
        this.getSex().then((sex) => {
            let pic = new Image();
            this.log += '&kcsex=' + sex;
            this.kclog += this.log;
            pic.src = this.kclog;
        })
    },
    postEventlog(options={}) {
        console.log(options);
        window.addEventListener('unload', ()=>{
            let pic = new Image();
            let pt = new Date().getTime() - options.timeStartLoad;
            this.eventlog += this.log;
            this.eventlog += '&rt='+pt;
            pic.src = this.eventlog;
        })

    },
    initLog(options = {}) {
        let nduid = options.ndUid,//南都号id
            logId=options.logId,//日志id
            pv = options.pv,//阅读数
            time_start_load = options.timeStartLoad;//网页打开时的时间

        let OS = this.jungleOS(),
            bo = this.jungleBo(),
            phone = this.junglePhone(),
            ndlayer = Utils.getParam('layer') == '' ? 1 : Utils.getParam('layer');
        let lastView = Utils.getCookieValue('last_view_time');
        lastView = lastView ? lastView : 0;
        let interval = lastView ? time_start_load - lastView : 0;

        let _width = window.screen.width * window.devicePixelRatio,
            _height = window.screen.height * window.devicePixelRatio;
        let curl = window.location,
            device = _height + "*" + _width,
            ref = document.referrer;
        curl = escape(curl);

        if ((ref == "") || (ref == "[unknown origin]") || (ref == "unknown") || (ref == "undefined"))
            ref = null;
        ref = escape(ref);
        let ctime = Date.now();

        let kcsource = 'ndapp';

        let kcchannel;
        var ndfrome = Utils.getParam('ndfrom');
        if (Utils.isNdapp()) {
            kcchannel = 'app'
        } else if (ndfrome) {
            kcchannel = ndfrome;
        } else if (Utils.isWeixin()) {
            kcchannel = 'wx'
        } else {
            kcchannel = 'web';
        }

        this.log = 'appId=nandu&os=' + OS + '&bv=' + bo + '&url=' + curl + '&ds=' + device + '&su=' + ref + '&pv=' + pv + '&lastview=' + lastView + '&viewinterval=' + interval + '&lt=' + ctime + '&uid=' + Utils.getCookieValue('mmp_uid') + '&layer=' + ndlayer + '&wxuid=' + Utils.getCookieValue('wxuid') + '&wxunionid=' + Utils.getCookieValue('unionid') + '&wxuserid=' + Utils.getCookieValue('oe_uid') + '&bl=' + Utils.getParam('bl') + '&kcscene=' + Utils.getParam('from') + '&dbrand=' + phone + '&nduid=' + nduid+'&docid='+logId+'&kcsource='+kcsource+'&kcchannel='+kcchannel;

        //设置最后一次访问该网站时间
        Utils.setCookieValue('last_view_time', time_start_load, 365 * 10);
    },
    //获取操作系统类型
    jungleOS() {
        var OS, userAgent = navigator.userAgent;
        if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
            OS = 'IOS';
        } else if (/(Android)/i.test(userAgent)) {
            OS = 'Android';
        } else {
            OS = 'pc';
        }
        return OS;
    },
    //获取浏览器类型
    jungleBo() {
        var bo, s, browser = {};
        var userAgent = navigator.userAgent.toLowerCase();
        (s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] : (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = userAgent
            .match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
        var version = "";
        if (browser.ie) {
            version = 'IE ' + browser.ie;
        } else if (browser.firefox) {
            version = 'FireFox ' + browser.firefox;
        } else if (browser.chrome) {
            version = 'chrome ' + browser.chrome;
        } else if (browser.opera) {
            version = 'opera ' + browser.opera;
        } else if (browser.safari) {
            version = 'safari ' + browser.safari;
        } else {
            version = 'Unknow';
        }
        bo = escape(version);
        return bo;
    },
    //获取手机型号
    junglePhone() {
        var ua = navigator.userAgent.toLowerCase();
        var phone = 'undefined';
        var _width = window.screen.width * window.devicePixelRatio;
        var _height = window.screen.height * window.devicePixelRatio;
        if (/(ipad)/i.test(ua)) {
            phone = 'ipad';
        } else if (/(iphone)/i.test(ua)) {
            if (_width == 640 && _height == 960) {
                phone = 'iphone4';
            } else if (_width == 640 && _height == 1136) {
                phone = 'iphone5';
            } else if (_width == 750 && _height == 1334) {
                phone = 'iphone6/6s/7';
            } else if (_width == 1242 && _height == 2208) {
                phone = 'iphone6p/6sp/7p';
            }
        } else if (/(windows phone)/i.test(ua)) {
            if (/(nokia)/i.test(ua)) {
                phone = 'nokia';
            } else {
                phone = 'hp';
            }
        } else if (/(android)/i.test(ua)) {
            if (/(sm-)/i.test(ua) || /(gt-)/i.test(ua) || /(sch-)/i.test(ua)) {
                phone = 'samsung';
            } else if (/(huawei)/i.test(ua) || /(honor)/i.test(ua)) {
                phone = 'huawei';
            } else if (/(redmi)/i.test(ua) > 0 || /(HM)/.test(ua)) {
                phone = 'redmi';
            } else if (/(MI)/.test(ua)) {
                phone = 'xiaomi';
            } else if (/(vivo)/i.test(ua)) {
                phone = 'vivo';
            } else if (/(oppo)/i.test(ua)) {
                phone = 'oppo';
            } else if (/(lenovo)/i.test(ua)) {
                phone = 'lenovo';
            } else if (/(coolpad)/i.test(ua)) {
                phone = 'coolpad';
            } else if (/(Le)/.test(ua)) {
                phone = 'letv';
            } else if (/(gionee)/i.test(ua)) {
                phone = 'gionee';
            } else if (/(meizu)/i.test(ua) || /(MX)/.test(ua)) {
                phone = 'meizu';
            } else {
                phone = 'other';
            }
        }
        return phone;
    },
    //获取用户性别
    getSex() {
        return new Promise((resolve, reject) => {
            let sex = 0;
            if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
                let openid = Utils.getCookieValue('wx_nd_wxuid');
                sex = Utils.getCookieValue('nd_wxSex');
                if (openid != '' && sex === '') {
                    Http.post(this, {
                        baseUrl: '/user.php?',
                        url: 'm=WxAnalyse&a=wxsex',
                        data: {openid: openid}
                    }).then((res) => {
                        resolve(res.data.sex);
                    }, () => {
                        resolve(sex)
                    })
                } else {
                    resolve(sex)
                }
            } else {
                resolve(sex)
            }
        })

    }
};

export {Ndlog}