<template>
  <div class="detail-shop-info">
    <div class="detail-shop-info-head">
      <img :src="shopInfo.shopLogo" alt="">
      <span class="detail-shop-info-name">{{shopInfo.name}}</span>
    </div>
    <div class="detail-shop-info-desc">
      <div class="detail-shop-info-ccell">
        <p>{{shopInfo.cCells}}</p>
        <span>总销量</span>
      </div>
      <div class="detail-shop-info-cgoods">
        <p>{{shopInfo.cGoods}}</p>
        <span>全部宝贝</span>
      </div>
      <div class=""></div>
    </div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props:{
      shopInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .detail-shop-info-desc{
    display: flex;
  }
  .detail-shop-info-ccell{

  }
  .detail-shop-info-cgoods{

  }
</style>
