//资源请求
import {Utils} from '@/assets/js/utils'
import {MessageBox} from 'mint-ui';

let Ndapp = {
    /**
     * 南都号用户token
     */
    token: '',
    ready() {
        return new Promise((resolve, reject) => {
            if (!this.isNdapp()) {
                return;
            }
            var num = 0,
                time = setInterval(function () {
                    if (num > 100) {
                        if (reject) {
                            reject();
                        }
                        clearInterval(time);
                    }
                    try {
                        if (ndapp && ndapp.installed) {
                        }
                    } catch (e) {
                        num++;
                        return;
                    }
                    if (resolve) {
                        resolve();
                    }
                    clearInterval(time);
                }, 100);
        })
    },

    /* 检查当前客户端版本是否支持指定JS接口
     * name     Array   长度为1时，将直接返回成功(then)或失败(catch)
     *                  长度大于1时，将以键值对的形式返回，可用的api值true，不可用为false
      *showMsg  Boolean 默认true，检查单个接口且当前版本不支持该接口时，弹窗提示
      * */
    checkJsApi(options = {}){
        return new Promise((resolve, reject) => {
            if (!this.isNdapp()) {
                if (reject) {
                    reject();
                }
                return;
            }

            const name = options.name,
                showMsg = true;

            options.showMsg === false && (showMsg === false);

            if(name.length > 1) {
                // 需要检查的JS接口大于1个时
                let returnArr = {};
                for (let i in name) {
                    if (ndapp[name[i]] != undefined) {
                        returnArr[name[i]] = true;
                    }else{
                        returnArr[name[i]] = false;
                    }
                }
                if(resolve) {
                    resolve(returnArr);
                }
            }else {
                // 需要检查的JS接口等于1个时
                if (ndapp[name] != undefined) {
                    if (resolve) {
                        resolve();
                    }
                } else {
                    if (reject) {
                        reject();
                    }
                    if (showMsg) {
                        MessageBox.confirm('您当前的使用的客户端版本太低，无法支持该功能。请更新到最新版本！');
                    }
                }
            }
        })
    },

    // 检测是否南都App
    isNdapp() {
        return navigator.userAgent.indexOf("nanduApp_ios") != -1 || navigator.userAgent.indexOf("nanduApp_android") != -1 || Utils.getCookieValue('isndapp') || (typeof(ndapp) != 'undefined' && ndapp.installed == 1) || (typeof(ndapp) != 'undefined' && ndapp.isndapp == 1);
    },
    /**
     * 获取用户设备id
     */
    getPushToken(options = {}) {
        if (!this.isNdapp()) {
            return;
        }
        try {
            let token = ndapp.pushtoken;
            return token;
        } catch (e) {
        }
    },

    /*
    * 获取南都app token
    * */
    getToken(options = {}) {
        options = Object.assign({
            isLogin: false //默认不需要去登录
        }, options)
        if (!this.isNdapp()) {
            return;
        }
        let token = this.token;
        if (!token) {
            if (ndapp.user.token) {
                token = ndapp.user.token;
            } else {
                if (options.isLogin) {
                    this.login(options);
                }
            }
        }
        return token;
    },
    login(options = {}) {
        MessageBox.confirm('您还未登录，确定前往登录?').then(() => {
            ndapp.login(location.href);
        }, () => {
            if (options.error) {
                options.error.call();
            }
        });
    },

    /**
     * 设置app分享内容
     * title    String    分享标题
     * desc    String    分享描述
     * imgUrl    String    分享图标
     * link    String    分享地址
     */
    onMenuShareAll(options = {}) {
        this.showShareMenuItems({has: true});
        this.checkJsApi({
            name: ['onMenuShareAll']
        }).then(()=>{
            let d = {
                    title: document.title,// 分享标题
                    desc: '',// 分享描述
                    link: location.href,// 分享链接
                    imgUrl: 'https://m.mp.oeeee.com/Public/Images/ndapp_logo.png'// 分享图标
                },
                data = Object.assign(d, options);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                data.link = encodeURIComponent(data.link)
            }
            ndapp.onMenuShareAll(data.title, data.desc, data.imgUrl, data.link);
        })
    },

    /**
     * 是否显示分享
     * has    Boolean    1显示0隐藏
     */
    showShareMenuItems(options = {}) {
        var opts = {};
        opts.has = options.has ? 1 : 0;

        this.checkJsApi({
            name: ['showShareMenuItems']
        }).then(()=>{
            ndapp.showShareMenuItems(opts.has);
        })
    },

    /**
     * 触发用户转发，调起分享菜单
     */
    openShareMenu() {
        this.checkJsApi({
            name: ['openShareMenu']
        }).then(()=>{
            ndapp.openShareMenu();
        })
    },

    /**
     * 设置分享内容并调起分享菜单
     * title    String    分享标题
     * desc    String    分享描述
     * imgUrl    String    分享图标
     * link    String    分享地址
     */
    openShareMenuAndSet(options = {}) {
        this.checkJsApi({
            name: ['openShareMenuAndSet']
        }).then(()=>{
            let d = {
                    title: document.title,// 分享标题
                    desc: '',// 分享描述
                    link: location.href,// 分享链接
                    imgUrl: 'https://m.mp.oeeee.com/Public/Images/ndapp_logo.png'// 分享图标
                },
                data = Object.assign(d, options);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                data.link = encodeURIComponent(data.link)
            }
            ndapp.openShareMenuAndSet(data.title, data.desc, data.imgUrl, data.link);
        })
    },

    /**
     * 设置分享内容并触发用户分享到某渠道
     * type(必填)：card    分享卡片
     *          wxFriend 微信朋友
     *          wxTimeline 微信朋友圈
     *          weibo  微博
     *          qq     QQ
     *          qZone  QQ空间
     * title        分享标题, 如无传空字符串
     * desc         分享描述, 如无传空字符串
     * imgUrl       分享图标, 如无传空字符串
     * link         分享地址, 如无传空字符串
     */
    onShareApp(options = {}) {
        this.checkJsApi({
            name: ['onShareApp']
        }).then(()=>{
            let {type, title, desc, imgUrl, link} = options;
            title = title ? title : "";
            desc = desc ? desc : "";
            imgUrl = imgUrl ? imgUrl : "";
            link = link ? link : "";
            ndapp.onShareApp(type, title, desc, imgUrl, link);
        })
    },

    /**
     *保留当前页面，跳转到应用内的某个页面
     * type:userspace 南都号空间
     *      doc 稿件详情（文字稿件和视频稿件）
     *      topic 主题（小圈）页
     * */
    navigateTo(options = {}) {
        if (!this.isNdapp()) {
            return;
        }
        let {type, id} = options;

        this.checkJsApi({
            name: ['navigateTo'],
        }).then(()=>{
            ndapp.navigateTo(JSON.stringify(options));
        }).catch(()=>{
            try {
                switch(type) {
                    //稿件详情页
                    case 'doc':
                        if(Utils.isAndroid()){
                            ndaapp.opennews(id);
                        }else if(Utils.isIOS()){
                            location.href='news:'+id;
                        }
                        break;
                    //南都号空间
                    case 'zone':
                        ndapp.user.user_space(id);
                        break;
                    //主题（小圈）
                    case 'topic':
                        ndapp.openTopic(id);
                        break;
                    //视频沉浸页
                    case 'video':
                        this.checkJsApi({
                            name: ['openvideo'],
                        }).then(()=>{
                            ndapp.openvideo(id);
                        })
                        break;

                    default:
                        console.log('Error',type+'粉胖子还没开发该功能哦')
                }
            } catch (e) {
                MessageBox.confirm('您当前的使用的客户端版本太低，无法支持该功能。请更新到最新版本！' + options);
            }
        })
    },

    /**
     * 跳转到自定义页面（app webview跳转）
     * url  String   需要跳转的自定义地址
     * type Number  跳转地址类型
     *   -- 0   默认0
     *   -- 1   对应app的新webview，如兑吧页面需要使用
     */
    redirectTo(options = {}) {
        this.checkJsApi({
            name: ['redirectTo']
        }).then(()=>{
            console.log('ndapp.redirectTo('+options.url+')');
            let type;
            type = options.type?options.type:0;
            ndapp.redirectTo(type,options.url);
        })
    },
};

export {Ndapp}