<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in swiperItem">
        <img :src="item.imgUrl" alt="" class="swiperimg" @load="swiperImgOnload">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import  Swiper from 'swiper';
  export default {
    name: "HomeSwiper",
    props:{
      swiperItem:{
        type:Array,
        default:function () {
          return []
        }
      }
    },
    data(){
      return{
        isLoad:true
      }
    },
    methods:{
      swiperImgOnload(){
        if(this.isLoad){
          this.$emit('swiperImgload')
          this.isLoad = false
        }
      }
    },
    mounted() {
    new Swiper('.swiper-container',{
        loop:true, //循环模式选项
        autoplay:{
          delay:2000
        },
        pagination:{
          el: '.swiper-pagination',
          clickable:true
        },
      });
    }
  }
</script>

<style scoped>
  .swiperimg{
    width: 100%;
    height: 100%;
  }
  .swiper-container{
    /*padding-top: 10%;*/
    --swiper-pagination-color: deeppink;/* 改变分页器颜色 */
  }
</style>
