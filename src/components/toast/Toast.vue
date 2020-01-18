<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return{
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message='默认文字',duration=2000){
        this.isShow = true;
        this.message = message;
        setTimeout(()=>{
          this.message = '';
          this.isShow = false
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    width: 160px;
    position: fixed;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    z-index: 999;
    background: rgba(0,0,0,.7);
    padding: 5px 10px;
    border-radius: 5px;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
