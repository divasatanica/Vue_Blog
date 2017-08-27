<template>
  <div id="app">
    <nav-bar v-on:passage="handler"></nav-bar>
    <div class="root-container">
      <blog-header>Black Heart</blog-header>
    </div>
    <!-- <post></post> -->
    <!-- <index-passage></index-passage> -->
    <router-view></router-view>
    
  </div>
</template>

<script>
import blogHeader from '@/components/header'
import navBar from '@/components/nav-bar'
import post from '@/components/post-container'


export default {
  name: 'app',
  data() {
    return {
      sheader: ''
    }
  },
  components: {
    blogHeader,
    navBar,
    post
  },
  methods: {
    handler (data) {
      this.sheader = data;
    }
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  body {
    min-width: 1024px;
    background: {
      color: #303030;
    }

  }
  html {
    font: {
      size: 14px;
    }
  }
  a {
    text-decoration: none;
    color: #e5ece9;
  }
  .root-container {
    margin-top: 80px;
  }
  a, p, div, pre, code {
    font-family: Microsoft Yahei;
  }
  h2, h3, h4, h5, h6 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-indent: 1.5rem;
  }
  .marked p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-message-box__message {
    div {
      padding: 5px 8px;
      label {
        display: inline-block;
        width: 50px;
        text-align: right;
        margin-right: 10px;
      }
      input {
        display: inline-block;
        width: 250px;
        height: 25px;
      }
    }
  }
</style>
