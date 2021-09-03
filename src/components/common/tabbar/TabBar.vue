<template>
  <div id="tab-bar">
    <slot>
    </slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
  }
</script>

<style scoped>

  #tab-bar{
    display: flex;
    text-align: center;
    box-shadow: 0 -2px 1px rgba(99,99,99,0.2);
    position: fixed;
    bottom: 0px;
    /*保证占据整个宽度*/
    left: 0px;
    right: 0px;

  }

</style>
