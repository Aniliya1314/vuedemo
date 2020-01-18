<template>
<div class="detail-base">
  <div class="detail-base-desc">{{data.desc}}</div>
  <div class="detail-base-price">
    <span class="detail-base-nowprice">{{data.price | showPrice}}</span>
    <s class="detail-base-oldprice">{{data.oldPrice | showPrice}}</s>
    <span v-if='data.discountDesc.length>0' class="detail-base-disc" :style="{background:data.discountBgColor}">{{data.discountDesc}}</span>
  </div>
  <div class="detail-base-column">
    <span class="detail-base-sell">{{data.columns[0]}}</span>
    <span class="detail-base-sell">{{data.columns[1]}}</span>
    <span class="detail-base-sell">{{data.services[0]}}</span>
  </div>
  <div class="detail-base-services">
    <span class="detail-base-services-item" v-for="item in data.services.length-1">{{data.services[item]}}</span>
  </div>
</div>
</template>
<script>
  import {showPrice} from "../../../../assets/js/mixins";

  export default {
    name: "DetailBaseInfo",
    mixins:[showPrice],
    props:{
      data:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      // showPrice(price){
      //   return "¥" + price.toFixed(2);
      // }
    }
  }
</script>

<style scoped>
  .detail-base{
    padding: 2px 5px;
    border-bottom: 5px solid #f2f2f2;
  }
  .detail-base-desc{
    padding-top: 10px;
    font-size: 18px;
    color: #333;
    padding-bottom: 5px;
  }
  .detail-base-price{
    padding-bottom: 12px;
  }
  .detail-base-nowprice{
    font-size: 25px;
    color: deeppink;
  }
  .detail-base-oldprice{
    color: #999;
    font-size: 14px;
  }
  .detail-base-disc{
    position: relative;
    color: #fff;
    font-size: 8px;
    padding: 1px 8px;
    top: -10px;
    border-radius: 12px;
  }
  .detail-base-column{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    border-bottom:1px solid #f2f2f2;
  }
  .detail-base-sell{
    color: #999;
    font-size: 14px;
  }
  .detail-base-services{
    padding:15px 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .detail-base-services-item{
    padding-left: 20px;
    position: relative;
    color: #999;
    font-size: 14px;
  }
  .detail-base-services-item:before{
    position: absolute;
    content: '';
    left: 0px;
    width: 20px;
    height: 20px;
    background: url("../../../../assets/image/detail/yes.png") 0 0/20px 20px no-repeat;
  }
</style>
