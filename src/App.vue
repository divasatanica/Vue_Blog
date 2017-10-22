<template>
  <div id="app">
    <nav-bar v-on:passage="handler" :hasLogged="logged" @logout="logout"></nav-bar>
    <div class="root-container">
      <blog-header>WHO'S YOUR DADDY</blog-header>
    </div>
    <router-view></router-view>
    
  </div>
</template>

<script>
import blogHeader from '@/components/common/header/header'
import navBar from '@/components/common/nav-bar'
import api from './data/api'


export default {
  name: 'app',
  data() {
    return {
      logged: false
    }
  },
  components: {
    blogHeader,
    navBar
  },
  methods: {
    handler (data) {
      this.sheader = data;
    },
    logout () {
      this.logged = false;
    }
  },
  created() {
    window.$_proxy = (function() {
      let isLogin = false;
      return function(flag, action) {
        if(action == 'set') {
          isLogin = flag;
        }
        else if(action == 'get') {
          return isLogin;
        }
      }
    })();
    try {
      this.$http.post(`${api.address}/login`, {}, {credentials: true}).then((response) => {
        this.logged = true;
        window.$_proxy(true, 'set');
      }, (response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      })
    }
    catch(e) {
      console.log(e);
    }
    
  }
}
</script>

<style lang="scss">
  body,html,p,div,ol,ul {
    margin: 0;
    padding: 0;
  }
  body {
    min-width: 1000px;
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
    font-family:'Akzidenz-Grotesd34d45b8c18da7', Microsoft Yahei;
  }
  h2, h3, h4, h5, h6 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-indent: 1.5rem;
  }
  .marked {
      li {
        font-size: 1.1rem;
      }
      p {
        font-size: 1.1rem;
      }
      pre code {
        font-size: 1.5rem;
      }
      img {
        width: 75%;
        margin: 0 auto;
      }
  }
  .custom-font {
    font-family:'Akzidenz-Grotesd34d45b8c18da7',  Microsoft Yahei;
  }
  .marked p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .passage-func-zone+.el-message-box__message {
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
  .passage-func-zone+.el-pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
  .passage-func-zone+.el-pagination{
    .btn-prev, .btn-next, button.disabled {
      color: #29272b;
      background-color: #b1b1b1;
    }
    button:hover {
      color: #eee;
    }
  }
  .passage-func-zone+.el-page li:hover {
    // color: #29272b;
  }
  .passage-func-zone+.el-pagination--small {
    .el-pager {
      li {
        border-radius: 0;
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
  }
  .el-message {
    background-color: rgba(120,120,120,0.7);
    .el-message__group {
      p {
        color: #fff;
      }
    }
  }
  .filter-date .el-input__inner {
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
  script[type='text/javascript']+.el-picker-panel.el-date-range-picker {
    border: none;
    box-shadow: none;
    .el-picker-panel__content {
      background-color: #606060;
      color: #fff;
      border: none;
    }
  }
  script[type='text/javascript']+.el-picker-panel .el-picker-panel__icon-btn:hover {
    color: #a5a5a5;
  }
  script[type='text/javascript']+.el-picker-panel .el-date-table {
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
