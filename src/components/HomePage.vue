<template>
    <AppBar  :tabs="tabs" @update:tab="handleTabChange"/>
    <VideoGrid class="video-grid"  :currentPropsPath="currentPropsPath"/>
</template>

<script>
import VideoGrid from './VideoGrid.vue'
import AppBar from './AppBar.vue';
export default {
    name: 'HomePage',
    components: {
        VideoGrid,
        AppBar
    },
    data() {
        return {
            tabs: ['推荐', '音乐人'],
            activeTab: '推荐',
            currentPropsPath: '/赞美/推荐/'
        };
    },
    methods: {
        handleTabChange(tab) {
            this.activeTab = tab;
            if (tab === '推荐') {
                this.currentPropsPath = '/赞美/推荐/';
            } else if (tab === '音乐人') {
                this.currentPropsPath = '/赞美/音乐人/';
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