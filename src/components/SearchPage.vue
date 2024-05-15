<template>
  <div>
    <input type="search" class="search-input" v-model="searchQuery" placeholder="请输入搜索关键字" @keyup.enter="search" />
    <button class="search-button" @click="search">搜索</button>
    <!-- 搜索历史 -->
    <div v-if="searchResults.length == 0" class="search-history">
      <div class="search-labels">
        <div class="search-history-title">搜索历史</div>
        <button class="clear-button" @click="clearSearchHistory">清除历史</button>
      </div>
      
      <div class="history-buttons">
        <button class="search-history-item" v-for="item in searchHistory" :key="item" @click="searchHistoryItemClicked(item)">{{ item }}</button>
      </div>
    </div>
    <div v-if="searchResults.length > 0" class="results-container">
      <div class="video-grid-player search-results">
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
      searchHistory: [],
    };
  },
  mounted() {
    // 2. The DOM is ready to go now
    this.getHistoryFromLocalStorage();
  },
  methods: {

    searchHistoryItemClicked(item) {
      this.searchQuery = item;
      this.search();
    },
    async search() {
      this.addHistoryItem(this.searchQuery);
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
    getHistoryFromLocalStorage() {
      const history = localStorage.getItem('searchHistory');
      if (history) {
        this.searchHistory = JSON.parse(history);
      }
    },
    addHistoryItem(item) {
      if (!this.searchHistory.includes(item)) {
        this.searchHistory.unshift(item);
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
      }
      else
      {
        //move item to first
        const index = this.searchHistory.indexOf(item);
        if (index > 0) {
          this.searchHistory.splice(index, 1);
          this.searchHistory.unshift(item);
          localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
          
        }
      }
    },
    clearSearchHistory() {
      this.searchHistory = [];
      localStorage.removeItem('searchHistory');
    },
    navigateToVideo(video) {
      var video_file_path = video.parent + '/' + video.name;
      video_file_path = video_file_path.replace('.mp4', '');
      video_file_path = video_file_path.replace('/home/study', '');
      console.log("video file path: " + video_file_path);
      var video_file_path_encoded = encodeURIComponent(video_file_path);

      this.$router.push({ path: `/video_player/${video_file_path_encoded}` });
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

.search-results {
  padding-top: 10px;
}

.search-history {
  padding-top: 10px;
  /* display: flex; */
}
.search-labels {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.history-buttons {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.history-buttons button {
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.search-history-item {
  margin-right: 10px;
  cursor: pointer;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 80%;
  margin-top: 8px;
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