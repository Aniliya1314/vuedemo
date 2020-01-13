<template>
  <div class="goods-list-item" :key="goodsItem.id" @click="itemClick">
      <img  class="goods-list-item-img"  :src="goodsItem.imgUrl" alt="" @load="imageItemLoad">
      <div class="goods-list-item-text">
        <p class="item-name">{{goodsItem.text}}</p>
        <span class="item-price">{{goodsItem.price | showPrice}}</span>
        <span class="item-coll">{{goodsItem.coll}}</span>
      </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    filters:{
      showPrice: function(price){
        return price.toFixed(2);
      }
    },
    methods:{
      imageItemLoad(){
        this.$bus.$emit('imageLoad');
      },
      itemClick(){
        this.$router.push({
          path:'/detail',
          query:{
            iid:this.goodsItem.id,
            topImage:this.goodsItem.topImage
          }
        });
      }
    }
  }
</script>

<style scoped>
  .goods-list-item{
    width: 48%;
    margin: 5px 0px;
    background: #fff;
    border-radius: 5px;
  }
  .goods-list-item-img{
    width: 100%;
    border-radius: 5px 5px 0 0;
  }
  .goods-list-item-text{
    font-size: 12px;
    text-align: center;
  }
  .item-name{
    margin: 1px;
    padding: 0px 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-indent: 2px;
  }
  .item-price{
    padding-right: 14px;
    color: deeppink;
  }
  .item-coll{
    position: relative;
  }
  .item-coll:before{
    content: '';
    position: absolute;
    left: -14px;
    top:0;
    width: 14px;
    height: 14px;
    background: url("../../assets/image/common/coll.svg") 0 0/13px 15px no-repeat;
  }
</style>
