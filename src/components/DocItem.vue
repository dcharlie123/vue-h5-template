<template>
    <div class="nd-doc-item"
         @click="openLink({
                 url:item.url,
                 applink:item.ext_link_jsonpack,
                 isOpenapp:limit===0||(idx>=limit&&limit!==-1),
                 flag:item.flag,
                 id:item.docid,
                 isHyperLink:isHyperLink
             })"
    >
        <!--处理南都app内 执行打开新页面无效果问题-->
        <a v-if="isHyperLink" class="cover" :href="item.url"></a>
        <div class="meta">
            <p class="title"
               v-text="item.title"
            ></p>
            <p class="info">
                <span v-if="limit===0||(idx>=limit&&limit!==-1)" class="openapp-tips">打开南方都市报</span>
                <span v-text="item.author"
                      @click.stop="openLink({
                            url:'https://m.mp.oeeee.com/u/'+item.uid+'.html',
                            flag:'zone',
                            id:item.uid
                          })"
                ></span>
                <span v-if="item.pvcount"
                      v-text="item.pvcount+'读'"
                ></span>
            </p>
        </div>
        <div class="poster"
             :class="{video:item.flag==='video'}"
             v-if="item.imglist&&item.imglist[0]"
        >
            <img class="img"
                 v-lazy="item.imglist[0]"
            >
        </div>
    </div>
</template>

<script>
    import {Utils} from '@/assets/js/utils'
    import {Ndapp} from '@/assets/js/ndapp'
    import Vue from 'vue'
    import {Lazyload} from 'mint-ui';
    Vue.use(Lazyload)

    export default {
        name: 'DocItem',
        props: {
            limit:{
                type:Number,
                default:-1
            },
            isHyperLink:{
                type:Boolean,
                default:false
            },
            item:{
                type:Object,
                default:{}
            },
            idx:{
                type:Number,
                default:0
            },
        },
        methods: {
            //打开链接
            openLink(options = {}) {
                let {flag, id, isHyperLink} = options;
                if (!isHyperLink) {
                    if (options.isOpenapp) {
                        this.Utils.openNdapp(options)
                    } else {
                        if (this.Utils.isNdapp()) {
                            if (flag === 'doc' || flag === 'video' || flag === 'zone') {
                                this.Ndapp.ready().then(() => {
                                    this.Ndapp.navigateTo({
                                        type: flag,
                                        id: id,
                                    })
                                })
                            } else {
                                location.href = options.url;
                            }
                        } else {
                            window.open(options.url);
                        }
                    }
                }
            },
        }
    }
</script>

<style type="text/less" lang="less" scoped>
    @import "../assets/css/common.less";

    .nd-doc-item {
        font-size: 32px;
        position: relative;
        .cover {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        background-color: #fff;
        .border-half-bottom(@color-border);
        margin: 0 30px;
        padding: 20px 0;
        cursor: pointer;
        position: relative;
        -webkit-tap-highlight-color: transparent;
        display: flex;
        .meta {
            flex: 1;
            display: inline-block;
            .title {
                min-height: 108px;
                margin-bottom: 10px;
            }
            .info {
                display: flex;
                span {
                    font-size: 24px;
                    color: @color-black-light;
                    margin-right: 20px;
                    line-height: 24px;
                    &.openapp-tips {
                        color: @color-red-nd;
                    }
                }
            }
        }
        .poster {
            .pic-cover(@color-black-lightest);
            width: 228px;
            height: 152px;
            margin-left: 20px;
            border-radius: 6px;
            &.video {
                position: relative;
                &:before {
                    content: '';
                    z-index: 2;
                    width: 60px;
                    height: 60px;
                    background: rgba(0, 0, 0, 0.5);
                    position: absolute;
                    left: 50%;
                    border-radius: 200px;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                &:after {
                    content: "";
                    width: 0;
                    height: 0;
                    position: absolute;
                    border: 15px transparent solid;
                    border-left: 24px #fff solid;
                    top: 50%;
                    left: 50%;
                    z-index: 2;
                    border-radius: 4px;
                    transform: translate(-50%, -50%);
                    margin-left: 12px;
                }
            }
        }
    }
</style>
