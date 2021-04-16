//资源请求
import '@/assets/css/bounceIn.css'
import dsBridge from 'dsbridge'

let Nvideoapp = {
    shareData: {
        title: document.title,  // 分享标题
        desc: '',   // 分享描述
        link: location.href,    // 分享链接
        imgUrl: 'https://vimg.oeeee.com/static/logo_01.png'   // 分享图标
    },
    navigateMethodList: [
        // 跳转视频原生页面
        { typeName: 'video', space: 'video', method: 'navToVideo', },
        // 跳转视频号空间原生页
        { typeName: 'uperSpace', space: 'uper', method: 'navToUperSpace', },
        // 跳转到外链
        { typeName: 'url', space: 'navigation', method: 'open', },
        // 打开微信小程序
        { typeName: 'wxMiniProgram', space: 'navigation', method: 'launchWxMiniProgram' },
        // 打开拍客摄像页面
        { typeName: 'camera', space: 'camera', method: 'navToCamera' }
    ],
    jsApiList: [
        { jsApi: 'navigateBack', space: 'navigation', method: 'closeCurrentPage' },
        { jsApi: 'login', space: 'userBase', method: 'login' },
        { jsApi: 'isLoginedSync', space: 'userBase', method: 'isLoginedSync' },
        { jsApi: 'getUserBaseInfo', space: 'userBase', method: 'getInfo' },
        { jsApi: 'getUserSensitiveInfo', space: 'userSensitiveInfo', method: 'getInfo' },
        { jsApi: 'getSystemInfo', space: 'deviceInfo', method: 'getSystemInfo' },
        { jsApi: 'previewImage', space: 'photo', method: 'previewImage' },
        { jsApi: 'updateShareData', space: 'share', method: 'updateShareData' },
        { jsApi: 'openShareMenu', space: 'share', method: 'openShareMenu' },
        { jsApi: 'onShareApp', space: 'share', method: 'shareScene' },
        { jsApi: 'hideAllNonBaseMenuItem', space: 'menu', method: 'hideAllNonBaseMenuItem' },
        { jsApi: 'showAllNonBaseMenuItem', space: 'menu', method: 'showAllMenuItem' },
    ],


    /**
     * 检测是否N视频App
     * @returns {Boolean}
     **/
    isNvideoapp() {
        if(window.navigator.userAgent.toLowerCase().match(/ndVideoApp/i)=="ndvideoapp") {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 提示弹窗
     * @param {String} msg      弹窗内容
     * @param {String} cancel   是否显示取消按钮(可选，默认false)
     * @param {Function} confirm 确定按钮回调函数
     * @param {Function} cancel 取消按钮回调函数
     **/
    alert(msg, showCancel, confirm, cancel) {
        let dialogFrame = document.createElement("DIV");
        dialogFrame.id = "dialogFrame";
        dialogFrame.style.position = "fixed";
        dialogFrame.style.background = "rgba(0,0,0,0.3)";
        dialogFrame.style.fontSize = "16px";
        dialogFrame.style.lineHeight = "30px";
        dialogFrame.style.width = "100%";
        dialogFrame.style.height = "100%";
        dialogFrame.style.left = "0";
        dialogFrame.style.top = "0";
        dialogFrame.style.textAlign = "center";
        dialogFrame.style.zIndex = "9999";

        let dialog = "<div class=\"dialogBounceIn\" style=\"position:fixed;top:50%;left:10%;right:10%;background:#fff;border-radius:5px\">\n";
        dialog += "<div style=\"padding:15px;word-break:break-word;border-bottom:1px #eee solid;color:#333\">" + msg + "</div>\n";
        dialog += "<div style=\"display:flex;align-items:center;justify-content:space-around;height:40px;line-height:40px;color:#26a2ff;font-weight:bold\">"
        if (showCancel) {
            dialog += "<div id='alertCancel'>取消</div>\n";
        }
        dialog += "<div id='alertOk'>确定</div>\n";
        dialog += "</div></div>\n";

        dialogFrame.innerHTML = dialog;
        document.body.appendChild(dialogFrame);
        if (showCancel) {
            let closeFn = dialogClose.bind(null, true);
            document.getElementById('alertCancel').addEventListener('click', closeFn);
        }
        document.getElementById('alertOk').addEventListener('click', dialogOk);
        function dialogOk() {
            dialogClose(false);
            confirm && confirm()
        }
        function dialogClose(_showCancel) {
            document.getElementById('alertOk').removeEventListener('click', dialogClose);
            if (showCancel) {
                document.getElementById('alertCancel').removeEventListener('click', dialogClose);
                _showCancel && cancel && cancel({ errCode: 2, errMsg: '用户取消操作' });
            }
            document.body.removeChild(document.getElementById('dialogFrame'));
        }
    },

    /**
     * 获取客户端版本
     * @returns {String}
     **/
    getVersion() {
        let v = navigator.userAgent.match(/\d\.\d\.\d$/g)[0];
        v = v.replace(/\./g, "");
        return v;
    },

    /** 初始化dsBridge
     *  注意：必须配置必填参数，否则无法注入app方法
     *  建议在页面加载时调用
     *  建议一个页面只存在一个ready方法
     *  @param {Number} appId       APPID，必填
     *  @param {Array} jsApiList    js方法命名空间列表，必填
     *  @param {String} timestamp   签名信息
     * @param {Function} success 成功的回调
     * @param {Function} fail 成功的回调
     **/
    ready(options = { jsApiList: [] }) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) {
                reject && reject();
                options.fail && options.fail();
                return;
            }


            // 新版本使用前需要配置
            let jsApiList = options.jsApiList.map(item => {
                return 'nvappNative.' + item;
            })

            this.activeDsBridge({
                space: 'base',
                method: 'config',
                data: {
                    appId: options.appId || '',
                    jsApiList,
                    timestamp: options.timestamp || '',
                },
                callback(res) {
                    if (res.errCode === 0) {
                        resolve && resolve(res);
                        options.success && options.success(res);
                    } else {
                        reject && reject(res);
                        options.fail && options.fail(res);
                    }
                }
            })
        })
    },

    /**
     * 直接返回成功(then)或失败(catch)
     * name     Array   检查当前客户端版本是否支持指定JS接口
     * @param {Function} success 成功的回调 以键值对的形式返回,可用的api值true，不可用为false
     * @param {Function} fail 
     **/
    checkJsApi(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) {
                reject && reject();
                options.fail && options.fail();
                return;
            }

            const name = options.name;

            let nativeMethodList = [];
            const navigateMethodList = this.navigateMethodList;
            const jsApiList = this.jsApiList;
            name.map(item => {
                let nameArr = item.split('_'),
                    jsApi = nameArr[0];
                if (jsApi === 'navigateTo') {
                    let type = nameArr[1];
                    !type && console.warn(`配置接口${item}名出错了，正确示例：navigateTo_audio`);
                    var { space, method } = navigateMethodList.find(item => {
                        return item.typeName === type;
                    }) || {}
                } else {
                    var { space, method } = jsApiList.find(item => {
                        return item.jsApi === jsApi;
                    }) || {}
                }
                nativeMethodList.push({ jsApi: item, nativeMethod: `nvappNative.${space}.${method}` });
            })

            let checkResult = {};
            nativeMethodList.map(item => {
                checkResult[item.jsApi] = dsBridge.hasNativeMethod(item.nativeMethod) ? true : false;
            })
            resolve && resolve(checkResult);
            options.success && options.success(checkResult);
        })
    },

    /**
     * 触发DsBridge
     * @param {String} space       命名空间
     * @param {String} method      调用方法
     * @param {Objert} data        方法需要的参数
     * @param {Object} callback    回调处理
     */
    activeDsBridge(options = {}) {
        if (!this.isNvideoapp()) { return }
        let { space, method, data, callback } = options;
        const methodName = "nvappNative." + space + "." + method;
        // 检查方法是否存在
        if (!dsBridge.hasNativeMethod(methodName)) {
            // console.log('未注入方法' + methodName + '，请检查权限');
            this.alert('您当前的使用的客户端版本太低，无法支持该功能。请更新到最新版本！');
            return;
        }

        // console.log("调用的参数");
        // console.log(data);
        // console.log("运行方法：" + methodName + "，回调信息");
        if (method.indexOf('Sync') < 0) {
            // "异步"方法有回调函数
            if (typeof data !== 'undefined') {
                dsBridge.call(methodName, data, res => {
                    // console.log('"异步"方法有回调:', res);
                    callback && callback(res);
                })
            } else {
                dsBridge.call(methodName, res => {
                    // console.log('"异步"方法有回调:', res);
                    callback && callback(res);
                })
            }

        } else {
            // "同步"方法有返回值
            let res;
            if (typeof data !== 'undefined') {
                res = dsBridge.call(methodName, data);
            } else {
                res = dsBridge.call(methodName);
            }
            // console.log(`同步方法返回：${res}`);
            return res;
        }
    },

    /**
     * 跳转到应用内的某个页面
     * @param {String} type 页面类型（可参照下方新旧版方法对照表传入对应typeName）
     * @param {Object} data 参数（具体方法对应的参数请参照wiki文档）
     * @param {Function} success 成功的回调
     * @param {Function} fail 失败的回调
     * @param {Function} complete 接口调用完成时执行的回调函数，无论成功或失败都会执行
     * */
    navigateTo(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }
            /** 
             * typeName 页面类型(旧版方法名)
             * space 新版命名空间 
             * method 新版方法名
             **/
            const MethodList = this.navigateMethodList;
            
            let { type, data = {} } = options,
                { space, method } = MethodList.find(item => {
                    return type == item.typeName;
                }) || {};

            this.activeDsBridge({
                space, method, data,
                callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res);
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            });
        })
    },
    /**
     * 关闭当前页面，返回上一页面
     */
    navigateBack() {
        if (!this.isNvideoapp()) { return }
        this.activeDsBridge({
            space: 'navigation', method: 'closeCurrentPage'
        });

    },

    /**
     * 登录
     * @param {Boolean} showAlert 是否显示提示确认框
     * @param {String} alertMessage 提示确认框的文案
     * @param {Function} success 登录成功的回调
     * @param {Function} cancel 用户取消登录的回调
     * @param {Function} fail 登录失败的回调
     * @param {Function} complete 接口调用完成时执行的回调函数，无论成功或失败都会执行
    * */
    login(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }
            let { showAlert = false, alertMessage = "您还未登录，确定前往登录?" } = options;
            if (showAlert) {
                this.alert(alertMessage, true, () => {
                    doLogin(this)
                }, res => {
                    options.cancel && options.cancel(res);
                    reject && reject(res);
                })
            } else {
                doLogin(this)
            }

            function doLogin(_this) {
                _this.activeDsBridge({
                    space: 'userBase',
                    method: 'login',
                    callback(res) {
                        if (res.errCode === 0) {
                            options.success && options.success(res)
                            resolve && resolve(res)
                        } else if (res.errCode === 2) {
                            options.cancel && options.cancel(res)
                            reject && reject(res);
                        } else {
                            options.fail && options.fail(res);
                            reject && reject(res);
                        }
                        options.complete && options.complete(res);
                    }
                })
            }
        })
    },
    /**
     * 获取用户登录状态
     */
    isLoginedSync() {
        if (!this.isNvideoapp()) { return }
        let status = this.activeDsBridge({
            space: 'userBase',
            method: 'isLoginedSync',
        })
        return status === 1 ? true : false;
    },
    /**
     * 获取用户本信息
     * @param {Function} success 成功的回调
     * @param {Function} fail 失败的回调
     * @param {Function} complete 接口调用完成时执行的回调函数，无论成功或失败都会执行
     */
    getUserBaseInfo(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }
            this.activeDsBridge({
                space: 'userBase',
                method: 'getInfo',
                callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res)
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            })
        })
    },
    /**
     * 获取用户敏感信息
     * @param {Function} success 成功的回调
     * @param {Function} fail 失败的回调
     * @param {Function} complete 接口调用完成时执行的回调函数，无论成功或失败都会执行
     */
    getUserSensitiveInfo(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }

            this.activeDsBridge({
                space: 'userSensitiveInfo',
                method: 'getInfo',
                callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res)
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            })

        })

    },
    /**
     * 获取系统信息
     * @param {Function} success 成功的回调
     * @param {Function} fail 失败的回调
     * @param {Function} complete 接口调用完成时执行的回调函数，无论成功或失败都会执行
     */
    getSystemInfo(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }
            this.activeDsBridge({
                space: 'deviceInfo',
                method: 'getSystemInfo',
                callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res)
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            })

        })

    },

    /**
     * 预览图片
     * @param {Number} index  当前图片序号
     * @param {Array} urls    图片列表
     * @param {Function} success 成功的回调
     * @param {Function} fail 失败的回调
     * @param {Function} complete 接口调用完成时执行的回调函数，无论成功或失败都会执行
     */
    previewImage(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }
            let { index = 0, urls } = options;

            this.activeDsBridge({
                space: 'photo', method: 'previewImage', data: {
                    index: index,
                    urls: urls
                }, callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res)
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            })

        })
    },


    /**
     * 设置分享内容
     * 对应新版本 share.updateShareData
     * @param {String} title   分享标题（可选）
     * @param {String} desc    分享描述（可选）
     * @param {String} link    分享地址（可选）
     * @param {String} imgUrl  分享图标（可选）
     * @param {Function} success
     * @param {Function} fail
     * @param {Function} complete
     */
    updateShareData(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }
            let data = this.shareData;//修改默认值
            Object.assign(data, options);

            this.activeDsBridge({
                space: 'share', method: 'updateShareData', data, callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res)
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            });

        })

    },

    /**
     * 打开分享面板
     * 对应新版本 share.openShareMenu
     * @param {String} title   分享标题（可选）
     * @param {String} desc    分享描述（可选）
     * @param {String} link    分享地址（可选）
     * @param {String} imgUrl  分享图标（可选）
     * @param {Function} success
     * @param {Function} fail
     * @param {Function} complete
     */
    openShareMenu(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }
            let data = { ...this.shareData };
            if (Object.keys(options).length > 0) {
                Object.assign(data, options);
            }

            this.activeDsBridge({
                space: 'share', method: 'openShareMenu', data: { shareData: data }, callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res)
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            });

        })
    },

    /**
     * 直接分享到具体的渠道
     * 对应新版本 share.shareScene
     * @param {String} scene   渠道标识，必填
     * @param {Object} data    
     * @param {Function} success
     * @param {Function} fail
     * @param {Function} complete
     * ----- scene可选参数 -----
     * @param {String} card     生成卡片
     * @param {String} wxFriend    微信好友
     * @param {String} wxTimeline  朋友圈
     * ----- data可选参数 -----
     * @param {String} title   分享标题
     * @param {String} desc    分享描述
     * @param {String} link    分享地址
     * @param {String} imgUrl  分享图标
     * @param {String} id      文章DocID（scene为card时必填）
     */
    onShareApp(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }
            let { scene, data = {} } = options;
            let shareData = { ...this.shareData };
            if (Object.keys(data).length > 0) {
                Object.assign(shareData, data);
            }


            this.activeDsBridge({
                space: 'share', method: 'shareScene', data: { scene, shareData }, callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res)
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            });
        })
    },
    /**
     * 隐藏所有非基础按钮接口
     * @param {Function} success 成功的回调
     * @param {Function} fail 失败的回调
     * @param {Function} complete 接口调用完成时执行的回调函数，无论成功或失败都会执行
     */
    hideAllNonBaseMenuItem(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }
            this.activeDsBridge({
                space: 'menu', method: 'hideAllNonBaseMenuItem', callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res)
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            });
        })
    },
    /**
     * 显示所有功能按钮接口
     * @param {Function} success 成功的回调
     * @param {Function} fail 失败的回调
     * @param {Function} complete 接口调用完成时执行的回调函数，无论成功或失败都会执行
     */
    showAllNonBaseMenuItem(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isNvideoapp()) { return }

            this.activeDsBridge({
                space: 'menu', method: 'showAllMenuItem', callback(res) {
                    if (res.errCode === 0) {
                        options.success && options.success(res)
                        resolve && resolve(res)
                    } else {
                        options.fail && options.fail(res);
                        reject && reject(res);
                    }
                    options.complete && options.complete(res);
                }
            });

        })
    }
};

export { Nvideoapp }