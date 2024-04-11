<template>
  <!-- <div class="video-player"> -->
  <!-- <div class="video-container"> -->
  <!-- <div class="artplayer-app" ref="videoRef" :src="videoUrl" controls @play="handlePlay" @pause="handlePause"></div> -->
  <!-- <div v-if="!isPlaying" class="play-button" @click="startPlaying">
          <i class="fa fa-play"></i>
        </div> -->
  <!-- </div> -->
  <!-- </div> -->
  <div class="video-player"></div>
</template>


<script>
import Artplayer from 'artplayer';
export default {
  props: ['video'],
  data() {
    return {
      videoUrl: '', // 视频的URL
      picPathPrefix: 'https://video.jiuxingtang.online/pic/',
      videoPathPrefix: 'https://alpha.jiuxingtang.online/d/tianyi/study',
    };
  },
  created() {

  },
  mounted() {
    // 在组件挂载后，解析视频信息并获取视频的URL
    console.log("video-player mounted");
    this.parseVideoInfo();
  },
  methods: {
    startPlaying() {
      const videoElement = this.$refs.videoRef;
      videoElement.play();
    },
    handlePlay() {
      this.isPlaying = true;
    },
    handlePause() {
      this.isPlaying = false;
    },
    parseVideoInfo() {
      // 解析视频信息
      // const videoData = this.$route.params.video;
      // this.video = JSON.parse(videoData);
      var video_file_path = decodeURIComponent(this.$route.params.video_file_fath);
      console.log("video file path: " + video_file_path);
      this.videoUrl = this.videoPathPrefix + video_file_path + '.mp4';
      console.log("video url: " + this.videoUrl);
      // const lastIndex = this.videoUrl.lastIndexOf('/');
      // var thumbUrl = '';
      // if(lastIndex > 0) {
      //   thumbUrl = encodeURIComponent(this.picPathPrefix + this.videoUrl.substring(lastIndex + 1).replace('.mp4', '.jpg')) ;
      // }


      var art = new Artplayer({
        container: '.video-player',
        url: this.videoUrl,
        airplay:true,
        playsInline: true,
        autoSize:true,
        lock: true,
        fullscreen:true,
        fullscreenWeb:true,
        pip:true,
        autoplay: true,
        // poster: thumbUrl,
        moreVideoAttr: {
      // @ts-ignore
      "webkit-playsinline": true,
      playsInline: true,
    },
      fastForward: true,
      autoPlayback: true,
      autoOrientation: true,
      });
      // art.play();
      console.log(art);
    },

  },
};
</script>

<style>
.video-player {
  /* 设置容器宽度为100% */
  /* width: 100%; */
  width: 100%;
  height: 250px;
  position: fixed;
    top: 20; /* You can adjust the top, right, bottom, or left values to position it where you want */
    left: 0;
  /* 可根据需要设置容器高度 */
  /* height: 0; */
  /* padding-bottom: 计算得到的百分比值(例如16:9的视频是56.25%) */
  /* 这将根据视频的宽高比自动调整容器高度 */
  /* padding-bottom: 56.25%;
  position: relative;
  overflow: hidden; */
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-container video {
  /* 设置视频元素填充父级容器 */
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.play-button i {
  font-size: 50px;
  color: #fff;
}
</style>