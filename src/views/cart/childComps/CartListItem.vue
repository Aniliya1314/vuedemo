<template>
  <div class="cart-item">
    <check-button  class="check-click" @click.native="checked" :is-checked="cartItem.checked"/>
    <div class="cart-item-img">
      <img :src="cartItem.image" alt="" class="image">
    </div>
    <div class="cart-item-info">
      <p class="title">{{cartItem.title}}</p>
      <p class="desc">{{cartItem.desc}}</p>
      <div>
        <span class="price">{{cartItem.price | showPrice}}</span>
        <span class="count">x{{cartItem.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {showPrice} from "../../../assets/js/mixins";
  import CheckButton from "../../../components/checkbutton/CheckButton";
  export default {
    name: "CartListItem",
    components:{CheckButton},
    mixins:[showPrice],
    props:{
      cartItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      checked(){
        this.cartItem.checked = !this.cartItem.checked
      }
    }
  }
</script>

<style scoped>
  .cart-item{
    display: flex;
    width: 99%;
    margin: 8px 0px;
    padding-bottom: 4px;
    border-bottom:1px solid #f2f2f2;
  }
  .cart-item-img{
    text-align: center;
    padding: 5px 0;
  }
  .cart-item-img img{
    width:85%;
  }
  .cart-item-info{
    width: 65%;
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
  .check-click{
    margin-top: 30px;
    width: 20px;
    height: 20px;
  }
</style>
