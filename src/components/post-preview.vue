<template>
  <div class="preview" >
    <h1>{{header}}</h1>
    <div v-html="content"></div>
  </div>
</template>

<script>


export default {
  props: ['header', 'content'],
  data() {
    return {

    }
  },
  created() {
    
  }
}
</script>

<style lang="scss" >
  .preview {
    float: right;
    width: 50%;
    height: 100%;
    overflow-y: auto;
    padding: 5px 8px;
    box-sizing: border-box;
  }
  img {
    width: 500px;
  }
</style>
