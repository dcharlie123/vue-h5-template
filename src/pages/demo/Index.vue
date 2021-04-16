<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style type='text/less' lang='less' >
@import "../../assets/css/common.less";
body {
  background-color: @color-bg-first;
}
</style>
<style type='text/less' lang='less' scoped>
@import "../../assets/css/common.less";
#app{
  max-width: @body-max-width;/*no */
  margin: 0 auto;
}
</style>
