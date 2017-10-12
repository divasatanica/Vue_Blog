// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {DatePicker, Upload, Pagination, Message, Button} from 'element-ui'
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


axios.defaults.withCredentials = true;

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
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


