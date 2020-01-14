<template>
    <nav-bar class="navbar">
      <div slot="left" @click="back">
        <img src="@/assets/image/common/back.svg" alt="" class="back">
      </div>
      <div slot="center" class="detail-nav-bar">
        <div class="detail-nav-bar-item"
             v-for="(item,index) in detailItem"
             :class="{active:currentIndex===index}"
             @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
</template>

<script>
  import NavBar from "../../../../components/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{NavBar},
    data(){
      return{
        detailItem:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
      },
      back(){
        this.$emit('itemType',this.$route.params.itemType);
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .navbar{
    position: relative;
    z-index: 3;
    background: #fff;
  }
  .detail-nav-bar{
    display: flex;

  }
  .detail-nav-bar-item{
    flex: 1;
  }
  .active{
    color: deeppink;
  }
  .back{
    margin-top: 5px;
  }
</style>
