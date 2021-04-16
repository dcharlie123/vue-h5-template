<template>
  <div class="nv-empty">
    <img :src="imgUrl" :style="{'width':imgWidth+'px'}" alt />
    <p v-text="content"></p>
  </div>
</template>

<script>
export default {
  name: "Empty",
  props: {
    imgUrl: {
      type: String,
      default: require("../assets/images/empty-1.png")
    },
    imgWidth: {
      type: Number
    },
    content: {
      type: String,
      default: "暂无内容"
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
.nv-empty {
  text-align: center;
  padding: 200px 0;
  img {
    width: 200px;
  }
  p {
    font-size: 28px;
    color: @color-text-first;
    padding-top: 20px;
  }
}
</style>
