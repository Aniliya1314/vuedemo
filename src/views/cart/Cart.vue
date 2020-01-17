<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{getProductListLength}})</div>
    </nav-bar>
    <scroll class="content">
      <cart-list/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/Scroll";
  import NavBar from "../../components/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{NavBar,CartList,Scroll},
    computed:{
      ...mapGetters(['getProductListLength'])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
    /*overflow: hidden;*/
    /*background: #fff;*/
    position: relative;
    /*z-index: 2;*/
  }
  .nav-bar{
    background: deeppink;
    color: #ffffff;
  }
  .content{
    /*height: calc(100% - 40px - 49px);*/
    overflow: hidden;
    position: absolute;
    top:40px;
    left: 0;
    right: 0;
    bottom: 49px;
  }
</style>
