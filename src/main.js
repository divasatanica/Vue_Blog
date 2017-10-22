// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Upload from '../node_modules/element-ui/lib/upload'
import DatePicker from '../node_modules/element-ui/lib/date-picker'
import Button from '../node_modules/element-ui/lib/button'
import Message from '../node_modules/element-ui/lib/message'
import Pagination from '../node_modules/element-ui/lib/pagination'
import hljs from 'highlight.js'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/vs2015.css'
import '@/assets/custom-font.css';

Vue.config.productionTip = false;

Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Pagination);
Vue.use(Button);

Vue.prototype.$http = axios;
Vue.prototype.$message = Message;

// 用一个闭包去保存登录状态
Vue.prototype.$_proxy = (function() {
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


axios.defaults.withCredentials = true;

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  if(!blocks.forEach) {
    for(let i = 0, len = blocks.length;i < len;i ++) {
      hljs.highlightBlock(blocks[i]);
    }
  }
  else {
    blocks.forEach((block)=>{
      hljs.highlightBlock(block)
    })
  }
  
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  }
});


