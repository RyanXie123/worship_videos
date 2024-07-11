<template>
    <AppBar  :tabs="tabs" @update:tab="handleTabChange" :defaultTab="activeTab"/>
    <VideoGrid v-if="!showFav" class="video-grid"  :currentPropsPath="currentPropsPath"/>
    <FavoritePage v-if="showFav" class="video-grid" />
</template>

<script>
import VideoGrid from './VideoGrid.vue'
import AppBar from './AppBar.vue';
import FavoritePage from './FavoritePage.vue'
export default {
    name: 'HomePage',
    components: {
        VideoGrid,
        AppBar,
        FavoritePage
    },
    data() {
        return {
            tabs: ['推荐', '音乐人', '收藏'],
            activeTab: '推荐',
            currentPropsPath: '/赞美/推荐/',
            showFav: false
        };
    },
    created() {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            this.activeTab = savedTab;
            this.handleTabChange(savedTab);
        }
    },
    methods: {
        handleTabChange(tab) {
            this.activeTab = tab;
            localStorage.setItem('activeTab', tab);
            if (tab === '推荐') {
                this.showFav = false;
                this.currentPropsPath = '/赞美/推荐/';
            } else if (tab === '音乐人') {
                this.showFav = false;
                this.currentPropsPath = '/赞美/音乐人/';
            }
            else if (tab === '收藏') {
                // this.currentPropsPath = '/赞美/收藏/';
                this.showFav = true
            }
        },
    },
};
</script>

<style scoped>

.video-grid {
    margin-top: 50px;
}
</style>