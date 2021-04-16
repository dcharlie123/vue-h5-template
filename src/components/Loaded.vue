<template>
  <div class="nv-loaded">
    <span v-text="content"></span>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    content: {
      type: String,
      default: "已显示全部"
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";
.nv-loaded {
  text-align: center;
  font-size: 24px;
  color:@color-text-first;
  padding: 20px;
}
</style>
