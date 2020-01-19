<template>
  <div class="tabbar-item" @click="toPath">
      <slot v-if="active" name="active_img" />
      <slot v-else name="tabbar_img" />
      <div :style="activeStyle">
        <slot name="tabbar_text" />
      </div>
  </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      data(){
       return{
         isActive:false
       }
      },
      props:{
        path:String,
        activeColor:{
          type:String,
          default:'red',
        }
      },
      methods:{
        toPath(){
          return this.$router.replace(this.path).catch(data =>{ });
        }
      },
      computed:{
        active(){
          return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle(){
          return this.active ? {color:this.activeColor}:{}
        }
      }
    }
</script>

<style scoped>
  .tabbar-item{
    width: 25%;
    text-align: center;
    flex: 1;
    font-size: 12px;
  }
  .tabbar-item img{
    width: 25%;
    height: 100%;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
