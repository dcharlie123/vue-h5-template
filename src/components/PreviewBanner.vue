<template>
  <div class="nv-preview-banner" :class="{fixed:fixed}">
    <!-- #409eff -->
    <p class="text">此为预览链接，请不要分享到群或朋友圈</p>
  </div>
</template>

<script>
export default {
  name: "previewBanner",
  props: {
    fixed: { type: Boolean, default: false },
  },
  computed: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";
.nv-preview-banner {
  max-width: @body-max-width; /*no*/
  color: #fff;
  background-color: #409eff;
  font-size: 30px;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  z-index: 10;
  &.fixed {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>