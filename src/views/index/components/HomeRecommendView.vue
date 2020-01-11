<template>
    <div class="recommend-container">
      <div class="recommend-item" v-for="item in recommend">
        <a :href="item.link">
          <img :src="item.imgUrl" alt="" class="recommend-img">
          <div>{{item.content}}</div>
        </a>
      </div>
    </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props:{
      recommend:{
        type:Array,
        default:function () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend-container{
    width: 100%;
    padding: 5px 0;
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 10px solid #f6f6f6;
  }
  .recommend-item{
    flex: 1;
    width: 25%;
    text-align: center;
  }
  .recommend-img{
    width: 70%;
  }
</style>
