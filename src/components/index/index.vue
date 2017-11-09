<template>
  <div class="index-container">
    <p class="index-text lighter-font animated-slide">隐约雷鸣 但盼风雨 能留你至此</p>
    <div class="index-para lighter-font">
      <p>欢迎来到coma的山顶洞</p>
      <p>每个开发者都会有搭建个人网站的这么一个想法吧</p>
      <p>我也一样，与其说做学习笔记，倒不如放宽点，在这里放置自己的想法</p>
      <p>日积月累，亦是有趣</p>
      <p>新手上路，出发</p>
    </div>
    <div class="index-contact">
      <!-- <icon name="star" scale="5"></icon> -->
      <div class="contact-item">
        <icon name="github" scale="3"></icon><span class="inline-contact"><a href="https://github.com/divasatanica">divasatanica</a></span>
      </div>
      <div class="contact-item">
        <icon name="mail" scale="3"></icon><span class="inline-contact"><a href="#">jayhebes@vip.qq.com</a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import '../../assets/style/animation';

  a {
    color: #000;
    font-family: Microsoft Yahei;
    font-size: 2.8em;
    font-weight: lighter;
    @media screen and (max-width: 650px) {
      font-size: 2.2rem;
    }
    @media screen and (max-width: 450px) {
      font-size: 1.4rem;
    }
  }

  .index-container {
    margin: {
      top: 0.5rem;
      left: 10rem;
      right: 10rem;
      bottom: 5rem;
    }
    padding: {
      top: 1rem;
      left: 1.5rem;
      bottom: 1.5rem;
    }
    border: {
      top-left-radius: 5px;
      top-right-radius: 5px;
    }
    background: {
      color: rgba(255,255,255,0.4);
    }
    @media screen and (max-width: 800px) {
      margin: {
        left: 5rem;
        right: 5rem;
      }
    }
    @media screen and (max-width: 600px) {
      margin: {
        left: 0;
        right: 0;
      }
    }
  }
  .index-text {
    font-size: 2.4rem;
  }
  .index-para {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    p {
      font: {
        size: 1.6rem;
      }
    }
  }
  .lighter-font {
    font-weight: lighter;
  }
  .contact-item {
    vertical-align: middle;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .inline-contact {
    display: inline-block;
    margin-left: 1.5rem;
  }
</style>
