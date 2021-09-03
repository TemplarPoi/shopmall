<template>
<!-- 在使用该插槽时 将图片 文本传入即可使用-->
<!--  在slot外套一层div 避免被使用时的替换而造成影响-->

    <div class="tab-bar-item" @click="itemclick">
      <div v-if="!isActive"><slot name="item-img">此处放图片1</slot></div>
      <div v-else><slot name="item-img-active">此处放图片2</slot></div>
      <div :style="[activeStyle]"><slot name="item-text">此处写文本</slot></div>
    </div>
</template>

<!--
使用方法
<tar-bar>
 <tab-bar-item path="路由" activeColor="自定义字体活跃状态的颜色">
    <img slot="item-img" src="一般展示的图片">
    <img slot="item-img-active" src="活跃状态时展示的图片">
    <块标签>文本内容</块标签>
 </tab-bar-item>
 可设置多个tab-bar-item
</tar-bar>
-->

<script>
  export default {
    name: "TabBarItem",
    props:{
      path: String,
      activeColor:{
        type: String,
        default: "lightcoral"
        }
    },
    computed:{
      //判断当前拿到的路由是否和当前的路由是否相同 相同 则处于活跃状态
      isActive(){
       // return this.$route.path.indexOf(this.path) != -1
       return this.$route.path == this.path
      },
      //能自己修改字体在活跃时的颜色
      activeStyle(){
        return this.isActive ? { color:this.activeColor} : {}
      }
    },
    methods: {
      itemclick(){
        //解决多次点击造成的问题
        if(!this.isActive){
          this.$router.push(this.path)
        }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    /*均等分*/
    flex: 1;
    height: 50px;
    background-color: rgba(168, 58, 28, 0.25);
    text-align: center;
    font-size: 14px;

  }
  .tab-bar-item img{
    width: 26px;
    height: 26px;
    margin-top:4px;
    /*去除图片下的空白像素*/
    vertical-align: middle;
  }

</style>
