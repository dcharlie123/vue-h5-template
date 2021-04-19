<template>
    <div class="adsbanner" @click="openApp">
        <img src="@/assets/img/ndapp_download_banner_1.png">
    </div>
</template>

<script>
    export default {
        name: 'NdappDownloadBanner',
        props: {
            data: Object
        },
        methods: {
            openApp() {
                location.href = "http://ndapp.nandu.com/download/ndapp.php?ext_link_jsonpack=" + encodeURIComponent(this.data.ext_link_jsonpack);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/less" lang="less" scoped>
    .adsbanner {
        position: fixed;
        bottom: 0;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.5);
        z-index: 10;
        img {
            width: 100%;
            display: block;
            vertical-align: top;
        }
    }

</style>
