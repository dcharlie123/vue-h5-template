<template>
  <div v-if="show" class="nv-banner" :class="{fixed:fixed}" @click="openApp" :style="bannerStyle">
    <img v-lazy="bannerImg" />
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "mint-ui";
Vue.use(Lazyload);
var bannerImg = require("@/assets/images/nvdownload.png");
export default {
  name: "NvAppBanner",
  props: {
    applink: {
      type: String,
      default: ""
    },
    fixed: { type: Boolean, default: false },
    visible: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    bannerStyle() {
      let style = this.visible  ? "opacity:1;" : "opacity:0;";
      return style;
    }
  },
  data() {
    return {
      bannerImg,
      show: !this.Utils.isNvideoapp()
    };
  },
  methods: {
    openApp() {
      this.Utils.openNvapp({ applink: this.applink });
    }
  }
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";
.nv-banner {
  max-width: @body-max-width; /*no*/
  transition: opacity 1s;

  &.fixed {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  width: 100%;
  z-index: 10;
  img {
    width: 100%;
    height: 120px;
    display: block;
  }
}
</style>