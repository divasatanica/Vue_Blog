<template>
  <div class="nav-bar">
    <ul class="entries">
      <li class="entry"><router-link to="/">首页</router-link></li>
      <li class="entry" v-on:mouseenter='openMenu()' v-on:mouseleave='closeMenu()'><router-link to="/article">文章</router-link></li>
      <li class="entry" v-on:click="req()">脑洞</li>
    </ul>
    <span class="username">{{loggedName}}</span>
    <button class="login cusFont" v-if="hasLogged"><router-link :to="{path: '/post'}">发布文章</router-link></button>
    <button class="login cusFont"><router-link :to="topRightLink" class="login-link">{{msg}}</router-link></button>
    <transition name="el-zoom-in-center" >
      <router-view name="login" v-on:loginner="login"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '登录',
      loggedName: '',
      hasOpen: false,
      hasLogged: false,
      passageClass: [{id: 0, text: '学习'}, {id: 1, text: '吹水'}],
      dropdownClass: {'dropdown-open': false},
      topRightLink: {name:'login', path: '/login'}
    }
  },
  methods: {
    openMenu () {
      this.dropdownClass['dropdown-open'] = true;
    },
    closeMenu () {
      this.dropdownClass['dropdown-open'] = false;
    },
    req () {
      this.$http.get('http://comacc.top/article/newest/?offset=0').then(response => {
        console.log(response.data[3].tag)
        this.$emit('passage', response.data[3]);
      }, (err) => {
        console.error(err);
      })
    },
    log(data) {
      console.log(data);
    },
    login(data) {
      this.msg = '登出';
      this.hasLogged = true;
      this.loggedName = data;
      this.topRightLink = {name: 'login', path: 'logout'};
    }
  }
}
</script>

<style lang="scss" scoped>
  /* common */
  .cusFont {
    font: {
      weight: lighter;
      family: Microsoft Yahei
    }
  }
  li {
    list-style: none;
  }
  a {
    display: inline-block;
    width: 100%;
  }
  /* navigator-bar */
  .nav-bar {
    position: absolute;
    top: 0;
    width: 100%;
    min-width: 1024px;
    height: 60px;
    box-shadow: 0 9px 10px 0 rgba(39, 39, 39, 0.5);
    background: {
      color: #1e1e1e;
    }
  }
  /* navigator-entries */
  .entries {
    width: 100%;
    margin-left: 12.5%;
    font: {
      size: 1.4rem;
      weight: lighter;
    }
    color: #e5ece9;
  }
  .entry {
    float: left;
    width: 10%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .entry:hover {
    background-color: rgba(39,39,39,0.5);
  }
  .dropdown {
    position: absolute;
    display: none;
    width: 10%;
    left: 22.5%;
    top: 60px;
    border-radius: 3px;
    cursor: pointer;
  }
  .dropdown-open {
    display: block;
  }
  .sub-entry {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: {
      color: rgba(39,39,39,0.5);;
    }
    color: #fff;
    transition: all 0.3s ease;
  }
  .sub-entry:hover {
    background-color: rgba(100,100,100,0.5);
  } 
  /* username */
  span.username {
    display: inline-block;
    height: 60px;
    line-height: 60px;
    margin-left: 30%;
    margin-right: 20px;
    color: #e5ece9;
  }
  /* login-button */
  .login {
    position: absolute;
    height: 60px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #e5ece9;
    background-color: rgba(0,0,0,0);
  }
  .login:nth-of-type(1) {
    right: 10%;
  }
  .login:nth-of-type(2) {
    right: 5%;
  }
  .login:hover {
    color: #fff;
    background-color: rgba(20,20,20,0.3);
  }
  button {
    border: none;
    border-radius: 3px;
    padding: 5px 8px;
    font: {
      size: 1.2rem;
    }
  }
  .login-link {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 50px;
  }
</style>
