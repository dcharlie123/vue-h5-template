<template>
    <div
        class="nv-video-list"
        :class="{
            'nv-video-list-single': type === 'single',
            'nv-video-list-double': type === 'double',
        }"
    >
        <nv-video-item
            v-for="(item, idx) in list"
            :key="idx"
            :detail="item"
            :type="type"
        ></nv-video-item>
    </div>
</template>

<script>
import NvVideoItem from "@/components/VideoItem.vue";
export default {
    name: "VideoList",
    props: {
        type: {
            type: String,
            default: "double",
        },
        list: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {};
    },
    components: {
        "nv-video-item": NvVideoItem,
    },
    methods: {},
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";
.nv-video-list {
    padding-left: 40px;
    padding-right: 40px;
    &.nv-video-list-double {
        display: flex;
        flex-wrap: wrap;

        .nv-video-item:nth-child(even) {
            padding-left: 20px;
        }
    }
}
@media screen and (min-width: 650px) {
    .nv-video-list {
        padding-left: 0;
        padding-right: 0;
    }
}
</style>
