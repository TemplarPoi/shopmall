<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         :class="{active:currentIndex==index}"
         @click="tabclick(index)"
         class="tab-control-item">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods: {
      tabclick(index){
        this.currentIndex = index;
        this.$emit("tabclick",index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    background-color: #fff;
  }
  .tab-control span{
    padding: 5px;
  }
  .tab-control-item{
    flex:1;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
