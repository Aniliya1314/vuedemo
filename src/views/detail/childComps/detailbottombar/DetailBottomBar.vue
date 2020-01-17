<template>
<div class="detail-bottom-bar">
  <div class="detail-content">
    <div class="detail-item1 shop">
      <img src="../../../../assets/image/detail/shop.png" alt="" class="image">
      <div>店铺</div>
    </div>
    <div class="detail-item1 server">
      <img src="../../../../assets/image/detail/server.png" alt="" class="image">
      <div>客服</div>
    </div>
    <div class="detail-item1 shop">
      <img src="../../../../assets/image/detail/collect.png" alt="" class="image">
      <div>收藏</div>
    </div>
    <div class="detail-item2 cart" @click="addToCart">加入购物车</div>
    <div class="detail-item2 pay">立即购买</div>
  </div>
</div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods:{
      addToCart(){
        this.$emit('addToCart');
      }
    }
  }
</script>

<style scoped>
  .detail-bottom-bar{
    position: relative;
    height: 49px;
    /*left: 0;*/
    /*right: 0;*/
    /*bottom:0;*/
  }
  .detail-content{
    display: flex;
    font-size: 12px;
    align-items: center;
    background: #ffffff;
    text-align: center;
  }
  .detail-item1{
    flex: 1;
    padding: 2px 3px;
    color: #666;
    border-right: 1px solid #f2f2f2;
  }
  .image{
    width: 50%;
    height: 50%;
  }
  .detail-item2{
    height: 49px;
    line-height: 49px;
    flex: 2;
  }
  .cart{
    background: #ffe6e8;
    color: #ff5777;
  }
  .pay{
    background: deeppink;
    color: #ffffff;
  }
</style>
