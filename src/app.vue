<!--
 * @Descripttion: 
 * @version: 
 * @Author: Andy
 * @Date: 2020-12-22 18:50:03
 * @LastEditors: Andy
 * @LastEditTime: 2020-12-31 15:46:42
-->
<template>
  
  <div id="app">
    <span class="span">主页面</span>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="less" scoped>
  .span {
    color: red;
  } 
</style>