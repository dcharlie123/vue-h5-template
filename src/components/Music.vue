<template>
  <div>
    <div class="music" :style="{'backgroundImage':'url('+backgroundImage+')','width':width,'height':height}" :class="{move:!paused}" @click="play('user')"></div>
    <audio ref="audio" :src="src" autoplay loop></audio>
  </div>
</template>

<script>
// import audioSrc from '../media/bgm.mp3'

export default {
  name: "Music",
  props: {
    src: "",
    width:'',
    height:'',
    backgroundImage:{
      type:String,
      default:require('../assets/img/music.png')
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      paused: false,
      musicPlayStatus: true // 默认音乐状态
    };
  },
  created() {},
  mounted() {
    if (this.autoplay) {
      if (this.Utils.isWeixin()) {
        this.setAudioAutoplay();
      }
    } else {
      let audio = this.$refs.audio;
      audio.pause();
      this.paused = true;
      this.musicPlayStatus = false;
    }
  },
  methods: {
    play(status) {
      let audio = this.$refs.audio;
      if (status == "user") {
        if (audio.paused) {
          audio.play();
          this.paused = false;
          this.musicPlayStatus = true;
        } else {
          audio.pause();
          this.paused = true;
          this.musicPlayStatus = false;
        }
      } else {
        if (status == "paused") {
          audio.pause();
          this.paused = true;
        } else {
          if (this.musicPlayStatus) {
            audio.play();
            this.paused = false;
          }
        }
      }
    },
    setAudioAutoplay() {
      let _this = this;
      document.addEventListener(
        "WeixinJSBridgeReady",
        function() {
          let audio = _this.$refs.audio;
          audio.play();
          if (!audio.paused) {
            _this.paused = false;
          }
        },
        false
      );
      //
      document.addEventListener(
        "visibilitychange",
        function() {
          if (document.visibilityState == "visible") {
            let audio = _this.$refs.audio;
            if (!_this.paused) {
              audio.play();
            }
          }
          if (document.visibilityState == "hidden") {
            let audio = _this.$refs.audio;
            if (!audio.paused) {
              audio.pause();
            }
          }
        },
        false
      );
    }
  }
};
</script>
<style type="text/less" lang="less" scoped>
.music {
	position: fixed;
	right: 30px;
	top: 30px;
	z-index: 999;
	box-sizing: border-box;
	width: 50px;
	height: 50px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	&.move {
		animation: music 2.5s infinite linear;
	}
	@keyframes music {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
