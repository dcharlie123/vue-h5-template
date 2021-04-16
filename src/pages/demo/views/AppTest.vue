
<template>
  <div id="appTest">
    <ul style="text-align: left">
      <li><h3>点击导航</h3></li>
      <li>
        <h1><a href="#version1.2.1">version1.2.1</a></h1>
      </li>
      <li>
        <h1><a href="#version1.0.6">version1.0.6</a></h1>
      </li>
      <li>
        <h1><a href="#version1.0.5">version1.0.5</a></h1>
      </li>
      <li>
        <h1><a href="#version1.0.0">version1.0.0</a></h1>
      </li>
    </ul>
    _____________________________________________________________________________________________________
    <h1 id="version1.2.1">version 1.2.1支持↓</h1>
    <h2>路由 navigation</h2>
    <ul>
      <li>
        <button
          @click="
            navigateTo({
              type: 'camera',
            })
          "
        >
          打开拍客拍摄页面
        </button>
      </li>
    </ul>
    <h1>version 1.2.1支持↑</h1>
    _____________________________________________________________________________________________________
    _____________________________________________________________________________________________________
    <h1 id="version1.0.6">version 1.0.6支持↓</h1>
    <h2>菜单界面操作</h2>
    <ul>
      <li>
        <button @click="hideAllNonBaseMenuItem">隐藏所有非基础按钮接口</button>
      </li>
      <li>
        <button @click="showAllNonBaseMenuItem">显示所有功能按钮接口</button>
      </li>
    </ul>
    ---------------------------------------------------------
    <h2>视频号空间相关 uper</h2>
    <ul>
      <li>
        <button @click="navToUperSpace">跳转视频号空间原生页</button>
      </li>
    </ul>
    ---------------------------------------------------------
    <h2>路由 navigation</h2>
    <ul>
      <li>
        <button
          @click="
            navigateTo({
              type: 'url',
              data: {
                url: 'https://m.mp.oeeee.com/show.php?m=Doc&a=doctag&tagid=85',
              },
            })
          "
        >
          打开标签列表页（保留当前页面）
        </button>
      </li>
      <li>
        <button
          @click="
            navigateTo({
              type: 'url',
              data: {
                url: 'https://m.mp.oeeee.com/show.php?m=Doc&a=doctag&tagid=85',
                closeFlag: 1,
              },
            })
          "
        >
          打开标签列表页（关闭当前页面）
        </button>
      </li>
      <li>
        <button @click="navigateBack">关闭当前页面，返回上一页面</button>
      </li>
      <li>
        <button
          @click="
            navigateTo({
              type: 'wxMiniProgram',
              data: { userName: 'gh_d43f693ca31f' },
            })
          "
        >
          打开小程序
        </button>
      </li>
      <li>
        <button
          @click="
            navigateTo({
              type: 'wxMiniProgram',
              data: {
                userName: 'gh_660cf302468c',
                path: 'pages/index/index',
              },
            })
          "
        >
          南方都市报小程序 首页
        </button>
      </li>
      <li>
        <button
          @click="
            navigateTo({
              type: 'wxMiniProgram',
              data: {
                userName: 'gh_660cf302468c',
                path: 'pages/baoliao/baoliao',
              },
            })
          "
        >
          南方都市报小程序 报料页面
        </button>
      </li>
    </ul>
    ---------------------------------------------------------
    <h2>设备信息相关的 deviceInfo</h2>
    <ul>
      <li>
        <button @click="getSystemInfo">系统信息</button>
        {{ systemInfo }}
      </li>
    </ul>
    ---------------------------------------------------------
    <h2>视频相关的 video</h2>
    <ul>
      <li>
        <button @click="navToVideo">跳转视频原生页面</button>
      </li>
    </ul>
    ---------------------------------------------------------
    <h2>图片相关 photo</h2>
    <ul>
      <li>
        <button @click="previewImage">预览图片</button>
      </li>
    </ul>
    ---------------------------------------------------------
    <h1>version 1.0.6支持↑</h1>
    _____________________________________________________________________________________________________
    _____________________________________________________________________________________________________
    <h1 id="version1.0.5">version 1.0.5支持↓</h1>
    <h2>applink</h2>
    <ul>
      <li>
        <button @click="openApp('index')">打开首页</button>
      </li>
      <li>
        <button @click="openApp('detail/video/NVPaXzibRDga')">
          打开视频详情页
        </button>
      </li>
      <li>
        <button @click="openApp('detail/org/10043')">打开视频号页面</button>
      </li>
      <li>
        <button @click="openApp('camera')">打开拍客拍摄</button>
      </li>
    </ul>
    <h1>version 1.0.5支持↑</h1>
    _____________________________________________________________________________________________________
    _____________________________________________________________________________________________________
    <h1 id="version1.0.0">version 1.0.0支持↓</h1>
    {{ navigator }}
    <h2>基本接口（必须层）</h2>

    <h2>基础用户数据相关 userBase</h2>
    <ul>
      <li>
        <button @click="isLogin">是否登录{{ loginStatus }}</button>
      </li>
      <li>
        <button @click="login">前往登录</button>
      </li>
      <li>
        <button @click="getUserBaseInfo">用户昵称、头像</button>
        {{ baseInfo }}
        <p v-if="baseInfo">{{ baseInfo.nickName }}</p>
        <img
          v-if="baseInfo"
          style="width: 50px; height: 50px"
          :src="baseInfo.headUrl"
        />
      </li>
    </ul>
    <h2>敏感用户数据相关 userSensitiveInfo</h2>
    <ul>
      <li>
        <button @click="getUserSensitiveInfo">token</button>
        {{ sensitiveInfo }}
      </li>
    </ul>

    <h2>分享相关 share</h2>
    <ul>
      <li>
        <button
          @click="
            updateShareData({
              title: 'updateShareData设置的分享的标题',
              desc: 'updateShareData分享的摘要',
              imgUrl:
                'http://img1.mp.oeeee.com/202006/05/750x500_5ed9ce87ae796.png',
              link: 'http://www.baidu.com',
            })
          "
        >
          设置分享内容
        </button>
      </li>
      ---------------------------------------------------------
      <li>
        <button @click="openShareMenuNoneSet">
          打开分享面板 未设置分享信息
        </button>
      </li>
      <li>
        <button
          @click="
            openShareMenu({
              title: '只修改了打开分享面板设置的分享的标题',
            })
          "
        >
          打开分享面板 只设置了分享的标题
        </button>
      </li>

      <li>
        <button
          @click="
            openShareMenu({
              title: '打开分享面板设置的分享的标题',
              desc: '打开分享面板设置的分享的摘要',
              imgUrl:
                'http://img1.Nvideoapp.oeeee.com/adv/201906/05/600x600_5cf761be5077e.jpg',
              link: 'http://www.oeeee.com',
            })
          "
        >
          打开分享面板 并设置了分享信息
        </button>
      </li>
      ---------------------------------------------------------
      <li>
        <button
          @click="
            onShareApp({
              scene: 'wxFriend', //默认调起 分享到朋友圈，scene可以配置分享到哪里 card 生成卡片\ wxFriend 微信 \ wxTimeline 朋友圈
            })
          "
        >
          直接分享到微信好友 未设置分享信息
        </button>
      </li>
      <li>
        <button
          @click="
            onShareApp({
              scene: 'wxFriend', //默认调起 分享到朋友圈，scene可以配置分享到哪里 card 生成卡片\ wxFriend 微信 \ wxTimeline 朋友圈
              data: {
                // 空对象或参数必填
                desc: 'wxFriend只设置了分享的摘要',
              },
            })
          "
        >
          直接分享到微信好友 只设置了摘要
        </button>
      </li>
      <li>
        <button
          @click="
            onShareApp({
              scene: 'wxFriend', //默认调起 分享到朋友圈，scene可以配置分享到哪里 card 生成卡片\ wxFriend 微信 \ wxTimeline 朋友圈
              data: {
                // 空对象或参数必填
                title: 'wxFriend分享的标题',
                desc: 'wxFriend分享的摘要',
                imgUrl:
                  'http://img1.mp.oeeee.com/202006/05/750x500_5ed9ce87ae796.png',
                link: 'http://www.baidu.com',
              },
            })
          "
        >
          直接分享到微信好友 设置了分享信息
        </button>
      </li>
      ---------------------------------------------------------
      <li>
        <button @click="onShareApp({ scene: 'wxTimeline' })">
          直接分享到微信朋友圈 未设置分享信息
        </button>
      </li>
      <li>
        <button
          @click="
            onShareApp({
              scene: 'wxTimeline', //默认调起 分享到朋友圈，scene可以配置分享到哪里 card 生成卡片\ wxFriend 微信 \ wxTimeline 朋友圈
              data: {
                // 空对象或参数必填
                title: 'wxTimeline分享的标题',
                desc: 'wxTimeline分享的摘要',
                imgUrl:
                  'http://img1.mp.oeeee.com/202006/05/750x500_5ed9ce87ae796.png',
                link: 'http://www.oeeee.com',
              },
            })
          "
        >
          直接分享到微信朋友圈 并设置分享信息
        </button>
      </li>
      ---------------------------------------------------------
      <!-- <li>
                <button
                    @click="onShareApp( {
                    scene: 'card', //默认调起 分享到朋友圈，scene可以配置分享到哪里 card 生成卡片\ wxFriend 微信 \ wxTimeline 朋友圈
                    data:{   // 空对象或参数必填
                        title: 'card分享的标题',
                        desc: 'card分享的摘要',
                        imgUrl: 'http://img1.mp.oeeee.com/202006/05/750x500_5ed9ce87ae796.png',
                        link: 'http://mmp.test.oeeee.com/uncache.php?m=Doc&a=detail&id=BAAFRD000020190426156249',
                        id: 'BAAFRD000020190426156249'
                    }
                })"
                >直接分享到卡片</button>
            </li> -->
    </ul>
    <h1>version 1.0.0支持↑</h1>
    _____________________________________________________________________________________________________
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "appTest",
  mounted() {},
  data() {
    return {
      navigator: navigator.userAgent,
      loginStatus: null,
      baseInfo: null,
      sensitiveInfo: null,
      systemInfo: null,
    };
  },
  mounted() {
    this.initNvideoapp();
  },
  methods: {
    openApp(path) {
      this.Utils.openNvapp({applink:`${path}`});
    },
    initNvideoapp() {
      if (!this.Nvideoapp.isNvideoapp()) {
        return;
      }
      this.Nvideoapp.ready({
        jsApiList: [
          "menu",
          "navigation",
          "userBase",
          "userSensitiveInfo",
          "deviceInfo",
          "photo",
          "share",
          "video",
          "uper",
          "camera"
        ],
      }).then(
        (res) => {
          console.log("Nvideoapp is ready!!!");
          this.Nvideoapp.checkJsApi({
            name: ["navigateTo_audio", "test"],
          }).then(
            (res) => {
              console.log(res.navigateTo_audio);
            },
            () => {}
          );
        },
        () => {}
      );
    },
    navigateTo(opts) {
      opts.fail = function (res) {
        console.log(123444);
        Toast(res.errMsg);
      };
      this.Nvideoapp.navigateTo(opts);
      console.log("navigateTo:", opts);
    },
    navigateBack() {
      this.Nvideoapp.navigateBack();
      console.log("navigateBack");
    },
    isLogin() {
      this.loginStatus = this.Nvideoapp.isLoginedSync();
    },
    login() {
      this.Nvideoapp.login({
        success(res) {
          Toast(res.errMsg);
          console.log("登录成功回调", res);
        },
        cancel(res) {
          Toast(res.errMsg);
          console.log("取消登录回调", res);
        },
        fail(res) {
          Toast(res.errMsg);
          console.log("登录失败回调", res);
        },
        complete(res) {
          console.log("完成回调", res);
        },
      });
    },
    getUserBaseInfo() {
      // todo 优化this
      let _this = this;
      this.Nvideoapp.getUserBaseInfo({
        success(res) {
          Toast(res.errMsg);
          _this.baseInfo = res.data;
          console.log("成功回调", res);
        },
        fail(res) {
          Toast(res.errMsg);
          console.log("失败回调", res);
        },
        complete(res) {
          console.log("完成回调", res);
        },
      });
    },
    getUserSensitiveInfo() {
      let _this = this;
      this.Nvideoapp.getUserSensitiveInfo({
        success(res) {
          Toast(res.errMsg);
          _this.sensitiveInfo = res.data;
          console.log("成功回调", res);
        },
        fail(res) {
          Toast(res.errMsg);
          console.log("失败回调", res);
        },
        complete(res) {
          console.log("完成回调", res);
        },
      });
    },
    getSystemInfo() {
      let _this = this;
      this.Nvideoapp.getSystemInfo({
        success(res) {
          Toast(res.errMsg);
          _this.systemInfo = res.data;
          console.log("成功回调", res);
        },
        fail(res) {
          Toast(res.errMsg);
          console.log("失败回调", res);
        },
        complete(res) {
          console.log("完成回调", res);
        },
      });
    },
    previewImage() {
      this.Nvideoapp.previewImage({
        index: 1, // 当前显示图片的序号
        urls: [
          "http://img1.mp.oeeee.com/202006/05/750x500_5ed9ce87ae796.png",
          "http://img1.mp.oeeee.com/202006/05/750x500_5ed9c61913f92.png",
          "http://img1.mp.oeeee.com/202006/05/750x500_5ed9ac751d1a5.png",
          "http://img1.mp.oeeee.com/202006/05/750x500_5ed9a00d5ece6.png",
        ],
      });
    },
    updateShareData(opts) {
      let { title, desc, imgUrl, link } = opts;
      this.Nvideoapp.updateShareData({
        title,
        desc,
        imgUrl,
        link,
        success(res) {
          console.log(res);
          Toast(res.errMsg);
        },
      });
    },
    openShareMenu(opts) {
      this.Nvideoapp.openShareMenu(opts);
    },
    openShareMenuNoneSet() {
      this.Nvideoapp.openShareMenu();
    },
    onShareApp(opts) {
      this.Nvideoapp.onShareApp(opts);
    },
    hideAllNonBaseMenuItem() {
      this.Nvideoapp.hideAllNonBaseMenuItem();
    },
    showAllNonBaseMenuItem() {
      this.Nvideoapp.showAllNonBaseMenuItem();
    },
    navToVideo() {
      this.Nvideoapp.navigateTo({
        type: "video",
        data: {
          id: "NVOaYRi2Yg5N",
        },
      }).then(
        (res) => {},
        (res) => {}
      );
    },
    navToUperSpace() {
      this.Nvideoapp.navigateTo({
        type: "uperSpace",
        data: {
          id: "10009",
        },
      }).then(
        (res) => {},
        (res) => {}
      );
    },
  },
};
</script>
<style type="text/less" lang="less" scoped>
#appTest {
  // text-align: center;
  padding: 20px;
}
h1 {
  color: red;
}
h2 {
  font-size: 32px;
  padding: 20px;
}
img {
  width: 750px;
}

ul {
  padding: 0;
}

li {
  margin-bottom: 20px;
  list-style: none;
}

button {
  font-size: 32px;
}
</style>
