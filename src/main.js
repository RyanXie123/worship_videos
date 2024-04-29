import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router';
import VideoPlayer from './components/VideoPlayer.vue';
import VideoGrid from './components/VideoGrid.vue';
import SearchPage from './components/SearchPage.vue';
import '@fortawesome/fontawesome-free/css/all.css'

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
      component:VideoGrid
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

createApp(App).use(router).mount('#app');