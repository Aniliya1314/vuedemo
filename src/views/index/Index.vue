<template>
  <div id="home" class="home">
    <nav-bar class="base">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control  ref="tabControl1" class="tab-control" :tabcontrol="['流行','新款','精选']" @itemClick="controlClick" v-show="isShowTabControl"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="scrollContent"
            :pull-up-load="true"
            @pullingUp="finishPulling">
      <home-swiper :swiper-item="swiperItem" @swiperImgload="swiperImgload"/>
      <home-recommend-view :recommend="recommend"/>
      <home-commend @commendLoad="commendLoad"/>
      <tab-control  class="tab-sticky"
                    :tabcontrol="['流行','新款','精选']"
                    @itemClick="controlClick"
                    ref="tabControl2"/>
      <goods-list :goodslist="showList"/>
    </scroll>
<!--    自定义组件并没有@click方法-->
    <back-top  @click.native="backTop" v-show="isShow"/>
  </div>
</template>
<script>
  import NavBar from "../../components/navbar/NavBar";
  import HomeSwiper from "./components/HomeSwiper";
  import HomeRecommendView from "./components/HomeRecommendView";
  import HomeCommend from "./components/HomeCommend";
  import TabControl from "../../components/tabcontrol/TabControl";
  import GoodsList from "../../components/goodslist/GoodsList";
  import Scroll from "../../components/scroll/Scroll";
  import BackTop from "../../components/backtop/BackTop";
  import {requestAllData,getHomeGoods} from "../../network/home";
  import {allData} from "../../network/data";

  export default {
    name: "Index",
    components:{NavBar,HomeSwiper,HomeRecommendView,HomeCommend,TabControl,GoodsList,Scroll,BackTop,},
    data(){
      return{
        typeItem:'pop',
        isShow:false,
        isShowTabControl:false,
        tabOffsetTop:0,
        saveScrollY:0,
        swiperItem:[
          {
            nama:'item1',
            imgUrl:'https://s18.mogucdn.com/mlcdn/c45406/200106_8bd0h6b48li5f4092g0f6jc77h740_1125x390.jpg_999x999.v1c0.81.webp',
          },
          {
            nama:'item2',
            imgUrl:'https://s11.mogucdn.com/mlcdn/c45406/200109_41j14a69fjd2580kljdj4h7g7di0h_1125x390.jpg_999x999.v1c0.81.webp',
          },
          {
            nama:'item3',
            imgUrl:'https://s17.mogucdn.com/mlcdn/c45406/200109_466fdgd902dl1l7dhigg34gij4k1d_1125x390.jpg_999x999.v1c0.81.webp',
          },
        ],
        recommend: [
          {
            imgUrl:'https://s10.mogucdn.com/mlcdn/c45406/191025_5289fkljd9d0g8i3752e1425h5k5j_150x150.gif_640x640.v1cAC.40.webp',
            link:'#',
            content:'新人福利',
          },
          {
            imgUrl:'https://s10.mogucdn.com/mlcdn/c45406/191021_38g134a547jibek9a9f1hk63gedea_135x135.jpg_640x640.v1cAC.40.webp',
            link:'#',
            content:'女装',
          },
          {
            imgUrl: 'https://s10.mogucdn.com/mlcdn/c45406/191021_251e01b9hi91bc6ej7fa47a2j475c_135x135.jpg_640x640.v1cAC.40.webp',
            link:'#',
            content:'上衣',
          },
          {
            imgUrl:'https://s10.mogucdn.com/mlcdn/c45406/191021_63a5459d4dlce1812a3b7fbi940c0_135x135.jpg_640x640.v1cAC.40.webp',
            link:'#',
            content:'裤子',
          },
          {
            imgUrl:'https://s10.mogucdn.com/mlcdn/c45406/191021_65g8bh2jg5d62ae7j7ck332123b97_135x135.jpg_640x640.v1cAC.40.webp',
            link:'#',
            content:'裙子',
          },
          ],
        goods:allData.goods
      }
    },
    methods:{
      requestAllData(){
        requestAllData().then(res=>{
          console.log(res);
        });
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          console.log(res);
        })
      },
      controlClick(index){
        switch (index) {
          case 0:
            this.typeItem = 'pop';
            break;
          case 1:
            this.typeItem = 'new';
            break;
          case 2:
            this.typeItem = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
        this.$bus.$emit('getTypeItem',this.typeItem);
        // console.log('发射时：'+this.typeItem)
        // console.log(index)
      },
      backTop(){
        // console.log('1111')
        this.$refs.scroll.scrollTo(0,0,1500)
      },
      scrollContent(position){
        // console.log(position)
        this.isShow = (-position.y) > 500;
        this.isShowTabControl = (-position.y) > this.tabOffsetTop;
      },
      finishPulling(){
        console.log('上拉加载更多');
        this.$refs.scroll.pullingUp();
      },
      swiperImgload(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
      },
      commendLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        // console.log(this.tabOffsetTop)
      },
      //防抖操作
      debounce(func,delay){
        let timer = null;
        return function(...args){
          if(timer)
            clearTimeout(timer);
          timer = setTimeout(()=>{
            func.apply(this,args);
          },delay)
        }
      }
    },
    computed:{
      showList() {
        // console.log(this.typeItem);
        return this.goods[this.typeItem].list;
      }
    },
    created() {
      this.requestAllData();
      // this.getHomeGoods('pop');
      // this.getHomeGoods('new');
      // this.getHomeGoods('sell');
    },
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh,200);
      this.$bus.$on('imageLoad',()=>{
        refresh();
      });
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveScrollY,0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveScrollY = this.$refs.scroll.getscrollY();


    },
  }
</script>

<style scoped>
  .home{
    height: 100vh;
    position: relative;
  }
  .base{
    color: #fff;
    background: deeppink;
    box-shadow: 0px 0px 2px rgba(0,0,0,0.1);
  }
  .tab-sticky{

  }
  .tab-control{
    position: relative;
    z-index: 10;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top:40px;
    left: 0;
    right: 0;
    bottom: 60px;
  }
</style>
