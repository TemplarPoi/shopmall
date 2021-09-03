<template>
<!--通过webpack的alias来给相关路径起别名-->
<!--  在src=""引用时需要加上~ 否则会找不到  import则不需要 -->
  <tab-bar>
    <tab-bar-item path="/home" active-color="red">
      <img slot="item-img" src="~assets/img/tabbar/home.png" alt="">
      <img slot="item-img-active" src="~assets/img/tabbar/home_active.png" alt="">
      <p slot="item-text">首页</p>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-img" src="~assets/img/tabbar/category.png" alt="">
      <img slot="item-img-active" src="~assets/img/tabbar/category_active.png" alt="">
      <p slot="item-text">分类</p>
    </tab-bar-item>
    <tab-bar-item path="/shopcar">
      <img  slot="item-img" src="~assets/img/tabbar/shopcar.png" alt="">
      <img  slot="item-img-active" src="~assets/img/tabbar/shopcar_active.png" alt="">
      <p slot="item-text">购物</p>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-img" src="~assets/img/tabbar/mine.png" alt="">
      <img slot="item-img-active" src="~assets/img/tabbar/mine_active.png" alt="">
      <p slot="item-text">我的</p>
    </tab-bar-item>
  </tab-bar>

</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
