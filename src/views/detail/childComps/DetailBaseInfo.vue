<template>
  <div  v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>

    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount"
            :style="{ backgroundColor: goods.discountBgColor }"
            class="discount">{{goods.discount}}</span>
    </div>

    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

    <div  class="info-service">
      <div v-for="index in goods.services.length-1">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    width: 100%;
    margin-top: 15px;
    padding: 0 10px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title{
    text-align: justify;
    color: #222222;
    text-indent: 2em;
    font-weight: bold;
    font-family: "微软雅黑 Light";
  }
  .info-price{
    margin-top: 10px;
  }
  .info-price .n-price{
    font-size: 24px;
    color: red;
  }
  .info-price .o-price{
    text-decoration:line-through;
    font-size: 13px;
    margin: 0px 8px;
  }
  .info-price .discount {
    font-size: 12px;
    position: relative;
    top:-3px;
    padding:3px 6px;
    color: #ffffff;
    border-radius: 8px;
  }
  .info-other{
    font-size: 15px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }
  .info-service{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  .info-service img{
    position: relative;
    top: 2px;
    width: 14px;
    height: 14px;
  }
  .info-service span{
    margin-left: 5px;
    font-size: 14px;
    color: #333333;
  }
</style>
