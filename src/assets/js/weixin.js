//weixin.js

import {Utils} from '@/assets/js/utils'

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
            console.log('hfhhhbhhghijjg',this.isWeixin())
        return new Promise((resolve, reject) => {
            if (!this.isWeixin()) return;
            if (!this.isInit) {
                Utils.loadScript('https://res.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
                    Utils.loadScript('https://m.mp.oeeee.com/helper.php?m=WxHelper&a=config&domain=oeeee.com', () => {
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
                    resolve({'miniprogram': window.__wxjs_environment === 'miniprogram'});
                }, false)
            } else {
                resolve({'miniprogram': window.__wxjs_environment === 'miniprogram'});
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
                    imgUrl: 'https://m.mp.oeeee.com/Public/Images/ndapp_logo.png'// 分享图标
                },
                data = Object.assign(d, options);

            let {title, desc, link, imgUrl} = data;

            // wx.updateAppMessageShareData(data);
            // wx.updateTimelineShareData(data);
            wx.onMenuShareTimeline({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    //todo 分享第二次未触发分享接口
                    resolve({type: 'wx_timeline'})
                }
            });
            wx.onMenuShareAppMessage({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    resolve({type: 'wx_chat'})
                }
            });
            wx.onMenuShareQQ({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    resolve({type: 'qq_chat'})
                }
            });
            wx.onMenuShareWeibo({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    resolve({type: 'wb'})
                }
            });
            wx.onMenuShareQZone({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    resolve({type: 'qq_zone'})
                }
            });
        })
    },
    // 跳微信授权
    oauth(options) {
        if (!this.isWeixin()) return;
        let d = {
                url: location.href,
                login: 0
            },
            data = Object.assign(d, options),
            _url = encodeURIComponent(data.url),

            c_wx_h5_service_visited = Utils.getCookieValue('wx_h5_service_visited'), // 1 访问过
            c_wxuid = Utils.getCookieValue('wx_h5_wxuid'),//在baseScope设的cookie
            c_wxunionid = Utils.getCookieValue('unionid'),//在infoScope4ND设的cookie
            c_wxsalt = Utils.getCookieValue('wx_h5_wxsalt'),
            c_wx_h5_nickname = Utils.getCookieValue('wx_h5_nickname') || Utils.getCookieValue('wxuname'),
            c_wxavatar = Utils.getCookieValue('wxavatar');
        if (Utils.getParam('wxOauth') == '' || data.login === 1) {
            //静默授权 '//m.mp.oeeee.com/user.php?m=WXOAuth2&a=baseScope&url2go=' + _url;
            if ((!c_wxunionid || !c_wxuid) && (c_wx_h5_service_visited != 1 || data.login === 1)) {
                location.href = '//m.mp.oeeee.com/user.php?m=WXOAuth2&a=infoScope4ND&regchannel=wechat_chat&url2go=' + _url
            }

        }
        return {
            wxuid: c_wxuid,
            wxunionid: c_wxunionid,
            wxsalt: c_wxsalt,
            wxnickname: c_wx_h5_nickname,
            wxavatar: c_wxavatar
        }

    },
    hideAllNonBaseMenuItem() {
        if (!this.isWeixin()) return;
        wx.hideAllNonBaseMenuItem();
    }
};

export {Weixin}