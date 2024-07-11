<template>
  <div class="nav">
    <div class="nav-icons">
      <button @click="goBack"><i class="fas fa-arrow-left"></i></button>
      <button @click="goForward"><i class="fas fa-arrow-right"></i></button>
      <button @click="goHome"><i class="fas fa-home"></i></button>
      <button v-if="showShare" @click="share"><i class="fas fa-share"></i></button>
      <button @click="goSearch"><i class="fas fa-search"></i></button>
      <button @click="addToFavorites"><i class="fas fa-star"></i></button> <!-- 收藏按钮 -->
    </div>
    <div class="nav-text">
      <!-- <button class="nav-button" @click="handleButtonClick">奉献支持</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNav',
  data: () => ({
    showShare: false
  }),
  watch: {
    '$route' (to, from) {
      this.handleRouteChange(to, from);
    }
  },
  methods: {
    goBack() {
      window.history.back();
    },
    goForward() {
      window.history.forward();
    },
    goHome() {
      // Redirect to home route
      this.$router.push('/');
    },
    goSearch() {
      this.$router.push('/search');
    },
    handleButtonClick() {
      // 处理按钮点击事件
      window.location.href = 'https://qr.alipay.com/fkx123198b5yoxszv9ife12';
    },
    share() {
      var videoUrl = decodeURIComponent(this.$store.state.videoUrl);
      console.log("vidouUrl" + videoUrl)
      const pathArray =  videoUrl.split('/');
      const fileName = pathArray[pathArray.length - 1];
      console.log("share--- fileName" + fileName)
      var url = videoUrl.replace(this.$apiHost,'');
      var shareUrl = this.$shareHtml + "?file=" + url;
      // var url =  encodeURI('https://alpha.jiuxingtang.online/p/tianyi/study/赞美/水流之音圣乐团SOLSO/SOLSO 水流之音圣乐团 - 爱使我们相聚一起 02-27-2016/04-主耶稣我是真爱祢- SOLSO 水流之音圣乐团－爱使我们相聚一起 新春音乐会.mp4')
      console.log("share---" + shareUrl)
      console.log(shareUrl)
      if (navigator.share) {
        navigator.share({
          title: fileName,
          url: shareUrl
        }).then(() => {
          console.log('Sharing success');
        }).catch((error) => {
          console.error('Sharing failed:', error);
        });
      } else {
        console.log('Web Share API not supported.');
        // Fallback for browsers that don't support Web Share API
        // You can implement your own share functionality here
      }
    },
    handleRouteChange(to, from) {
      console.log('Route changed:', to.path, from.path);
      if(to.path.includes('video_player')){
       this.showShare = true; 
      }
      else{
        this.showShare = false;
      }
    },
    addToFavorites() {
      // 处理收藏操作的逻辑
      console.log('Added to favorites');
      // 你可以在这里添加收藏的实际逻辑，比如更新数据或者调用API
    }
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.nav-icons {
  display: flex;
  justify-content: flex-start;
}

.nav-icons button {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  color: white;
}

.nav-icons button i {
  font-size: 1.6em;
}

.nav-text {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
}

.nav-button {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
}

</style>