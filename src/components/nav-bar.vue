<template>
  <div class="nav-bar">
    <ul class="entries">
      <li class="entry">首页</li>
      <li class="entry" v-on:mouseenter='openMenu()' v-on:mouseleave='closeMenu()'>文章</li>
      <ul class="dropdown" v-bind:class='dropdownClass' v-on:mouseenter='openMenu()' v-on:mouseleave='closeMenu()'>
          <li class="sub-entry" v-for="(item, index) in passageClass" v-bind:key="item.id" v-on:click="log(index)">{{item.text}}</li>
      </ul>
      <li class="entry" v-on:click="req()">脑洞</li>
    </ul>
    <button class="login cusFont" @click="login"><router-link :to="{name:'login', path:'/login'}" @click="push" class="login-link">{{msg}}</router-link></button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '登录',
      hasOpen: false,
      passageClass: [{id: 0, text: '学习'}, {id: 1, text: '吹水'}],
      dropdownClass: {'dropdown-open': false}
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
    push() {
      window.history.pushState({}, document.title, '/');
    },
    login() {
      /* const h = this.$createElement;
      this.$msgbox({
        title: '登录',
        message: h('div', null, [
          h('div', null, [
            h('label', {attrs:{for:'user'}}, '用户名'),
            h('input', {attrs:{'placeholder': '请输入用户名', name: 'user'},domProps:{value: this.user}}, '')
          ]),
          h('div', null, [
            h('label', {attrs:{for:'user'}}, '密码'),
            h('input', {'placeholder': '请输入密码', 'name': 'pswd'}, '')
          ])
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose(action, instance, done) {
          done();
        }
      }).then(({value}) => {
        console.log(value);
        // console.log(action);
      }).catch((action) => {
        // console.log(action);
      })  */
      //this.$router.push({path: '/login'});
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
  /* navigator-bar */
  .nav-bar {
    position: absolute;
    top: 0;
    width: 100%;
    min-width: 1024px;
    height: 60px;
    box-shadow: 0 9px 10px 0 rgba(39, 39, 39, 0.5);
    background: {
      color: #96897B;
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
  /* login-button */
  .login {
    position: absolute;
    right: 5%;
    width: 80px;
    height: 60px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #e5ece9;
    background-color: rgba(0,0,0,0);
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
