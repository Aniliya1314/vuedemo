<template>
  <div class="detail-info">
    <div class="detail-info-params">
      <table class="detail-table">
        <tr v-for="(item1,index1) in detailParamsInfo.detailParams.basic" :key="index1" class="tr-style">
          <td  class="td-normal" :class="{'td-style':index2!==0&&index1!=='size'}" v-for="(size,index2) in item1">{{size}}</td>
        </tr>
      </table>
      <table class="detail-table">
        <tr v-for="(item2,index2) in detailParamsInfo.detailParams.advance" :key="index2" class="tr-style">
          <td class="detail-info-ad">{{index2 | showTd}}</td>
          <td class="detail-info-item">{{item2}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    name: "DetailParamsInfo",
    data(){
      return{
        tdValue:'',
      }
    },
    props:{
      detailParamsInfo:{
        type:Object,
        default(){
          return {}
        }
      },
    },
    filters:{
      showTd(value){
        switch(value) {
          case 'color':
            return  '颜色';
          case 'allsize':
            return  '尺寸';
          case 'pattern':
            return '图案';
          case 'skirtStyle':
            return '裙型';
          case 'waistType':
            return '腰型';
          case 'type':
            return '版型';
          case 'season':
            return '季节';
          case 'materialQua':
            return '材质';
          case 'combinationForm':
            return '组合形式';
          case 'neckline':
            return '领型';
          case 'skirtLen':
            return '裙长';
          case 'sleeveLen':
            return '袖长';
          case 'touch':
            return '分格';
          case 'thinAndThick':
            return '薄厚';
          case 'sleeveType':
            return '袖型';
          case 'lapel':
            return '衣门襟';
          case 'element':
            return '元素';
          case 'clothesLen':
            return '衣长';
          case 'filler':
            return '填充物';
          case '':
            return '';
          case 'style':
            return  '潮流';
        }
      }
    },
    methods:{
    }
  }
</script>

<style scoped>
  .detail-info {
    margin: 10px 0;
    color: #666;
    font-size: 12px;
  }
  .detail-info-params{
    padding: 0 10px;
  }
  .detail-table{
    width: 100%;
    border-collapse: collapse;
  }
  .detail-table td{
    height: 40px;
    /*text-align: center;*/
  }
  .tr-style{
    border-bottom: 1px solid #f2f2f2;
  }
  .td-normal{
    padding-left: 13px;
    padding-right: 13px;
  }
  .td-style{
    color: deeppink;
  }
  .detail-info-ad{
    padding-left: 13px;
    padding-right: 13px;
    width: 30%;
  }
  .detail-info-item{
    color: deeppink;
  }
</style>
