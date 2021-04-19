<template>
  <div class="home">
    <!--<img src="@/assets/img/logo.png">-->
    
  </div>
</template>

<script>


export default {
  name: 'home',
  mounted() {
      this.Weixin.ready().then(()=>{
          this.Weixin.share({
              title:"测试分享标题",
              desc:"测试分享描述"
          })
      })
      //调用app注入的方法
      this.Ndapp.ready().then(()=>{
          this.Ndapp.getToken()
      })
      //请求接口
      this.Http.get(this, {
          url: 'm=Doc&a=getAuthorInfo',
          data: {
              id: 4
          }
      }).then((res)=>{
          console.log(res)
      })

  }
}
</script>
<style type="text/less" lang="less" scoped>
  img{
    width: 750px;
  }
</style>
