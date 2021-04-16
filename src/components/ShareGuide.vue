<template>
  <div class="nv-share-guide" v-show="visible">
    <div class="img" @click="hide"></div>
  </div>
</template>

<script>
export default {
  name: "shareGuide",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    hide() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";
.nv-share-guide {
  max-width: @body-max-width; /*no*/
  margin: auto;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100000000;
  .img {
    width: 100%;
    height: 100%;
    background: url("../assets/images/shareguide.png") top/cover no-repeat;
  }
}
</style>