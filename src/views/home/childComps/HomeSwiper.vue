<template>
  <swiper >
    <swiper-item v-for="(item, id) in cbanners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad1">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"

  export default {
    name: "HomeSwiper",
    data(){
      return{
        isLoad: false
      }
    },
    props: {
      cbanners: {
        type: Array,
        default() {
          return []
        }
      },
    },
    methods: {
      imgLoad1(){
        if(!this.isLoad){
          this.$emit("imgLoad")
          this.isLoad = !this.isLoad
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>

</style>
