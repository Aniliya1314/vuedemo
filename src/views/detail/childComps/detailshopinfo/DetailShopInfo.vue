<template>
  <div class="detail-shop-info">
    <div class="detail-shop-info-head">
      <img :src="shopInfo.shopLogo" alt="" class="detail-shop-info-logo">
      <span class="detail-shop-info-name">{{shopInfo.name}}</span>
    </div>
    <div class="detail-shop-info-desc">
      <div class="detail-shop-info-ccell">
        <p>{{shopInfo.cCells | showCells}}</p>
        <span>总销量</span>
      </div>
      <div class="detail-shop-info-cgoods">
        <p>{{shopInfo.cGoods}}</p>
        <span>全部宝贝</span>
      </div>
      <div class="detail-shop-info-evaluate">
        <div class="detail-shop-info-evaluate-d">
          <span>描述相符</span>
          <span class="score" :class="{'good':isBetter(shopInfo.score[0])}">{{shopInfo.score[0]}}</span>
          <span class="low" :class="{'goodscore':isBetter(shopInfo.score[0])}">{{shopInfo.score[0]>4.6?'高':'低'}}</span>
        </div>
        <div class="detail-shop-info-evaluate-d">
          <span>价格合理</span>
          <span class="score" :class="{'good':isBetter(shopInfo.score[1])}">{{shopInfo.score[1]}}</span>
          <span class="low" :class="{'goodscore':isBetter(shopInfo.score[1])}">{{shopInfo.score[1]>4.6?'高':'低'}}</span>
        </div>
        <div class="detail-shop-info-evaluate-d">
          <span>质量满意</span>
          <span class="score" :class="{'good':isBetter(shopInfo.score[2])}">{{shopInfo.score[2]}}</span>
          <span class="low" :class="{'goodscore':isBetter(shopInfo.score[2])}">{{shopInfo.score[2]>4.6?'高':'低'}}</span>
        </div>
      </div>
    </div>
    <div class="detail-shop-info-button">
      <button class="toShop">进店逛逛</button>
    </div>
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
    },
    methods:{
      isBetter(value){
        return value>4.5
      }
    },
    filters:{
      showCells(value){
        if(value>10000){
          return (value/10000).toFixed(1) +'万';
        }
      }
    }
  }
</script>
<style scoped>
  .detail-shop-info{
    padding-bottom: 15px;
    border-bottom: 5px solid #f2f2f2;
  }
  .detail-shop-info-head{
    padding-top: 20px;
    padding-left: 5px;
  }
  .detail-shop-info-logo{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .detail-shop-info-name{
    color: #666;
    position: relative;
    left: 6px;
    top: -12px;
  }
  .detail-shop-info-desc{
    color: #666;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  .detail-shop-info-ccell{
  }
  .detail-shop-info-cgoods{
    padding-right: 30px;
    border-right: 1px solid #ccc;
  }
  .detail-shop-info-evaluate{
  }
  .detail-shop-info-evaluate-d{
    margin: 5px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .good{
    color: red !important;
  }
  .score{
    margin-left: 6px;
    color: green;
  }
  .goodscore{
    background-color: red !important;
  }
  .low{
    margin-left: 6px;
    padding: 1px 2px;
    color: #f2f2f2;
    font-size: 8px;
    background-color: green;
  }
  .detail-shop-info-button{
    text-align: center;
  }
  .toShop{
    margin-top: 15px;
    background-color: #f2f2f2;
    color: #666;
    padding: 5px 45px;
    border-radius: 5px;
  }
</style>
