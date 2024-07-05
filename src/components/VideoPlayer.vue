<template>
  <div class="video-player"></div>
  <div class="video-grid-player">
    <div class="video-item" v-for="video in videos" :key="video.name" @click="navigateToVideo(video)">
      <img :src="getThumbnail(video)" alt="Video Thumbnail" class="video-thumbnail" width="200" height="150" />
      <div class="video-info">
        <h3 class="video-name">{{ getVideoName(video) }}</h3>
        <!-- <p class="video-date">Created: {{ formatDate(video.created) }}</p> -->
      </div>
    </div>
  </div>
</template>


<script>
window.addEventListener("flutterInAppWebViewPlatformReady", () => {
      console.log("flutterInAppWebViewPlatformReady");
   
      // if (window.flutter_inappwebview) {
      //   console.log("flutter_inappwebview exits");
      //   window.flutter_inappwebview.callHandler('myFlutterMethod', 'Hello from Vue.js!')
      //   .then((result) => {
      //     // 处理来自 Flutter 的返回数据
      //     console.log(result);
      //   }).catch((error) => {
      //     // 处理错误
      //     console.error(error);
      //   })
      // }
      
});
import Artplayer from 'artplayer';
import axios from 'axios';
export default {
  props: ['video'],
  data() {
    return {
      videoUrl: '', // 视频的URL
      videos: [],
      thumbs: [],
      apiPath: 'api/fs/list',
      currentPath: '/赞美/',
      player: null
    };
  },
  created() {

  },
  mounted() {
    // 在组件挂载后，解析视频信息并获取视频的URL
    console.log("video-player mounted");
    this.parseVideoInfo();
    // 确保 InAppWebView 已经准备好
    console.log("window:" + window);
    window.addEventListener("flutterInAppWebViewPlatformReady", () => {
      console.log("flutterInAppWebViewPlatformReady");
      this.callFlutterMethod();
    });
  },
  methods: {
    callFlutterMethod() {
      if (window.flutter_inappwebview) {
        console.log("flutter_inappwebview exits");
        window.flutter_inappwebview.callHandler('myFlutterMethod', 'Hello from Vue.js!')
        .then((result) => {
          // 处理来自 Flutter 的返回数据
          console.log(result);
        }).catch((error) => {
          // 处理错误
          console.error(error);
        });
      }
      
      
    },
    getThumbnail(video) {
      var videoName = this.getVideoName(video);
      return this.$picPathPrefix + videoName + ".jpg";
    },
    getVideoName(video) {
      return video.name.replace(/\.mp4$/, "");
    },
    parseVideoInfo() {
      var video_file_path = decodeURIComponent(this.$route.params.video_file_fath);
      console.log("video file path: " + video_file_path);
      if(video_file_path.endsWith(".mp4")){
        this.videoUrl = this.$videoPathPrefix + video_file_path;
      }
      else{
        this.videoUrl = this.$videoPathPrefix + video_file_path + '.mp4';
      }
      console.log("video url: " + this.videoUrl);
      this.$store.commit("setVideoUrl", {videoUrl:this.videoUrl});

      this.currentPath = video_file_path.substring(0, video_file_path.lastIndexOf('/'));
      this.getVideoList();
      this.player = new Artplayer({
        container: '.video-player',
        url: this.videoUrl,
        airplay: true,
        playsInline: true,
        autoSize: true,
        lock: true,
        fullscreen: true,
        fullscreenWeb: true,
        pip: true,
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
      if (window.flutter_inappwebview) {
        console.log("flutter_inappwebview exits");
        window.flutter_inappwebview.callHandler('hasBought', 'Hello from Vue.js!')
        .then((result) => {
          // 处理来自 Flutter 的返回数据
          console.log("html+hasBought result:" + result);
          
        }).catch((error) => {
          // 处理错误
          console.error(error);
        })
      }

    },
    navigateToVideo(video) {
      var videoUrl = this.$videoPathPrefix + this.currentPath + "/" + video.name;
      console.log(videoUrl);
      console.log(this.player);
      this.player.url = videoUrl;
      this.$store.commit("setVideoUrl", {videoUrl:videoUrl});
      if (window.flutter_inappwebview) {
        console.log("flutter_inappwebview exits");
        window.flutter_inappwebview.callHandler('hasBought', 'Hello from Vue.js!')
        .then((result) => {
          // 处理来自 Flutter 的返回数据
          console.log(result);
        }).catch((error) => {
          // 处理错误
          console.error(error);
        })
      }
    },
    getVideoList() {
      const requestData = {
        path: this.currentPath,
        password: "",
        page: 1,
        per_page: 0,
        refresh: false
      };
      axios.post(this.$apiHost + this.apiPath, requestData)
        .then(response => {
          var itemList = response.data.data.content;
          var videos = [];
          var thumbs = [];
          //遍历
          for (var i = 0; i < itemList.length; i++) {
            //判断是否为mp4结尾
            if (itemList[i].name.endsWith(".mp4") || itemList[i].is_dir) {
              videos.push(itemList[i]);
            }
            if (itemList[i].name.endsWith(".jpg") || itemList[i].name.endsWith(".webp")) {
              thumbs.push(itemList[i]);
            }
            //判断是否已
          }
          this.videos = videos;
          this.thumbs = thumbs;
        })
        .catch(error => {
          console.error(error);
        });


    }

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
  top: 0px;
  /* You can adjust the top, right, bottom, or left values to position it where you want */
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

.video-grid-player {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 将网格分为两列，每列平均占据剩余空间 */
  gap: 20px;
  /* margin-top: 60vw; */
  padding-top: 280px;
  padding-bottom: 20px;
  /* 设置列间隔，根据需要进行调整 */
}

.video-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-thumbnail {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}

.video-info {
  margin-top: 0px;
  text-align: center;
}

.video-name {
  font-size: 12px;
  font-weight: 600;
}

.video-date,
.video-size {
  font-size: 14px;
  margin-top: 5px;
}
</style>