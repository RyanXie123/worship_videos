<template>
  <div class="video-grid">
    <div class="video-item" v-for="video in videos" :key="video.name" @click="navigateToVideo(video)">
      <img :src="getThumbnail(video)" alt="Video Thumbnail" class="video-thumbnail" width="200" height="150" />
      <div class="video-info">
        <h3 class="video-name">{{ getVideoShowName(video) }}</h3>
        <!-- <p class="video-date">Created: {{ formatDate(video.created) }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import {join} from 'path';
export default {
  data() {
    return {
      videos: [],
      thumbs: [],
      apiPath: 'api/fs/list',
      // currentPath:'/tianyi/study/赞美/赞美之泉/讚美之泉敬拜讚美專輯(01) 讓讚美飛揚 Let Praise Arise',
      currentPath: '/赞美/',
      indexPath: '/赞美/'
    };
  },
  props: {
    currentPropsPath:{
      type: String,
      default: '/赞美/'
    }
  },
  watch: {
    '$route': {
      handler: 'resetData',
      immediate: true
    },
    currentPropsPath(newPath) {
      console.log(newPath);
      this.resetData();
    }
  }
  ,
  mounted() {
    console.log(this.$appName); // 输出：'My App'
    this.resetData();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        // behavior: "smooth" // 可以使滚动过程平滑
      });
    },
    resetData() {
      if (this.$route.query && this.$route.query.folder_path_base64) {
        console.log(this.$route.query.folder_path_base64);
        this.currentPath = this.diyDecodePaht(this.$route.query.folder_path_base64);
        console.log(this.currentPath);
      } else {
        this.currentPath = this.currentPropsPath;
      }

      const regex = /\/([^/]+)\/$/;
      const match = this.currentPath.match(regex);

      if (match && match[1]) {
        const result = match[1];
        document.title = result;
      } else {
        console.log('未找到匹配的字符串');
      }

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
          console.log("thumbs:");
          console.log(thumbs);
          // if (this.$route.query.scrollToTop) {
          //   this.scrollToTop();
          // }
          this.scrollToTop();
        })
        .catch(error => {
          console.error(error);
        });
    },
    getThumbnail(video) {
      var videoName = this.getVideoName(video);
      if(videoName == "小敏迦南诗歌")
      {
        return "https://worship-video-1gjkroeub13df34f-1252150594.tcloudbaseapp.com/pic/123.jpg";
      }
      videoName = encodeURIComponent(videoName);
      var url = this.$picPathPrefix + videoName + ".jpg";
      return url;
    },
    getVideoName(video) {
      return video.name.replace(/\.mp4$/, "");
    },
    getVideoShowName(video) {
      var videoName = this.getVideoName(video);
      return videoName.replace(/^\d+-/, '');
    },
    diyEncodePath(path) {
      return encodeURIComponent(path.replaceAll('/', '___').replaceAll(' ', 'xxx'));
    },
    diyDecodePaht(path)
    {
      return decodeURIComponent(path).replaceAll('___', '/').replaceAll('xxx', ' ');
    },
    navigateToVideo(video) {
      console.log(video)
      if (video.is_dir) {
        var dest_folder_path = this.currentPath + video.name + '/';
        console.log(dest_folder_path);
        //base64
        var path_base64 = this.diyEncodePath(dest_folder_path);
        // this.$router.push({path:`/video_list/${path_base64}`});
        this.$router.push({ name: 'VideoGrid', query: { folder_path_base64: path_base64} });
      } else {
        console.log('push');
        console.log(this.$router);

        var video_file_path = this.currentPath  + video.name;
        video_file_path = video_file_path.replace('.mp4', '');
        var video_file_path_encoded = encodeURIComponent(video_file_path);
        this.$router.push({path:`/video_player/${video_file_path_encoded}`});
      }
    },
  },
};

</script>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 将网格分为两列，每列平均占据剩余空间 */
  gap: 20px;
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