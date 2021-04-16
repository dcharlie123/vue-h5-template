<template>
    <div class="home">
        <ul>
            <li>
                <h2>组件</h2>
            </li>

            <li></li>
            <li>
                <h2>form</h2>
            </li>

            <li>
                <router-link to="/nvButton">按钮button</router-link>
            </li>
            <li>
                <h2>工具</h2>
            </li>

            <li></li>
            <li>
                <router-link to="/clearCookie">清除Cookie</router-link>
            </li>
            <li>
                <h2>AppTest</h2>
            </li>

            <li></li>
            <li>
                <router-link to="/appTest">webview js-sdk</router-link>
            </li>
            <li>
                <h1 @click="open">测试window.open(options.url);</h1>
            </li>
            <li>
                <h1 @click="href">测试location.href</h1>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "home",
    components: {},
    mounted() {},
    methods: {
        open() {
            window.open(
                "https://m.mp.oeeee.com/a/BAAFRD000020200629339685.html"
            );
        },
        href() {
            location.href =
                "https://m.mp.oeeee.com/a/BAAFRD000020200629339685.html";
        },
    },
};
</script>
<style type='text/less' lang='less' scoped>
@import "../../../assets/css/common.less";
li {
    padding-bottom: 20px;
}
</style>

