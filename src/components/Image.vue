<template>
    <div class="nv-image">
        <img v-if="isLazyload"
             class="nv-image__inner 111"
             v-lazy="src"
             :style="imageStyle"
             :class="{ 'nv-image__inner--center': alignCenter}" />
        <img v-else
             class="nv-image__inner"
             :src="src"
             :style="imageStyle"
             :class="{ 'nv-image__inner--center': alignCenter}" />
    </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "mint-ui";
Vue.use(Lazyload);
const isSupportObjectFit = () =>
    document.documentElement.style.objectFit !== undefined;

const ObjectFit = {
    NONE: "none",
    CONTAIN: "contain",
    COVER: "cover",
    FILL: "fill",
    SCALE_DOWN: "scale-down"
};

let prevOverflow = "";

export default {
    name: "NvImage",
    inheritAttrs: false,

    props: {
        src: String,
        fit: String,
        isLazyload: {
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            imageWidth: 0,
            imageHeight: 0
        };
    },

    computed: {
        imageStyle () {
            const { fit } = this;
            if (fit) {
                return isSupportObjectFit()
                    ? { "object-fit": fit }
                    : this.getImageStyle(fit);
            }
            return {};
        },
        alignCenter () {
            return !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
        }
    },

    watch: {},

    mounted () { },

    methods: {
        /**
         * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
         */
        getImageStyle (fit) {
            const { imageWidth, imageHeight } = this;
            const {
                clientWidth: containerWidth,
                clientHeight: containerHeight
            } = this.$el;

            if (
                !imageWidth ||
                !imageHeight ||
                !containerWidth ||
                !containerHeight
            )
                return {};

            const vertical = imageWidth / imageHeight < 1;

            if (fit === ObjectFit.SCALE_DOWN) {
                const isSmaller =
                    imageWidth < containerWidth &&
                    imageHeight < containerHeight;
                fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
            }

            switch (fit) {
                case ObjectFit.NONE:
                    return { width: "auto", height: "auto" };
                case ObjectFit.CONTAIN:
                    return vertical ? { width: "auto" } : { height: "auto" };
                case ObjectFit.COVER:
                    return vertical ? { height: "auto" } : { width: "auto" };
                default:
                    return {};
            }
        }
    }
};
</script>
<style>
.nv-image__error,
.nv-image__placeholder {
    background: #f5f7fa;
    font-size: 24px;
}

.nv-image__error,
.nv-image__inner,
.nv-image__placeholder {
    width: 100%;
    height: 100%;
}

.nv-image {
    position: relative;
    display: inline-block;
    overflow: hidden;
}

.nv-image__inner {
    vertical-align: top;
}

.nv-image__inner--center {
    position: relative;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    display: block;
}

.nv-image__error {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #c0c4cc;
    vertical-align: middle;
}
</style>
