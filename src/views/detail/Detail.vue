<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-goods-params :param-info="goodsParams" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <detail-bottom-bar/>

  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailGoodsParams from "./childComps/DetailGoodsParams";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goodslist/GoodsList";

  import {getDetail,getRecommend,Goods,Shop,GoodsParams} from "network/detail"
  import {itemListenerMixin} from "common/mixin"
  import {debounce} from "../../common/utils";


  export default {
    name: "Detail",
    components: {
      DetailBottomBar,
      DetailBaseInfo,
      DetailNavBar,
      DetailSwiper,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,

      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop:{},
        detailInfo: {},
        goodsParams: {},
        commentInfo:{},
        recommends: [],
        themeTops: [],
        getThemeTops: null,
        currentIndex: 0,

      }
    },
    created() {
      //获取iid
      this.iid = this.$route.params.iid;
      //发送请求 获取数据
      getDetail(this.iid).then( res => {
        // console.log(res);
        const data =  res.result;
        //获取轮播图数据
        this.topImages =data.itemInfo.topImages;

        //获取商品信息 创建商品对象
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        //获取店铺信息 创建店铺对象
        this.shop = new Shop(data.shopInfo);

        //获取详情数据
        this.detailInfo = data.detailInfo;

        //获取尺寸信息 创建对象
        this.goodsParams = new GoodsParams(data.itemParams.info,data.itemParams.rule);

        //获取评论数据
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0] || {};
        }

        //获取点击滚动的位置 使用防抖减少多次
        this.getThemeTops = debounce( () => {

          this.themeTops = []
          this.themeTops.push(0)
          this.themeTops.push(this.$refs.params.$el.offsetTop)
          this.themeTops.push(this.$refs.comment.$el.offsetTop)
          this.themeTops.push(this.$refs.recommends.$el.offsetTop)
          //添加一个极大的值 便于判断
          this.themeTops.push(Number.MAX_VALUE)

          // console.log(this.themeTops);
        })

      })

      //发送请求 获取推荐数据
      getRecommend().then( res => {
        this.recommends = res.data.list
      })
    },
    mixins: [itemListenerMixin],
    destroyed() {
      //  取消全局事件的监听
      this.$bus.$off("goodsImgLoad", this.itemListener)
      },
    methods: {
      imgLoad(){
        this.newRefresh()
      //  在图片加载完成刷新后 可以获取正确的位置
        this.getThemeTops()
      },

      //监听标题的点击 滚动到对应位置
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 300)
      },

      //标题联动效果
      contentScroll(position){
        //获取当前位置的y值
        const positionY = -position.y
        let length = this.themeTops.length
        for(let i = 0;i < length-1 ; i++){
          //  条件A &&（条件B || 条件C）

          //空间换时间 添加一个极大的值参与判断 减少判断条件的冗长
          if( this.currentIndex != i &&
            (  positionY >= this.themeTops[i] && positionY < this.themeTops[i+1] )){
            this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
          }
      }
          // for(let i = 0;i < length-1 ; i++){
          // if( this.currentIndex != i &&
          //   ( (i < length-1 && positionY >= this.themeTops[i] && positionY < this.themeTops[i+1] ) ||
          //     (  i == length-1  && positionY >= this.themeTops[i] )  )
          // ){
          //   this.currentIndex = i
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

      }

    }
  }
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
    background-color: #fff;
     /*position: absolute;*/
     /*top: 44px;*/
     /*right: 0;*/
     /*bottom: 50px;*/
     /*left: 0;*/
     /*overflow: hidden;*/
     /*width: 100%;*/
     /*background-color: #ffffff;*/

  }

</style>
