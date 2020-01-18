<template>
  <div class="cart">
    <cart-list-item v-for="(item,index) in getProductList" :key="index" :cart-item="item"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CartListItem from "./CartListItem";
  export default {
    name: "CartList",
    components:{CartListItem},
    computed:{
      ...mapGetters(['getProductList'])
    },
  }
</script>

<style scoped>

</style>
