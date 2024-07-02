<template>
    <div class="sidebar-wrapper">
      <div class="sidebar" :class="{ 'is-open': isOpen }">
        <nav class="sidebar-nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .sidebar-wrapper {
    position: relative;
  }
  
  .sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    height: 100%;
    background-color: #333;
    color: #fff;
    transition: left 0.3s ease;
    overflow-x: hidden;
    padding-top: 60px;
  }
  
  .sidebar.is-open {
    left: 0;
  }
  
  .sidebar-nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar-nav ul li {
    padding: 15px;
    text-align: center;
  }
  
  .sidebar-nav ul li a {
    color: #fff;
    text-decoration: none;
    display: block;
    width: 100%;
  }
  
  .sidebar-nav ul li a:hover {
    background-color: #575757;
  }
  </style>
  