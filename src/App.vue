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
  .el-pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
  .el-pagination{
    .btn-prev, .btn-next, button.disabled {
      color: #29272b;
      background-color: #b1b1b1;
    }
    button:hover {
      color: #eee;
    }
  }
  .el-page li:hover {
    color: #29272b;
  }
  .el-pagination--small {
    .el-pager {
      li {
        border-radius: 0;
      }
    }
  }
  .el-pager {
    li {
      background: #b1b1b1;
    }
    li:hover {
      color: #eee;
    }
    li.active {
      border-color: #212121;
      background-color: #212121;
    }
  }
  .el-message {
    background-color: rgba(120,120,120,0.7);
    .el-message__group {
      p {
        color: #fff;
      }
    }
  }
  .el-input__inner {
    background: #808080;
    border-color: #808080;
    color: #eee;
    &:hover {
      border-color: #a0a0a0;
    }
    &:focus {
      border: none;
    }
  }
  .el-picker-panel {
    border: none;
    box-shadow: none;
    .el-picker-panel__content {
      background-color: #606060;
      color: #fff;
      border: none;
    }
  }
  .el-picker-panel__icon-btn:hover {
    color: #a5a5a5;
  }
  .el-date-table {
    td.current:not(.disabled), td.end-date, td.start-date {
      background-color: #353535 !important;
    }
    td.today {
      color: #252525;
      &:before {
        border-top: .5em solid #707070;
      }
    }
    td.in-range {
      background-color: #707070;
      &:hover {
        background-color: #858585;
      }
    }
    td.prev-month, td.next-month { 
      color: #29272b;
    }
  }
</style>
