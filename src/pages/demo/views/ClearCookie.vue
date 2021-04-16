<template>
    <div id="app">
        <p>
            <nv-button size="large" @click="clearWxToken">清除微信授权token</nv-button>
        </p>
    </div>
</template>

<script>
import NvButton from "@/components/Button.vue";
import { Toast } from "mint-ui";

export default {
    name: "clearCookie",
    components: {
        "nv-button": NvButton
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        clearWxToken() {
            this.Weixin.clearToken();
            Toast('清除微信授权token成功');
        }
    }
};
</script>
<style type='text/less' lang='less' scoped>
p {
    margin-bottom: 20px;
}
</style>