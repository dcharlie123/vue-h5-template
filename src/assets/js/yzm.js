import { Utils } from "./utils";

let yzm = {
    /**
     * @param {object} vm vue实例
     * @param {string} el 声明滑动验证需要渲染的目标元素ID。
     * @param {string} methodName 回调名称
     * @param {boolean} yzmLoaded //TODO
    */
    initYzm(vm, el, methodName) {
        //文档 https://help.aliyun.com/document_detail/121898.html?spm=a2c4g.11186623.6.559.34e67a5cTpQhwa
        // const vm = this.$children[0];
        setTimeout(() => {
            if (!this.yzmLoaded) {
                window.NVC_Opt = {
                    appkey: 'FFFF0N00000000008337',
                    scene: 'ic_other_h5',
                    renderTo: el,
                    trans: { "key1": "code0", "nvcCode": 200 },
                    elements: [
                        '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png',
                        '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png'
                    ],
                    bg_back_prepared: '//img.alicdn.com/tps/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png',
                    bg_front: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefk5w+ruswAAAAfSURBVFjD7cExAQAAAMKg9U9tCU+gAAAAAAAAAIC3AR+QAAFPlUGoAAAAAElFTkSuQmCC',
                    obj_ok: '//img.alicdn.com/tfs/TB1rmyTltfJ8KJjy0FeXXXKEXXa-50-74.png',
                    bg_back_pass: '//img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png',
                    obj_error: '//img.alicdn.com/tfs/TB1q9yTltfJ8KJjy0FeXXXKEXXa-50-74.png',
                    bg_back_fail: '//img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png',
                    upLang: {
                        "cn": {
                            _ggk_guide: "请在屏幕上滑动，刮出两面盾牌",
                            _ggk_success: "恭喜您成功刮出盾牌<br/>继续下一步操作吧",
                            _ggk_loading: "加载中",
                            _ggk_fail: ['呀，盾牌不见了<br/>请', "javascript:noCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题'],
                            _ggk_action_timeout: ['我等得太久啦<br/>请', "javascript:noCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题'],
                            _ggk_net_err: ['网络实在不给力<br/>请', "javascript:noCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题'],
                            _ggk_too_fast: ['您刮得太快啦<br/>请', "javascript:noCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题']
                        }
                    }
                };

                let date = new Date(),
                    js1 = Utils.loadScript("//g.alicdn.com/sd/nvc/1.1.112/guide.js?v=" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours()),
                    js2 = Utils.loadScript("//g.alicdn.com/sd/smartCaptcha/0.0.4/index.js"),
                    js3 = Utils.loadScript("//g.alicdn.com/sd/quizCaptcha/0.0.1/index.js");
                Promise.all([js1, js2, js3]).then(res => {
                    this.yzmLoaded = true;
                    ic().init();
                });
            } else {
                ic().init();
            }

            function ic() {
                let ic = new smartCaptcha({
                    renderTo: el,
                    width: '100%',
                    secvrf_layout: true,
                    height: 42,
                    default_txt: '请先点击按钮开始智能验证',
                    success_txt: '验证成功',
                    fail_txt: '验证失败，请在此点击按钮刷新',
                    scaning_txt: '智能检测中',
                    success: function (data) {
                        vm[methodName]({sessionid_captcha:data.sessionId,sig_captcha:data.sig,scene_captcha:'ic_other_h5',token_captcha:NVC_Opt.token})
                    },
                });
                return ic;
            }

        }, 0)
    }
}
export { yzm }