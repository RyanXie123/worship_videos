<template>
  <div id="app">
    <!-- <Sidebar /> -->

    <router-view></router-view>
    <AppNav />
  </div>
</template>

<script>
import AppNav from './components/AppNav.vue';

// import Sidebar from './components/SideBar.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import VideoGrid from './components/VideoGrid.vue'
export default {
  name: 'App',
  components: {
    AppNav,
    // Sidebar
  },
  data() {
    return {
    };
  },
  methods: {
    handleTabChange(tab) {
      this.activeTab = tab;
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
