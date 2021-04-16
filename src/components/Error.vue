<template>
  <div class="nv-error">
    <img :src="imgUrl" :style="{'width':imgWidth+'px'}" alt />
    <p v-text="content"></p>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    imgUrl: {
      type: String,
      default: require("../assets/images/info-1.png")
    },
    imgWidth: {
      type: Number
    },
    content: {
      type: String,
      default: "失败"
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
.nv-error {
  text-align: center;
  padding: 200px 0;
  img {
    width: 150px;
  }
  p {
    font-size: 28px;
    color: @color-text-first;
    padding-top: 40px;
  }
}
</style>
