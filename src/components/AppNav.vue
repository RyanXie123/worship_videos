<template>
  <div class="nav">
    <div class="nav-icons">
      <button @click="goBack"><i class="fas fa-arrow-left"></i></button>
      <button @click="goForward"><i class="fas fa-arrow-right"></i></button>
      <button @click="goHome"><i class="fas fa-home"></i></button>
      <button @click="share"><i class="fas fa-share"></i></button>
    </div>
    <div class="nav-text">
      <button class="nav-button" @click="handleButtonClick">奉献支持</button>
    </div>
  </div>
</template>

<script>
export default {
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
    handleButtonClick() {
      // 处理按钮点击事件
      window.location.href = 'https://qr.alipay.com/fkx123198b5yoxszv9ife12';
    },
    share() {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href
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
  font-size: 1.5em;
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