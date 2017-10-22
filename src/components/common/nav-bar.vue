<template>
  <div class="nav-bar">
    <ul class="entries">
      <li class="entry "><router-link to="/" class="custom-font">Index</router-link></li>
      <li class="entry " v-on:mouseenter='openMenu()' v-on:mouseleave='closeMenu()'><router-link to="/article/1" class="custom-font">Article</router-link></li>
      <!-- <li class="entry custom-font">Work</li>
      <li class="entry custom-font">About</li> -->
    </ul>
    <button class="login" v-if="hasLogged || loggedin"><router-link :to="{path: '/post'}" class="custom-font">POST</router-link></button>
    <button class="login" v-if="!hasLogged && !loggedin"><router-link v-bind:to="topRightLink" class="login-link custom-font">LOGIN</router-link></button>
    <button class="login login-link custom-font" v-else @click="logout">LOGOUT</button>
    <transition name="el-zoom-in-center" >
      <router-view name="login" v-on:loginner="login"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['hasLogged'],
  data () {
    return {
      msg: 'Login',
      loggedName: '',
      hasOpen: false,
      loggedin: false,
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
    login(data) {
      this.msg = 'LOGOUT';
      this.loggedin = true;
      this.loggedName = data;
    },
    logout() {
      if(window.confirm('Sure to QUIT?')) {
        this.$_proxy(false, 'set');
        this.loggedin = false;
        this.$emit('logout');
        if(this.$route.path.indexOf('post') > -1) {
          this.$router.push({path: '/article/1'});
        }
      }
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
    min-width: 1000px;
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
    background-color: rgba(220,220,220,0.3);
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
      color: rgba(39,39,39,0.5);
    }
    color: #fff;
    transition: all 0.3s ease;
  }
  .sub-entry:hover {
    background-color: rgba(220,220,220,0.3);
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
    right: 12%;
  }
  .login:nth-of-type(2) {
    right: 5%;
    width: auto;
  }
  .login:hover {
    color: #fff;
    background-color: rgba(220,220,220,0.3);
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
