<template>
  <div id="app">
    <h2>type</h2>
    <p>默认primary</p>
    <nv-button type="primary">primary</nv-button>
    <nv-button type="info">info</nv-button>
    <nv-button type="default">default</nv-button>

    <h2>size</h2>
    <p>默认normal</p>
    <nv-button size="large">large</nv-button>
    <nv-button size="normal">normal</nv-button>
    <nv-button size="small">small</nv-button>
    <nv-button size="mini">mini</nv-button>

    <h2>round</h2>
    <p>默认true</p>
    <nv-button :round="true">true</nv-button>
    <nv-button :round="false">false</nv-button>

     <h2>disabled</h2>
    <p>默认值false</p>
    <nv-button :disabled="false">false</nv-button>
    <nv-button :disabled="true">true</nv-button>

    <h2>图标</h2>
    <nv-button><i class='iconfont-common icon-add'></i>添加</nv-button>
  </div>
</template>

<script>
import NvButton from "@/components/Button.vue";
export default {
  name: "nvButton",
  components: {
    "nv-button": NvButton
  },
  data() {
    return {};
  },
  mounted() {
    console.log(123);
  },
  methods: {}
};
</script>
<style type='text/less' lang='less' scoped>
@import "../../../assets/css/common.less";
h2{
  margin-bottom: 40px;
}
p{
  margin-bottom: 40px;
}
button{
  margin: 0 40px 40px 0;
}
</style>