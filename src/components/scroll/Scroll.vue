<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:Number,
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
         scroll:null
      }
    },
    mounted() {
      this.scroll = new  BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:true,
        pullUpLoad:this.pullUpLoad,
      });
      this.scroll.on('scroll',(position) =>{
        this.$emit('scroll',position);
      });
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载更多');
        this.$emit('pullingUp');
      })
    },
    methods:{
      scrollTo(x,y,time=200){
        this.scroll && this.scroll.scrollTo(x,y,time);
      },
      pullingUp(){
        this.scroll.finishPullUp();
      },
      refresh(){
       this.scroll && this.scroll.refresh();
      },
      getscrollY(){
        return  this.scroll.y;
      }
    },
  }
</script>

<style scoped>

</style>
