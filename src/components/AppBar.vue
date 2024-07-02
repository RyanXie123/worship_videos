<template>
    <div class="tabbar">
    <div 
      v-for="tab in tabs" 
      :key="tab" 
      :class="['tab', { active: tab === activeTab }]" 
      @click="selectTab(tab)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script>
// import Sidebar from './SideBar.vue';

export default {
  name: 'AppBar',
  components: {
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    defaultTab: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      isSidebarOpen: false,
      activeTab: this.defaultTab || this.tabs[0]
    };
  },
  methods: {
    goHome() {
      // Redirect to home route
      this.$router.push('/');
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    selectTab(tab) {
      this.activeTab = tab;
      this.$emit('update:tab', tab);
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 10px;
}
.tabbar {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 999;
  background-color: white;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
}

.tab.active {
  border-bottom: 2px solid #007BFF;
  color: #007BFF;
}
.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
}

.navbar-title {
  font-size: 15px;
}

.navbar-right {
  display: flex;
}

.toggle-button {
  font-size: 30px;
  /* background-color: #333; */
  color: #333;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 1001; /* Ensure button is on top */
}

.sidebar-wrapper {
  position: relative;
  z-index: 999; /* Ensure sidebar is below the button */
}

/* 其他样式可以根据需要调整 */
</style>
