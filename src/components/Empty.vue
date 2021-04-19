<template>
    <div class="empty">
        <img :src="imgUrl" alt="">
        <p v-text="content"></p>
    </div>
</template>

<script>
    export default {
        name: 'Empty',
        props: {
            imgUrl:{
                type:String,
                default:require('../assets/img/empty-1.png')
            },
            content:{
                type:String,
                default:'暂无内容'
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
    .empty{
        text-align: center;
        padding-top: 120px;
        img{
            width: 200px;
        }
        p{
            font-size: 28px;
            color: @color-black-light;
            padding-top: 20px;
        }
    }
</style>
