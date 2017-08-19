<template>
  <div id="app">
    <navbar v-on:passage="handler"></navbar>
    <div class="container">
      <blogheader>面向大海编程</blogheader>
    </div>
    <passagedisplay v-bind:article="sheader"></passagedisplay>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import blogheader from '@/components/header'
import navbar from '@/components/nav-bar'
import passagedisplay from '@/components/passage-display'

export default {
  name: 'app',
  data() {
    return {
      sheader: ''
    }
  },
  components: {
    blogheader,
    navbar,
    passagedisplay
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
      color: #545454;
    }
  }
  html {
    font: {
      size: 14px;
    }
  }
  .container {
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
</style>
