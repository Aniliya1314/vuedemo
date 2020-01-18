<template>
  <div class="cart-bottom">
    <div class="select">
      <check-button class="check-button" :is-checked="selectAll" @click.native="selectClick"/>
      <div class="select-all">全选</div>
      <div class="all-price">合计：{{totalPrice}}</div>
    </div>
    <div class="toPay">
      <span class="" @click="toPay">去支付({{checkedLength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/checkbutton/CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{CheckButton},
    data(){
      return{
      }
    },
    computed:{
      ...mapGetters(['getProductList']),
      totalPrice(){
        return "¥" + this.getProductList.filter(item =>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price*item.count
        },0)
      },
      checkedLength(){
        return this.getProductList.filter(item =>{
          return item.checked
        }).length
      },
      selectAll(){
        if (!this.getProductList.length){
          return false
        }
        else{
          return !this.getProductList.find(item=>!item.checked)
        }
      }
    },
    methods:{
      selectClick(){
        if(this.selectAll){
          //全部被选中时
          this.getProductList.forEach(item=> item.checked = false)
        }
        else {
          this.getProductList.forEach(item=> item.checked = true)
        }
      },
      toPay(){
        if (!this.checkedLength){
          this.$toast.show('请选择购买的商品');
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .select{
    display: flex;
    font-size: 15px;
    color: #666;
  }
  .check-button{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .select-all{

  }
  .all-price{
    margin-left: 15px;
  }
  .toPay{
    display: flex;
    justify-content: center;
    align-items: center;
    background: deeppink;
    text-align: center;
    color: #ffffff;
    width: 30%;
    height: 100%;
  }
</style>
