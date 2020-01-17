<template>
  <div class="cart-item">
    <div class="cart-item-img">
      <img :src="cartItem.image" alt="" class="image">
    </div>
    <div class="cart-item-info">
      <p class="title">{{cartItem.title}}</p>
      <p class="desc">{{cartItem.desc}}</p>
      <div>
        <span class="price">{{cartItem.price}}</span>
        <span class="count">{{cartItem.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartListItem",
    props:{
      cartItem:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .cart-item{
    /*mar*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    width: 100%;
    margin: 3px 5px;
  }
  .cart-item-img{
  }
  .cart-item-img img{
    width:65px
  }
  .cart-item-info{
    padding: 0 5px;
  }
  .title{
    margin-top: 10px;
    color: #666;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .desc{
    color: #666;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .price{
    float: left;
    font-size: 14px;
    color: deeppink;
  }
  .count{
    float: right;
    font-size: 14px;
  }
</style>
