<template>
  <div>
    <input type="search" class="search-input" v-model="searchQuery" placeholder="请输入搜索关键字" @keyup.enter="search" />
    <button class="search-button" @click="search">搜索</button>
    <div v-if="searchResults.length > 0" class="results-container">
      <h2>搜索结果：</h2>
      <div class="video-grid-player">
    <div class="video-item" v-for="video in videos" :key="video.name" @click="navigateToVideo(video)">
      <img :src="getThumbnail(video)" alt="Video Thumbnail" class="video-thumbnail" width="200" height="150" />
      <div class="video-info">
        <h3 class="video-name">{{ getVideoName(video) }}</h3>
        <!-- <p class="video-date">Created: {{ formatDate(video.created) }}</p> -->
      </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      videos: [],
      picPathPrefix: 'https://video.jiuxingtang.online/pic/',
    };
  },
  methods: {
    async search() {
      try {
        const response = await axios.post('https://router.xieru.fun:12315/api/fs/search', {
          parent: '/赞美',
          keywords: this.searchQuery,
          scope: 2,
          page: 1,
          per_page: 100,
          password: ''
        });

        this.searchResults = response.data.data.content;
        this.videos = [];
        for (var i = 0; i < this.searchResults.length; i++) {
          //判断是否为mp4结尾
          if (this.searchResults[i].name.endsWith(".mp4")) {
            this.videos.push(this.searchResults[i]);
          }
        }



      } catch (error) {
        console.error('搜索失败：', error);
      }
    },
    navigateToVideo(video) 
    {
      var video_file_path = video.parent + '/' + video.name;
      video_file_path = video_file_path.replace('.mp4', '');
      video_file_path = video_file_path.replace('/tianyi/study', '');
      console.log("video file path: " + video_file_path);
      var video_file_path_encoded = encodeURIComponent(video_file_path);

      this.$router.push({path:`/video_player/${video_file_path_encoded}`});
    },
    getThumbnail(video) {
      var videoName = this.getVideoName(video);
      return this.picPathPrefix + videoName + ".jpg";
    },
    getVideoName(video) {
      return video.name.replace(/\.mp4$/, "");
    },
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

.search-button {
  margin-left: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

.results-container {
  margin-top: 16px;
}

</style>