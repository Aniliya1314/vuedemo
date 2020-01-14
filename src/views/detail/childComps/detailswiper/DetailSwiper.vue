<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in topImage">
        <img :src="item" alt="" class="swiper-item">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  export default {
    name: "DetailSwiper",
    props:{
      topImage:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
      }
    },
    mounted() {
      new Swiper('.swiper-container',{
        loop:true,
        autoplay:{
          delay:2000
        },
        pagination:{
          el: '.swiper-pagination',
          clickable:true
        },
      })
    }
  }
</script>
<style scoped>
  .swiper-item{
    height: 300px;
    overflow: hidden;
  }
  .swiper-slide{
    text-align: center;
  }
</style>
