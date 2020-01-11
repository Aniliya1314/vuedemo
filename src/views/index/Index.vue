<template>
  <div id="home" class="home">
    <nav-bar class="base">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="scrollContent"
            :pull-up-load="true"
            @pullingUp="finishPulling">
      <home-swiper :swiper-item="swiperItem" />
      <home-recommend-view :recommend="recommend"/>
      <home-commend/>
      <tab-control  class="tab-sticky" :tabcontrol="['流行','新款','精选']" @itemClick="controlClick"/>
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
  export default {
    name: "Index",
    components:{NavBar,HomeSwiper,HomeRecommendView,HomeCommend,TabControl,GoodsList,Scroll,BackTop},
    data(){
      return{
        typeItem:'pop',
        isShow:false,
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
        goods:{
          'pop':{
            page:0,
            list:[
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'7',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'8',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'9',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'10',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'11',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'12',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'13',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'14',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'15',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'16',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'17',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'18',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'19',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'20',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'21',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'22',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'23',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'24',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'25',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'26',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'27',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'28',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'29',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'30',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
            ]
          },
          'new':{
            page:0,
            list:[
              {
                id:'1',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'2',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'5',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'6',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'7',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'8',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'9',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'10',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'11',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'12',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'13',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'14',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'15',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'16',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'17',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'18',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'19',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'20',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'21',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'22',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'23',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'24',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'25',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'26',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'27',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'28',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'29',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'30',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
            ]
          },
          'sell':{
            page:0,
            list:[
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'7',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'8',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'9',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'10',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'11',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'12',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'13',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'14',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'15',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'16',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'17',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'18',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'19',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'20',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'21',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'22',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'23',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'24',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'25',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'26',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'27',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'28',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'29',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
              {
                id:'30',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
              },
            ]
          }
        }
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
        // console.log(index)
      },
      backTop(){
        // console.log('1111')
        this.$refs.scroll.scrollTo(0,0,1500)
      },
      scrollContent(position){
        // console.log(position)
        this.isShow = (-position.y) > 500;
      },
      finishPulling(){
        console.log('上拉加载更多');
        this.$refs.scroll.pullingUp();
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
      })
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
    position: sticky;
    top: 4.5%;
    /*box-shadow: 0px 2px 1px rgba(0,0,0,0.1);*/
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
