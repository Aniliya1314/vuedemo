<template>
  <div class="detail-info">
    <div class="detail-info-d">
      <div class="linebar start"></div>
      <div class="detail-info-desc">
        <p>{{detailImageInfo.desc}}</p>
      </div>
      <div class="linebar end"></div>
    </div>
    <div class="detail-info-img">
      <div class="detail-info-font">穿着效果</div>
      <img :src="item" alt="" v-for="(item,index) in detailImageInfo.showImageUrl" :key="index" class="detail-info-image" @load="detailImgLoad">
    </div>
  </div>
</template>
<script>
  export default {
    name: "DetailImageInfo",
    data(){
      return{
      }
    },
    props:{
      detailImageInfo:{
        type:Object,
        default(){
          return {}
        }
      },
    },
    filters:{

    },
    methods:{
      detailImgLoad(){
        this.$emit('detailImgLoad');
        // console.log(1111)
      }
    }
  }
</script>

<style scoped>
  .detail-info{
    margin: 10px 0;
    color:#666;
    font-size: 12px;
  }
  .detail-info-d{
    padding: 5px 5px;
  }
  .linebar {
    position: relative;
    width: 30%;
    border-bottom: 1px solid #666;
  }
  .start{
    float: left;
  }
  .start:before{
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: black;
    /*background-size: 10px 10px;*/
  }
  .end{
    float: right;
  }
  .end:after{
    content: '';
    position: absolute;
    top: -4px;
    right: -1px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: black;
    /*background-size: 10px 10px;*/
  }
  .detail-info-desc{
    font-size: 12px;
    color: #666;
    padding: 10px 10px;
    text-indent: 25px;
  }
  .detail-info-font{
    margin-left: 12px;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .detail-info-image{
    width: 100%;
    margin-bottom: 5px;
  }
  .detail-table td{
    height: 40px;
    /*text-align: center;*/
  }
</style>
