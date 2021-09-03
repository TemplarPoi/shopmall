<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,                    //是否允许点击
        probeType: this.probeType,    //记录位置的类型       0 1不记录 2记录 3惯性记录
        pullUpLoad: this.pullUpLoad  //是否允许上拉加载
      })

      // 监听滚动的位置
      if(this.probeType == 2 || this.probeType == 3){
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      //监听滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      // this.$refs.scroll.scroll.方法名
      // this.$refs.scroll.方法名   然而并没有什么卵用 好看一点? 感觉流畅一点？(错觉)

      //为什么要进行判断
      /* 防止图片以及加载完毕 而造成scorll还未挂载的状态 即scorll=nulls时 调用方法而报错*/

      //滚动到目标位置
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },

      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      //刷新
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      //获取当前位置
      scrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }

  }
</script>

<style scoped>

</style>
