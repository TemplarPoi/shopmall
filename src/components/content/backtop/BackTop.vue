<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
 .backtop{
   position: fixed;
   bottom: 60px;
   right: 15px;
 }
  .backtop img {
    width: 50px;
    height: 50px;
  }
</style>
