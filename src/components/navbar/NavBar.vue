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
    height: 40px;
    align-items: center;
    text-align: center;
    box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
  }
  .left,.right{
    width: 10%;
  }
  .center{
    flex: 1;
  }
</style>
