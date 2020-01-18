<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="../../assets/image/detail/tick.png" alt="" class="tick">
  </div>
</template>

<script>
  // class="tick" :class="{ticked:checked}
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:true
      }
    }
  }
</script>
<style scoped>
  .check-button{
    margin-left: 8px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 50%;
  }
  .tick{
    width: 20px;
    height: 20px;
  }
  .check{
    border:1px solid deeppink;
    border-radius: 50%;
    background: deeppink;
  }
</style>
