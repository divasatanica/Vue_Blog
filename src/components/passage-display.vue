<template>
  <div class="passage-container">
    <div class="go-back el-icon-arrow-left" @click="back"></div>
    <h1>{{article.header}}</h1>
    <span>{{article.timeStamp | geneTime}} {{article.clock}}</span>
    <div v-html="article.marked" class="marked" v-highlight></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        header: '',
        timeStamp: '',
        marked: '',
        clock: ''
      }
    }
  },
  filters: {
    geneTime(str) {
      return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}`;
    }
  },
  methods: {
    back() {
      window.history.back();
    }
  },
  created() {
    this.$http.get(`http://localhost:3000/article/display/${this.$route.params.id}`).then(result => {
      this.article = result.data;
    }); 
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
  .passage-container {
    background: {
      color: rgba(255,255,253,0.5);
    }
    width: 75%;
    border-radius: 3px;
    padding: {
      top: 20px;
      right: 30px;
      bottom: 20px;
      left: 30px;
    }
    margin: 0 auto;
    margin-top: 30px;
  }
  .go-back {
    position: fixed;
    left: 0;
    height: 300px;
    width: 50px;
    line-height: 300px;
    font-size: 4rem;
  }
  .go-back:hover {
    background-color: rgba(200,200,200,0.5);
  }
</style>
