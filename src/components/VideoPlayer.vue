<template>
  <div class="nv-video-player" ref="videoContainer">
    <video
      ref="videoPlayer"
      class="video-js vjs-big-play-centered"
      x5-video-player-type="h5-page"
      x5-video-player-fullscreen="true"
      playsinline
      webkit-inline
      webkit-playsinline
      x-webkit-airplay="allow"
      :class="{ vertical: isVertical }"
      :poster="poster"
    ></video>
    <div class="mask" @click="play">
      <i v-show="paused" class="iconfont-common icon-play"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
import zhCN from "video.js/dist/lang/zh-CN.json";

export default {
  name: "VideoPlayer",
  components: {},
  props: {
    videoUrl: {
      type: String,
      default: "",
    },
    poster: {
      type: String,
      default: "",
    },
    // 是否为竖屏
    isVertical: {
      type: Boolean,
      default: true,
    },
    // 是否显示控制条
    controls:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      player: null,
      paused: true,
    };
  },
  mounted() {
    this.initVideo();
  },
  methods: {
    initVideo() {
      let that = this;
      // 修改错误提示
      zhCN[
        "The media could not be loaded, either because the server or network failed or because the format is not supported."
      ] = "画面走丢了，请稍候。";
      let src = this.videoUrl;
      let sources = [];
      if (src.lastIndexOf(".m3u8") !== -1) {
        sources = [
          {
            src,
            type: "application/x-mpegURL",
          },
        ];
      } else if (src.lastIndexOf(".mp4") !== -1) {
        sources = [
          {
            src,
            type: "video/mp4",
          },
        ];
      }

      let options = {
        muted: false, //是否静音
        controls: this.controls,
        width: this.$refs.videoContainer.clientWidth + "px",
        height: this.$refs.videoContainer.clientHeight + "px",
        language: "zh-CN",
        sources,
      };
      this.player = videojs(
        this.$refs.videoPlayer,
        options,
        function onPlayerReady() {
            this.on("play", function () {
                that.paused = false;
            });
            this.on("pause", function () {
                that.paused = true;
            });
        }
      );

      videojs.addLanguage("zh-CN", zhCN);
    },
    play() {
      if (this.player.paused()) {
        this.player.play();
        this.paused = false;
      } else {
        this.player.pause();
        this.paused = true;
      }
    },
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>
<style type='text/less' lang='less' scoped>
@import "../assets/css/common.less";
@import "../assets/icons/iconfont.css";
.nv-video-player {
  height: 100%;
  overflow: hidden;
  position: relative;
  .video-js {
    /deep/.vjs-control-bar {
      z-index: 2;
      background-color: transparent;
    }
    /deep/.vjs-tech {
      width: 100%;
      height: auto;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    /deep/.vjs-big-play-button {
      display: none;
    }
    &.vertical {
      video {
        object-fit: cover;
      }
    }
    /deep/.vjs-poster {
      display: none;
    }
    &.vjs-error {
      /deep/.vjs-error-display {
        &::before {
          content: none;
        }
        .vjs-modal-dialog-content {
          padding-top: 160px;
        }
      }
    }
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .icon-play {
      position: absolute;
      font-size: 100px;
      width: 100px;
      height: 100px;
      top:0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      color: @color-text-first;
      opacity: 0.6;
      text-shadow: 0 4px 8px rgba(0,0,0,0.6);
    }
  }
}
</style>