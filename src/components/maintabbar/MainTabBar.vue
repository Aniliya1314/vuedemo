<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="deeppink">
      <img slot="tabbar_img" src="../../assets/image/tabbar/index.png" alt="">
      <img  slot="active_img" src="../../assets/image/tabbar/active_index.png" alt="">
      <div slot="tabbar_text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/categroy" active-color="deeppink">
      <img slot="tabbar_img" src="../../assets/image/tabbar/categroy.png" alt="">
      <img  slot="active_img" src="../../assets/image/tabbar/active_categroy.png" alt="">
      <div slot="tabbar_text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" active-color="deeppink">
      <img slot="tabbar_img" src="../../assets/image/tabbar/cart.png" alt="">
      <img  slot="active_img" src="../../assets/image/tabbar/active_cart.png" alt="">
      <div slot="tabbar_text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" active-color="deeppink">
      <img slot="tabbar_img" src="../../assets/image/tabbar/user.png" alt="">
      <img slot="active_img" src="../../assets/image/tabbar/active_user.png" alt="">
      <div slot="tabbar_text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
  import TabBar from "../tabbar/TabBar";
  import TabBarItem from "../tabbaritem/TabBarItem";
    export default {
      name: "MainTabBar",
      components:{TabBar,TabBarItem}
    }
</script>

<style scoped>

</style>
