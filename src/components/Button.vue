<template>
  <mt-button
    class="nv-button"
    :class="{'nv-button--round':round,'nv-button--mini':size==='mini','nv-button--info':type==='info'}"
    :type="type==='info'?'primary':type"
    :disabled="disabled"
    :size="size==='mini'?'small':size"
    @click="handleClick"
  >
    <slot></slot>
  </mt-button>
</template>

<script>
import { Button } from "mint-ui";
export default {
  name: "NvButton",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "normal"
    }
  },
  data() {
    return {
      // type:"primary"
    };
  },
  components: {
    "mt-button": Button
  },
  created() {},
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";
.nv-button {
  &.mint-button {
    font-size: 28px;
    &.mint-button--primary {
      background-color: @color-red-brand;
    }
    &.mint-button--default {
      background-color: transparent;
      border: 2px solid @color-text-first;
      color: @color-text-first;
    }
    &.nv-button--info {
      background-color: @color-bg-second;
    }

    &.mint-button--large {
      height: 80px;
      font-size: 32px;
      &.nv-button--round {
        border-radius: 80px;
      }
    }
    &.mint-button--normal {
      padding: 0 48px;
      height: 70px;
      &.nv-button--round {
        border-radius: 70px;
      }
    }
    &.mint-button--small {
      padding: 0 42px;
      height: 60px;
      &.nv-button--round {
        border-radius: 60px;
      }
    }
    &.nv-button--mini {
      padding: 0 42px;
      height: 50px;
      font-size: 24px;
      &.nv-button--round {
        border-radius: 50px;
      }
    }
    /deep/.mint-button-text {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /deep/[class*="icon-"] {
      margin-right: 8px;
    }
  }
}
</style>
