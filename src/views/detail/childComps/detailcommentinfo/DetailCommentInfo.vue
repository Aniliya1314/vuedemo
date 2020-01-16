<template>
  <div>
    <div class="detail-comment-info" v-if="commentInfo.length>0" v-for="item in commentInfo">
      <div class="comment">
        <div class="user-info">用户评论</div>
        <div class="user-more">
          <span class="">更多</span>
          <img src="../../../../assets/image/common/right.png" class="right">
        </div>
      </div>
      <div>
        <img :src="item.avatar" class="user-avatar">
        <span class="user-name">{{item.userName}}</span>
      </div>
      <div class="user-comment">{{item.userCommend}}</div>
      <div class="user-created">{{item.created | showDate}}</div>
    </div>
  </div>
</template>

<script>
  import {formatData} from "../../../../assets/js/utils";
  export default {
    name: "DetailCommentInfo",
    props:{
      commentInfo:{
        type:Array,
        default(){
          return []
        }
      }
    },
    filters:{
      showDate(value){
        const date = new Date(value*1000);
        return formatData(date,'yyyy-MM-dd hh:mm:ss');
      }
    }
  }
</script>

<style scoped>
  .detail-comment-info{
    color: #666;
    font-size: 12px;
    padding: 0 13px 12px 13px;
    border-bottom: 1px solid #f2f2f2;
  }
  .comment{
    height: 30px;
  }
  .user-info{
    width: 50%;
    position: relative;
    top:6px;
    float: left;
  }
  .user-more{
    width: 50%;
    position: relative;
    right: -38%;
    top:6px;
    float: right;
  }
  .user-avatar{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .user-name{
    position: relative;
    top:-10px;
  }
  .user-comment{
    padding: 10px 0px;
  }
  .user-created{

  }
  .right{
    width: 10px;
    height: 10px;
  }
</style>
