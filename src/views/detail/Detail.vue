<template>
    <div class="detail">
      <detail-nav-bar />
      <scroll class="content">
        <detail-swiper :top-image="topImage"/>
        <detail-base-info :data="detailData"/>
        <detail-shop-info :shop-info="shopInfo"/>
        <detail-info :detail-info="detailInfo"/>
      </scroll>
    </div>
</template>
<script>
  import {getDetailData} from "../../network/detail";
  import DetailNavBar from "./childComps/detailnavbar/DetailNavBar";
  import DetailSwiper from "./childComps/detailswiper/DetailSwiper";
  import DetailBaseInfo from "./childComps/detailbaseinfo/DetailBaseInfo";
  import DetailShopInfo from "./childComps/detailshopinfo/DetailShopInfo";
  import DetailInfo from "./childComps/detailinfo/DetailInfo";
  import Scroll from "../../components/scroll/Scroll";
  import {allData} from "../../network/data";
  import {Goods} from "../../network/detail";
  export default {
    name: "Detail",
    components:{Scroll, DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,DetailInfo},
    data(){
      return{
        iid:null,
        topImage:[],
        itemType:'',
        detailData:{},
        shopInfo: {},
        detailInfo:{},
      }
    },
    methods:{
      getData(iid,itemType){
        const data = allData.goods[itemType].list[iid-1];
        // console.log(data)
        //取得轮播图
        this.topImage = data.topImage;
        //构建商品对象
        this.detailData = new Goods(data);
        // console.log(this.detailData)
        //获取店铺对象
        this.shopInfo = data.shopInfo;
        // console.log(this.shopInfo);
        //获取详情信息
        this.detailInfo = data.detailInfo;
        console.log(this.detailInfo);
      },
    },
    created() {
      this.iid =  this.$route.params.iid;
      this.itemType = this.$route.params.itemType;
      // console.log(this.itemType);
      // getDetailData(this.iid).then(res=>{
      //   console.log(res);
      //   this.topImage = res.data.results.topImage;
      // })
      this.getData(this.iid,this.itemType);
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .detail{
    height: 100vh;
    background: #fff;
    position: relative;
    z-index: 2;
  }
  .content{
    height: calc(100% - 50px);
  }
</style>
