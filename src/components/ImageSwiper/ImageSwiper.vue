<template>
    <div class="swiper-box" v-if="visible"  @click="hide">
        <mt-swipe :auto="0"
                  :continuous="false"
                  :show-indicators="false"
                  :defaultIndex="defaultIndex"
                  :stopPropagation="true"
                  :speed="100"
                  @change="handleChange"
        >
            <mt-swipe-item v-for="(item,idx) in data.urls"
                           :key="idx"
            >
                <div class="img-box">
                    <img class="img" v-lazy="item.url" alt="">
                </div>
            </mt-swipe-item>
        </mt-swipe>
        <div class="close" v-if="data.clickClose" @click="hideClose">关闭</div>
        <div class="info">
            <p class="intr"
               v-if="curDesc"
               v-text="curDesc"
            ></p>
            <p class="num">
                <em v-text="curIdx+1"></em> / {{len}}
            </p>
        </div>
    </div>
</template>

<script>
    import {Swipe, SwipeItem} from 'mint-ui';
    
    import Vue from 'vue'
    import { Lazyload} from 'mint-ui';
    Vue.use(Lazyload);
    export default {
        name: 'ImageSwiper',
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            data: {
                current: String,// 当前显示图片的http链接
                urls: Array, // 需要预览的图片http链接列表
                defaultIndex: Number,//当前图片
                clickClose:Boolean, //通过按钮关闭图片预览
                default: function () {
                    return {
                        current: '',
                        urls: [],
                        defaultIndex: 0,
                        clickClose:false
                    }
                }
            }
        },
        data: function () {
            let {defaultIndex, len, curDesc} = this.initData();
            return {
                defaultIndex,
                len,
                curDesc,
                curIdx: defaultIndex,
            }
        },
        watch: {
            data() {
                let {defaultIndex, len, curDesc} = this.initData();
                this.defaultIndex = defaultIndex;
                this.len = len;
                this.curDesc = curDesc;
                this.curIdx = defaultIndex;
            }
        },
        methods: {
            initData() {
                
                let urls = this.data.urls,
                    len = 0,
                    defaultIndex = 0,
                    curDesc = '';
                if (urls) {
                    len = urls.length;
                    urls.forEach((item, idx) => {
                        if (item.url === this.data.current) {
                            defaultIndex = idx;
                            if (item.desc) {
                                curDesc = item.desc;
                            }
                        }
                    })
                }

                return {defaultIndex, len, curDesc};
            },
            handleChange(index) {
                this.curIdx = index;
                let desc = this.data.urls[index].desc;
                if (desc) {
                    this.curDesc = this.data.urls[index].desc;
                }
            },
            hide(){
                if(this.data.clickClose) return false;
                this.$emit('update:visible',false);
                this.visible=false;
            },
            hideClose(){
                this.$emit('update:visible',false);
                this.visible=false;
            }
        }
    }
</script>

<style type="text/less" lang="less" scoped>

    .swiper-box {
        .mint-swipe {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #000;
            z-index: 1000;
            color: #fff;
            .mint-swipe-item {
                .img-box {
                    display: flex;
                    align-items: center;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    .img {
                        width: 100%;
                    }

                }
                
            }

        }
        .close{
            position:fixed;
            top:50px;
            right:20px;
            z-index: 1001;
            color: #fff;
            font-size: 28px;
        }
        .info {
            color: #fff;
            position: fixed;
            width: 100%;
            bottom: 0;
            z-index: 1001;
            font-size: 24px;
            &:before {
                content: '';
                position: absolute;
                background-color: rgba(0, 0, 0, .6);
                width: 100%;
                height: 100%;
            }
            .intr {
                position: relative;
                z-index: 1;
                max-height: 200px;
                line-height: 1.6;
                overflow: auto;
                color: #fff;
                margin-top: 20px;
                padding: 0 20px;
                text-align: justify;
            }
            .num {
                position: relative;
                z-index: 1;
                text-align: center;
                padding: 20px;
                em {
                    font-size: 32px;
                    font-style: normal;
                }
            }
        }
    }
</style>