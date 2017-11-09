<template>
  <div>
    <h1 class="custom-font">Dunkelheit</h1>
    <p class="custom-font"><slot></slot></p>
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
      top: 80px;
      left: 50px;
    }
    width: 75%;
    margin: 0 auto;
  }
  h1, p{
    margin: 0 !important;
    color: #e5ece9;
  }
  .cusFont {
    font: {
      family: Microsoft Yahei
    }
  }
  
</style>

