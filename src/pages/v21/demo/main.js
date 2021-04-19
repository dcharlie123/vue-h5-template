import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import 'lib-flexible/flexible.js'
//引入资源请求js文件
import {Http} from '@/assets/js/http'
//引入与app交互js文件
import {Ndapp} from '@/assets/js/ndapp'
//引入工具类文件
import {Utils} from '@/assets/js/utils'
//引入微信js文件
import {Weixin} from '@/assets/js/weixin'

Vue.prototype.Utils = Utils;
Vue.prototype.Http = Http;
Vue.prototype.Ndapp = Ndapp;
Vue.prototype.Weixin = Weixin;

Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
