<template>
  <div id="app">
    <AppBar />
    <router-view></router-view>
    <AppNav />
  </div>
</template>

<script>
import AppNav from './components/AppNav.vue';
import AppBar from './components/AppBar.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import VideoGrid from './components/VideoGrid.vue'
export default {
  name: 'App',
  components: {
    AppBar,
    AppNav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
