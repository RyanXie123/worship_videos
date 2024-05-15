<template>
    <div class="navbar">
      <div class="navbar-left" @click="goHome">
        <img src="logo.jpg" alt="Logo" class="navbar-logo">
        <span class="navbar-title">赞美园</span>
      </div>
      <div class="navbar-right">
        <!-- <button class="navbar-button">
          <img src="icon1.png" alt="功能按钮1" class="navbar-icon">
        </button>
        <button class="navbar-button">
          <img src="icon2.png" alt="功能按钮2" class="navbar-icon">
        </button>
        <button class="navbar-button">
          <img src="icon3.png" alt="功能按钮3" class="navbar-icon">
        </button> -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppBar',
    methods: {
      goHome() {
        // Redirect to home route
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 10px;
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
  
  .navbar-button {
    margin-left: 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .navbar-icon {
    width: 20px;
    height: 20px;
  }
  </style>