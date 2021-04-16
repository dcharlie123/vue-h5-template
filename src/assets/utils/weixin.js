//weixin.js

import { Utils } from '@/assets/utils/util'
import { MessageBox } from 'mint-ui';

//资源请求
let Weixin = {
    isInit: false,
    /**
     * 微信jssdk初始化
     * jsApiList：需要使用的JS接口列表 默认分享接口
     * */
    ready(options = {}) {
        let d = {
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        },
            data = Object.assign(d, options);
        return new Promise((resolve, reject) => {
            if (!this.isWeixin()) return;
            if (!this.isInit) {
                Utils.loadScript('https://res.wx.qq.com/open/js/jweixin-1.6.0.js', () => {
                    let version=new Date().getTime();
                    Utils.loadScript(`https://v.oeeee.com/user.php?m=WxHelper&a=config&domain=v.oeeee.com&v=${version}`, () => {
                        wx.config({
                            debug: false,
                            appId: oe_wxconfig.appId,
                            timestamp: oe_wxconfig.timestamp,
                            nonceStr: oe_wxconfig.nonceStr,
                            signature: oe_wxconfig.signature,
                            jsApiList: data.jsApiList
                        });
                        wx.ready(function () {
                            resolve();
                        });
                        wx.error(function (res) {
                            reject();
                        });
                        this.isInit = true;
                    })
                })
            } else {
                resolve();
            }
        })
    },
    //判断是否在微信小程序内
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
    /**
     * 微信分享
     * title:分享标题
     * desc:分享描述
     * link:分享链接
     * imgUrl:分享图标
     */
    share(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isWeixin()) return;
            let d = {
                title: document.title,// 分享标题
                desc: '',// 分享描述
                link: location.href,// 分享链接
                imgUrl: 'https://vimg.oeeee.com/static/logo_01.png'// 分享图标
            },
                data = Object.assign(d, options);

            let { title, desc, link, imgUrl } = data;

            // 过滤掉微信授权错误码
            link = Utils.delParam('WXOAuthErrCode', link);
            // wx.updateAppMessageShareData(data);
            // wx.updateTimelineShareData(data);
            wx.onMenuShareTimeline({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    //todo 分享第二次未触发分享接口
                    resolve({ type: 'wx_timeline' })
                }
            });
            wx.onMenuShareAppMessage({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    resolve({ type: 'wx_chat' })
                }
            });
            wx.onMenuShareQQ({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    resolve({ type: 'qq_chat' })
                }
            });
            wx.onMenuShareWeibo({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    resolve({ type: 'wb' })
                }
            });
            wx.onMenuShareQZone({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    resolve({ type: 'qq_zone' })
                }
            });
        })
    },
    // 获取token
    getToken(options = {}) {
        let key = options.key || 'default';
        return Utils.getCookieValue(`${key}_token`)
    },
    clearToken(options = {}) {
        let key = options.key || 'default';
        Utils.setCookieValue(`${key}_token`, '', -1, 0, '.oeeee.com');
        console.log(`已清除${key}_token`);
    },
    //  跳微信授权
    //  loginType 值为则1必须登录获取用户token 0不强制授权
    //  url 授权完跳转的链接
    //  key 授权类型(用来区别不同微信公众号) 默认值 default
    //  showError 是否弹出报错确认弹窗 默认值 true
    //  isBase 是否静默授权 默认:false
    oauth(options = {}) {
        if (!this.isWeixin()) return;
        let data = {
            url: location.href,
            loginType: 1,
            key: 'default',
            showError: true,
            isBase: false
        };
        Object.assign(data, options);
        let token = Utils.getCookieValue(`${data.key}_token`),
            url = `/user.php?m=WXOAuth2&a=index&scope=${data.isBase ? 'snsapi_base' : 'snsapi_userinfo'}&account_key=${data.key}&url=${encodeURIComponent(data.url)}`;
        // token不存在
        if (!token) {
            // 授权失败
            if (Utils.getParam('WXOAuthErrCode') === '1') {
                // 强制授权
                if (data.loginType === 1) {
                    if (data.showError) {
                        MessageBox.confirm('您需要确定登录才能使用该功能。').then(() => {
                            location.href = url;
                        }, () => {
                            console.log('用户取消了授权...');
                        });
                    }
                }
            } else {
                // 未授权
                location.href = url;
            }
        }
        return token;
    },
    //微信支付登录
    payLogin() {
        let d = {
            url: location.href
        },
            data = Object.assign(d, options),
            openId = Utils.getCookieValue('wx_nd_pay_wxuid');
        if (!openId) {
            location.href = 'http://api.ndapp.oeeee.com/friends.php?m=Pay&a=login&url2go=' + encodeURIComponent(data.url);
        }
        return {
            openId
        }
    },
    hideAllNonBaseMenuItem() {
        if (!this.isWeixin()) return;
        wx.hideAllNonBaseMenuItem();
    }
};

export { Weixin }