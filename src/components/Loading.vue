<template>
    <div class="loading">
        <i class="iconfont-common icon-refresh"></i>
        <span v-text="content"></span>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        props: {
            content:{
                type:String,
                default:'加载中...'
            }
        },
        data(){
            return {

            }
        },
        components: {
        },
        methods: {

        }
    }
</script>

<style type="text/less" lang="less" scoped>
    @import "../assets/css/common.less";
    @import "../assets/icons/common.css";
    .loading{
        text-align: center;
        font-size: 24px;
        color: @color-black-light;
        padding: 20px;
        .icon-refresh{
            display: inline-block;
            border-radius: 100%;
            border: none;
            animation: circle 0.6s linear infinite;
            margin-right: 8px;
            @keyframes circle {
                0% {
                    transform: rotate(0deg);
                }

                100% {
                    transform: rotate(360deg);
                }
            }
        }
    }
</style>
