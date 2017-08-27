<template>
  <div class="container">
    <span><h1 v-on:click="detail(index)"><router-link :to="nav">{{article.header}}</router-link></h1></span><span class="time">{{article.timeStamp | geneTime}} {{article.clock}}</span>
    <div class="tags"><span class="tag" v-for="(item, index) in article.tag" v-bind:key="item.timeStamp" v-on:click="filterTags(item)">#{{item}}</span></div>
  </div>
</template>

<script>
export default {
  props: ['article', 'index'],
  data() {
    return {
      nav: {
        path: `article/${this.article._id}`
      }
    }
  },
  filters: {
    geneTime(str) {
      return `${str.substr(0,4)}-${str.substr(4,2)}-${str.substr(6,2)}`;
    }
  },
  methods: {
    detail(index) {
      console.log(index);
    },
    filterTags(tag) {
      console.log(tag);
    }
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    display: inline;
    font: {
      size: 1.5rem;
      weight: lighter;
    }
    margin: {
    }
    cursor: pointer;
  }
  h1 a {
    color: #000;
  }
  .container {
    padding: 10px 16px;
    background-color: rgba(189,184,180,0.7);
  }
  .time {
    display: block;
    font: {
      weight: lighter;
      size: 1.2rem;
    }
  }
  .tags {
    margin-top: 1rem;   
    color: #707070;
  }
  .tag {
    cursor: pointer;
    margin: {
      left: 5px;
      right: 5px;
    }
  }
</style>
