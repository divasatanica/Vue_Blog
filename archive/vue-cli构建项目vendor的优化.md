最近重启博客项目的开发，我自己的习惯是，本地环境测试完毕后，会执行一次```npm run build```来构建项目观察各个包的大小，以进行优化。

优化之前的项目vendor.js文件大小为1.1MB，优化后为310KB，开启nginx GZIP之后为105KB。

## 大头Highlight.js

使用Webpack-Bundle-Analyzer工具生成模块依赖报告，发现highlightjs众多未被使用的语言包也被打包进去了，打包后的大小达到了可怕的600KB+，遂尝试进入到language文件夹删除不必要的语言js文件，并在index.js中取消依赖，只留下了css、html、nginx、http、java、js、python语言文件，打包后大小减小到了20KB，神一般的效果，直接变成了原来的1/25，大大减小了体积，现在vendor的体积为607KB。

## 论Element-UI的导入姿势

整个项目我用到Element-UI的地方并不多，只用了一些按钮、上传组件、消息弹框、分页组件。

若按之前的导入方法

```
import {Button, Message, ... } from 'element-ui'
```

看似是按需引入自己用到的组件，实际上是把整个element-ui导入，然后暴露语句中提及到的部分接口，这等于没有优化，在网上查阅资料后，使用以下导入方法：

```javascript
import Upload from '../node_modules/element-ui/lib/upload'
import DatePicker from '../node_modules/element-ui/lib/date-picker'
import Button from '../node_modules/element-ui/lib/button'
import Message from '../node_modules/element-ui/lib/message'
import Pagination from '../node_modules/element-ui/lib/pagination'
```

即直接手动寻找该组件的位置进行导入，重新打包后element-ui部分大小从440KB减小到了167KB，完全不影响使用，又是一个效果拔群的操作。

## 前端优化结果

两趟操作下来，减小了800KB左右的包大小。


![输入图片描述](http://comacc.top/upload/img/kQTkTH_eXuhteP_FXjvT9T_H.JPG)


![输入图片描述](http://comacc.top/upload/img/hhPsm8JHEolWo7TeUXpAwqvg.JPG)

## 服务器端GZIP

在nginx.conf文件中的http部分加入如下配置语句

```nginx
	gzip  on;
    gzip_min_length 1k;
    gzip_buffers   4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 2;
    gzip_types    text/plain application/x-javascript text/css application/xml application/javascript;
    gzip_vary on;
```
即可开启nginx的gzip功能，实测压缩率为69%左右，效果显著，现在博客首屏时间从之前的4.5s降低到0.6s。