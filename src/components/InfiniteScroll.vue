<template>
  <div class="nv-infinite-scroll">
    <ul
      class="list"
      v-infinite-scroll="getList"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="false"
    >
      <component v-bind:is="component" :list="list"></component>
      <nv-empty v-if="empty"></nv-empty>
      <nv-loading v-show="loading&&page!==1"></nv-loading>
      <nv-loaded v-if="loaded&&!empty"></nv-loaded>
    </ul>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import Loaded from "@/components/Loaded.vue";
import Empty from "@/components/Empty.vue";

import Vue from "vue";
import { InfiniteScroll } from "mint-ui";

import { Http } from "@/assets/utils/http";

Vue.use(InfiniteScroll);
export default {
  name: "Loading",
  props: {
    // 一个组件的选项对象
    component: {
      type: Object,
      default() {
        return {};
      }
    },
    httpUrl: {
      type: String,
      default: ""
    },
    httpData: {
      type: Object,
      default() {
        return {};
      }
    },
    httpMethod: {
      type: String,
      default: "get"
    },
    refresh: {
      type: Boolean,
      default: false
    },
    onoff: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //列表S
      page: 1,
      list: [],
      loading: false,
      loaded: false,
      empty: false
    };
  },
  components: {
    "nv-loading": Loading,
    "nv-loaded": Loaded,
    "nv-empty": Empty
  },
  watch: {
    refresh() {
      if (this.refresh) {
        this.loaded = false;
        this.empty = false;
        this.page = 1;
        this.list = [];
        this.getList();
      }
    }
  },
  mounted() {
     this.getList();
  },
  methods: {
    //获取列表数据
    getList() {
      if (this.onoff&&!this.loaded) {
        let data = Object.assign({ page: this.page }, this.httpData);
        this.loading = true;
        let showLoading = false;
        this.page === 1 && (showLoading = true);
        Http[this.httpMethod]({
          url: this.httpUrl,
          data,
          lock: true,
          showLoading
        })
          .then(
            res => {
              let list = res.data.list;
              if (!list || (list && list.length === 0)) {
                this.loaded = true;
                this.page === 1 && (this.empty = true);
              }else if(list.length>0){
                this.list = this.list.concat(list);
              }
              this.page++;
              this.loading = false;
            },
            res => {
              this.loading = false;
            }
          )
          .catch(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

