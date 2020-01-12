<template>
    <div class="commend-container">
      <a href="#">
        <img src="../../../assets/image/home/commend.jpeg" alt="" class="commend-img" @load="commendImgLoad">
      </a>
    </div>
</template>

<script>
    export default {
        name: "HomeCommend",
        methods:{
            commendImgLoad(){
                this.$emit('commendLoad')
            }
        }
    }
</script>

<style scoped>
  .commend-container{
    width: 100%;
  }
  .commend-img{
    width: 100%;
  }
</style>
