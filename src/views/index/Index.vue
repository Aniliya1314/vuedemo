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
  export default {
    name: "Index",
    components:{NavBar,HomeSwiper,HomeRecommendView,HomeCommend,TabControl,GoodsList,Scroll,BackTop},
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
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
            ]
          },
          'new':{
            page:0,
            list:[
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
            ]
          },
          'sell':{
            page:0,
            list:[
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'3',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191123_7b195hbdd0498bbbh63id021bc8i5_510x850.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage: [
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ie2damjvge3tsmlbgizdambqgiyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ieztemzsga3tsmlbgizdambqgyyde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/p1/150726/14dhcd_ie2tiyjxgu3tsmlbgizdambqhayde_800x1200.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/p1/150726/14dhcd_ieytoobzme3tsmlbgizdambqmeyde_800x1200.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'4',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191025_2fb8kjl13ji190f3l1hjai6300e2i_808x1349.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180930_2b2e301a6diffdjlcbjd857dbk0g2_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_3li3i7e8dbcbjda2925702054bi4f_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_0282hh2ddd5l6315c6jb93bh0g64k_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180930_6a561g64id9f7a44k1bkddei997c4_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'1',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191126_25fd5b553hk241bifdei08hlab6j9_656x1095.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_8d517gec225b3al2a3kgggh0j9lad_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_0hb4d55kakdl9ei999eg606bcd3he_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/180926_87bfk89d4abfaalgc4l093kg1b0el_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/180926_4jefljb9fch94g84hi465dg23gki2_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'2',
                imgUrl:'https://s5.mogucdn.com/mlcdn/c45406/191210_6bkb76ci42eg9llb8gj7h51c7d68b_466x778.jpg_999x999.v1c0.81.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s11.mogucdn.com/mlcdn/c45406/181018_6adla5iee98dabchhbbcafhdll14e_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_726865k3e8jc13fc4f30c0bfijci0_640x860.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_8acj3861e2bjkijff4ale7f98c60f_640x956.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181018_4a096h09bagkb436i4840j4bk1ilb_640x580.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'5',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191110_3b4k5161akcci8l9k55143ig34bi0_899x1498.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181002_4k3ekf3fj4bl62k87h0ik9c823h00_640x960.jpg_640x960.v1cAC.70.webp',
                ]
              },
              {
                id:'6',
                imgUrl: 'https://s5.mogucdn.com/mlcdn/c45406/191101_5iihdcca8485d4cj2c03a761cia0g_810x1353.jpg_600x9999.v1c7E.70.webp',
                text:'#脱单必备，拒绝单身！# #千万不要让男友帮你拆快递！# 现在你们都在穿什么衣服呐？天气越来越冷，我已经准备上过冬的外套了……你们呢？',
                price:66.00,
                coll:23,
                topImage:[
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_442503gagfa5ccj80f9k870bc2g8b_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_2ckh2i88kcfed7cc3j7dlckiihck9_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s5.mogucdn.com/mlcdn/c45406/181109_4307a95li7el9c56a7jbeeja814c5_640x960.jpg_640x960.v1cAC.70.webp',
                  'https://s11.mogucdn.com/mlcdn/c45406/181109_77ea2c2b336ljj0e997jj80dkid3i_640x960.jpg_640x960.v1cAC.70.webp',
                ]
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
        this.$refs.tabControl1.$el.currentIndex = index;
        this.$refs.tabControl2.$el.currentIndex = index;
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
      })
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveScrollY,0);
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveScrollY = this.$refs.scroll.getscrollY();
    }
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
