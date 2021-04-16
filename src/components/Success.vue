<template>
  <div class="nv-success">
    <img :src="imgUrl" :style="{'width':imgWidth+'px'}" alt />
    <p v-text="content"></p>
  </div>
</template>

<script>
export default {
  name: "Success",
  props: {
    imgUrl: {
      type: String,
      default: require("../assets/images/success.png")
    },
    imgWidth: {
      type: Number
    },
    content: {
      type: String,
      default: "成功"
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
.nv-success {
  text-align: center;
  padding: 200px 0;
  img {
    width: 230px;
  }
  p {
    font-size: 28px;
    color: @color-text-first;
    padding-top: 40px;
  }
}
</style>
