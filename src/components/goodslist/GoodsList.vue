<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goodslist" :goods-item="item" :key="index"/>
  </div>
</template>
<script>
  import GoodsListItem from "../goodslistitem/GoodsListItem";
  export default {
    name: "GoodsList",
    components:{GoodsListItem},
    props:{
      goodslist:{
        type:Array,
        default:function () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 10px 0px;
  background: #f2f2f2;
}
</style>
