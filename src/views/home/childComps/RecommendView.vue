<template>
  <div class="recommend">
    <div v-for="item in crecommends" class="recommend_item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      crecommends:{
        type: Array,
        default(){
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 30px;
    font-size: 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend_item{
    flex: 1;
  }
  .recommend_item img{
    width: 90%;
    height: 90%;
    margin-bottom: 5px;
  }


</style>
