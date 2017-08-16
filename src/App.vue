<template>
  <div id="app">
    <blogheader></blogheader>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import blogheader from '@/components/header'

export default {
  name: 'app',
  components: {
    blogheader
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background: {
      color: rgb(200,200,200);
    }
  }
  html {
    font: {
      size: 14px;
    }
  }
</style>
