<template>
  <div id="home">
    <nav-bar class="home-nav">
    <div slot="center">购物街</div>
    </nav-bar>
    <!--    因为不是原生js滚动 实现吸顶效果无法使用sticky
    则直接隐藏一个用来占据吸顶块的位置 这波啊这波啊 这波是瞒天过海
    你以为实现吸顶的是那个 然而实际是原本就存在的一模一样的另外一个-->
    <tab-control :titles="['流行','新款','精选']"
                 @tabclick="showClick" ref="tabControl1"
                 class="home-tabcontrol" v-show="isshowtab"/>

    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
        <!--  轮播图-->
      <home-swiper :cbanners="banners" @imgLoad="swiperImgLoad" />
        <!--  推荐-->
      <recommend-view :crecommends="recommends" />
        <!--  流行-->
      <feature-view />
        <!--  导航-->
      <tab-control :titles="['流行','新款','精选']"
                   @tabclick="showClick" ref="tabControl2"/>
        <!--  商品列表-->
      <goods-list :goods="showgoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="backshow"/>


  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from "components/common/scroll/Scroll"
  import TabControl from "components/content/tabcontrol/TabControl"
  import GoodsList from "components/content/goodslist/GoodsList"
  import BackTop from "components/content/backtop/BackTop"

  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import {getHomeMultidata,getHomeGoods} from "network/home"

  import {itemListenerMixin} from "common/mixin"

  export default {
    name: "Home",
    data(){
      return{
        banners: [],  //轮播图的数据
        recommends: [],  //推荐服务的数据
        goods: {   //商品数据
          "sell":{page:0, list:[] },
          "pop":{page:0, list:[] },
          "new":{page:0, list:[] }
        },
        currentType: 'pop',  //当前选择的展示的商品类型
        backshow: false,     //回到顶部图标 是否显示
        tabOffsetTop: 0,     //吸顶块的位置
        isshowtab: false,   //吸顶块 是否显示
        currentY: 0          //离开当前页面的位置
      }
    },
    computed: {
      showgoods(){
        return this.goods[this.currentType].list
      },
    },
    components:{
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView
    },
    created() {
      this.getHomeMultidata()

      //请求商品的数据
      this.getHomeGoods("sell")
      this.getHomeGoods("pop")
      this.getHomeGoods("new")

    },
    mixins: [itemListenerMixin],
    mounted() {
      //使用防抖函数 减小多次refresh造成的服务器压力
      // 解决下拉加载卡顿的bug
      /*原因： 在图片未加载完毕所计算出的可滚动区域比真实区域小*/
   //   使用了混入 所以注释
   /*   const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on("goodsImgLoad",() =>{
        refresh()
      })*/
    },

    //解决keep-alive的bug
    activated() {
    // 执行一次刷新 解决其他小问题
      this.$refs.scroll.refresh()
      // 回到之前的位置
      this.$refs.scroll.scrollTo(0, this.currentY, 0)


    },
    deactivated() {
    //  记录离开时的位置
      this.currentY = this.$refs.scroll.scrollY()
    //  取消全局事件的监听
      this.$bus.$off("goodsImgLoad", this.itemListener)
    },

    methods:{
      /*
     * 事件监听
     */

      //点击切换展示商品
      showClick(index){
        switch (index) {
          case 0:
            this.currentType = "pop"
            break
          case 1:
            this.currentType = "new"
            break
          case 2:
            this.currentType = "sell"
            break
        }

      //  吸顶效果的bug优化
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      //点击回到顶部
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },

      //内容滚动
      contentScroll(position){
        //回到顶部的显示/隐藏
        this.backshow = (-position.y) > 800
        // 吸顶效果
        this.isshowtab = (-position.y) > this.tabOffsetTop

      },

      //上拉加载
      loadMore(){
        this.getHomeGoods(this.currentType)
      },

      //当轮播图片加载完毕 计算吸顶块的位置
      swiperImgLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },



      /*
      *  网络请求
      */

      //获取首页数据
      getHomeMultidata(){
        getHomeMultidata().then( res =>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      //获取商品数据
      getHomeGoods(type){
        //获取当前page+1
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          //数组解构的方式push进入数组
          this.goods[type].list.push(...res.data.list)
          //修改当前page
          this.goods[type].page += 1
          //使多次下拉加载得以进行
          this.$refs.scroll.finishPullUp()
        })
      }


    }


  }
</script>

<style scoped>
  #home{
    /*100%的视口高度*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color:var(--color-tint);
    color: white;
/*  再一次 因为用的不是原生滚动 所以 懂？
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 8;*/
  }
  .home-tabcontrol {
    position: relative;
    z-index: 3;
    background-color: white;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0px;
    right: 0px;
    bottom:  49px;

  }

</style>
