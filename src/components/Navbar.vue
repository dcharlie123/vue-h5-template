<template>
  <div class="nv-navbar" ref="ndNavbar">
    <mt-navbar v-if="tabs.length>1" v-model="currentTab">
      <mt-tab-item v-for="tab in tabs" :key="tab.id" :id="tab.id">{{tab.label}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="currentTab">
      <mt-tab-container-item v-for="tab in tabs" :key="tab.id" :id="tab.id">
        <nv-infinite-scroll
          :component="tab.component"
          :httpData="tab.httpData"
          :httpUrl="tab.httpUrl"
          :httpMethod="tab.httpMethod"
          :refresh="tab.id===currentTab"
          :onoff="tab.id===currentTab"
        ></nv-infinite-scroll>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem, TabContainer, tabContainerItem } from "mint-ui";
import NvInfiniteScroll from "@/components/InfiniteScroll.vue";
export default {
  name: "navbar",
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    curtab: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.currentTab = this.curtab;
  },
  data() {
    return {
      currentTab: ""
    };
  },
  watch: {
    currentTab() {
      let scrollTop = document.scrollingElement.scrollTop,
        offsetTop = this.$refs.ndNavbar.offsetTop;
      if (scrollTop > offsetTop) {
        document.scrollingElement.scrollTop = offsetTop;
      }
    }
  },
  components: {
    "mt-navbar": Navbar,
    "mt-tab-item": TabItem,
    "mt-tab-container": TabContainer,
    "mt-tab-container-item": tabContainerItem,
    "nv-infinite-scroll": NvInfiniteScroll
  },
  methods: {}
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";

.nv-navbar {
  font-size: 28px;
  * {
    background-color: @color-bg-first;
  }
  .mint-navbar {
    position: sticky;
    top: 0;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    overflow: hidden;
    z-index: 1;
    .mint-tab-item {
      padding: 32px;
      color: @color-text-third;
      &.is-selected {
        color: @color-text-first;
        border-bottom: none;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          height: 8px;
          width: 100%;
          background-color: @color-red-brand;
          left: 0;
          border-radius: 8px;
          bottom: 4px;
        }
      }
      /deep/.mint-tab-item-label {
        font-size: 36px;
      }
    }
  }
  .mint-tab-container {
    height: 100%;
    padding-top: 40px;
    padding-bottom: 40px;
  }
}
</style>
