import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router';
import VideoPlayer from './components/VideoPlayer.vue';
import VideoGrid from './components/VideoGrid.vue';
import HomePage from './components/HomePage.vue';
import SearchPage from './components/SearchPage.vue';
import { createStore } from 'vuex'
import '@fortawesome/fontawesome-free/css/all.css'




// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0,
      isShowShare: false,
      videoUrl: '',
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    showShare(state, payload) {
      state.isShowShare = payload.showShare
    },
    setVideoUrl(state, payload) {
      console.log("store set url :" + payload.videoUrl)
      state.videoUrl = payload.videoUrl
    }
  }
})
const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes: [
    // 这里添加你的路由规则
    {
        path: '/video_player/:video_file_fath(.*)',
        name: 'VideoPlayer',
        component: VideoPlayer
    },
    {
      path: '/',
      name:'home',
      component:HomePage
    },
    {
        path:'/video_list',
        name: 'VideoGrid',
        component:VideoGrid
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchPage
    },
    { path: '/:pathMatch(.*)*', component:VideoGrid } // 捕获所有未匹配的路由并重定向到主页
  ]
});
const app = createApp(App);

app.config.globalProperties.$appName = 'My App';
if (window.location.protocol === 'https:') {
  app.config.globalProperties.$apiHost = 'https://router.xieru.fun:5245/';
  app.config.globalProperties.$videoPathPrefix = 'https://router.xieru.fun:5245/d/sandisk/study'
} else {
  app.config.globalProperties.$apiHost = 'http://router.xieru.fun:2082/';
  app.config.globalProperties.$videoPathPrefix = 'http://router.xieru.fun:2082/d/sandisk/study'
}

app.config.globalProperties.$picPathPrefix = 'https://video.jiuxingtang.online/pic/';
app.config.globalProperties.$shareHtml = 'http://video.jiuxingtang.online/share.html';
app.config.globalProperties.$searchIgnorePath = '/sandisk/study';
app.use(router).use(store).mount('#app');

// app.use(store);