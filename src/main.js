import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router';
import VideoPlayer from './components/VideoPlayer.vue';
import VideoGrid from './components/VideoGrid.vue';
import '@fortawesome/fontawesome-free/css/all.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 这里添加你的路由规则
    {
        path: '/video',
        name: 'VideoPlayer',
        component: VideoPlayer,
        params:true
    },
    {
        path:'/',
        name: 'VideoGrid',
        component:VideoGrid
    }
  ]
});

createApp(App).use(router).mount('#app');