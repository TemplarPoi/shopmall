
import {debounce} from "common/utils"

export const itemListenerMixin = {
  data(){
    return{
      itemListener: null,
      newRefresh: null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh,300)
    this.itemListener = () =>{
      this.newRefresh()
    }
    this.$bus.$on("goodsImgLoad" ,this.itemListener)

  }

}
