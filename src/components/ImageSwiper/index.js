import Vue from 'vue';
import imageSwiper from './ImageSwiper.vue';

const ImageSwiperConstructor = Vue.extend(imageSwiper);
let imageSwiperPool = [];
let instance;
let installed = false;
//安装组件
const install = function (Vue, config = {}) {
    if (installed) return;
    Vue.component(imageSwiper.name, imageSwiper);
    installed = true;
};
install(Vue);
let getAnInstance = () => {
    if (imageSwiperPool.length > 0) {
        let instance = imageSwiperPool[0];
        imageSwiperPool.splice(0, 1);
        return instance;
    }
    return new ImageSwiperConstructor({
        el: document.createElement('div')
    });
};

let ImageSwiper = (options = {}) => {
    let instance = getAnInstance();
    instance.data=options;
    document.body.appendChild(instance.$el);
    Vue.nextTick(function () {
        instance.visible = true;
    });

    return instance;
};
export default ImageSwiper;