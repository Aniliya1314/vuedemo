<template>
    <div class="tab-control">
      <div class="tab-item" v-for="(item,index) in tabcontrol" :key="index" @click="itemClick(index)">
        <span class="tab-item-span" :class="{itemclick:currentIndex===index}">{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "TabControl",
      props:{
        tabcontrol:{
          type:Array,
          default:function () {
            return []
          }
        }
      },
      data(){
        return{
          currentIndex:0
        }
      },
      methods:{
        itemClick(index){
          this.currentIndex = index;
          this.$emit('itemClick',index);
        }
      }
    }
</script>

<style scoped>
  .tab-control{
    display: flex;
    align-items: center;
    background: #fff;
    height: 44px;
    line-height: 44px;
  }
  .tab-item{
    text-align: center;
    flex: 1;
  }
  .tab-item-span{
    padding: 3px;
  }
  .itemclick{
    border-bottom: 2px solid deeppink;
    color: deeppink;
  }
</style>
