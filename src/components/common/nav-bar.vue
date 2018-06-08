<template>
  <div class="nav-bar">
    <div class="nav-container">
      <ul class="left-entries">
        <li class="entry left-float"><router-link to="/" class="custom-font">Index</router-link></li>
        <li class="entry left-float"><router-link to="/article/1" class="custom-font">Article</router-link></li>
        <!-- <li class="entry custom-font">Work</li>
        <li class="entry custom-font">About</li> -->
      </ul>
    </div>
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
    }
  },
  methods: {

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
  .float-left {
    float: left;
  }
  .float-right {
    float: right;
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
    height: 60px;
    box-shadow: 0 9px 10px 0 rgba(39, 39, 39, 0.5);
    transition: all 0.3s ease-in-out;
    background: {
      color: rgba(50,50,50,0.5);
    }
  }
  /* navigator-container */
  .nav-container {
    display: flex;
    padding: {
      left: 100px;
      right: 100px;
    }
    @media screen and (max-width: 600px) {
      padding: {
        left: 30px;
        right: 30px;
      }
    }
  }
  /* navigator-entries */
  .left-entries {
    display: flex;
    width: 50%;
    font: {
      size: 1.4rem;
      weight: lighter;
    }
    color: #e5ece9;
    overflow: hidden;
  }
  .right-entries {
    display: flex;
    justify-content: flex-end;
    width: 50%;
    overflow: hidden;
  }
  .entry {
    width: 20%;
    min-width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1.4rem;
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
  button {
    border: none;
    border-radius: 3px;
    padding: 5px 8px;
    font-size: 1.4rem;
  }
  .login-link {
    display: inline-block;
    height: 100%;
    line-height: 50px;
  }

</style>
