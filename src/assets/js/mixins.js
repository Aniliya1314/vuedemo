import {debounce} from "./utils";
import BackTop from "../../components/backtop/BackTop";
export const itemListenerMixin = {
  data(){
    return{
      itemImageListener:null,
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,200);
    this.itemImageListener = ()=>{
      refresh();
    }
    this.$bus.$on('imageLoad',this.itemImageListener)
  }
}
export const backTop = {
  data() {
    return {
      isShow:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    toTop(){
      this.$refs.scroll.scrollTo(0,0,2000);
    }
  }

}
