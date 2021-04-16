import Vue from 'vue'
import App from './Index.vue'
import router from './router.js'

import 'lib-flexible/flexible.js'

// 重置样式
import '@/assets/css/normalize.css'

//引入工具类文件
import { Utils } from '@/assets/utils/util'
//引入微信js文件
import { Weixin } from '@/assets/utils/weixin'

import { Nvideoapp } from '@/assets/utils/nvideoapp'

Vue.prototype.Utils = Utils;
Vue.prototype.Weixin = Weixin;
Vue.prototype.Nvideoapp = Nvideoapp;
import Vconsole from 'vconsole'
new Vconsole();
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')