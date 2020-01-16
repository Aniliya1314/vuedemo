<template>
    <div class="detail">
      <detail-nav-bar @titleClick="titleClick"/>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-image="topImage"/>
        <detail-base-info :data="detailData"/>
        <detail-shop-info :shop-info="shopInfo"/>
        <detail-image-info :detail-image-info="detailInfo" @detailImgLoad="detailImgLoad"/>
        <detail-params-info ref="params" :detail-params-info="detailInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <detail-recommend ref="recommend" :recommend="recommend"/>
      </scroll>
    </div>
</template>
<script>
  import {getDetailData} from "../../network/detail";
  import DetailNavBar from "./childComps/detailnavbar/DetailNavBar";
  import DetailSwiper from "./childComps/detailswiper/DetailSwiper";
  import DetailBaseInfo from "./childComps/detailbaseinfo/DetailBaseInfo";
  import DetailShopInfo from "./childComps/detailshopinfo/DetailShopInfo";
  import DetailCommentInfo from "./childComps/detailcommentinfo/DetailCommentInfo";
  import DetailRecommend from "./childComps/detailrecommend/DetailRecommend";
  import Scroll from "../../components/scroll/Scroll";
  import {allData} from "../../network/data";
  import {Goods} from "../../network/detail";
  import {itemListenerMixin} from "../../assets/js/mixins";
  import DetailImageInfo from "./childComps/detailimageinfo/DetailImageInfo";
  import DetailParamsInfo from "./childComps/detailparamsinfo/DetailParamsInfo";
  import {debounce} from "../../assets/js/utils";
  export default {
    name: "Detail",
    components:{Scroll, DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,DetailImageInfo,DetailParamsInfo,DetailCommentInfo,DetailRecommend,},
    mixins:[itemListenerMixin],
    data(){
      return{
        iid:null,
        topImage:[],
        itemType:'',
        detailData:{},
        shopInfo: {},
        detailInfo:{},
        commentInfo:[],
        recommend:[],
        themeTopYs:[],
        getThemesTopY:null
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
        //获取评论信息
        if(data.rate.cRate!==0){
          this.commentInfo = data.rate.list;
        }
        //获取推荐信息
        this.recommend = data.recommendInfo;
        // console.log(this.recommend)
      },
      detailImgLoad(){
        this.$refs.scroll.refresh();
        this.getThemesTopY();
      },
      titleClick(index){
        // console.log(index);
        // this.themeTopYs[]
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      }
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
      this.getThemesTopY = debounce(()=>{
        this.themeTopYs =[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-40);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-40);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-40);
        console.log(this.themeTopYs)
      })

    },
    mounted() {
    }
  }
</script>

<style scoped>
  .detail{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #fff;
    position: relative;
    z-index: 2;
  }
  .content{
    height: calc(100% - 50px);
  }
</style>
