<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{getProductListLength}})</div>
    </nav-bar>
    <scroll class="content">
      <cart-list/>
    </scroll>
    <cart-bottom-bar class="cart-bottom-bar"/>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/Scroll";
  import NavBar from "../../components/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{NavBar,CartList,Scroll,CartBottomBar},
    computed:{
      ...mapGetters(['getProductListLength']),
    },
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
  .cart-bottom-bar{
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 49px;
    background: #f2f2f2;
  }
</style>
