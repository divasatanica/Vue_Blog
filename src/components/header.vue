<template>
  <div>
    <h1 class="cusFont">Coma's Blog</h1>
    <p class="cusFont"><slot></slot></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '登录',
      isLoggedIn: false
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    padding: {
      top: 50px;
      left: 50px;
    }
    width: 75%;
    margin: 0 auto;
  }
  h1, p{
    margin: 0 !important;
    color: #fff;
  }
  .cusFont {
    font: {
      family: Microsoft Yahei
    }
  }
  
</style>

