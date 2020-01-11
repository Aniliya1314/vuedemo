<template>
    <div id="tabbar">
      <slot />
    </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #tabbar{
    width: 100%;
    z-index: 100;
    padding: 5px 0px;
    background: #f2f2f2;
    position: fixed;
    bottom:0;
    left: 0;
    right:0;
    display: flex;
    align-items: center;
    box-shadow: 0px -1px 2px rgba(0,0,0,0.1);
  }
</style>
