<template>
  <div class="good-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return  this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad(){
        //利用事件总线发送图片加载完成的事件
        this.$bus.$emit("goodsImgLoad")
      },
      itemClick(){
        this.$router.push("/detail/" + this.goodsItem.iid)
        }
      }
    }
</script>

<style scoped>
 .good-item{
   padding-bottom: 40px;
   position: relative;
   width: 48%;
 }
 .good-item img{
   width: 100%;
   border-radius: 5px;
 }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
    overflow: hidden;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    /*强制不换行*/
    white-space: nowrap;
    margin-bottom: 3px;
  }
 .goods-info .price {
   color: var(--color-high-text);
   margin-right: 20px;
 }

 .goods-info .collect {
   position: relative;
 }

 .goods-info .collect::before {
   content: '';
   position: absolute;
   left: -15px;
   top: -1px;
   width: 14px;
   height: 14px;
   background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
 }
</style>
