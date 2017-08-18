<template>
  <div class="passage-container">
    <h1>{{article.header}}</h1>
    <span>{{article.timeStamp | geneTime}} {{article.clock}}</span>
    <div v-html="article.marked"></div>
  </div>
</template>

<script>
export default {
  props: ['article'],
  filters: {
    geneTime(str) {
      return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}`;
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 75%;
    margin: 0 auto;
  }
  h1 {
    font: {
      size: 2rem;
      weight: lighter;
    }
    margin-bottom: 2rem;
  }
  h2, h3, h4, h5, h6 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-indent: 1.5rem;
  }
  p {
    margin: {
      top: 10px;
      bottom: 10px;
    }
  }
  .passage-container {
    background: {
      color: rgba(255,255,253,0.5);
    }
    width: 750px;
    border-radius: 3px;
    padding: {
      top: 20px;
      right: 30px;
      bottom: 20px;
      left: 30px;
    }
    margin-top: 30px;
    margin-left: 50px;
  }
</style>
