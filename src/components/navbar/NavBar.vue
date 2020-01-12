<template>
  <div class="navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>

  .navbar{
    display: flex;
    z-index: 2;
    height: 40px;
    align-items: center;
    text-align: center;
  }
  .left,.right{
    width: 10%;
  }
  .center{
    flex: 1;
  }
</style>
