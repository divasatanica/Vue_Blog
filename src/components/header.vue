<template>
  <div>
    <h1 class="cusFont">Coma's Blog</h1>
    <p class="cusFont">壮士一去不复返</p>
    <button class="login">{{ msg }}</button>
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
      top: 5%;
      left: 5%;
    }
    width: 75%;
    margin: 0 auto;
  }
  h1 {
    margin: 0 !important;
  }
  .cusFont {
    font: {
      weight: lighter;
      family: Microsoft Yahei
    }
  }
  .login {
    position: relative;
    bottom: 44px;
    right: 5%;
    float: right;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .login:hover {
    color: white;
    background-color: rgb(20,20,20);
  }
  button {
    border: none;
    border-radius: 3px;
    padding: 5px 8px;
    font: {
      size: 1.2rem;
    }
  }
</style>

