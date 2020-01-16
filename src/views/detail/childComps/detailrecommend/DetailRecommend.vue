<template>
  <div>
    <div class="recommend">
      <div  class="recommend-item" v-for="item in recommend">
        <img :src="item.imgUrl" alt="" class="recommend-item-img">
        <div class="recommend-styles">{{item.content}}</div>
        <div>{{item.price | showprice}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "DetailRecommend",
    props:{
      recommend:{
        type:Array,
        default(){
          return []
        }
      }
    },
    filters:{
      showprice(value){
        return "¥ " + value.toFixed(2);
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    color: #666;
    font-size: 12px;
  }
  .recommend-item{
    width: 30%;
    padding: 25px 0;
  }
  .recommend-item-img{
    width: 100%;
    height: 100%;
  }
  .recommend-styles{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
