<template>
  <div id="app">
    <MainTabBar />
    <router-view/>
  </div>
</template>
<script>
  import MainTabBar from "./components/maintabbar/MainTabBar";
  export default {
    name: 'App',
    components:{MainTabBar}
  }
</script>

<style>
  @import "assets/css/common.css";
</style>
