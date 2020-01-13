<template>
    <div>
      <detail-nav-bar />
      <detail-swiper :top-image="topImage"/>
    </div>
</template>

<script>
  import {getDetailData} from "../../network/detail";
  import DetailNavBar from "./childComps/detailnavbar/DetailNavBar";
  import DetailSwiper from "./childComps/detailswiper/DetailSwiper";
  export default {
    name: "Detail",
    components:{DetailNavBar,DetailSwiper},
    data(){
      return{
        iid:null,
        topImage:[]
      }
    },
    created() {
     this.iid =  this.$route.query.iid;
     this.topImage = this.$route.query.topImage
      // console.log(this.topImage);
      // getDetailData(this.iid).then(res=>{
      //   console.log(res);
      //   this.topImage = res.data.results.topImage;
      // })
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
