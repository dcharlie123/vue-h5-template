<template>
    <div
        class="nv-video-item"
        :class="{
            'nv-video-item-single': type === 'single',
            'nv-video-item-double': type === 'double',
        }"
        @click="openPage(detail.docid)"
    >
        <div class="cover">
            <nv-image class="img" :src="detail.titleimg" fit="cover"></nv-image>
            <p class="num" v-if="detail.indicator">{{ detail.indicator }}</p>
        </div>
        <div class="info-area">
            <p class="title">{{ detail.title }}</p>
            <p class="info" v-if="type === 'single'">
                <span class="author">{{ detail.author }}</span>
            </p>
        </div>
    </div>
</template>

<script>
import NvImage from "@/components/Image.vue";
export default {
    name: "VideoItem",
    props: {
        type: {
            type: String,
            default: "double",
        },
        detail: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {};
    },
    components: {
        "nv-image": NvImage,
    },
    mounted() {
        
    },
    methods: {
        openPage(id) {
            if (this.Utils.isNvideoapp()) {
                this.Nvideoapp.navigateTo({
                    type: "video",
                    data: {
                        id,
                    },
                });
            } else {
                location.href = `/video/${id}`;
            }
        },
    },
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";
.nv-video-item {
    color: @color-text-first;
    padding-bottom: 40px;
    .cover {
        border-radius: 30px;
        overflow: hidden;
        position: relative;
        .img {
            width: 100%;
            height: 100%;
            display: block;
        }
        .num {
            position: absolute;
            font-size: 24px;
            padding: 8px 16px;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 48px;
            top: 20px;
            right: 20px;
        }
    }
    .title {
        padding-top: 12px;
        line-height: 40px;
    }
    &.nv-video-item-double {
        width: 325px;
        .cover {
            width: 325px;
            height: 325px;
        }
        .title {
            font-size: 28px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
    &.nv-video-item-single {
        display: flex;
        .cover {
            width: 240px;
            height: 240px;
            flex-shrink: 0;
            margin-right: 30px;
        }
        .info-area {
            position: relative;
            height: 240px;
            width: 100%;
            .title {
                font-size: 34px;
                line-height: 48px;
                height: 160px;
                overflow: hidden;
                position: relative;
                &::after{
                    content:'';
                    position: absolute;
                    background-image: linear-gradient(rgba(255,255,255,0),rgba(255,255,2555,1));
                    bottom: 0;
                    width: 100%;
                    left: 0;
                    height: 50px;
                }
            }
            .info {
                padding-bottom: 12px;
                position: absolute;
                bottom: 0;
                font-size: 24px;
            }
        }
    }
}
@media screen and (min-width: 650px) {
    .nv-video-item {
        &.nv-video-item-double {
            width: 434px;
            .cover {
                width: 434px;
                height: 434px;
            }
        }
    }
}
</style>
