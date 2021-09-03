<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>

      <div slot="center">
        <div class="title">
          <div class="title-item"
               :class="{active: currentIndex == index}"
               v-for="(title,index) in titles"
               @click="titleClick(index)">{{title}}</div>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "DetailNavBar",
    data(){
      return{
        titles: ["商品","参数","评论","推荐"],
        currentIndex: 0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex =index
        this.$emit("titleClick",index)
      },
      backClick(){
        this.$router.back()
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .nav-bar{
    position: relative;
    background-color: #fff;
    color: #666666;
    box-shadow: 0px 1px #c0c0c0;
    z-index: 10;
  }
  .back img{
    vertical-align: middle;
  }
  .title{
    display: flex;
    font-size: 15px;
  }
  .title-item{
    flex: 1
  }
  .active{
    color: var(--color-high-text)
  }
</style>
